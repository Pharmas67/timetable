<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../constants.php';
require_once (ROOT. '/mysql/database/conn.php');
require_once (ROOT. '/mysql/database/appointmentDb.php');

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

if(!getCategories($conn,$json_obj->userId) && getCategories($conn,$json_obj->userId) !== []){
    echo (json_encode("Something went wrong"));
    exit();
}

$categories = getCategories($conn,$json_obj->userId);
echo json_encode($categories);
exit();