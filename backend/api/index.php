<?php
require_once("../classes/DB.php");
require_once("config.php");


$db = new DB($host, $dbName, $username, $password);

if ($_SERVER['REQUEST_METHOD'] == "GET") {

  if ($_GET['url'] == "clients") {
          $postBody = file_get_contents("php://input");
          $postBody = json_decode($postBody);

          include '../modules/getClients.php';

  } else if ($_GET['url'] == "items") {
          $postBody = file_get_contents("php://input");
          $postBody = json_decode($postBody);

          include '../modules/getItems.php';

  } else if ($_GET['url'] == "users") {
          $postBody = file_get_contents("php://input");
          $postBody = json_decode($postBody);

          include '../modules/getUsers.php';

  } else if ($_GET['url'] == "invoice") {
          $postBody = file_get_contents("php://input");
          $postBody = json_decode($postBody);

          include '../modules/getInvoices.php';

  }

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

        if ($_GET['url'] == "auth") {
                $postBody = file_get_contents("php://input");
                $postBody = json_decode($postBody);

                include '../modules/login.php';

        } else if ($_GET['url'] == "clients") {
                $postBody = file_get_contents("php://input");
                $postBody = json_decode($postBody);

                include '../modules/addClient.php';

        } else if ($_GET['url'] == "items") {
                $postBody = file_get_contents("php://input");
                $postBody = json_decode($postBody);

                include '../modules/addItems.php';

        } else if ($_GET['url'] == "users") {
                $postBody = file_get_contents("php://input");
                $postBody = json_decode($postBody);

                include '../modules/addUser.php';

        } else if ($_GET['url'] == "invoice") {
                $postBody = file_get_contents("php://input");
                $postBody = json_decode($postBody);

                include '../modules/createInvoice.php';

        }
}  else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
        if ($_GET['url'] == "auth") {
                if (isset($_GET['token'])) {
                        if ($db->query("SELECT token FROM login_tokens WHERE token=:token", array(':token'=>sha1($_GET['token'])))) {
                                $db->query('DELETE FROM login_tokens WHERE token=:token', array(':token'=>sha1($_GET['token'])));
                                echo '{ "Status": "Success" }';
                                http_response_code(200);
                        } else {
                                echo '{ "Error": "Invalid token" }';
                                http_response_code(400);
                        }
                } else {
                        echo '{ "Error": "Malformed request" }';
                        http_response_code(400);
                }
        }
} else {
        http_response_code(405);
}

// Helper functions
?>
