<?php 

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once "../database/conn.php";
require_once "../database/functions.php";

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str,true);

print_r(json_encode(createUser($conn,$json_obj['username'],$json_obj['email'],$json_obj['password'])));
exit();

if($json_obj['password'] !== $json_obj['password2']){
    print_r(json_encode('Passwords dont match'));
    exit();
}

if(createUser($conn,$json_obj['username'],$json_obj['email'],$json_obj['password']) === 'sql-error'){
    print_r(json_encode('Something went wrong'));
    exit();
}

if(createUser($conn,$json_obj['username'],$json_obj['email'],$json_obj['password']) === 'invalidUsername'){
    print_r(json_encode('invalidUsername'));
    exit();
}
if(createUser($conn,$json_obj['username'],$json_obj['email'],$json_obj['password']) === 'invalidEmail'){
    print_r(json_encode('invalidEmail'));
    exit();
}

createUser($conn,$json_obj['username'],$json_obj['email'],$json_obj['password']);
print_r(json_encode('UserCreated'));
exit();