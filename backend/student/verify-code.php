<?php
session_start();
header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $enteredCode = $_POST['verificationCode'];

    if (isset($_SESSION['verification_code']) && $_SESSION['verification_code'] == $enteredCode) {

        echo "200";

    } else {
        echo "400";
    }
} else {
    echo "401";
}
?>