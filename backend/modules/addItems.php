<?php
$item = $postBody->item;
$price = $postBody->price;

$db->query("INSERT INTO `items_tb`(`item`, `price`) VALUES (:item, :price)", array(':item'=>$item, ':price'=>$price));

echo '{ "Success": "Item Added!" }';

?>
