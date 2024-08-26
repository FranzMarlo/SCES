<?php
session_start();

session_unset();
session_destroy();

header("Location: /SCES/frontend/student/login.php");
