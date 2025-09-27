<?php
// 1 Set session cookie to last 7 days
$session_lifetime = 7 * 24 * 60 * 60; // 604800 seconds = 7 days
session_set_cookie_params([
    'lifetime' => time() +  $session_lifetime,
    'path' => '/',
    'domain' => 'localhost', // important for localhost
    'secure' => false,       // false because localhost is not HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
include_once "config.php";

// 2 CORS headers for React + Vite
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 3 Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$responseArray = [];

// 4 Get login data
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

// 5 Validate input
if (empty($email) || empty($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required!"
    ]);
    exit();
}

// 6Check if user exists
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // 7Verify password
    if (password_verify($password, $user['password'])) {
        // Set session
        $_SESSION['unique_id'] = $user['unique_id'];
        
        mysqli_query($conn, "UPDATE users SET status = 'Active now' WHERE unique_id = '{$user['unique_id']}'");
        $responseArray = [
            "status" => "success",
            "message" => "Login successful!",
            "session" => $_SESSION['unique_id'],
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
            "message" => "Invalid password!"
        ];
    }
} else {
    $responseArray = [
        "status" => "error",
        "message" => "User not found!"
    ];
}

// 8 Return JSON response
echo json_encode($responseArray);
