<?php

namespace App\Controllers;
use App\Models\Model;
use App\Mail\SendMail;
use App\Controllers\SearchController;

class UserController extends Controller
{
	public function postCheckProfileIsFull($request, $response)
	{
		$userId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		if (isset($fromDb['isFull']))
		{
			if ($fromDb['isFull'] === 0)
				return json_encode(false);
			else
				return json_encode(true);				
		}
		else
		{
			$result->error = 'You did not confirm your email';
			return json_encode($result);	
		}
	}

	public function postGetAllInfo($request, $response)
	{
		$userId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->join('profiles', 'users.userId', '=', 'profiles.user')->where('userId', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		$result->userData = $fromDb;
		$result->whoLikesUser = $this->whoLikesMe($userId);
		return json_encode($result);
	}

	public function postGetAllPhoto($request, $response)
	{
		$userId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('photos')->where('userNbr', '=', $userId);
		$sql = $sql->orderBy('whenAdd', 'DESC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$photos = array();
		foreach ($fromDb as $key => $photo) {
			array_push($photos, $photo['src']);
		}
		$result->userPhoto = $photos;
		return json_encode($result);
	}

	public function postWhoViewMe($request, $response)
	{
		$userId = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('views')->join('users', 'users.userId', '=', 'views.whoView')->join('profiles', 'views.whoView', '=', 'profiles.user')->where('target', '=', $userId);
		$sql = $sql->orderBy('whenView', 'DESC');
		$exec = $sql->execute();
		$forSearch = $exec->fetchAll();

		$sql2 = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec2 = $sql2->execute();
		$myData = $exec2->fetch();

		$sql3 = $db->select()->from('blocks')->where('whoBlock', '=', $userId);
		$exec3 = $sql3->execute();
		$myBlocks = $exec3->fetchAll();
		$viewMe = array();
		$i = 0;
		foreach ($forSearch as $key => $value) {
			if ($myData['sexPref'] == 'homo')
			{
				if (($myData['sex'] == $value['sex'] && $value['sexPref'] == 'homo') || $value['sexPref'] == 'bi')
				{
					$viewMe[$i] = array('uId' => $value['userId'], 'login' => $value['login'], 'fname' => $value['fname'], 'lname' => $value['lname'], 'age' => $value['age'], 'sex' => $value['sex'], 'sexPref' => $value['sexPref'], 'fameRate' => $value['fameRate'], 'stars' => $value['stars'], 'profilePic' => $value['profilePic'], 'isOnline' => boolval($value['isOnline']), 'lastSeen' => $value['last_seen']);
					$i++;
				}
			}
			else if ($myData['sexPref'] == 'hetero')
			{
				if (($myData['sex'] != $value['sex'] && $value['sexPref'] == 'hetero') || $value['sexPref'] == 'bi')
				{
					$viewMe[$i] = array('uId' => $value['userId'], 'login' => $value['login'], 'fname' => $value['fname'], 'lname' => $value['lname'], 'age' => $value['age'], 'sex' => $value['sex'], 'sexPref' => $value['sexPref'], 'fameRate' => $value['fameRate'], 'stars' => $value['stars'], 'profilePic' => $value['profilePic'], 'isOnline' => boolval($value['isOnline']), 'lastSeen' => $value['last_seen']);
					$i++;
				}
			}
			else
			{
				$viewMe[$i] = array('uId' => $value['userId'], 'login' => $value['login'], 'fname' => $value['fname'], 'lname' => $value['lname'], 'age' => $value['age'], 'sex' => $value['sex'], 'sexPref' => $value['sexPref'], 'fameRate' => $value['fameRate'], 'stars' => $value['stars'], 'profilePic' => $value['profilePic'], 'isOnline' => boolval($value['isOnline']), 'lastSeen' => $value['last_seen']);
				$i++;
			}
		}
		if (count($myBlocks) != 0)
		{
			foreach ($myBlocks as $v) {
				foreach ($viewMe as $key => $view) {
					if ($view['uId'] == $v['target'])
					{
						unset($viewMe[$key]);
						$viewMe = array_values($viewMe);
					}
				}
			}
		}
		$sql4 = $db->select()->from('scammers');
		$exec4 = $sql4->execute();
		$scammers = $exec4->fetchAll();
		if (count($scammers) != 0)
		{
			foreach ($scammers as $scam) {
				foreach ($viewMe as $key => $view) {
					if ($view['uId'] == $scam['target'])
					{
						unset($viewMe[$key]);
						$viewMe = array_values($viewMe);
					}
				}
			}
		}

		$res->views = $viewMe;
		$res->fromDb = $forSearch;
		$res->myData = $myData;
		$res->myBlocks = $myBlocks;		

		return json_encode($res);
	}

	public function whoLikesMe($userId)
	{
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('likes')->join('users', 'users.userId', '=', 'likes.who')->join('profiles', 'users.userId', '=', 'profiles.user')->where('target', '=', $userId)->orderBy('whenLike', 'DESC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();

		//get my data to comper my preferences
		$sql2 = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec2 = $sql2->execute();
		$myData = $exec2->fetch();

		//get everybody this user blocked to comper and delet them from result
		$sql3 = $db->select()->from('blocks')->where('whoBlock', '=', $userId);
		$exec3 = $sql3->execute();
		$myBlocks = $exec3->fetchAll();

		//get all scamers to comper and delet them from result
		$sql4 = $db->select()->from('scammers');
		$exec4 = $sql4->execute();
		$scammers = $exec4->fetchAll();

		$likesMeProfiles = array();
		$i = 0;

		foreach ($fromDb as $key => $profile) {
			if ($myData['sexPref'] == 'homo') {
				if (($myData['sex'] == $profile['sex'] && $profile['sexPref'] == 'homo') || $profile['sexPref'] == 'bi') {
					$likesMeProfiles[$i] = array('uId' => $profile['userId'], 'fname' => $profile['fname'], 'lname' => $profile['lname'], 'age' => $profile['age'], 'sex' => $profile['sex'], 'sexPref' => $profile['sexPref'], 'fameRate' => $profile['fameRate'], 'stars' => $profile['stars'], 'isOnline' => boolval($profile['isOnline']), 'lastSeen' => $profile['last_seen'], 'profilePic' => $profile['profilePic']);
					$i++;
				}
			} else if ($myData['sexPref'] == 'hetero') {
				if (($myData['sex'] != $profile['sex'] && $profile['sexPref'] == 'hetero') || $profile['sexPref'] == 'bi') {
					$likesMeProfiles[$i] = array('uId' => $profile['userId'], 'fname' => $profile['fname'], 'lname' => $profile['lname'], 'age' => $profile['age'], 'sex' => $profile['sex'], 'sexPref' => $profile['sexPref'], 'fameRate' => $profile['fameRate'], 'stars' => $profile['stars'], 'isOnline' => boolval($profile['isOnline']), 'lastSeen' => $profile['last_seen'], 'profilePic' => $profile['profilePic']);
					$i++;
				}
			} else {
				$likesMeProfiles[$i] = array('uId' => $profile['userId'], 'fname' => $profile['fname'], 'lname' => $profile['lname'], 'age' => $profile['age'], 'sex' => $profile['sex'], 'sexPref' => $profile['sexPref'], 'fameRate' => $profile['fameRate'], 'stars' => $profile['stars'], 'isOnline' => boolval($profile['isOnline']), 'lastSeen' => $profile['last_seen'], 'profilePic' => $profile['profilePic']);
				$i++;
			}
		}
		if (count($myBlocks) != 0)
		{
			foreach ($myBlocks as $v) {
				foreach ($likesMeProfiles as $key => $like) {
					if ($like['uId'] == $v['target'])
					{
						unset($likesMeProfiles[$key]);
						$likesMeProfiles = array_values($likesMeProfiles);
					}
				}
			}
		}
		if (count($scammers) != 0)
		{
			foreach ($scammers as $scam) {
				foreach ($likesMeProfiles as $key => $like) {
					if ($like['uId'] == $scam['target'])
					{
						unset($likesMeProfiles[$key]);
						$likesMeProfiles = array_values($likesMeProfiles);
					}
				}
			}
		}
		return $likesMeProfiles;
	}

	public function postRecordInfo($request, $response)
	{
		$userId = $request->getParam('uId');
		$login = $request->getParam('login');
		$pass = $request->getParam('pass');
		$fname = ucfirst(strtolower(($request->getParam('fname'))));
		$lname = ucfirst(strtolower(($request->getParam('lname'))));
		$email = $request->getParam('email');
		$age = $request->getParam('age');
		$sex = $request->getParam('sex');
		$sexPref = $request->getParam('sexPref');
		
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('users')->join('profiles', 'users.userId', '=', 'profiles.user')->where('userId', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();

		$res->allResFromDb = $fromDb['login'];

		if ($login != '')
		{
			$login = htmlspecialchars($login);
			$wrongLogin = (strlen($login) <= 4 || strlen($login) >= 120);
			if ($wrongLogin)
			{
				$res->eLogin = 'New login should be longer than 4 chars and shorter than 120';
				$login = $fromDb['login'];
			}
		} else {
			$login = $fromDb['login'];
		}
		// $res->login = $login;

		if ($pass != '')
		{
			$pass = htmlspecialchars($pass);
			$wrongPass = (strlen($pass) <= 6 || strlen($pass) >= 120 || preg_match("(.*[A-Z].*)", $request->getParam('pass')) == false || password_verify($request->getParam('pass'), $fromDb['password']));
			if ($pass)
			{
				$res->ePass = 'New password should be longer than 6 chars and shorter than 120, have at least 1 uppercase letter and differ from old one';
				$pass = $fromDb['password'];
			}
			else
				$pass = password_hash($pass, PASSWORD_DEFAULT);
		} else {
			$pass = $fromDb['password'];
		}

		// $res->pass = $pass;

		if ($email != '')
		{
			if (strlen($email) >= 120)
			{
				$res->eEmail = 'Email should not be empty or longer than 120 chars';
				$email = $fromDb['email'];
			}
		} else {
			$email = $fromDb['email'];
		}

		if ($fname != '') {
			$wrongFname = (strlen($fname) <= 1 || strlen($fname) >= 120 || !ctype_alpha($fname));
			if ($wrongFname)
			{
				$res->eFname = 'First name should consists at least 2 chars, be less than 120 and can contain only english letters';
				$fname = $fromDb['fname'];
			}
		} else {
			$fname = $fromDb['fname'];
		}
		// $res->fname = $fname;
		
		if ($lname != '') {
			$wrongLname = (strlen($lname) <= 1 || strlen($lname) >= 120 || !ctype_alpha($lname));
			if ($wrongLname)
			{
				$res->eLname = 'Last name should consists at least 2 chars, be less than 120 and can contain only english letters';
				$fname = $fromDb['lname'];
			}
		} else {
			$lname = $fromDb['lname'];
		}
		// $res->lname = $lname;

		if ($age != '')
		{
			$birthDate = explode("-", $age);
			$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[2], $birthDate[1], $birthDate[0]))) > date("md")
				? ((date("Y") - $birthDate[0]) - 1)
				: (date("Y") - $birthDate[0]));
			if ($age < 18 || $age > 120)
				$res->eAge = "Oups, you can not be younger than 18 or so old";
		} else {
			$age = $fromDb['age'];
		}
		// $res->age = $age;

		if ($sex == '')
			$sex = $fromDb['sex'];
		// $res->sex = $sex;

		if ($sexPref == '')
			$sexPref = $fromDb['sexPref'];
		// $res->sexPref = $sexPref;

		$updateStatement = $db->update(array('login' => $login, 'password' => $pass, 'email' => $email, 'fname' => $fname, 'lname' => $lname))
						   ->table('users')
						   ->where('userId', '=', $userId);
		$updateStatement->execute();
		$updateStatement = $db->update(array('age' => $age, 'sex' => $sex, 'sexPref' => $sexPref))->table('profiles')->where('user', '=', $userId);
		$updateStatement->execute();
		$sql = $db->select()->from('users')->join('profiles', 'users.userId', '=', 'profiles.user')->where('userId', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		foreach ($fromDb as $key => $value) {
			if ($value == '' && $key != 'showMe' && $key != 'isOnline')
				$isFull = 0;
			else
				$isFull = 1;
		}
		$updateStatement = $db->update(array('isFull' => $isFull))
						   ->table('profiles')
						   ->where('user', '=', $userId);
		$updateStatement->execute();
		$res->profileIsFull = $isFull;
		$res->newData = $fromDb;
		return json_encode($res);
	}

	public function postForAbout($request, $response)
	{
		$userId = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$selectStatement = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $selectStatement->execute();
		$fromDb = $exec->fetch();
		$res->tags = $fromDb['tags'];
		$res->bio = $fromDb['bio'];
		return json_encode($res);
	}

	public function postRecordAbout($request, $response)
	{
		$userId = $request->getParam('uId');
		$userTags = $request->getParam('tags');
		$userBio = $request->getParam('bio');
		$db = new Model;
		$db = $db->connect();
		$selectStatement = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $selectStatement->execute();
		$fromDb = $exec->fetch();
		$userTagsInit = $fromDb['tags'];
		$colTagDb = explode(' ', $fromDb['tags']);
		$sendTags = explode(' ', $userTags);
		$colForRecord = 50 - count($colTagDb);
		if(count($colTagDb) < 50)
		{
			foreach ($sendTags as $key => $toCheck) {
				if ($key > $colForRecord)
					break ;
				$toCheck = preg_replace('/[^\w#& ]/', '', $toCheck);
				if (strstr($userTagsInit, $toCheck) === false && strstr($tagMayAdd, $toCheck) === false){
					$tagMayAdd == "" ? $tagMayAdd = $toCheck : $tagMayAdd = $tagMayAdd . ' ' . $toCheck;
				}
			}
			$tagMayAdd == '' ? $userTags = $userTagsInit : $userTags = $userTagsInit . ' ' . $tagMayAdd;
		}
		else
		{
			$userTags = $userTagsInit;
			$res->err = "Would you be so kind be less specific. You may add up to 50 tags";
		}
		$userBio === "" ? $userBio = $fromDb['bio'] : $userBio = $userBio;

		$updateStatement = $db->update(array('bio' => $userBio, 'tags' => $userTags))
								   ->table('profiles')
								   ->where('user', '=', $userId);
		$exec = $updateStatement->execute();

		$selectStatement = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $selectStatement->execute();
		$fromDb = $exec->fetch();
		$res->end = true;
		if ($fromDb['bio'] === "")
			$res->bio = "";
		else
			$res->bio = $fromDb['bio'];
		if ($fromDb['tags'] === "")
			$res->tags = "";
		else
			$res->tags = $fromDb['tags'];
		return json_encode($res);
	}

	public function postNewPhoto($request, $response)
	{
		$userId = $request->getParam('userId');
		//check if no more 5 photo
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('photos')->where('userNbr', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		if (count($fromDb) < 5)
		{
			$photo = $request->getParam('file');
			if (strstr($photo, 'data:image/jpeg;base64,'))
				$img = str_replace('data:image/jpeg;base64,', '', $photo);
			else
				$img = str_replace('data:image/png;base64,', '', $photo);
			$img = str_replace(' ', '+', $img);
			$img = base64_decode($img);
			//for name file
			$str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
			$str = str_shuffle($str);
			$picName = substr($str, 0, 10);
			$fileName = ROOT.'/userPhoto/'.$picName.'.png';
			$fileNameForDb = 'http://localhost:8080/userPhoto/'.$picName.'.png';
			//record in file
			file_put_contents($fileName, $img);
			//insert in db new user photo
			$sql = $db->insert(array('userNbr', 'src'))
						   ->into('photos')
						   ->values(array($userId, $fileNameForDb));
			$sql->execute(false);			
			//for returning new arr pics on front
			$sql = $db->select()->from('photos')->where('userNbr', '=', $userId);
			$sql = $sql->orderBy('whenAdd', 'DESC');
			$exec = $sql->execute();
			$fromDb = $exec->fetchAll();
			$photos = array();
			foreach ($fromDb as $key => $photo) {
				array_push($photos, $photo['src']);
			}
			$result->userPhoto = $photos;
			return json_encode($result);
		}
			// return json_encode($result);

		return json_encode(false);
	}

	public function postDelPhoto($request, $response)
	{
		$target = $request->getParam('pic');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->delete()->from('photos')->where('src', '=', $target);
		$exec = $sql->execute();
		//check if avatar and erise this cell in table
		$sql = $db->select()->from('profiles')->where('profilePic', '=', $target);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		if (count($fromDb))
		{
			$sql = $db->delete()->from('profiles')->where('profilePic', '=', $target);
			$exec = $sql->execute();
		}
		//return new array pics to re render on front
		$sql = $db->select()->from('photos')->where('userNbr', '=', $request->getParam('userId'));
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$photos = array();
		foreach ($fromDb as $key => $photo) {
			array_push($photos, $photo['src']);
		}
		$result->userPhoto = $photos;
		return json_encode($result);
	}

	public function postSetAvatar($request, $response)
	{
		$ava = $request->getParam('ava');
		$userId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$updateStatement = $db->update(array('profilePic' => $ava))
								   ->table('profiles')
								   ->where('user', '=', $userId);
		$exec = $updateStatement->execute();
		$res->src = $ava;
		return json_encode($res);
	}

	public function postDellTag($request, $response)
	{
		$userId = $request->getParam('uId');
		$tagToDel = $request->getParam('what');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		$allTags = explode(' ', $fromDb['tags']);
		if (($key = array_search($tagToDel, $allTags)) !== false) {
			unset($allTags[$key]);
		}
		$allTagsFinal = implode(' ', $allTags);
		$updateStatement = $db->update(array('tags' => $allTagsFinal))
								   ->table('profiles')
								   ->where('user', '=', $userId);
		$exec = $updateStatement->execute();
		$res->tags = $allTagsFinal;
		return json_encode($res);
	}

	public function postReturnCoord($request, $response)
	{
		$userId = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('profiles')->where('user', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		$res->latStart = $fromDb['latitude'];
		$res->lngStart = $fromDb['longetude'];
		$res->show = boolval($fromDb['showMe']);
		return json_encode($res);
	}

	public function postLocation($request, $response)
	{
		$userId = $request->getParam('uId');
		$long1 = $request->getParam('longAllow');
		$long2 = $request->getParam('longDen');
		$lat1 = $request->getParam('latAllow');
		$lat2 = $request->getParam('latDen');
		$show = $request->getParam('showMe');
		$db = new Model;
		$db = $db->connect();
		if ($long1 && $lat1)
		{
			$updateStatement = $db->update(array('longetude' => floatval($long1), 'latitude' => floatval($lat1)))->table('profiles')->where('user', '=', $userId);
			$exec = $updateStatement->execute();
			$res->latAllow = $lat1;
			$res->lngAllow = $long1;
		}
		if ($long2 && $lat2)
		{
			$selectStatement = $db->select()->from('profiles')->where('user', '=', $userId);
			$exec = $selectStatement->execute();
			$fromDb = $exec->fetch();
			if ($fromDb['longetude'] == null || $fromDb['longetude'] == 0)
			{
				$updateStatement = $db->update(array('longetude' => floatval($long2), 'latitude' => floatval($lat2)))->table('profiles')->where('user', '=', $userId);
				$exec = $updateStatement->execute();
			}
			$res->latDen = $lat2;
			$res->lngDen = $long2;
		}
		if ($show !== '' && $show !== undefined && $show !== null)
		{
			$updateStatement = $db->update(array('showMe' => $show))->table('profiles')->where('user', '=', $userId);
			$exec = $updateStatement->execute();
		}
		return json_encode($res);
	}

	public function updateRate($target)
	{
		$db = new Model;
		$db = $db->connect();

			$selectView = $db->select()->from('views')->where('target', '=', $target);
			$selectView = $selectView->execute();
			$colViewDb = count($selectView->fetchAll());
			$colViewDb > 10 ? $colView = 10 : $colView = $colViewDb;

			$selectLike = $db->select()->from('likes')->where('target', '=', $target);
			$selectLike = $selectLike->execute();
			$colLikeDb = count($selectLike->fetchAll());
			$colLikeDb > 10 ? $colLike = 10 : $colLike = $colLikeDb;

			$selectMatch = $db->select()->from('matches')->where('partner1', '=', $target)->orWhere('partner2', '=', $target);
			$selectMatch = $selectMatch->execute();
			$colMatchDb = count($selectMatch->fetchAll());
			$colMatchDb > 10 ? $colMatch = 10 : $colMatch = $colMatchDb;
		//general formula
		//Famerate is plane sum views, likes, matches. 1 star values 10 points. by default you have 1 star. max you may have 5 stars(points can be more, it is sum stored in famerate). view max number 10, it is equval 100%, like same, match max number 20. you may have more then this quantaty but it still will give you up to 100%. count percentage for each category which influense your fame reting, find medium number, multiply by 40 + default 10 points devide on 5 and get stars quantety.
		$stars1 = ((($colView * 10 + $colLike * 10 + ($colMatch * 10 * 2)) / 300) * 40 + 10) / 10;
		$stars2 = round($stars1, 1, PHP_ROUND_HALF_UP);
		$stars = (ceil($stars2 / 0.5) * 0.5);
		$fameRate = $colViewDb + $colLikeDb + ($colMatchDb * 2) + 10;
		$updateStatement = $db->update(array('fameRate' => $fameRate, 'stars' => $stars))
                           ->table('profiles')
                           ->where('user', '=', $arr['target']);
		$updateStatement->execute();
		return array('stars' => $stars, 'fameRate'=>$fameRate);
	}

	public function returnGuestInfo($request, $response)
	{
		$userId = $request->getParam('uId');
		$target = $request->getParam('target');

		$db = new Model;
		$db = $db->connect();
        $sql0 = $db->select()->from('users')->where($userId, '=', 'userId');
        $exec0 = $sql0->execute();
        $fromDb0= $exec0->fetchAll();
		$sql = $db->select()->from('photos')->where('userNbr', '=', $target);
		$sql = $sql->orderBy('whenAdd', 'DESC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$photos = array();
		foreach ($fromDb as $key => $photo) {
			array_push($photos, $photo['src']);
		}
		$result->userPhoto = $photos;

		$sql2 = $db->select()->from('views')->where('whoView', '=', $userId)->where('target', '=', $target);
		$exec2 = $sql2->execute();
		$fromDb2 = $exec2->fetch();

		//update table views, change targets fame rate
		if (count($fromDb2) == 0){
			date_default_timezone_set ('Europe/Kiev');
			$date = date('Y-m-d G:i:s');
			$insertStatement = $db->insert(array('whoView', 'target', 'whenView'))
							   ->into('views')
							   ->values(array($userId, $target, $date));
			$insertView = $insertStatement->execute(false);
			$updatedRate = $this->updateRate($target);
		}

		$sql3= $db->select()->from('users')->join('profiles', 'users.userId', '=', 'profiles.user')->where('userId', '=', $target);
		$exec3 = $sql3->execute();
		$forSearch = $exec3->fetch();

//		$result->distance = round(getDistance( $fromDb0['latitude'], $fromDb0['longetude'], $forSearch['latitude'] , $forSearch['longetude']));   DODELAT KM!

		$userData = array('login' => $forSearch['login'], 'fname' => $forSearch['fname'], 'lname' => $forSearch['lname'], 'age' => $forSearch['age'], 'sex' => $forSearch['sex'], 'sexPref' => $forSearch['sexPref'], 'stars' => $forSearch['stars'], 'profilePic' => $forSearch['profilePic'], 'isOnline' => boolval($forSearch['isOnline']), 'lastSeen' => $forSearch['last_seen'], 'bio' => $forSearch['bio'], 'tags' => $forSearch['tags'], 'stars' => $forSearch['stars']);
		$result->userData = $userData;
		$sql4 = $db->select()->from('likes')->where('who', '=', $target)->where('target', '=', $userId);
		$exec4 = $sql4->execute();
		$isLike = $exec4->fetch();
		$isLike == 0 ? $result->isLike = false : $result->isLike = true;
		//change db table and do working function
		$sql5 = $db->select()->from('matches')->where('partner1', '=', $userId)->orWhere('partner2', '=', $userId);
		$exec5 = $sql5->execute();
		$isMatch = $exec5->fetchAll();
		$result->isMatch = false;
		foreach ($isMatch as $key => $pair) {
			if ($pair['partner1'] == $target || $pair['partner2'] == $target)
			{
				$result->isMatch = true;
				break ;
			}
		}
		return json_encode($result);
	}

	public function getInfoForNotification($who)
	{
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('profiles')->join('users', 'profiles.user', '=', 'users.userId')->where('user', '=', $who);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		$name = $fromDb['fname'].' '.$fromDb['lname'];
		$result = array('fromName' => $name, 'fromPic' => $fromDb['profilePic']);
		return $result;
	}

	public function postLike($request, $response)
	{
		$id = $request->getParam('uId');
		$target = $request->getParam('target');

		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('likes')->where('who', '=', $id);
		$sql = $sql->having('target', '=', $target);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		if (count($fromDb) == 0)
		{
			date_default_timezone_set ('Europe/Kiev');
			$date = date('Y-m-d G:i:s');
			$sql = $db->insert(array('who', 'target', 'whenLike'))
						   ->into('likes')
						   ->values(array($id, $target, $date));
			$sql->execute(false);
			$res->msg = "Added to favorite";
			$res->check = true;
			//check if need add to match
			$isMatch = $db->select()->from('likes')->where('who', '=', $target)->where('target', '=', $id);
			$exec1 = $isMatch->execute();
			$match = $exec1->fetch();
			if ($match != 0)
			{
				$matchInsert = $db->insert(array('partner1', 'partner2'))
						   ->into('matches')
						   ->values(array($id, $target));
				$matchInsert->execute(false);
				$res->match = array('partner1' => $id, 'partner2' => $target);
			}
			$updatedRate = $this->updateRate($target);
		}
		else
		{
			$sql = $db->delete()->from('likes')->where('who', '=', $id)->where('target', '=', $target);
			$exec = $sql->execute();
			$matchDel = $db->delete()->from('matches')->where('partner1', '=', $id)->where('partner2', '=', $target);
			$exec1 = $matchDel->execute();
			$res->removedMatch1 = $exec1;
			$matchDel2 = $db->delete()->from('matches')->where('partner1', '=', $target)->where('partner2', '=', $id);
			$exec2 = $matchDel2->execute();
			$res->removedMatch2 = $exec2;

			$updatedRate = $this->updateRate($target);
			$res->msg = "Removed from favorite";
			$res->check = false;
		}
		$tmp = $this->getInfoForNotification($id);
		$res->fromWhoName = $tmp['fromName'];
		$res->fromWhoPic = $tmp['fromPic'];
		return json_encode($res);
	}

	public function postBlock($request, $response)
	{
		$id = $request->getParam('uId');
		$target = $request->getParam('target');

		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('blocks')->where('whoBlock', '=', $id);
		$sql = $sql->having('target', '=', $target);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		// $res->check2 = 'who ' . $id . ' target ' . $target;
		// $res->check3 = $fromDb;

		if (count($fromDb) == 0)
		{
			date_default_timezone_set ('Europe/Kiev');
			$date = date('Y-m-d G:i:s');
			$sql = $db->insert(array('whoBlock', 'target', 'whenBlock'))
						   ->into('blocks')
						   ->values(array($id, $target, $date));
			$sql->execute(false);
			$res->msg = "You blocked this user";
			$res->check = false;
		}
		else
		{
			$sql = $db->delete()->from('blocks')->where('whoBlock', '=', $id)->where('target', '=', $target);
			$exec = $sql->execute();
			$res->msg = "You unblocked this user";
			$res->check = true;
		}
		return json_encode($res);
	}

	public function postScammer($request, $response)
	{
		$id = $request->getParam('uId');
		$target = $request->getParam('target');

		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('scammers')->where('whoReported', '=', $id);
		$sql = $sql->having('target', '=', $target);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		if (count($fromDb) == 0)
		{
			$sql = $db->insert(array('whoReported', 'target'))
						   ->into('scammers')
						   ->values(array($id, $target));
			$sql->execute(false);
			$res->msg = "You reported this user as a scammer";
			$res->check = false;
			return json_encode($res);
		}
		else
		{
			$sql = $db->delete()->from('scammers')->where('whoReported', '=', $id)->where('target', '=', $target);
			$exec = $sql->execute();
			$res->msg = "You decline your report";
			$res->check = true;
			return json_encode($res);
		}
	}

	public function postReturnBlocks($request, $response)
	{
		$id = $request->getParam('uId');

		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('blocks')->join('profiles', 'blocks.target', '=', 'profiles.user')->join('users', 'profiles.user', '=', 'users.userId')->where('whoBlock', '=', $id)->orderBy('whenBlock', 'DESC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$blocks = array();
		foreach ($fromDb as $key => $block) {
			$blocks[$key] = array('uId' => $block['userId'], 'profilePic' => $block['profilePic'], 'fname' => $block['fname'], 'lname' => $block['lname'], 'sex' => $block['sex'], 'sexPref' => $block['sexPref'], 'age' => $block['age'], 'lastSeen' => $block['last_seen'], 'isOnline' => $block['isOnline']);
		}
		$res->myBlocks = $blocks;
		return json_encode($res);
	}

	public function postReturnMyAva($request, $response)
	{
		$id = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('profiles')->where('user', '=', $id);
		$exec = $sql->execute();
		$fromDb = $exec->fetch();
		$res->fromWhoPic = $fromDb['profilePic'];
		return json_encode($res);
	}

	public function postReturnMyMatches($request, $response)
	{
		$id = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('matches')->where('partner1', '=', $id)->orWhere('partner2', '=', $id);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();

		$uniqUser = array();
		foreach ($fromDb as $key => $value) {
			if ($value['partner1'] != $id && in_array($value['partner1'], $uniqUser) === false)
				$uniqUser[$key] = $value['partner1'];
			else if ($value['partner2'] != $id && in_array($value['partner2'], $uniqUser) === false)
				$uniqUser[$key] = $value['partner2'];
		}
		$uniqUser = array_values($uniqUser);

		foreach ($uniqUser as $i => $v) {
			$match[$i]['withWho'] = $v;
			$sql = $db->select()->from('profiles')->join('users', 'users.userId', '=', 'profiles.user')->where('user', '=', $v);
			$exec = $sql->execute();
			$info = $exec->fetch();
			$match[$i]['ava'] = $info['profilePic'];
			$match[$i]['name'] = $info['fname'] . ' ' . $info['lname'];
		}
		$res->myMatches = $match;
		return json_encode($res);
	}

//    public function getDistance($request, $response) {
//	    $lon1 = $request->
//        $theta = $lon1 - $lon2;
//        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
//        $dist = acos($dist);
//        $dist = rad2deg($dist);
//        $kilometres = $dist * 60 * 1.1515 * 1.609344;
//        return $kilometres;
//
//    }
}