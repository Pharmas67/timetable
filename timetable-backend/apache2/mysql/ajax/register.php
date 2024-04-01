<?php 

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

require_once('../database/conn.php');
require_once('../database/functions.php');

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str,true);

print_r($json_obj);
exit;