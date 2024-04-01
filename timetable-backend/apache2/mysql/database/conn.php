<?php

$conn = new mysqli('localhost','root','3t0LXeOUStar', 'timetable');

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}
echo 'Connection succesfully';

$usertable = 'CREATE TABLE IF NOT EXISTS `timetable`.`users` ( `id` BINARY(16) PRIMARY KEY , `username` VARCHAR(64) NOT NULL , `email` VARCHAR(64) NOT NULL , `password` VARCHAR(64) NOT NULL ) ENGINE = InnoDB';

if($conn->query($usertable) === TRUE){
    echo 'Table users created successfully';
} else {
    echo 'Error: ' . $conn->error;
}
