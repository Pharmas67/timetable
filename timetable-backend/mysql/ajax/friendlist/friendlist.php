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

if(!fetchFriendList($conn,$json_obj->userId) && fetchFriendList($conn,$json_obj->userId) !== []){
    echo json_encode('invalidRequest');
    exit();
}

$friendlist = fetchFriendList($conn,$json_obj->userId);

echo json_encode($friendlist);
exit();
