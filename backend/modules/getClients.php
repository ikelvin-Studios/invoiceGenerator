<?php

$output = $db->query("SELECT * FROM `clients_tb` WHERE 1");
echo json_encode($output);
?>
