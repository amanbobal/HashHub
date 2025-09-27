<?php

$session_lifetime = 7 * 24 * 60 * 60; // 7 days
session_set_cookie_params([
    'lifetime' => time() + $session_lifetime,
    'path' => '/',
    'domain' => 'localhost', 
    'secure' => false,       
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
include_once "config.php";

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { // to check dumy request sent by browser and tell them its safe...
    http_response_code(200);
    exit();
}

$responseArray = [];

// Get form data
$firstName = $_POST["firstName"] ?? "";
$lastName  = $_POST["lastName"] ?? "";
$email     = $_POST["email"] ?? "";
$password  = $_POST["password"] ?? "";

// Check email
if (!empty($email)) {
    $checkEmail = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
    if (mysqli_num_rows($checkEmail) > 0) {
        $responseArray["status"] = "error";
        $responseArray["emailError"] = "$email - This email already exists!";
        echo json_encode($responseArray);
        exit();
    }
} else {
    $responseArray["status"] = "error";
    $responseArray["message"] = "Email is required!";
    echo json_encode($responseArray);
    exit();
}

// Handle file upload (if image is provided)
$newImgName = "";
if (isset($_FILES["image"])) {
    $imgName = $_FILES["image"]["name"];
    $imgTmp = $_FILES["image"]["tmp_name"];
    $uploadDir = "uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $time = time();
    $newImgName = $time . $imgName;

    if (move_uploaded_file($imgTmp, $uploadDir . $newImgName)) {
        $responseArray["imageStatus"] = "Image uploaded successfully!";
    } else {
        $responseArray["status"] = "error";
        $responseArray["imageStatus"] = "Failed to upload image!";
        echo json_encode($responseArray);
        exit();
    }
}

// Insert user into DB
$status = "Active now";
$random_id = rand(time(), 1000000000);
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$insert_sql = mysqli_query(
    $conn,
    "INSERT INTO users (unique_id, firstName, lastName, email, password, img, status) 
     VALUES ('{$random_id}','{$firstName}','{$lastName}','{$email}','{$hashedPassword}','{$newImgName}','{$status}')"
);

if ($insert_sql) {
    $responseArray["status"] = "success";
    $responseArray["message"] = "User registered successfully!";
    $responseArray["name"]   = $firstName . " " . $lastName;
    $responseArray["email"]  = $email;

    // Set session
    $_SESSION['unique_id'] = $random_id;
    $responseArray["session"] = $_SESSION['unique_id'];
    $responseArray["user"] = [
        "id" => $random_id,
        "firstName" => $firstName,
        "lastName" => $lastName,
        "email" => $email,
        "img" => $newImgName,
        "status" => "Active now",
    ];
} else {
    $responseArray["status"] = "error";
    $responseArray["message"] = "Database insert failed!";
}

// Always return JSON
echo json_encode($responseArray);
