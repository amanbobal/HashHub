<?php
// 1 Set session cookie for 7 days
$session_lifetime = 7 * 24 * 60 * 60; // 604800 seconds
session_set_cookie_params([
    'lifetime' => time() +  $session_lifetime,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
include_once "config.php";

// 2 CORS headers for React + Vite
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 3 Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$responseArray = [];

// 4 Check if session exists
if (isset($_SESSION['unique_id'])) {
    $unique_id = $_SESSION['unique_id'];

    // 5️⃣ Fetch user info using mysqli procedural style
    $query = "SELECT * FROM users WHERE unique_id = $unique_id";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        $responseArray = [
            "status" => "success",
            "message" => "User is logged in",
            "user" => [
                "id" => $user['unique_id'],
                "firstName" => $user['firstName'],
                "lastName" => $user['lastName'],
                "email" => $user['email'],
                "img" => $user['img'],
                "status" => $user['status'],
            ]
        ];
    } else {
        $responseArray = [
            "status" => "error",
            "message" => "User not found!"
        ];
    }
} else {
    $responseArray = [
        "status" => "error",
        "message" => "No active session"
    ];
}

// 6 Return JSON response
echo json_encode($responseArray);
