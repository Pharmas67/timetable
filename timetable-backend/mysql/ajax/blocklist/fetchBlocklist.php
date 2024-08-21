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

$blocklist = fetchBlocklist($conn,$json_obj->userId);

if(!$blocklist && $blocklist !== []){
    echo json_encode('Something went wrong');
    exit();
}

echo json_encode($blocklist);
exit();