<?php

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();
header('Content-Type: text/plain');
require $_SERVER['DOCUMENT_ROOT'] . '/SCES/vendor/autoload.php';

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'] . '/SCES');
$dotenv->load();

include $_SERVER['DOCUMENT_ROOT'] . '/SCES/backend/db_class.php';
$db = new globalClass();

if (isset($_SESSION['email']) && isset($_SESSION['teacher_fname'])) {
    $email = $_SESSION['email'];
    $firstName = $_SESSION['teacher_fname'];

    $token = bin2hex(random_bytes(32));
    $expires = date("U") + 300;
    $mail = new PHPMailer(true);
    if ($db->storeFacultyPasswordResetToken($email, $token, $expires)) {
        $resetLink = "http://localhost/SCES/frontend/faculty/change-password.php?token=$token&email=$email";
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_EMAIL'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom($_ENV['SMTP_EMAIL'], 'SCES Online Learning Platform');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Recover Account';

            $mail->Body = "
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #ffffff;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 100%;
                                padding: 20px;
                                background-color: #ffffff;
                            }
                            .email-content {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #f5f5f5;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                border: 2px solid #000000;
                            }
                            h2 {
                                color: #333333;
                                font-size: 24px;
                                text-align: center;
                            }
                            p {
                                color: #555555;
                                font-size: 16px;
                            }
                            a.reset-button{
                                border: none;
                                background-color: #4CAF50;
                                border-radius: 10px;
                                text-decoration: none;
                                color: #ffffff;
                                font-size: 1rem;
                                padding: 10px 20px;
                                margin: 0 auto;
                                text-align: center;
                            }   
                            .link {
                                margin: 0 auto;
                                font-size: 0.8rem;
                                font-weight: bold;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                color: #999999;
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='email-content'>
                                <h2>SCES Account Recovery</h2>
                                <p>Dear $firstName,</p>
                                <p>We received a request to reset your password. Use the button below to proceed. The link will only be available for 5 minutes.</p>
                                <a href='$resetLink' class='reset-button'>Reset Your Password</a>
                                <p>Or copy and paste the link below into your browser:</p>
                                <p class='link'>$resetLink</p>
                                <p>If you did not request to reset your password, please ignore this email.</p>
                                <p>Have a nice learning day!</p>
                                <p>Best regards,<br>SCES Online System</p>
                                <div class='footer'>
                                    &copy; 2024 SCES Online Learning Platform. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                ";
            $mail->send();
            echo "200";

        } catch (Exception $e) {
            echo '400';
        }
    }
} else {
    echo '400';
}
