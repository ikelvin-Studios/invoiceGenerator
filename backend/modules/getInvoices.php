<?php

$output = $db->query("SELECT * FROM `invoice_tb` WHERE 1");
echo json_encode($output);
?>
