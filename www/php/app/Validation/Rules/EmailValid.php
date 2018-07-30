<?php

namespace Validation\Rules;

use Respect\Validation\Rules\AbstractRule;
use Models\Model;


class EmailValid extends AbstractRule
{
	public function validate($input)
	{
		$db = new Model;
		$db = $db->connect();
		$selectStatement = $db->select()->from('users')->where('email', '=', $input);
		$stmt = $selectStatement->execute();
		$data = $stmt->fetch();

		count($data) === 0 ? return true : return false;
		//return User::where('email', $input)->count() === 0; return true if email isnt present in db (here need to check if email is taken in our db)
		// return false;
	}
}