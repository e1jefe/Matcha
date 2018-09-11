<?php

namespace App\Controllers;
use App\Models\Model;
use App\Mail\SendMail;

class AuthController extends Controller
{
	public function generateTokenConfirm()
	{
		$token = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!$/()*";
		$token = str_shuffle($token);
		$token = substr($token, 0, 20);
		return $token;
	}

	public function generateToken($login, $id, $name, $surname)
	{
		$expiration = time() + (15 * 60 * 1000);

		// Create token header as a JSON string
		$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

		// Create token payload as a JSON string
		$payload = json_encode(['userLogin' => $login, 'userId' => $id, 'userName' => $name, 'userSurname' => $surname, 'exp' => $expiration]);

		// Encode Header to Base64Url String
		$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

		// Encode Payload to Base64Url String
		$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

		// Create Signature Hash
		$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

		// Encode Signature to Base64Url String
		$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

		// Create JWT
		$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
		return $jwt;
	}

	public function postSignIn($request, $response)
	{
		$login = htmlspecialchars($request->getParam('login'));
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->where('login', '=', $login);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();

		if (count($fromDb) !== 0 && password_verify($request->getParam('pass'), $fromDb['password']) && $fromDb['isEmailConfirmed'] === 1)
		{
			$jwt = $this->generateToken($login, $fromDb['userId'], $fromDb['fname'], $fromDb['lname']);
			$result->jwt = $jwt;
			//record after login that user's last visit of our site has just happened
			date_default_timezone_set ('Europe/Kiev');
			$date = date("Y-m-d H:i:s");
			$updateStatement = $db->update(array('last_seen' => $date))
					   ->table('users')
					   ->where('userId', '=', $fromDb['userId']);
			$affectedRows = $updateStatement->execute();
			$updateStatement2 = $db->update(array('isOnline' => 1))
						   ->table('profiles')
						   ->where('user', '=', $fromDb['userId']);
			$exec = $updateStatement2->execute();
			$result->id = $fromDb['userId'];
			return json_encode($result);
		}
		return json_encode(false);
	}

	public function postSignUp($request, $response)
	{
		$login = htmlspecialchars($request->getParam('login'));
		$pass = htmlspecialchars($request->getParam('pass'));
		$cpass = htmlspecialchars($request->getParam('cpass'));
		$fname = htmlspecialchars($request->getParam('fname'));
		$lname = htmlspecialchars($request->getParam('lname'));
		$email = htmlspecialchars($request->getParam('email'));
		$wrongLogin = (strlen($login) <= 4 || strlen($login) >= 120 || strlen($login) === 0);
		$wrongPass = (strlen($pass) <= 6 || strlen($pass) >= 120 || strlen($pass) === 0 || preg_match("(.*[A-Z].*)", $request->getParam('pass')) == false);
		$wrongCPass = ($pass != $cpass);
		$wrongFname = (strlen($fname) <= 1 || strlen($fname) >= 120 || strlen($fname) === 0 || !ctype_alpha($fname));
		$wrongLname = (strlen($lname) <= 1 || strlen($lname) >= 120 || strlen($lname) === 0 || !ctype_alpha($lname));
		$wrongEmail = (strlen($email) === 0 || strlen($email) >= 120);
		if ($wrongLogin )
			$res->eLogin = 'Login should be longer than 4 chars and shorter than 120';
		if ($wrongPass)
			$res->ePass = 'Rassword should be longer than 6 chars and shorter than 120 and have at least 1 uppercase letter';
		if ($wrongCPass)
			$res->eCPass = 'Rassword and Confirm password does not match';
		if ($wrongFname)
			$res->eFname = 'First name should consists at least 2 chars, be less than 120 and can contain only english letters';
		if ($wrongLname)
			$res->eLname = 'Last name should consists at least 2 chars, be less than 120 and can contain only english letters';
		if ($wrongEmail)
			$res->eEmail = 'Email should not be empty or longer than 120 chars';
		if ($wrongLogin || $wrongPass || $wrongCPass || $wrongFname || $wrongLname || $wrongEmail)
			return json_encode($res);			

		$email = $request->getParam('email');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->where('login', '=', $login)->orWhere('email', '=', $email);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		if ($fromDb === false)
		{
			$pass = password_hash($pass, PASSWORD_DEFAULT);
			$fname = ucfirst(strtolower($fname));
			$lname = ucfirst(strtolower($lname));
			$token = $this->generateTokenConfirm();
			date_default_timezone_set ('Europe/Kiev');
			$last_seen = date('Y-m-d G:i:s');
			$insertStatement = $db->insert(array('login', 'password', 'email', 'fname', 'lname', 'token', 'isEmailConfirmed', 'last_seen'))
						   ->into('users')
						   ->values(array($login, $pass, $email, $fname, $lname, $token, 0, $last_seen));
			$insertId = $insertStatement->execute(false);
			$this->mail->sendMail($email, "Please, folow this link to confirm your account: http://localhost:8080/auth/confirmRegistration?email=" . $email . "&token=" . $token, "Registration");
			return json_encode(true);
		}
		else
		{
			$res->fromDbErr = "This login or email is already taken";
			return json_encode($res);			
		}
	}

	public function getConfirmRegistr($requset, $response)
	{
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->where('token', '=', $_GET['token']);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		if (count($fromDb) === 0)
			return false;
		else
		{
			$updateStatement = $db->update(array('isEmailConfirmed' => 1))
						   ->table('users')
						   ->where('email', '=', $_GET['email']);
			$exec = $updateStatement->execute();

			//create in profiles table new user, who confirmed email, so it will use our servise for sure
			$response = json_decode(file_get_contents('http://ip-api.com/json'), true);
			$insertStatement = $db->insert(array('user', 'longetude', 'latitude', 'showMe'))
						   ->into('profiles')
						   ->values(array($fromDb['userId'], $response['lon'], $response['lat'], 0));
			$insertId = $insertStatement->execute(false);
			header("Location: http://localhost:3000");
			die();
		}
	}

	public function confirmResetPass($requset, $response)
	{
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->where('token', '=', $_GET['token']);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		if (count($fromDb) === 0)
			return false;
		else
		{
			$updateStatement = $db->update(array('password' => $_GET['pass']))
						   ->table('users')
						   ->where('email', '=', $_GET['email']);
			$exec = $updateStatement->execute();
			header("Location: http://localhost:3000");
			die();
		}
	}

	public function postResetPass($request, $response)
	{
		$pass = htmlspecialchars($request->getParam('pass'));
		$email = htmlspecialchars($request->getParam('email'));
		$wrongPass = (strlen($pass) <= 6 || strlen($login) >= 120 || strlen($pass) === 0 || preg_match("(.*[A-Z].*)", $request->getParam('pass')) == false);
		$wrongEmail = (strlen($email) === 0 || strlen($email) >= 120);
		if ($wrongPass)
			$res->ePass = 'Rassword should be longer than 6 chars and shorter than 120 and have at least 1 uppercase letter';
		if ($wrongEmail)
			$res->wrongEmail = 'Email should not be empty or longer than 120 chars';
		if ($wrongPass || $wrongEmail)
			return json_encode($res);
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->where('email', '=', $request->getParam('email'));
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		if (count($fromDb) === 0)
		{
			$res->eEmail = 'This email is not registered';
			return $res;
		}
		else if ($fromDb['fbNbr'] !== null)
		{
			$res->eEmail = 'You should login with facebook';
			return $res;
		}
		$email = $request->getParam('email');
		$pass = password_hash($request->getParam('pass'), PASSWORD_DEFAULT);
		$token = $this->generateTokenConfirm();
		$updateStatement = $db->update(array('token' => $token))
						   ->table('users')
						   ->where('email', '=', $email);
		$exec = $updateStatement->execute();
		$this->mail->sendMail($email, "Please, folow this link to confirm your new password: http://localhost:8080/auth/confirmResetPass?email=" . $email . "&pass=" . $pass . "&token=" . $token, "Restore Password");
	}

	public function postLogOut($request, $response)
	{
		$uId = $request->getParam('uId');

		$db = new Model;
		$db = $db->connect();
		
		$updateStatement = $db->update(array('isOnline' => 0))->table('profiles')->where('user', '=', $uId);
		$updateStatement->execute();
		
		date_default_timezone_set ('Europe/Kiev');
		$date = date('Y-m-d H:i:s');
		$updateStatement2 = $db->update(array('last_seen' => $date))->table('users')->where('userId', '=', $uId);
		$updateStatement2->execute();

		return json_encode(true);
	}

	public function signinFB($request, $response)
	{
		$uId = $request->getParam('id');
		$name = $request->getParam('name');
		$email = $request->getParam('email');
		$ava = $request->getParam('picture');
		$ava = $ava['data']['url'];
		$name2 = explode(' ', $name);
		$fname = $name2[0];
		$lname = $name2[1];
		$db = new Model;
		$db = $db->connect();
		if ($request->getParam('event') === 'registration') {
			$ifExist = $db->select()->from('users')->where('fbNbr', '=', $uId);
			$ifExist = $ifExist->execute();
			$ifExist = $ifExist->fetchAll();
			if (count($ifExist) === 0)
			{
				$ifEmailExist = $db->select()->from('users')->where('email', '=', $email);
				$ifEmailExist = $ifEmailExist->execute();
				$ifEmailExist = $ifEmailExist->fetchAll();
				if (count($ifEmailExist) === 0) {
					$pass = "!Popk@7";
					$pass = password_hash($pass, PASSWORD_DEFAULT);
					$login = $name;
					$token = $this->generateTokenConfirm();
					date_default_timezone_set ('Europe/Kiev');
					$last_seen = date('Y-m-d H:i:s');
					$insertStatement = $db->insert(array('fbNbr', 'login', 'password', 'email', 'fname', 'lname', 'token', 'isEmailConfirmed', 'last_seen'))
								   ->into('users')
								   ->values(array($uId, $login, $pass, $email, $fname, $lname, $token, 1, $last_seen));
					$insertId = $insertStatement->execute(false);

					$selectSQL = $db->select()->from('users')->where('fbNbr', '=', $uId);
					$execSelect = $selectSQL->execute();
					$forId = $execSelect->fetch();

					$response = json_decode(file_get_contents('http://ip-api.com/json'), true);
					$insertStatement = $db->insert(array('user', 'longetude', 'latitude', 'showMe', 'profilePic', 'isOnline'))
								   ->into('profiles')
								   ->values(array($forId['userId'], $response['lon'], $response['lat'], 0, $ava, 1));
					$insertId = $insertStatement->execute(false);

					$insertStatement = $db->insert(array('userNbr', 'src', 'whenAdd'))
								   ->into('photos')
								   ->values(array($forId['userId'], $ava, $last_seen));
					$insertId = $insertStatement->execute(false);

					$jwt = $this->generateToken($login, $forId['userId'], $fname, $lname);
					$result->jwt = $jwt;
					$result->id = $forId['userId'];

					return json_encode($result);
				} else {
					$result->err = "You have already registered with this email";
					return json_encode($result);
				}
			} else {
				$result->err = "You have already registered";
				return json_encode($result);
			}
		} else if ($request->getParam('event') === 'login') {
			$selectSQL = $db->select()->from('users')->where('fbNbr', '=', $uId);
			$execSelect = $selectSQL->execute();
			$forId = $execSelect->fetchAll();
			if (count($forId) !== 0)
			{
				date_default_timezone_set ('Europe/Kiev');
				$date = date("Y-m-d H:i:s");
				$updateStatement = $db->update(array('last_seen' => $date))
						   ->table('users')
						   ->where('userId', '=', $forId['userId']);
				$affectedRows = $updateStatement->execute();
				$updateStatement2 = $db->update(array('isOnline' => 1))
							   ->table('profiles')
							   ->where('user', '=', $forId[0]['userId']);
				$exec = $updateStatement2->execute();

				$jwt = $this->generateToken($login, $forId[0]['userId'], $fname, $lname);
				$result->jwt = $jwt;
				$result->id = $forId[0]['userId'];
				return json_encode($result);
			} else {
				$result->err = "You did not register with facebook";
				return json_encode($result);
			}
		}
		return json_encode(false);
	}
}
