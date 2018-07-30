<?php

namespace App\Controllers;
use App\Models\Model;
use App\Mail\SendMail;

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

		$sql = $db->select()->from('photos')->where('userNbr', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$photos = array();
		foreach ($fromDb as $key => $photo) {
			array_push($photos, $photo['src']);
		}
		$result->userPhoto = $photos;

		return json_encode($result);
	}

	public function postWhoLikesMe($request, $response)
	{
		$userId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('likes')->join('users', 'users.userId', '=', 'likes.who')->join('profiles', 'users.userId', '=', 'profiles.user')->where('target', '=', $userId);
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$likesMeProfiles = array();
		foreach ($fromDb as $key => $profile) {
			$likesMeProfiles['profile'.$key] = array('profilePic' => $profile['profilePic'],
											'firstName' => $profile['fname'],
											'lastName' => $profile['lname'],
											'about' => $profile['bio']);			
		}
		$result->profiles = $likesMeProfiles;
		return json_encode($result);
	}

	public function postRecordInfo($request, $response)
	{
		return json_encode(true);

	}

	public function postRecordAbout($request, $response)
	{
		return json_encode(true);
		
	}
}