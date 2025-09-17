<?php
    // echo "hi";
    // cors BLOCK PROBLEM SOLVE USING BELOW TWO HEADERS SINCE DIFF PORTS BUT SAME LOCALHOST
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    header("Content-Type: application/json"); // brwoser ko batana hoga ki content json form me aega text/html me nhi

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
    $data = json_decode(file_get_contents("php://input"),true); // php://input raw data lene k liye
    $name = $data["firstName"];
    $email = $data["email"];

    echo json_encode(["status" => "success", "name" => $name, "email" => $email]); // sending back some response to the page