<?php
session_start();
include_once "config.php";
//cors headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}   

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = isset($_GET['user_id']) ? mysqli_real_escape_string($conn, $_GET['user_id']) : "";

    $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = '{$user_id}'");
    if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
        $responseArray = [
            "status" => "success",
            "user" => $row  
        ];

        echo json_encode($responseArray);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "User not found"
        ]);
    }
}
