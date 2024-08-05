<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: *");

require_once '../../../constants.php';
require_once (ROOT . "/mysql/database/conn.php");
require_once (ROOT . "/mysql/database/userDb.php");

$userArray = fetchUserList($conn);
echo json_encode($userArray);
exit();