<?php
session_start();

session_unset();
session_destroy();

header("Location: /SCES/frontend/faculty/login.php");
