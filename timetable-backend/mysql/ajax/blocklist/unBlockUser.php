<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../../constants.php';
require_once (ROOT. '/mysql/database/conn.php');
require_once (ROOT. '/mysql/database/blocklistDb.php');

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

$response = unBlockUser($conn,$json_obj->userId,$json_obj->blockedId);

if(!$response){
    echo json_encode('invalidRequest');
    exit();
}

if($response === TRUE){
    echo json_encode('validRequest');
    exit();
}

echo json_encode('invalidRequest');
exit();