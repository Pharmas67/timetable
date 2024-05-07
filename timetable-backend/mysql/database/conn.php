<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = new mysqli('localhost','admin','3t0LXeOUStar', 'timetable');

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$usertable = 'CREATE TABLE IF NOT EXISTS `timetable`.`users` ( `id` BINARY(16) PRIMARY KEY , `username` VARCHAR(64) NOT NULL , `email` VARCHAR(64) NOT NULL , `password` VARCHAR(64) NOT NULL ) ENGINE = InnoDB';

if(!($conn->query($usertable) === TRUE)){
    echo 'Error: ' . $conn->error;
} 
