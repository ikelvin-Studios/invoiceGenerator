<?php

$output = $db->query("SELECT * FROM `users_tb` WHERE `role` != 'admin'");
echo json_encode($output);
?>
