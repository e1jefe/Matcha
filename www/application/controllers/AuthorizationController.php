<?php

namespace application\controllers;

use application\components\Controller;
use application\components\View;
use application\models\User;
use application\components\Db;

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
        $msg = "";
        if (isset($_POST['agree']) && isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['userName']) && isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['cpass']))
        {
            $login = htmlspecialchars($_POST['userName'], ENT_QUOTES);
            $firstName = htmlspecialchars($_POST['fname'], ENT_QUOTES);
            $lastName = htmlspecialchars($_POST['lname'], ENT_QUOTES);
            $pass = $_POST['pass'];
            $cpass = $_POST['cpass'];
            $email = $_POST['email'];
            $wrongLogin = ($login == "" || strlen($login) < 5);
            $wrongPass = ($pass == "" || $cpass != $pass || strlen($pass) < 7 || strlen($pass) > 140 || preg_match("([A-Z]+)", $pass) == false);
            $wrongEmail = ($email == "" || filter_var($email, FILTER_VALIDATE_EMAIL) == false);
            if ($wrongLogin || $wrongPass || $wrongEmail)
                $msg = "Check your inputs";
            if (strlen($firstName) > 140 || strlen($lastName) > 140)
                $msg = "Too looooong name or surname";
            else
            {
                $tmpUser = new User;
                $isLoginTaken = $tmpUser->extractUserByLogin($login);
                $isEmailTaken = $tmpUser->extractUsersByEmail($email);
                if (($isLoginTaken != null && $isLoginTaken[0]['isEmailConfirmed'] === '1') || ($isEmailTaken != null && $isEmailTaken[0]['isEmailConfirmed'] === '1'))
                    $isLoginTaken != null ? $msg = 'This login has already taken' : $msg = 'This email has already registered';
                else
                {
                    $token = $this->generateToken();
                    $hashPass = password_hash($pass, PASSWORD_BCRYPT);
                    $userData = array('login' => $login, 'pass' => $hashPass, 'email' => $email, 'firstName' => $firstName, 'lastName' => $lastName, 'token' => $token);
                    $tmpUser->insertNewUser($userData);
                    $base_url = 'http://localhost:8001/confirmEmail/';
                    $mail_to = $email;
                    $mail_subject = 'Account varification';
                    $mail_message = '
					<p>Hi '.$login.',</p>
					<p>Thanks for registration. In order to use your account at our site, please confirm your email by following this link: '.$base_url.'email_verification?login='.$login.'&activation_code='.$token.'</p>
					<p>Best Regards, Matcha</p>';
                    $res = $this->sendMail($mail_to, $mail_subject, $mail_message);
                    var_dump($res);
                    $res == true ? $msg = 'Success, check your email' : $msg = 'Something went wrong';
                }
            }
            $arr['msg'] = $msg;
            $this->view->showMsg('layouts/showMsg', $arr);
            exit;
            $msg == "Success, check your email" ? header('refresh:2; url=http://localhost:8001/home') : header('refresh:2; url=http://localhost:8001/signin');
        }
        elseif (isset($_SESSION['isUser']) === false)
            $this->view->render('');
        else
            $this->view->render('home');
        return true;
    }
}