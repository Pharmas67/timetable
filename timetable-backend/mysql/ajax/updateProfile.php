<?php 

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once '../../constants.php';
require_once (ROOT . "/mysql/database/conn.php");
require_once (ROOT . "/mysql/database/userDb.php");

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str);

function isValidInput($property) {
    return isset($property) && !empty(trim($property));
}

if(property_exists($json_obj,'username')){
    $result = updateUsername($conn,$json_obj->userId,$json_obj->username);

    if($result === 'invalidUsername'){
        echo json_encode('invalidUsername');
        exit();
    }

    if(!$result){
        echo json_encode('Something went wrong');
        exit();
    }

    echo json_encode('Data updated');
    exit();
}

if(property_exists($json_obj,'email')){
    $result = updateEmail($conn,$json_obj->userId,$json_obj->email);

    if($result === 'invalidEmail'){
        echo json_encode('invalidEmail');
        exit();
    }

    if(!$result){
        echo json_encode('Something went wrong');
        exit();
    }

    echo json_encode('Data updated');
    exit();
}

if(property_exists($json_obj,'password')){
    $result = updatePassword($conn,$json_obj->userId,$json_obj->oPassword,$json_obj->password);

    if($result === 'invalidOldPassword'){
        echo json_encode('invalidOldPassword');
        exit();
    }

    if(!$result){
        echo json_encode('Something went wrong');
        exit();
    }

    echo json_encode('Data updated');
    exit();
}

echo json_encode('Something went wrong');
exit();
