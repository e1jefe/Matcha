<?php

$app->get('/', 'HomeController:index')->setName('home');

// $app->posr('/auth/signin', 'AuthController:signIn');

$app->post('/auth/signin', 'AuthController:postSignIn');
$app->post('/auth/signup', 'AuthController:postSignUp');
$app->post('/auth/reset', 'AuthController:postResetPass');

$app->get('/auth/confirmRegistration', 'AuthController:getConfirmRegistr');
$app->get('/auth/confirmResetPass', 'AuthController:confirmResetPass');

$app->post('/user/isFull', 'UserController:postCheckProfileIsFull');
$app->post('/user/getAllInfo', 'UserController:postGetAllInfo');
$app->post('/user/getWhoLikes', 'UserController:postWhoLikesMe');
$app->post('/user/recordInfo', 'UserController:postRecordInfo');
$app->post('/user/recordAbout', 'UserController:postRecordAbout');



// $app->post('/auth/signup', 'AuthController:postSignUp');

// $app->post('/auth/signin', 'AuthController:postSignIn')->setName('auth.signin');
