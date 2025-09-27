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

$fetch = $conn->prepare("SELECT unique_id, firstName, lastName, email, img, status from users ");
$fetch->execute();
$result = $fetch->get_result();

$response = []; // 
if ($result->num_rows > 0) {
    $users = $result->fetch_all(MYSQLI_ASSOC);
    $response = [
        "status" => "success",
        "users" => $users,
    ];
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Database fetch error!"]);
}
