<?php
$pdf = isset($_GET['pdf']) ? htmlspecialchars($_GET['pdf']) : null;
$lessonNumber = isset($_GET['lesson_number']) ? htmlspecialchars($_GET['lesson_number']) : null;
$subjectId = isset($_GET['subject_id']) ? htmlspecialchars($_GET['subject_id']) : null;

if (!$pdf || !file_exists($_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/lessons/' . $pdf)) {
    die('Invalid or missing PDF file.');
}
include $_SERVER['DOCUMENT_ROOT'] . '/SCES/frontend/faculty/partials/faculty-head.php';
$db = new globalClass();
$subjectTitle = $db->getSubject($subjectId);
?>
<title>View Lesson</title>
<link rel="stylesheet" href="/SCES/assets/style/view-lesson.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
</head>

<body>
    <div class="pdf-header">
        <h2>Lesson <?php echo htmlspecialchars($lessonNumber); ?> -
            <?php echo htmlspecialchars($subjectTitle['subject_title']); ?>
        </h2>
        <a href="/SCES/storage/lessons/<?php echo $pdf; ?>" download class="download-link">
            <i class="fas fa-download download-icon"></i>
        </a>
    </div>
    <div class="pdf-wrapper">
        <div class="pdf-container">
            <canvas id="pdf-canvas"></canvas>
            <button id="prev-page"><i class="fas fa-chevron-left"></i></button>
            <button id="next-page"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="controls">
            <span>Page: <span id="page-num"></span> / <span id="page-count"></span></span>
            <form id="page-form" onsubmit="return false;">
                <input type="number" id="page-input" min="1" style="width: 50px;" />
                <button id="go-page">Go</button>
            </form>
        </div>
    </div>
    <div class="rotate-box">
        <img src="/SCES/assets/images/rotate-icon.png" alt="rotate icon">
        <span>Please Rotate Your Device For Better Lesson Viewing Experience</span>
    </div>
    <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        const url = '/SCES/storage/lessons/<?php echo $pdf; ?>';

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null;

        const canvas = document.getElementById('pdf-canvas'),
            ctx = canvas.getContext('2d');

        const renderPage = (num) => {
            pageIsRendering = true;

            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: 1 });

                const canvasContainerWidth = canvas.parentElement.clientWidth;
                const canvasContainerHeight = window.innerHeight - 50;

                const scaleX = canvasContainerWidth / viewport.width;
                const scaleY = canvasContainerHeight / viewport.height;
                const scale = Math.min(scaleX, scaleY);

                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: scaledViewport
                };

                page.render(renderContext).promise.then(() => {
                    pageIsRendering = false;

                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });

                document.getElementById('page-num').textContent = num;
            });
        };

        const queueRenderPage = (num) => {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        };

        const showPrevPage = () => {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        };

        const showNextPage = () => {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        };

        const goToPage = (num) => {
            if (num >= 1 && num <= pdfDoc.numPages) {
                pageNum = num;
                queueRenderPage(pageNum);
            }
        };

        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            document.getElementById('page-count').textContent = pdfDoc.numPages;
            renderPage(pageNum);
        });

        document.getElementById('prev-page').addEventListener('click', showPrevPage);
        document.getElementById('next-page').addEventListener('click', showNextPage);

        document.getElementById('go-page').addEventListener('click', () => {
            const pageInput = document.getElementById('page-input');
            const pageToGo = parseInt(pageInput.value, 10);
            goToPage(pageToGo);
        });

        window.addEventListener('resize', () => {
            queueRenderPage(pageNum);
        });
    </script>
</body>

</html>