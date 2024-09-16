<?php
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/db_class.php';

$db = new globalClass();

session_start();
header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $enteredCode = $_POST['verificationCode'];
    $teacherId = $_SESSION['teacher_id'];

    if (isset($_SESSION['verification_code']) && $_SESSION['verification_code'] == $enteredCode) {

        $updateVerification = $db->updateAdminEmailVerif($teacherId);
        if ($updateVerification) {
            echo "200";
            $_SESSION['email_verification'] = 'Verified';
        }
        else{
            echo "400";
        }
    } else {
        echo "400";
    }
} else {
    echo "401";
}
?>