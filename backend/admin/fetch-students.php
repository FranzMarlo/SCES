<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/fetch-db.php';
$fetchDb = new fetchClass();
$students = $fetchDb->adminGetStudentsData();

header('Content-Type: application/json');
echo json_encode($students);