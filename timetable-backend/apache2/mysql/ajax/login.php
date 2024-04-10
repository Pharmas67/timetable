<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

use Firebase\JWT\JWT;

require_once '../../rootHelper.php';
require_once (ROOT . '/vendor/autoload.php');
require_once (ROOT . '/mysql/database/conn.php');
require_once (ROOT . '/mysql/database/functions.php');


$json_str = file_get_contents('php://input');

$json_arr = json_decode($json_str,true);

print_r(json_encode(displayUser($conn,$json_arr['email'],$json_arr['email'])));
exit();
