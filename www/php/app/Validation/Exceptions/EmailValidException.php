<?php

namespace Validation\Exception;

use Respect\Validation\Exceptions\ValidationExeption;

class EmailValidException extends ValidationExeption
{
	public static $defaultTemplates = [
		self::MODE_DEFAULT => [
			self::STANDART => 'Email is already taken.',
		],
	];
}
