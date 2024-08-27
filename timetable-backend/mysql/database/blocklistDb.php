<?php
    function blockUser($conn,$userId,$blockId){
        $sql = 'INSERT INTO `blocklist` (`id`,`blockerId`,`blockedId`) VALUES (?,?,?)';

        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            return false;
        }

        $uniqId = uniqid();

        $stmt->bind_param('sss',$uniqId,$userId,$blockId);

        if(!$stmt->execute()){
            $stmt->close();
            return false;
        }

        if($stmt->affected_rows === 0){
            $stmt->close();
            return false;
        }

        $stmt->close();
        
        return true;
    }

    function unBlockUser($conn,$userId,$blockId){
        $sql = 'DELETE FROM `blocklist` WHERE `blockerId` = ? AND `blockedId` = ?';

        $stmt = $conn->stmt_init();
        if(!$stmt->prepare($sql)){
            return false;
        }

        $stmt->bind_param('ss',$userId,$blockId);

        if(!$stmt->execute()){
            $stmt->close();
            return false;
        }

        if($stmt->affected_rows === 0){
            $stmt->close();
            return false;
        }

        $stmt->close();
        
        return true;
    }

    function fetchBlocklist($conn,$userId){
        $sql = 'SELECT * FROM `blocklist` WHERE `blockerId` = ? OR `blockedId` = ?';

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

        $blocklist = [];

        while($row = $obj->fetch_assoc()){
            $blocklist[] = $row;
        }

        $stmt->close();
        
        return $blocklist;
    }
?>