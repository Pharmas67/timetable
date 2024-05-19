<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = new mysqli('localhost','admin','Sil4224ver19063t0LXeOU', 'timetable');

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$usertable = 'CREATE TABLE IF NOT EXISTS `timetable`.`users` ( `id` BINARY(16) PRIMARY KEY , `username` VARCHAR(64) NOT NULL , `email` VARCHAR(64) NOT NULL , `password` VARCHAR(64) NOT NULL ) ENGINE = InnoDB';

$categories = 'CREATE TABLE IF NOT EXISTS `timetable`.`appointmentCategories` (`userId` BINARY(16) NOT NULL , `category` VARCHAR(32) NOT NULL ) ENGINE = InnoDB;';

if(!($conn->query($usertable) === TRUE)){
    echo 'Error: ' . $conn->error;
} 

if(!($conn->query($categories) === TRUE)){
    echo 'Error: ' . $conn->error;
} 