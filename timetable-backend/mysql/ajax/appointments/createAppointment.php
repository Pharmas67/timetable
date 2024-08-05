<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../../constants.php';
require_once (ROOT. '/mysql/database/conn.php');
require_once (ROOT. '/mysql/database/appointmentDb.php');


$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

if(!createAppointment($conn, $json_obj->userId, $json_obj->name, $json_obj->startDate, $json_obj->endDate, $json_obj->category, $json_obj->description,$json_obj->day,$json_obj->month,$json_obj->year)) {
    echo json_encode("Something went wrong");
    exit();
}

echo json_encode("Successfull");
exit();
