<?php
session_start();

// Prevent caching of the dashboard page
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/global.php';
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/student/data-setter.php';

$log = new loggedIn();
$log->needLogin();
$current_page = basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="/SCES/assets/style/student.css" />
    <link rel="icon" href="/SCES/assets/images/logo.png" type="image/x-icon" />
    <script
      src="https://kit.fontawesome.com/c835ba47b5.js"
      crossorigin="anonymous"
    ></script>