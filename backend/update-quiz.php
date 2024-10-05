<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$updateDb = new fetchClass();

$currentDateTime = date('Y-m-d H:i:s');

$updateDb->updateQuizzes($currentDateTime);



