<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

use Firebase\JWT\JWT;

require_once '../../constants.php';
require_once (ROOT . '/vendor/autoload.php');
require_once (ROOT . '/mysql/database/conn.php');
require_once (ROOT . '/mysql/database/userDb.php');
require_once '../../../vault/rsaKey.php';

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

if(loginUser($conn,$json_obj->email,$json_obj->password) === false){
    return print_r(json_encode('invalidUsernameOrPassword'));
}

$user = displayUser($conn,$json_obj->email,$json_obj->email);
$time = new DateTimeImmutable();

$payload = [
    'iss' => 'http://localhost:4200/',
    'iat' => $time->getTimestamp(),
    'nbf' => $time->getTimestamp(),
    'exp' => $time->modify('+10 minutes')->getTimestamp(),
    'id' => $user->id,
    'email' => $user->email,
    'username' => $user->username,
    'image' => $user->image
];

$jwt = JWT::encode($payload,$privateKey, 'RS256');

print_r(json_encode($jwt));
exit();
