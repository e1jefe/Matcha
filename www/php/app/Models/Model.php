<?php

namespace App\Models;

class Model {

    public function connect()
    {
        $dsn = 'mysql:host=localhost;dbname=myDb;charset=utf8';
		$usr = 'root';
		$pwd = 'qwerty';
		$pdo = new \Slim\PDO\Database($dsn, $usr, $pwd);
		//here may be added function to initialize our db if no such
		//$this->start($pdo);
		return $pdo;
    }

    // public function start($ourDbObj)
    // {
    // 	$db = 'dbName';
    // 	$ourDbObj->query("CREATE DATABASE IF NOT EXISTS $db");
    // 	Here we will create alla table that we need for our db, sql statements from db sql file
    // }


}