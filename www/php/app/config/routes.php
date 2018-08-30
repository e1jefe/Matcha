<?php

$app->get('/', 'HomeController:index')->setName('home');

// $app->posr('/auth/signin', 'AuthController:signIn');

$app->post('/auth/signin', 'AuthController:postSignIn');
$app->post('/auth/signup', 'AuthController:postSignUp');
$app->post('/auth/reset', 'AuthController:postResetPass');
$app->post('/auth/signinFB', 'AuthController:signinFB');

$app->get('/auth/confirmRegistration', 'AuthController:getConfirmRegistr');
$app->get('/auth/confirmResetPass', 'AuthController:confirmResetPass');
$app->post('/auth/logOut', 'AuthController:postLogOut');

$app->post('/user/isFull', 'UserController:postCheckProfileIsFull');
$app->post('/user/hasAva', 'UserController:postCheckHasAvatar');

$app->post('/user/getAllInfo', 'UserController:postGetAllInfo');
$app->post('/user/getAllPhoto', 'UserController:postGetAllPhoto');

// $app->post('/user/getWhoLikes', 'UserController:postWhoLikesMe');
$app->post('/user/recordInfo', 'UserController:postRecordInfo');
$app->post('/user/recordAbout', 'UserController:postRecordAbout');
$app->post('/user/newPhoto', 'UserController:postNewPhoto');
$app->post('/user/delMyPic', 'UserController:postDelPhoto');
$app->post('/user/setAvatar', 'UserController:postSetAvatar');
$app->post('/user/getAbout', 'UserController:postForAbout');
$app->post('/user/getWhoViewMe', 'UserController:postWhoViewMe');
$app->post('/user/dellTag', 'UserController:postDellTag');
$app->post('/user/pushCoord', 'UserController:postLocation');
$app->post('/user/getCoord', 'UserController:postReturnCoord');
$app->post('/user/getGuestInfo', 'UserController:returnGuestInfo');
$app->post('/user/like', 'UserController:postLike');
$app->post('/user/block', 'UserController:postBlock');
$app->post('/user/scammer', 'UserController:postScammer');
$app->post('/user/getMyBlocks', 'UserController:postReturnBlocks');
$app->post('/user/getAva', 'UserController:postReturnMyAva');
$app->post('/user/getMatches', 'UserController:postReturnMyMatches');
$app->post('/user/search', 'SearchController:getUsers');



$app->post('/message/historyInit', 'MessageController:returnInitialHistory');
$app->post('/message/send', 'MessageController:postSendMessage');
$app->post('/message/get', 'MessageController:postGetMessage');
$app->post('/message/markAsRead', 'MessageController:markMsgAsRead');




// $app->post('/auth/signup', 'AuthController:postSignUp');

// $app->post('/auth/signin', 'AuthController:postSignIn')->setName('auth.signin');
