<?php
$client_id = $postBody->client_id;
$Invoice = $postBody->Invoice;
$invoice_date = $postBody->invoice_date;
$due_date = $postBody->due_date;
$items = '';

echo $db->query("INSERT INTO `invoice_tb`(`client_id`, `Invoice`, `invoice_date`, `due_date`, `items`) VALUES (:client_id, :Invoice, :invoice_date, :due_date, :items)", array(':client_id'=>$client_id, ':Invoice'=>$Invoice, ':invoice_date'=>$invoice_date, ':due_date'=>$due_date, ':items'=>$items));

echo '{ "Success": "Invoice Added!" }';

?>
