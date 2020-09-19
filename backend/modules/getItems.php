<?php

$output = $db->query("SELECT * FROM `items_tb` WHERE 1");
echo json_encode($output);
?>
