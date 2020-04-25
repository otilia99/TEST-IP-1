<!DOCTYPE html>
<html lang="en">

<?php

echo('HELLO');

var_dump($_SERVER);

$allowedOrigins = array(
    '.*azure.*'
);


if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] != '') {

        echo($_SERVER['HTTP_ORIGIN']);


    foreach ($allowedOrigins as $allowedOrigin) {
        $current = file_get_contents($file);
        $current .= $allowedOrigin . "\n";
        file_put_contents($file, $current);
        if (preg_match('#' . $allowedOrigin . '#', $_SERVER['HTTP_ORIGIN'])) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
            header('Access-Control-Max-Age: 1000');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            header('Access-Control-Allow-Credentials: true');

            break;
        }
    }
}

?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="Comun.css">
    <link rel="stylesheet" type="text/css" href="add-platform.css">
    <title>Add Platform</title>
</head>

<body>
    <nav>
        <div class="Logo">
            <a href="./index.html" id="sign-in">
            <img src=logo_SMA_final.png alt="Logo unavailable" height="70" width="80"></a>
        </div>
        <ul class="link-list">
            <li><a href="./index.html" id="sign-in">Sign in</a></li>
            <li><a href="./register.html" id="sign-up">Sign Up</a></li>
        </ul>
    </nav>

    <section class="container">
        <div class="titlu">Add More Platforms</div>
        <div class="content">
            <a href="#" class="fa fa-facebook Addbtn" onClick="addFB()">FbUser</a>
            <a href="#" class="fa fa-twitter Addbtn">TwitterUser</a>
            <a href="#" class="fa fa-instagram Addbtn">InstaUser</a>
            <a href="#" class="fa fa-tumblr Addbtn">TumblrUser</a>
            <a href="#" class="fa fa-linkedin Addbtn">LinkedInUser</a>
        </div>
    </section>

    <script src="loginscript.js"></script>
</body>
</html1>