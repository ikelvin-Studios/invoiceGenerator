<?php

$name = $postBody->name;
$email = $postBody->email;
$password = password_hash("changeme", PASSWORD_BCRYPT);

$db->query("INSERT INTO `users_tb`(`name`, `email`, `password`) VALUES (:name, :email, :password)", array(':name'=>$name, ':email'=>$email, ':password'=>$password));

echo '{ "Success": "User Added!" }';

?>
