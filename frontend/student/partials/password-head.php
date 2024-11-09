<?php
$db = new globalClass();
$showForm = false;
$token = $_GET['token'] ?? null;
$email = $_GET['email'] ?? null;

if ($token && $email) {
    $expires = $db->checkTokenExpiry($email, $token);

    if ($expires != null && $expires >= time()) {
        $showForm = true;
    } else {
        
        $errorMessage = "The password reset link has expired. Please request a new one.";
    }
} else {
    $errorMessage = "Invalid or missing password reset link.";
}