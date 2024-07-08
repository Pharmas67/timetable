<?php

function addCategory($conn,$userId,$category){
    $sql = 'INSERT INTO `appointmentCategories` (`userId`,`category`) VALUES (?,?);';
    $stmt = $conn->stmt_init();
    if(!($stmt->prepare($sql))){
        return false;
    }
    $stmt->bind_param('ss', $userId, $category);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    $stmt->close();
    
    if ($stmt->affected_rows === 1) {
        return true; // Appointment successfully created
    } else {
        return false; // No rows were inserted
    }
}

function getCategories($conn,$userId){
    $sql = 'SELECT * FROM `appointmentCategories` WHERE `userId` = ?;';
    $stmt = $conn->stmt_init();
    
    if(!($stmt->prepare($sql))){
        return false;
    }
    $stmt->bind_param('s', $userId);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    $obj = $stmt->get_result();
    
    $categories = [];
    while($row = $obj->fetch_assoc()){
        $categories[] = $row;
    }
    $stmt->close();
    return $categories;
}

function createAppointment($conn,$userId,$name,$startDate,$endDate,$category,$description,$day,$month,$year){
    $sql = 'INSERT INTO `appointments` (`id`,`userId`,`name`,`startDate`,`endDate`,`category`,`description`,`day`,`month`,`year`) VALUES (?,?,?,?,?,?,?,?,?,?);';
    $stmt = $conn->stmt_init();
    if(!($stmt->prepare($sql))){
        return false;
    }

    $uniqeId = uniqid();
    $stmt->bind_param('sssssssisi',$uniqeId,$userId,$name,$startDate,$endDate,$category,$description,$day,$month,$year);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    $stmt->close();
    
    if ($stmt->affected_rows === 1) {
        return true; // Appointment successfully created
    } else {
        return false; // No rows were inserted
    }

}

function getAppointments($conn,$userId,$day,$month,$year){
    $sql = 'SELECT `id`,`name`,`startDate`,`endDate`,`category`,`description` FROM `appointments` WHERE `userId` = ? AND `day` = ? AND `month` = ? AND `year` = ?;';
    $stmt = $conn->stmt_init();
    if(!($stmt->prepare($sql))){
        return false;
    }
    $stmt->bind_param('sisi',$userId,$day,$month,$year);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    $obj = $stmt->get_result();

    $appointments = [];
    while($row = $obj->fetch_assoc()){
        $appointments[] = $row;
    }

    $stmt->close();
    return $appointments;
}   

function updateUserImage($conn,$userId,$imageName){
    $sql = 'UPDATE `users` SET `imageName` = ? WHERE `userId` = ?;';
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        return false;
    }
    $stmt->bind_param('ss',$imageName,$userId);

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $stmt->close();

    if ($stmt->affected_rows === 1) {    
        return true;
    }

    return false;
}
?>