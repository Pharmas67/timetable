<?php 

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../constants.php';
require_once (ROOT . "/mysql/database/conn.php");
require_once (ROOT . "/mysql/database/userDb.php");

$json_str = file_get_contents('php://input');

$json_arr = json_decode($json_str,true);

if($json_arr['password'] !== $json_arr['password2']){
    print_r(json_encode('Passwords dont match'));
    exit();
}

print_r(json_encode(createUser($conn,$json_arr['username'],$json_arr['email'],$json_arr['password'])));
exit();