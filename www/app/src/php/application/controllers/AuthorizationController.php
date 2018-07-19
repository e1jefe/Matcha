<?php

namespace application\controllers;

use application\components\Controller;
use application\components\View;
use application\models\User;
use application\components\Db;
header('Content-type: application/json');

class AuthorizationController extends Controller
{
    public function generateToken()
    {
        $token = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!$/()*";
        $token = str_shuffle($token);
        $token = substr($token, 0, 20);
        return $token;
    }

    static public function sendMail($mail_to, $mail_subject, $mail_message)
    {
        if ($mail_to != null && $mail_subject != null && $mail_message != null)
        {
            $encoding = "utf-8";
            $subject_preferences = array(
                "input-charset" => $encoding,
                "output-charset" => $encoding,
                "line-length" => 76,
                "line-break-chars" => "\r\n"
            );
            $from_name = "Matcha";
            $from_mail = "Matcha@love.com";
            // Mail header
            $header = "Content-type: text/html; charset=".$encoding." \r\n";
            $header .= "From: ".$from_name." <".$from_mail."> \r\n";
            $header .= "MIME-Version: 1.0 \r\n";
            $header .= "Content-Transfer-Encoding: 8bit \r\n";
            $header .= "Date: ".date("r (T)")." \r\n";
            $header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);
            //Send
            $res = mail($mail_to, $mail_subject, $mail_message, $header);
        }
        return $res;
    }

    public function signinAction()
    {
        var_dump($_POST);
        echo "prover pochtu";
    }

    public function loginAction()
    {
        $entityBody = json_decode(file_get_contents("php://input"), true);
        $toCheck = new User;
        $res = $toCheck->extractUserByLogin($entityBody['user']['login']);
        if (count($res) !== 0 && password_verify($entityBody['user']['pass'], $res[0]['password']))
        {
//HERE COMES TOKEN GENERATION (without password pls!)
            echo json_encode($entityBody);
        }
        else
        {
            echo json_encode(array('check'=> $res));
        }

//        echo "Ya tipa proverila togo kto loginetsya";
        // $token = array();
        // $token['id'] = $id;
        // echo JWT::encode($token, 'secret_server_key'); //закодировать
        // $token = JWT::decode($_POST['token'], 'secret_server_key');
        // echo $token->id;
    }
}