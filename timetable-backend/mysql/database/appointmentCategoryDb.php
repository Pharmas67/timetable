<?php

function addCategory($conn,$userId,$category){
    $sql = 'INSERT INTO `appointmentCategories` (`userId`,`category`) VALUES (?,?);';
    $stmt = $conn->stmt_init();
    if(!($stmt->prepare($sql))){
        return false;
    }
    $stmt->bind_param('bs',$userId,$category);
    $stmt->execute();
    $stmt->close();
    return true;
}


?>