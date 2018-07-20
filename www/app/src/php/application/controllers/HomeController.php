<?php

namespace application\controllers;

use application\components\Controller;
use application\controllers\UserController;


class HomeController extends Controller
{
    public function indexAction()
    {
        $this->view->render('home/notAuthorize');
    }

}