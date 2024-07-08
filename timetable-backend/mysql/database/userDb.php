<?php

function createUser($conn,$username,$email,$password){
    $sql = 'INSERT INTO `users` (`id`,`username`,`email`,`password`) VALUES (?,?,?,?);';
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        return 'Something went wrong';
    }

    if(!(userExists($conn,$username,$username) === false)){
        return 'invalidUsername';
    }

    if(!(userExists($conn,$email,$email) === false)){
        return 'invalidEmail';
    }

    $hashedpwd = password_hash($password, PASSWORD_DEFAULT);
    
    $uniqId = uniqid();
    
    $stmt->bind_param('ssss',$uniqId,$username,$email,$hashedpwd);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return 'Something went wrong'; // Failed to execute statement
    }

    $stmt->close();
    
    return 'UserCreated';
}

function userExists($conn,$username,$email){
    $sql = 'SELECT * FROM `users` WHERE `username` = ? OR `email` = ?;';
    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$username,$email);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }
    
    $obj = $stmt->get_result();

    if($row = $obj->fetch_assoc()){
        return $row;
    } else {
        return false;
    }
}

function loginUser($conn,$username,$password){
    $userExists = userExists($conn,$username,$username);
    if($userExists === false){
        return false;
    }

    if(!(password_verify($password, $userExists['password']))){
        return false;
    }
    
    return true;
}

function displayUser($conn,$username,$email){
    $sql = 'SELECT `id` ,`username`,`email`,`imageName` FROM `users` WHERE `username` = ? OR `email` = ?;';
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        return false;
    }
    
    $stmt->bind_param('ss',$username,$email);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }
    
    $obj = $stmt->get_result();

    if($row = $obj->fetch_assoc()){
        $user = new stdClass();
        $user->id = $row['id'];
        $user->username = $row['username'];
        $user->email = $row['email'];
        $user->image = $row['imageName'];
        return $user;
    }

    $stmt->close();
    
    return false;
}

function updateUsername($conn,$userId,$username){
    
    if(!(userExists($conn,$username,$username) === false)){
        return 'invalidUsername';
    }
    
    $sql = 'UPDATE `users` SET `username` = ? WHERE `id` = ?;';
    
    $stmt = $conn->stmt_init();
    
    if(!$stmt->prepare($sql)){
        return false;
    }
    
    $stmt->bind_param('ss',$username,$userId);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    if ($stmt->affected_rows === 0) {
        $stmt->close();
        return false; // No rows were updated
    } 

    $stmt->close();
    
    return true;
}

function updateEmail($conn,$userId,$email){
    
    if(!(userExists($conn,$email,$email) === false)){
        return 'invalidEmail';
    }
    
    $sql = 'UPDATE `users` SET `email` = ? WHERE `id` = ?;';
    
    $stmt = $conn->stmt_init();
    
    if(!$stmt->prepare($sql)){
        return false;
    }
    
    $stmt->bind_param('ss',$email,$userId);
    
    if (!$stmt->execute()) {
        $stmt->close();
        return false; // Failed to execute statement
    }

    if ($stmt->affected_rows === 0) {
        $stmt->close();
        return false; // No rows were updated
    } 

    $stmt->close();
    
    return true;
}

function getPasswordById($conn,$userId){
    
    $sql = 'SELECT `password` FROM `users` WHERE `id` = ?;';
    
    $stmt = $conn->stmt_init();
    
    if(!$stmt->prepare($sql)){
        return false;
    }
    
    $stmt->bind_param('s',$userId);
    
    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $obj = $stmt->get_result();

    if($row = $obj->fetch_assoc()){
        $stmt->close();
        return $row['password'];
    } else {
        $stmt->close();
        return false;
    }
}

function updatePassword($conn,$userId,$oPassword,$password){
    
    $currentPassword = getPasswordById($conn,$userId);
    
    if(!$currentPassword){
        return false;
    }

    if(!(password_verify($oPassword,$currentPassword))){
        return 'invalidOldPassword';
    }

    $sql = 'UPDATE `users` SET `password` = ? WHERE `id` = ?;';
    
    $stmt = $conn->stmt_init();
    
    if(!$stmt->prepare($sql)){
        return false;
    }
    
    $hashedpwd = password_hash($password, PASSWORD_DEFAULT);

    $stmt->bind_param('ss', $hashedpwd, $userId); // Correct parameter binding

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    if ($stmt->affected_rows === 0) {
        $stmt->close();
        return false; // No rows were updated
    } 

    $stmt->close();
    
    return true;
}

function updateImg($conn,$userId,$imageName){
    $sql = 'UPDATE `users` SET `imageName`= ? WHERE `id` = ?;';
    
    $stmt = $conn->stmt_init();
    
    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$imageName,$userId);

    if(!$stmt->execute()){
        return false;
    }

    if ($stmt->affected_rows === 0) {
        $stmt->close();
        return false; // No rows were updated
    } 

    $stmt->close();
    
    return true;
}

?>