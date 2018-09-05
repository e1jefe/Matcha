<?php

namespace App\Models;

class Model {

    public function connect()
    {
        $dsn = 'mysql:host=localhost;dbname=myDb;charset=utf8';
		$usr = 'root';
		$pwd = 'qwerty';
		$pdo = new \Slim\PDO\Database($dsn, $usr, $pwd);
		return $pdo;
    }
}