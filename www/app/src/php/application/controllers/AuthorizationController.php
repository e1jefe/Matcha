<?php

namespace application\controllers;


use application\components\Controller;
use application\components\View;
use application\models\User;
use application\components\Db;

use application\ReallySimpleJWT\TokenBuilder;
// use application\ReallySimpleJWT\TokenAbstract;


header('Content-type: application/json');

class AuthorizationController extends Controller
{
    public function generateToken($res)
    {
        $builder = new TokenBuilder();
        $secret = 'abC123!';
        $expiration = time() + (60 * 15 * 1000);
        $token = $builder->addPayload(['user_id' => $res[0]['id'], 'user_login' => $res[0]['login']])
            ->setSecret($secret)
            ->setExpiration($expiration)
            ->setIssuer('issuerIdentifier')
            ->build();
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
        // echo "here";
        $entityBody = json_decode(file_get_contents("php://input"), true);
        $toCheck = new User;
        $res = $toCheck->extractUserByLogin($entityBody['user']['login']);
        if (count($res) !== 0 && password_verify($entityBody['user']['pass'], $res[0]['password']) && $res[0]['isEmailConfirmed'] === '1')
        {
            //JWT without library (https://dev.to/robdwaller/how-to-create-a-json-web-token-using-php-3gml)
            // Create token header as a JSON string
            // $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            // Create token payload as a JSON string
            // $payload = json_encode(['user_id' => $res[0]['id'], 'user_login' => $res[0]['login']]);
            // Encode Header to Base64Url String
            // $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
            // Encode Payload to Base64Url String
            // $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
            // Create Signature Hash
            // $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
            // Encode Signature to Base64Url String
            // $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
            // Create JWT
            // $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
            // echo $jwt;

            //JWT on ReallySimpleJWT library
            echo ($this->generateToken($res));
            // echo json_encode(['user'=> $res]);

        }
        else
        {
            echo json_encode(['user'=> $res]);
        }

//        echo "Ya tipa proverila togo kto loginetsya";
        // $token = array();
        // $token['id'] = $id;
        // echo JWT::encode($token, 'secret_server_key'); //закодировать
        // $token = JWT::decode($_POST['token'], 'secret_server_key');
        // echo $token->id;
    }
}