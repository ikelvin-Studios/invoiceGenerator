<?php
$email = $postBody->email;
$password = $postBody->password;

if ($db->query('SELECT email FROM users_tb WHERE email=:email', array(':email'=>$email))) {
        if (password_verify($password, $db->query('SELECT password FROM users_tb WHERE email=:email', array(':email'=>$email))[0]['password'])) {
                $cstrong = True;
                $token = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
                $user_info = $db->query('SELECT * FROM users_tb WHERE email=:email', array(':email'=>$email))[0];
                $user_id = $user_info['id'];
                $db->query('INSERT INTO login_tokens (`token`, `user_id`) VALUES (:token, :user_id)', array(':token'=>sha1($token), ':user_id'=>$user_id));
                echo '{ "Token": "'.$token.'", "Role": "'.$user_info['role'].'", "ID": "'.$user_info['id'].'", "Name": "'.$user_info['name'].'", "Status": "'.$user_info['status'].'" }';
        } else {
                echo '{ "Error": "Invalid username or password!" }';
                http_response_code(401);
        }
} else {
        echo '{ "Error": "Invalid username or password!" }';
        http_response_code(401);
}

?>
