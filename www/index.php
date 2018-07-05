<?php

//PDO::ERRMODE_EXCEPTION;
ini_set('display_errors', 1);
error_reporting(E_ALL);

define('ROOT', dirname(__FILE__));

use application\components\Router;
use application\components\Db;

spl_autoload_register(function ($class) {
    $path = str_replace('\\', '/', $class.'.php');
    if (file_exists($path))
    {
        require $path;
    }
});

session_start();

$router = new Router;
$router->run();