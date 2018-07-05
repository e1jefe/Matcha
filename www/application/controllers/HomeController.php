<?php

namespace application\controllers;

use application\components\Controller;
use application\controllers\UserController;


class HomeController extends Controller
{
    public function indexAction()
    {
    	if (isset($_SESSION['isUser']))
        {
            $feed = new Picture();
            $arr = $feed->extractPics();
            $this->view->render('home/index', $arr);
        }
        else
        {
            $this->view->render('home/notAuthorize');
        }
    }

}