<?php

namespace application\components;

use application\components\Db;

abstract class Model
{

	public $db;

	public function __construct()
	{
		$this->db = new Db;
	}
}