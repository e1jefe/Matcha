<?php

namespace App\Controllers;
use App\Models\Model;

use Slim\Views\Twig as View;

class HomeController extends Controller
{
	public function index($request, $response)
	{
		$pdo = new Model();
		$pdo = $pdo->connect();
		$selectStatement = $pdo->select()->from('users');
		$stmt = $selectStatement->execute();
		$data = $stmt->fetch();
		return $this->view->render($response, 'home.twig', array('data' => $data));
	}
}
