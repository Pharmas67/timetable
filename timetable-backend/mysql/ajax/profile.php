<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


require_once '../../constants.php';
require_once (ROOT . '/vendor/autoload.php');
require_once (ROOT . '/mysql/database/conn.php');
require_once (ROOT . '/mysql/database/userDb.php');
require_once '../../../vault/rsaKey.php';

$json_str = file_get_contents('php://input');

try {
    $token = JWT::decode($json_str, new Key($publicKey, 'RS256'));

    $time = new DateTimeImmutable();

    if($token->iss !== 'http://localhost:4200/') {
        print_r(json_encode('Wrong Domain'));
        exit();
    } 

    if($token->nbf > $time->getTimestamp()){
        print_r(json_encode('Token hasnt been validated'));
        exit();
    }

    if($token->exp < $time->getTimestamp()){
        print_r(json_encode('Token has been expired'));
        exit();
    }

    $user = new stdClass();
    $user->id = $token->id;
    $user->email = $token->email;
    $user->username = $token->username;

    print_r(json_encode($user));
    exit();

} catch(Exception $e) {
        print_r(json_encode('Error decoding token: ' . $e->getMessage()));
        exit();
}