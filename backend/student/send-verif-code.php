<?php
use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();
header('Content-Type: text/plain');

require $_SERVER['DOCUMENT_ROOT'] . '/SCES/vendor/autoload.php';

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'] . '/SCES');
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $emailVerification = $_SESSION['email_verification'];

    if ($emailVerification == 'Verified') {
        echo '403';
    } else {
        $email = $_SESSION['email'];
        $firstName = $_SESSION['student_fname'];

        $verificationCode = mt_rand(100000, 999999);
        $_SESSION['verification_code'] = $verificationCode;

        $mail = new PHPMailer(true);

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
            $mail->Subject = 'Your Email Verification Code';

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
                line-height: 1.5;
            }
            .verification-code {
                display: block;
                margin: 20px 0;
                font-size: 28px;
                color: #4CAF50;
                font-weight: bold;
                text-align: center;
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
                <h2>SCES Email Verification</h2>
                <p>Hi There, $firstName!</p>
                <p>Thank you for signing up! To complete your registration, please verify your email address by using the verification code below:</p>
                <span class='verification-code'>$verificationCode</span>
                <p>If you did not request this email, please ignore it.</p>
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
}
