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

$uid = $_SESSION['unique_id'];
mysqli_query($conn, "UPDATE users SET status='offline' WHERE unique_id='{$uid}'");
// Destroy 
session_unset();   
session_destroy(); 

echo json_encode([
    "status" => "success",
    "message" => "Logged out successfully!"
]);
