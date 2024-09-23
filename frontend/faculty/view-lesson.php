<?php
$pdf = isset($_GET['pdf']) ? htmlspecialchars($_GET['pdf']) : null;

if (!$pdf || !file_exists($_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/lessons/' . $pdf)) {
    die('Invalid or missing PDF file.');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Lesson</title>
    <link rel="icon" href="/SCES/assets/images/logo.png" type="image/x-icon" />
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
        }
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="/SCES/storage/lessons/<?php echo $pdf; ?>" frameborder="0"></iframe>
</body>
</html>
