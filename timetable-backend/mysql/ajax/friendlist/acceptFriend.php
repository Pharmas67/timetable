<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../../constants.php';
require_once (ROOT. '/mysql/database/conn.php');
require_once (ROOT. '/mysql/database/friendlistDb.php');

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

$response = acceptFriend($conn,$json_obj->userId,$json_obj->friendId);

if(!$response && $response !== []){
    echo json_encode('invalidRequest');
    exit();
}

if($response == 'noRequestAvailable'){
    echo json_encode('invalidRequest');
    exit();
}

echo json_encode('validRequest');
exit();