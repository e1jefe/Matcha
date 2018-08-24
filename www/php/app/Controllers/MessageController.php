<?php

namespace App\Controllers;
use App\Models\Model;
use App\Mail\SendMail;

class MessageController extends Controller
{
	public function returnInitialHistory($request, $response)
	{
		$uId = $request->getParam('userId');
		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('chat')->where('sender', '=', $uId)->orWhere('receiver', '=', $uId)->orderBy('whenSend', 'ASC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();
		$uniqUser = array();
		$conversation = array();

		foreach ($fromDb as $key => $value) {
			if ($value['sender'] != $uId && in_array($value['sender'], $uniqUser) === false)
				$uniqUser[$key] = $value['sender'];
			else if ($value['receiver'] != $uId && in_array($value['receiver'], $uniqUser) === false)
				$uniqUser[$key] = $value['receiver'];
		}
		$uniqUser = array_values($uniqUser);

		foreach ($uniqUser as $i => $v) {
			$conversation[$i]['withWho'] = $v;

			$sql = $db->select()->from('profiles')->join('users', 'users.userId', '=', 'profiles.user')->where('user', '=', $v);
			$exec = $sql->execute();
			$info = $exec->fetch();

			$conversation[$i]['ava'] = $info['profilePic'];
			$conversation[$i]['name'] = $info['fname'] . ' ' . $info['lname'];

			strtotime($info['last_seen'] . ' + 15 minutes') > time() ? $isOnline = true : $isOnline = false;
			$conversation[$i]['isOnline'] = $isOnline;

			$count = 0;
			$hasUnread = 0;

			// $countOut = 0;
			foreach ($fromDb as $msg) {
				if ($v === $msg['sender'] || $v === $msg['receiver']) {
					$messag[$count] = array('sender'=> $msg['sender'], 'content' => $msg['msg'], 'time' => substr($msg['whenSend'], -8, 5), 'read' => $msg['seen']);
					$count++;
					if ($uId === $msg['receiver'] && $msg['seen'] === 0) {
						$hasUnread = 1;
					}
				}
			}
			$conversation[$i]['messagies'] = $messag;
			$conversation[$i]['hasUnread'] = $hasUnread;
			unset($messag);
		}
		$result->data = $conversation;
		$fromWhoUnread = array();
		foreach ($conversation as $con => $val) {
			if ($val['hasUnread'] === 1) {
				array_push($fromWhoUnread, $val['withWho']);
			}
		}
		$result->fromWhoUnread = $fromWhoUnread;

		$sql1 = $db->select()->from('profiles')->where('user', '=', $uId);
		$exec1 = $sql1->execute();
		$fromDb1 = $exec1->fetch();
		$result->myAva = $fromDb1['profilePic'];

		$selectMatches = $db->select()->from('matches')->where('partner1', '=', $uId)->orWhere('partner2', '=', $uId);
		$execMatches = $selectMatches->execute();
		$fromDbMatches = $execMatches->fetchAll();

		$uniqUserForMatch = array();
		foreach ($fromDbMatches as $key => $value) {
			if ($value['partner1'] != $uId && in_array($value['partner1'], $uniqUserForMatch) === false)
				$uniqUserForMatch[$key] = $value['partner1'];
			else if ($value['partner2'] != $uId && in_array($value['partner2'], $uniqUserForMatch) === false)
				$uniqUserForMatch[$key] = $value['partner2'];
		}
		$uniqUserForMatch = array_values($uniqUserForMatch);
		$match = array();
		foreach ($uniqUserForMatch as $i => $v) {
			$match[$i]['withWho'] = $v;
			$sql = $db->select()->from('profiles')->join('users', 'users.userId', '=', 'profiles.user')->where('user', '=', $v);
			$exec = $sql->execute();
			$info = $exec->fetch();
			$match[$i]['ava'] = $info['profilePic'];
			$match[$i]['name'] = $info['fname'] . ' ' . $info['lname'];
		}
		$result->myMatches = $match;

		// $result->check = '6';
		return json_encode($result);
	}

	public function postSendMessage($request, $response)
	{
		$uId = $request->getParam('uId');
		$target = $request->getParam('target');
		$content = $request->getParam('msg');
		$time = $request->getParam('time');
		
		$db = new Model;
		$db = $db->connect();
		$insertSql = $db->insert(array('sender', 'receiver', 'msg', 'whenSend'))->
						  into('chat')->
						  values(array($uId, $target, $content, $time));
		$insertSql->execute(false);

		$sql = $db->select()->from('chat')->where('sender', '=', $uId)->orWhere('receiver', '=', $uId)->orderBy('whenSend', 'ASC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();

		$uniqUser = array();
		$conversation = array();

		foreach ($fromDb as $key => $value) {
			if ($value['sender'] != $uId && in_array($value['sender'], $uniqUser) === false)
				$uniqUser[$key] = $value['sender'];
			else if ($value['receiver'] != $uId && in_array($value['receiver'], $uniqUser) === false)
				$uniqUser[$key] = $value['receiver'];
		}
		$uniqUser = array_values($uniqUser);

		foreach ($uniqUser as $i => $v) {
			$conversation[$i]['withWho'] = $v;

			$sql = $db->select()->from('profiles')->join('users', 'users.userId', '=', 'profiles.user')->where('user', '=', $v);
			$exec = $sql->execute();
			$info = $exec->fetch();

			$conversation[$i]['ava'] = $info['profilePic'];
			$conversation[$i]['name'] = $info['fname'] . ' ' . $info['lname'];
			$conversation[$i]['isOnline'] = boolval($info['isOnline']);

			$count = 0;
			foreach ($fromDb as $msg) {
				if ($v === $msg['sender'] || $v === $msg['receiver']) {
					$messag[$count] = array('sender'=> $msg['sender'], 'content' => $msg['msg'], 'time' => substr($msg['whenSend'], -8, 5));
					$count++;
				}
			}
			$conversation[$i]['messagies'] = $messag;
			unset($messag);
		}

		$result->data = $conversation;
		$result->check = "author " . $uId . " reciever " . $target;

		return json_encode($result);
	}

	public function postGetMessage($request, $response)
	{
		$sender = $request->getParam('sender');
		$me = $request->getParam('reciever');

		$db = new Model;
		$db = $db->connect();
		$sql = $db->select()->from('chat')->where('sender', '=', $me)->orWhere('receiver', '=', $me)->orderBy('whenSend', 'ASC');
		$exec = $sql->execute();
		$fromDb = $exec->fetchAll();

		$uniqUser = array();
		$conversation = array();

		foreach ($fromDb as $key => $value) {
			if ($value['sender'] != $me && in_array($value['sender'], $uniqUser) === false)
				$uniqUser[$key] = $value['sender'];
			else if ($value['receiver'] != $me && in_array($value['receiver'], $uniqUser) === false)
				$uniqUser[$key] = $value['receiver'];
		}
		$uniqUser = array_values($uniqUser);

		foreach ($uniqUser as $i => $v) {
			$conversation[$i]['withWho'] = $v;

			$sql = $db->select()->from('profiles')->join('users', 'users.userId', '=', 'profiles.user')->where('user', '=', $v);
			$exec = $sql->execute();
			$info = $exec->fetch();

			$conversation[$i]['ava'] = $info['profilePic'];
			$conversation[$i]['name'] = $info['fname'] . ' ' . $info['lname'];

			$count = 0;
			foreach ($fromDb as $msg) {
				if ($v === $msg['sender'] || $v === $msg['receiver']) {
					$messag[$count] = array('sender'=> $msg['sender'], 'content' => $msg['msg'], 'time' => substr($msg['whenSend'], -8, 5));
					$count++;
				}
			}
			$conversation[$i]['messagies'] = $messag;
			unset($messag);
		}

		$result->data = $conversation;
		$result->check = "sender " . $sender . " reciever " . $me;

		return json_encode($result);
	}

	public function markMsgAsRead($request, $response)
	{
		$sender = $request->getParam('sender');
		$me = $request->getParam('uId');
		$db = new Model;
		$db = $db->connect();
		$updateStatement = $db->update(array('seen' => 1))
                       ->table('chat')
                       ->where('sender', '=', $sender)->where('receiver', '=', $me);
        $affectedRows = $updateStatement->execute();
		return json_encode(true);
	}
}