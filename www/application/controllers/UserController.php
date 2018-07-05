<?php

namespace application\controllers;

use application\components\Controller;
use application\components\View;
use application\components\Db;

class UserController extends Controller
{
	public function generateToken()
	{
		$token = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!$/()*";
		$token = str_shuffle($token);
		$token = substr($token, 0, 20);
		return $token;
	}

	static public function sendMail($mail_to, $mail_subject, $mail_message)
	{
		if ($mail_to != null && $mail_subject != null && $mail_message != null)
		{
			$encoding = "utf-8";
			$subject_preferences = array(
				"input-charset" => $encoding,
				"output-charset" => $encoding,
				"line-length" => 76,
				"line-break-chars" => "\r\n"
			);
			$from_name = "Matcha";
			$from_mail = "Matcha@love.com";
			// Mail header
			$header = "Content-type: text/html; charset=".$encoding." \r\n";
			$header .= "From: ".$from_name." <".$from_mail."> \r\n";
			$header .= "MIME-Version: 1.0 \r\n";
			$header .= "Content-Transfer-Encoding: 8bit \r\n";
			$header .= "Date: ".date("r (T)")." \r\n";
			$header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);
			//Send
			$res = mail($mail_to, $mail_subject, $mail_message, $header);
		}
		return $res;
	}

	public function loginAction()
	{
		if (isset($_POST['submit']) && isset($_POST['login']) && isset($_POST['passwd']))
		{
			$msg = "";
			$login = htmlspecialchars($_POST['login'], ENT_QUOTES);
			$passwd = $_POST['passwd'];
			if ($login != "" && $passwd != "")
			{
				$res = $this->model->extractUserByLogin($login);
				if ($res != null && password_verify($passwd, $res[0]['pass']) && $res[0]['isEmailConfirmed'] == 1)
					$this->model->authorize($login);
				else
					$msg = "Wrong login or password. In addition, check if your verify your email.";
			}
			else
				$msg = "Please fill login or password field";
			$arr['msg'] = $msg;
			$this->showMsg($arr);
			header('refresh:2; url=login');
		}
		else
			$this->view->render('');
		return true;
	}

	public function signinAction()
	{
		$msg = "";
		if (isset($_POST['submit']) && isset($_POST['login']) && isset($_POST['passwd']) && isset($_POST['cpasswd']) && isset($_POST['email']))
		{
			$login = htmlspecialchars($_POST['login'], ENT_QUOTES);
			$passwd = $_POST['passwd'];
			$cpasswd = $_POST['cpasswd'];
			$email = $_POST['email'];
			$wrongLogin = ($login == "" || strlen($login) < 5);
			$wrongPass = ($passwd == "" || $cpasswd != $passwd || strlen($passwd) < 7 || strlen($passwd) > 140 || preg_match("([A-Z]+)", $passwd) == false);
			$wrongEmail = ($email == "" || filter_var($email, FILTER_VALIDATE_EMAIL) == false);
			if ($wrongLogin || $wrongPass || $wrongEmail)
				$msg = "Check your inputs";
			else
			{
				$isLoginTaken = $this->model->extractUserByLogin($login);
				$isEmailTaken = $this->model->extractUsersByEmail($email);
				if (($isLoginTaken != null && $isLoginTaken[0]['isEmailConfirmed'] === '1') || ($isEmailTaken != null && $isEmailTaken[0]['isEmailConfirmed'] === '1'))
					$isLoginTaken != null ? $msg = 'This login has already taken' : $msg = 'This email has already registered';
				else
				{
					$token = $this->generateToken();
					$hashPass = password_hash($passwd, PASSWORD_BCRYPT);
					$sql = "INSERT INTO users (login,pass,email,isEmailConfirmed,token) VALUES ('$login', '$hashPass', '$email', '0', '$token')";
					$this->model->insertNewUser($sql);
					$base_url = 'http://localhost:8001/user/confirmEmail/';
					$mail_to = $_POST["email"];
					$mail_subject = 'Account varification';
					$mail_message = '
					<p>Hi '.$login.',</p>
					<p>Thanks for registration. In order to use your account at our site, please confirm your email by following this link: '.$base_url.'email_verification?login='.$login.'&activation_code='.$token.'</p>
					<p>Best Regards, Cramata</p>';
					$res = $this->sendMail($mail_to, $mail_subject, $mail_message);
					$res == true ? $msg = 'Success, check your email' : $msg = 'Something went wrong'; 
				}
			}       
			$arr['msg'] = $msg;
			$this->showMsg($arr);
			$msg == "Success, check your email" ? header('refresh:2; url=http://localhost:8001/home') : header('refresh:2; url=http://localhost:8001/user/signin');
		}
		elseif (isset($_SESSION['isUser']) === false)
			$this->view->render('');
		else
			$this->view->render('home');
		return true;
	}

	public function confirmEmailAction() 
	{
		$url = trim($_SERVER['REQUEST_URI'], '/');
		$tmp = strstr($url, 'email_verification');
		if ($tmp != null && isset($_GET['login']) && isset($_GET['activation_code']))
		{
			$msg = '';
			$login = htmlspecialchars($_GET['login'], ENT_QUOTES);
			$token = htmlspecialchars($_GET['activation_code'], ENT_QUOTES);
			if ($login != "" && $token != "")
			{
				$res = $this->model->extractUserByLogin($login);
				if ($res != null && $res[0]['token'] == $token)
				{
					$this->model->changeEmailStatus($login, 1);
					//Insert in db new email if user wants to change it
					if (isset($_SESSION['emailNew']))
					{
						$res = $this->model->changeEmail($login, $_SESSION['emailNew']);
						if ($res == true)
						{
							unset($_SESSION['emailNew']);
						}
						else
						{
							$msg = 'Oups, something went wrong';
						}
					}
					if ($msg != 'Oups, something went wrong')
					{
						$this->model->insertUserSubscription($login);
						$this->model->authorize($login);
					}
				}
			}
			else
			{
				$msg = 'Oups, something went wrong';
			}
			$arr['msg'] = $msg;
			$this->showMsg($arr);
		}
		else
		{
			View::errorCode(404);
			header('refresh:3; url=http://localhost:8001/user/login');
		}
	}

	public function resetPassAction()
	{
		if (isset($_POST['submit']) && isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) != false)
		{
			$user = $this->model->extractUsersByEmail($_POST['email']);
			if ($user != null)
			{
				//Mail
				$base_url = 'http://localhost:8100/user/resetPass';
				$mail_to = $_POST["email"];
				$mail_subject = 'Reset password';
				$mail_message = '
				<p>Hi '.$user[0]['login'].',</p>
				<p>In order to change your forgotten password, please, follow this link: '.$base_url.'/initial?email='.$_POST['email'].'&token='.$user[0]['token'].' . If you did not request it, just ignore this letter.</p>
				<p>Best Regards, Cramata</p>';
				$res = $this->sendMail($mail_to, $mail_subject, $mail_message);
				$res == true ? $msg = 'Check your email. We sent you a magic link.' : $msg = 'Something went wrong';
				$arr['msg'] = $msg;
				$this->showMsg($arr);
			}
		}
		else if (isset($_GET['token']) && isset($_GET['email']) && filter_var($_GET['email'], FILTER_VALIDATE_EMAIL) != false)
		{
			$user = $this->model->extractUsersByEmail($_GET['email']);
			if ($user != null && $user[0]['token'] == $_GET['token'])
			{
				$_SESSION['who_change_pass'] = $user[0]['login'];
				$this->view->render('user/resetPassAfter');
			}
		}
		else
		{
			$this->view->render('user/resetPass');
		}
	}

	public function resetPassAfterAction()
	{
		if (isset($_POST['submit']) && isset($_POST['passwd']) && isset($_SESSION['who_change_pass']))
		{
			$user = $_SESSION['who_change_pass'];
			$pass = $_POST['passwd'];
			$tmp = $this->model->extractUserByLogin($user);
			if ($tmp != null && $pass === $_POST['cpasswd'] && $pass != "" && $user != "" && preg_match("([A-Z]+)", $pass))
			{
				if (password_verify($pass, $tmp[0]['pass']))
				{
					$msg = 'New password should differ from old one';
					$arr['msg'] = $msg;
					$this->showMsg($arr);
				}
				else
				{
					$hashPass = password_hash($pass, PASSWORD_BCRYPT);
					$token = $this->generateToken();
					$res = $this->model->changePass($token, $user, $hashPass);
					if ($res == true)
					{
						unset($_SESSION['who_change_pass']);
						$mail_to = $tmp[0]['email'];
						$mail_subject = 'Reset password';
						$mail_message = '
							<p>Hi '.$user.',</p>
							<p>You successfully changed your password.</p>
							<p>Best Regards, Cramata</p>';
						$res = $this->sendMail($mail_to, $mail_subject, $mail_message);
						$this->model->authorize($user);
					}
					else
					{
						$msg = 'Something went wrong';
						$arr['msg'] = $msg;
						$this->showMsg($arr);
					}
				}
			}
		}
	}

	public function logoutAction()
	{
		if (isset($_SESSION['isUser']))
		{
			unset($_SESSION['authorizedUser']);
			unset($_SESSION['isUser']);
			session_destroy();
			header('location: http://localhost:8100/home');
		}
		else
		{
			View::errorCode(404);
			header('refresh:3; url=http://localhost:8001/user/login');
		}
	}

	public function changeUserDataAction()
	{
		if (isset($_SESSION['isUser']))
		{
			$logout = false;
			if(isset($_POST['Submit']))
			{
				$trick = 0;
				$msg = '';
				//if user wants to CHANGE LOGIN
				if(($_POST['loginNew']) !== '')
				{
					if(isset($_SESSION['authorizedUser']) && strlen($_POST['loginNew']) >= 5 && strlen($_POST['loginNew']) <= 30)
					{
						$newLogin = htmlspecialchars($_POST['loginNew'], ENT_QUOTES);
						$isTaken = $this->model->extractUserByLogin($newLogin);
						if ($_SESSION['authorizedUser'] != $newLogin && $isTaken == null)
						{
							if($this->model->changeLogin($_SESSION['authorizedUser'], $newLogin) == true)
							{
								$msg = 'Successfully changed login.';
								$params = array("login" => $newLogin, "checkLogin" => "yes");
								if ($this->model->checkSubscription($params) === true)
								{
									$tmp = $this->model->extractUserByLogin($newLogin);
									$mail_to = $tmp[0]['email'];
									$mail_subject = 'Login change';
									$mail_message = '
									<p>Hi '.$_SESSION['authorizedUser'].',</p>
									<p>You successfully changed your login to '.$newLogin.'.</p>
									<p>Best Regards, Cramata</p>';
									$res = $this->sendMail($mail_to, $mail_subject, $mail_message);
								}
								$_SESSION['authorizedUser'] = $newLogin;
							}
							else
							{
								$msg = 'Oups, please try again later';
							}
						}
						else
						{
							$isTaken == null ? $msg = 'New login should differ from old one' : $msg = 'This login has already taken, pls come up with another one';
						}
					}
					else
					{
						$msg = 'New login should be longer then 4 chars and shorter then 31 chars';
					}
					$trick++;
				}
				//if user wants to CHANGE PASSWORD
				if(($_POST['passwdNew']) !== '')
				{
					if(isset($_SESSION['authorizedUser']) && strlen($_POST['passwdNew']) >= 7 && strlen($_POST['passwdNew']) <= 140)
					{
						$tmp = $this->model->extractUserByLogin($_SESSION['authorizedUser']);
						if(password_verify($_POST['passwdNew'], $tmp[0]['pass']) === false)
						{
							$token = $this->generateToken();
							if ($this->model->changePass($token, $_SESSION['authorizedUser'], $_POST['passwdNew']) == true)
							{
								$msg == "" ? $msg = 'Successfully changed password.' : $msg = $msg.'<br>Successfully changed password.';
								$params = array("login" => $_SESSION['authorizedUser'],
									"checkPass" => "yes");
								if ($this->model->checkSubscription($params) === true)
								{
									$mail_to = $tmp[0]['email'];
									$mail_subject = 'Password change';
									$mail_message = '
									<p>Hi '.$tmp[0]['login'].',</p>
									<p>You successfully changed your password.</p>
									<p>Best Regards, Cramata</p>';
									$res = $this->sendMail($mail_to, $mail_subject, $mail_message);
								}
							}
							else
							{
								$msg == "" ? $msg = 'Oups, please try again later' : $msg = $msg.'<br>Oups, please try to change password again later';
							}
						}
						else
						{
							if ($msg == '')
								$msg = 'New password should differ from old one';
							else
								$msg = $msg.'<br>New password should differ from old one';
						}
					}
					else
						$msg == "" ? 'New password should be longer then 6 chars and shorter then 141 chars' : $msg = $msg.'<br>New password should be longer then 6 chars and shorter then 141 chars';
					$trick++;
				}
				//if user wants to CHANGE EMAIL
				if($_POST['emailNew'] !== '')
				{
					if (isset($_SESSION['authorizedUser']) && filter_var($_POST['emailNew'], FILTER_VALIDATE_EMAIL))
					{
						$isEmailTaken = $this->model->extractUsersByEmail($_POST['emailNew']);
						$tmp = $this->model->extractUserByLogin($_SESSION['authorizedUser']);
						if ($isEmailTaken == null || (int)($isEmailTaken[0]['isEmailConfirmed']) == 0)
						{
							$this->model->changeEmailStatus($_SESSION['authorizedUser'], 0);
			                $token = $this->generateToken();
			                $this->model->changeToken($_SESSION['authorizedUser'], $token);
			                $base_url = 'http://localhost:8100/user/confirmEmail/';
			                $mail_to = $tmp[0]['email'].", ".$_POST['emailNew'];
			                $mail_subject = 'Email change';
			                $mail_message = '
			                 <p>Hi '.$tmp[0]['login'].',</p>
			                 <p>In order to finish email change, please follow this link: '.$base_url.'email_verification?login='.$tmp[0]['login'].'&activation_code='.$token.' .</p>
			                 <p>Best Regards, Cramata</p>';
			                $res = $this->sendMail($mail_to, $mail_subject, $mail_message);
		                	unset($_SESSION['authorizedUser']);
							unset($_SESSION['isUser']);
							session_destroy();
							$logout = true;
			                if ($res == true)
			                {
			                    $_SESSION['emailNew'] = $_POST['emailNew'];
			                    $msg == "" ? $msg = 'We sent you a magic link. Please follow it in order to complite changing your email' : $msg = $msg.'<br>We sent you a magic link. Please follow it in order to complite changing your email';
			                }
			                else
			                {
			                    $msg == "" ? $msg = 'Oups, please try again later' : $msg = $msg.'<br>Oups, please try change email again later';
			                }
						}
						else
						{
							$msg == "" ? $msg = 'Your new email has already taken' : $msg = $msg.'<br>Your new email has already taken';
						}
					}
					else
						$msg == "" ? $msg = 'Please enter valid email' : $msg = $msg.'<br>Please enter valid email';
					$trick++;
				}
				if($trick === 0)
					header('location: http://localhost:8001/user/cabinet');
				$arr['msg'] = $msg;
				if ($msg != '')
				{
					$this->showMsg($arr);
				}
			}
			if ($logout === true)
				header('refresh:3; url=http://localhost:8001/home');
			else
				header('refresh:3; url=http://localhost:8001/user/cabinet');
		}
		else
		{
			View::errorCode(404);
			header('refresh:3; url=http://localhost:80001/user/login');
		}
	}

	public function showMsg($arr)
	{
	   $this->view->render('user/showMsg', $arr);
	}

	public function cabinetAction()
	{
		if (isset($_SESSION['isUser']))
		{
			$userPics = $this->model->extractUsersPics($_SESSION['authorizedUser']);
			$this->view->render('user/cabinet', $userPics);
		}
		else
		{
			View::errorCode(404);
			header('refresh:3; url=http://localhost:8001/user/login');
		}
	}

	public function changeSubscriptionAction()
	{
		if (isset($_SESSION['authorizedUser']))
		{
			$tmp = $this->model->extractUserByLogin($_SESSION['authorizedUser']);
			$user_id = $tmp[0]['id'];
			$user_sub = $this->model->getSubscriptionPreferences($user_id);
			if (isset($_GET["login"]) || isset($_GET["pass"]) || isset($_GET["comment"]))
			{
				$this->model->changeSubscriptionPreferences($_GET, $user_sub);
			}
			$userPics = $this->model->extractUsersPics($_SESSION['authorizedUser']);
			header('location: http://localhost:8100/user/cabinet');
		}
		else
		{
			View::errorCode(404);
			header('refresh:3; url=http://localhost:8001/user/login');
		}
	}
}