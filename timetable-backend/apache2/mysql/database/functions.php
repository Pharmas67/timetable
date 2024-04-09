<?php

function createUser($conn,$username,$email,$password){
    $sql = 'INSERT INTO `users` (`id`,`username`,`email`,`password`) VALUES (?,?,?,?);';
    $stmt = $conn->stmt_init();
    if(!$stmt->prepare($sql)){
        return 'sql-error';
    }

    if(!(userExists($conn,$username,$username) === false)){
        return 'invalidUsername';
    }

    if(!(userExists($conn,$email,$email) === false)){
        return 'invalidEmail';
    }

    $hashedpwd = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param('ssss',uniqid(),$username,$email,$hashedpwd);
    $stmt->execute();
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
    $stmt->execute();
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
        return 'invalid username or email';
    }

    if(!(password_verify($password, $userExists['password']))){
        return 'invalid password';
    }
    
    return true;
}


?>