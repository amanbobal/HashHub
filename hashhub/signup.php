<?php
include_once "config.php";

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$responseArray = [];

// ✅ When sending FormData,
$firstName = $_POST["firstName"] ?? "";
$lastName  = $_POST["lastName"] ?? "";
$email     = $_POST["email"] ?? "";
$password  = $_POST["password"] ?? "";

// Check if email exists
if (!empty($email)) {
    $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
    if (mysqli_num_rows($sql) > 0) {
        $responseArray["emailError"] = "$email - This email already exists!";
    } else {
        $responseArray["status"] = "success";
        $responseArray["name"]   = $firstName . " " . $lastName;
        $responseArray["email"]  = $email;
    }
}

// ✅ Handle file upload
if (isset($_FILES["image"])) {
    $imgName = $_FILES["image"]["name"];
    $imgTmp = $_FILES["image"]["tmp_name"];
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $time = time();
    $newImgName = $time.$imgName;
    if (move_uploaded_file($imgTmp, $uploadDir . $newImgName)) {
        $responseArray["imageStatus"] = "Image uploaded successfully!";
        $status = "Active now";
        $random_id = rand(time(),10000000000000000);

        $insert_sql = mysqli_query($conn, "INSERT INTO users (unique_id, firstName, lastName, email, password, img,status) VALUES ('{$random_id}','{$firstName}','{$lastName}','{$email}','{$password}','{$newImgName}','{$status}')");
    } else {
        $responseArray["imageStatus"] = "Failed to upload image!";
    }
}

// ✅ Always return JSON
echo json_encode($responseArray);
