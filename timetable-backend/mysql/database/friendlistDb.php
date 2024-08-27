<?php

function fetchFriendList($conn,$userId) {
    $sql = 'SELECT * FROM `friendlist` WHERE `userId` = ? OR `friendId` = ? AND `status` = "active"';
    
    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$userId);
    
    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $obj = $stmt->get_result();

    $friendList = [];
    while($row = $obj->fetch_assoc()){
        $friendList[] = $row;
    }

    $stmt->close();

    return $friendList;
}

function fetchFriendReq($conn,$userId) {
    $sql = 'SELECT * FROM `friendlist` WHERE `userId` = ? OR `friendId`= ? AND `status` = "requested"';
    
    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$userId);
    
    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $obj = $stmt->get_result();

    $friendReqs = [];
    while($row = $obj->fetch_assoc()){
        $friendReqs[] = $row;
    }

    $stmt->close();
    
    return $friendReqs;
}

function friendshipExists($conn,$userId,$friendId){
    $sql = 'SELECT * FROM `friendlist` WHERE `userId` = ? AND `friendId` = ? AND (`status`= "requested" OR `status`="active")';

    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$friendId);

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $obj = $stmt->get_result();

    if($row = $obj->fetch_assoc()){
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

function addFriend($conn,$userId,$friendId){
    $friendship = friendshipExists($conn,$userId,$friendId);

    if($friendship !== FALSE){
        return 'alreadyExists';
    }

    $sql = 'INSERT INTO `friendlist` (`userId`,`friendId`,`status`) VALUES (?,?,"requested")';

    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$friendId);

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    return 'validRequest';
}

function updateFriendRequest($conn,$userId,$friendId) {
    $sql = 'UPDATE `friendlist` SET `status` = "active" WHERE `userId` = ? AND `friendId` = ?';

    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$friendId);

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    $stmt->close();

    $sql = 'DELETE FROM `friendlist` WHERE (`userId` = ? AND `friendId` = ? AND `status` = "requested") OR (`userId` = ? AND `friendId` = ? AND `status` = "requested")';

    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ssss',$userId,$friendId,$friendId,$userId);

    if(!$stmt->execute()){
        return false;
    }

    if($stmt->affected_rows === 0){
        $stmt->close();
        return false;
    }

    $stmt->close();

    return true;
}

function acceptFriend($conn,$userId,$friendId){
    $friendship = friendshipExists($conn,$friendId,$userId);

    if($friendship === FALSE){
        return 'noRequestAvailable';
    }

    if(!updateFriendRequest($conn,$userId,$friendId)){
        return false;
    }

    $sql = 'INSERT INTO `friendlist` (`userId`,`friendId`,`status`) VALUES (?,?,"active")';

    $stmt = $conn->stmt_init();

    if(!$stmt->prepare($sql)){
        return false;
    }

    $stmt->bind_param('ss',$userId,$friendId);

    if(!$stmt->execute()){
        $stmt->close();
        return false;
    }

    if($stmt->affected_rows === 0){
        $stmt->close();
        return false;
    }

    return 'validRequest';
}

function removeFriend($conn, $userId, $friendId) {
    // Check if the friendship exists
    $friendship = friendshipExists($conn, $userId, $friendId);
    if ($friendship === FALSE) {
        return false;
    }

    // Prepare SQL statement
    $sql = 'DELETE FROM `friendlist` WHERE (`userId` = ? AND `friendId` = ?) OR (`userId` = ? AND `friendId` = ?)';
    $stmt = $conn->stmt_init();

    if (!$stmt->prepare($sql)) {
        return false;
    }

    $stmt->bind_param('ssss', $userId, $friendId, $friendId, $userId);

    if (!$stmt->execute()) {
        $stmt->close();
        return false;
    }

    if ($stmt->affected_rows === 0) {
        $stmt->close();
        return false;
    }

    $stmt->close();

    return true;
}


?> 