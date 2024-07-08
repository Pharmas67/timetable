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

$bytes = openssl_random_pseudo_bytes(16);
$uniqeId = bin2hex($bytes);

$imgType = explode("/",$_FILES['image']['type']);
$imgType = end($imgType);

$uniqImg = $uniqeId.".".$imgType;

if(!updateImg($conn,$_POST['userId'],$uniqImg)){
    echo json_encode('Something went wrong!');
    exit();
}

$targetPath = ROOT . "/assets/userImages/";

$targetPath = $targetPath.basename($uniqImg);
if(!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)){
    echo json_encode('Something went wrong!');
    exit();
}

echo json_encode('Successfull');
exit();