<?php
session_start();
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/global.php';

$log = new facultyLoggedIn();
$log->needLogout(); 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/SCES/assets/style/style.css" />
    <link rel="icon" href="/SCES/assets/images/logo.png" />
    

    