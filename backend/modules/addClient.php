<?php
$company = $postBody->company;
$name = $postBody->name;
$contact = $postBody->contact;

$db->query("INSERT INTO `clients_tb`(`company`, `name`, `contact`) VALUES (:company, :name, :contact)", array(':company'=>$company, ':name'=>$name, ':contact'=>$contact));

echo '{ "Success": "Client Added!" }';

?>
