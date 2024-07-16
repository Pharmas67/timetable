<?php 

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../constants.php';
require_once (ROOT . "/mysql/database/conn.php");
require_once (ROOT . "/mysql/database/userDb.php");

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

if($json_obj->password !== $json_obj->password2){
    print_r(json_encode('Passwords dont match'));
    exit();
}

print_r(json_encode(createUser($conn,$json_obj->username,$json_obj->email,$json_obj->password)));
exit();