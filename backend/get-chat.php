    <?php
    session_start();
    include_once "config.php";

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $responseArray = ["status" => "error", "message" => "Something went wrong"];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $data = json_decode(file_get_contents("php://input"), true);

        $outgoing_id = mysqli_real_escape_string($conn, $data['outgoing_id'] ?? '');
        $incoming_id = mysqli_real_escape_string($conn, $data['incoming_id'] ?? '');

        if (!empty($outgoing_id) && !empty($incoming_id)) {
            $sql = "SELECT msg_id, outgoing_msg_id, incoming_msg_id, msg     
                    FROM messages 
                    WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) 
                    OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) 
                    ORDER BY msg_id ASC";  // ASC so chats appear in order

            $query = mysqli_query($conn, $sql);

            if ($query && mysqli_num_rows($query) > 0) {
                $rows = mysqli_fetch_all($query, MYSQLI_ASSOC);

                $responseArray = [
                    "status" => "success",
                    "chats"  => $rows
                ];
            } else {
                $responseArray = [
                    "status" => "success",
                    "chats"  => [] // no chats yet
                ];
            }
        } else {
            $responseArray["message"] = "Missing outgoing_id or incoming_id";
        }
    }

    echo json_encode($responseArray);
