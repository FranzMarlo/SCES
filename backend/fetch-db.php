<?php
include 'db.php';
date_default_timezone_set('Asia/Manila');

class fetchClass extends db_connect
{
    public function __construct()
    {
        $this->connect();
    }
    public function adminGetStudentsData()
    {
        $query = $this->conn->prepare("
            SELECT
                student.profile_image,
                student.student_id,
                student.student_lname,
                student.student_fname,
                student.student_mname,
                level.grade_level,
                section.section
            FROM
                student_tbl student
            INNER JOIN
                level_tbl level
            ON
                student.level_id = level.level_id
            INNER JOIN
                section_tbl section
            ON
                student.section_id = section.section_id
        ");
        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);
            return $students;
        } else {

            return false;
        }
    }
    public function getStudentDetails($studentId)
    {
        $query = $this->conn->prepare(
            "SELECT
                student.profile_image,
                student.lrn,
                student.student_id,
                student.student_lname,
                student.student_fname,
                student.student_mname,
                student.age,
                student.gender,
                student.city,
                student.barangay,
                student.street,
                student.guardian_name,
                student.guardian_contact,
                level.grade_level,
                section.section,
                login.email
            FROM
                student_tbl student
            INNER JOIN
                level_tbl level
            ON
                student.level_id = level.level_id
            INNER JOIN
                section_tbl section
            ON
                student.section_id = section.section_id
            INNER JOIN
                login_tbl login
            ON
                student.student_id = login.student_id
            WHERE
                student.student_id = ?
            "
        );
        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $student = $result->fetch_assoc();

                return $student;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function facultyGetLessons($levelId, $subjectID, $teacherId, $sectionId)
    {
        $query = $this->conn->prepare("SELECT * FROM lesson_tbl WHERE level_id = ? AND subject_id = ? AND teacher_id = ? AND section_id = ? ORDER BY lesson_number ASC");
        $query->bind_param("ssss", $levelId, $subjectID, $teacherId, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            $lessons = $result->fetch_all(MYSQLI_ASSOC);

            return $lessons;
        } else {
            return false;
        }
    }


    public function fetchQuizDetails($quizId)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.subject_title,
            subject.subject_code,
            level.level_id,
            level.grade_level,
            section.section,
            section.section_id,
            quiz.quiz_id,
            quiz.title,
            quiz.quiz_number,
            quiz.status,
            quiz.item_number,
            quiz.due_date,
            lesson.lesson_id,
            lesson.lesson_title
        FROM quiz_tbl quiz
        INNER JOIN
            subject_tbl subject
        ON
            subject.subject_id = quiz.subject_id
        INNER JOIN
            section_tbl section
        ON
            subject.section_id = section.section_id
        INNER JOIN
            level_tbl level
        ON
            subject.level_id = level.level_id
        INNER JOIN
            lesson_tbl lesson
        ON
            quiz.lesson_id = lesson.lesson_id
        WHERE 
            quiz.quiz_id = ?
    ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        }

        return null;

    }
    public function fetchFullQuizDetails($quizId)
    {
        $query = $this->conn->prepare("
        SELECT
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.subject_title,
            subject.subject_code,
            level.level_id,
            level.grade_level,
            section.section,
            section.section_id,
            quiz.quiz_id,
            quiz.title,
            quiz.quiz_number,
            quiz.status,
            quiz.item_number,
            quiz.due_date,
            lesson.lesson_id,
            lesson.lesson_title,
            COUNT(student.student_id) AS student_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section ON subject.section_id = section.section_id
        INNER JOIN level_tbl level ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN student_tbl student ON student.section_id = section.section_id
        WHERE quiz.quiz_id = ?
        GROUP BY 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.subject_title,
            subject.subject_code,
            level.level_id,
            level.grade_level,
            section.section,
            section.section_id,
            quiz.quiz_id,
            quiz.title,
            quiz.quiz_number,
            quiz.status,
            quiz.item_number,
            lesson.lesson_id,
            lesson.lesson_title
            ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        } else {
            return null;
        }

    }
    public function fetchStudentScore($quizId)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            level.level_id,
            level.grade_level,
            section.section,
            section.section_id,
            quiz.quiz_id,
            score.score,
            student.student_lname,
            student.student_fname,
            student.student_mname,
            score.item_number,
            score.remarks,
            score.time,
            score.percentage
        FROM
            quiz_tbl quiz
        INNER JOIN
            subject_tbl subject ON subject.subject_id = quiz.subject_id
        INNER JOIN 
            section_tbl section ON section.section_id = subject.section_id
        INNER JOIN 
            level_tbl level ON level.level_id = section.level_id
        LEFT JOIN 
            student_tbl student ON student.section_id = section.section_id
        LEFT JOIN 
            score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
        WHERE 
            quiz.quiz_id = ?
        ORDER BY
            score.time DESC,
            student.student_lname ASC
            ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $allResults = $result->fetch_all(MYSQLI_ASSOC);
            return $allResults;
        } else {
            return null;
        }

    }
    public function fetchPassedStudents($quizId)
    {
        $query = $this->conn->prepare("
        SELECT
            COUNT(student.student_id) AS student_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section ON subject.section_id = section.section_id
        INNER JOIN level_tbl level ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN student_tbl student ON student.section_id = section.section_id
        LEFT JOIN score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
        WHERE quiz.quiz_id = ? AND score.remarks = 'Passed';
        ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $studentCount = $result->fetch_assoc();
            return $studentCount['student_count'];
        } else {
            return 0;
        }
    }

    public function fetchFailedStudents($quizId)
    {
        $query = $this->conn->prepare("
        SELECT
            COUNT(student.student_id) AS student_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section ON subject.section_id = section.section_id
        INNER JOIN level_tbl level ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN student_tbl student ON student.section_id = section.section_id
        LEFT JOIN score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
        WHERE quiz.quiz_id = ? AND score.remarks = 'Failed';
        ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $studentCount = $result->fetch_assoc();
            return $studentCount['student_count'];
        } else {
            return 0;
        }
    }

    public function fetchTotalStudents($quizId)
    {
        $query = $this->conn->prepare("
        SELECT
            COUNT(student.student_id) AS student_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section ON subject.section_id = section.section_id
        INNER JOIN level_tbl level ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN student_tbl student ON student.section_id = section.section_id
        LEFT JOIN score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
        WHERE quiz.quiz_id = ?;
        ");

        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            $studentCount = $result->fetch_assoc();
            return $studentCount['student_count'];
        } else {
            return 0;
        }
    }

    public function updateQuizzes($currentDateTime)
    {
        $query = $this->conn->prepare("UPDATE quiz_tbl SET status = 'Completed' WHERE due_date <= ? AND status = 'Active'");
        $query->bind_param("s", $currentDateTime);
        $query->execute();
    }

    public function fetchItemCount($quizId)
    {
        $query = $this->conn->prepare("SELECT `item_number` FROM quiz_tbl WHERE quiz_id = ?");
        $query->bind_param("s", $quizId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($row = $result->fetch_assoc()) {
                return $row['item_number'];
            } else {
                return null;
            }
        } else {
            return false;
        }
    }

    public function fetchQuizInfo($quizId): array
    {
        $query = $this->conn->prepare(
            "SELECT
                    quiz.quiz_id,
                    quiz.subject_id,
                    quiz.quiz_number,
                    quiz.title,
                    subject.subject_code,
                    subject.icon
                FROM 
                    quiz_tbl quiz
                INNER JOIN
                    subject_tbl subject
                ON
                    quiz.subject_id = subject.subject_id
                WHERE quiz_id = ?"
        );
        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_assoc();
        } else {
            return [];
        }
    }

    public function fetchQuestions($quizId): array
    {
        $query = $this->conn->prepare("SELECT * FROM question_tbl WHERE quiz_id = ? ORDER BY add_time ASC");
        $query->bind_param("s", $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

    public function fetchChoices($questionId): array
    {
        $query = $this->conn->prepare("SELECT * FROM choices_tbl WHERE question_id = ? ORDER BY choice_order ASC");
        $query->bind_param("s", $questionId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

    public function fetchStudentAnswers($studentId, $quizId): array
    {
        $query = $this->conn->prepare("SELECT question_id, choice_id FROM answer_tbl WHERE student_id = ? AND quiz_id = ?");
        $query->bind_param("ss", $studentId, $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

    public function fetchCorrectIncorrect($questionId): array
    {
        $query = $this->conn->prepare("
            SELECT 
                SUM(CASE WHEN value = 1 THEN 1 ELSE 0 END) AS correct,
                SUM(CASE WHEN value = 0 THEN 1 ELSE 0 END) AS incorrect
            FROM 
                answer_tbl 
            WHERE 
                question_id = ?
            ");
        $query->bind_param("s", $questionId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_assoc();
        } else {
            return [];
        }
    }

    public function fetchQuestionInfo($questionId): array
    {
        $query = $this->conn->prepare("SELECT * FROM question_tbl WHERE question_id = ?");
        $query->bind_param("s", $questionId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_assoc();
        } else {
            return [];
        }
    }

    public function fetchChoiceSelections($questionId): array
    {
        $query = $this->conn->prepare("
            SELECT 
                choice_id, 
                COUNT(answer_tbl.choice_id) as selections 
            FROM 
                answer_tbl 
            WHERE 
                answer_tbl.question_id = ? 
            GROUP BY 
                choice_id
        ");
        $query->bind_param("s", $questionId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

    public function fetchMedianScore($quizId)
    {
        // First, get the count of scores
        $query = $this->conn->prepare("
        SELECT COUNT(*) AS score_count FROM score_tbl WHERE quiz_id = ?
    ");
        $query->bind_param("s", $quizId);
        $query->execute();
        $result = $query->get_result();
        $countRow = $result->fetch_assoc();
        $scoreCount = $countRow['score_count'];

        // If the score count is 0, return null
        if ($scoreCount == 0) {
            return ['average_score' => null];
        }

        // If odd, select the middle score
        if ($scoreCount % 2 != 0) {
            $offset = floor($scoreCount / 2);
            $medianQuery = $this->conn->prepare("
            SELECT score AS average_score
            FROM score_tbl
            WHERE quiz_id = ?
            ORDER BY score
            LIMIT 1 OFFSET ?
        ");
            $medianQuery->bind_param("si", $quizId, $offset);

            // If even, select the average of the two middle scores
        } else {
            $offset = ($scoreCount / 2) - 1;
            $medianQuery = $this->conn->prepare("
            SELECT AVG(score) AS average_score
            FROM (
                SELECT score FROM score_tbl
                WHERE quiz_id = ?
                ORDER BY score
                LIMIT 2 OFFSET ?
            ) AS middle_values
        ");
            $medianQuery->bind_param("si", $quizId, $offset);
        }

        // Execute the median query
        if ($medianQuery->execute()) {
            $medianResult = $medianQuery->get_result();
            return $medianResult->fetch_assoc();
        } else {
            return ['average_score' => null];
        }
    }

    public function studentFetchScores($studentId)
    {
        $query = $this->conn->prepare("
    SELECT 
        subject.subject_id,
        subject.subject,
        level.level_id,
        level.grade_level,
        section.section,
        section.section_id,
        quiz.quiz_id,
        quiz.quiz_number,
        quiz.title,
        score.score,
        student.student_lname,
        student.student_fname,
        student.student_mname,
        score.item_number,
        score.remarks,
        score.time,
        score.percentage
    FROM
        quiz_tbl quiz
    INNER JOIN
        subject_tbl subject ON subject.subject_id = quiz.subject_id
    INNER JOIN 
        section_tbl section ON section.section_id = subject.section_id
    INNER JOIN 
        level_tbl level ON level.level_id = section.level_id
    LEFT JOIN 
        student_tbl student ON student.section_id = section.section_id
    LEFT JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
    WHERE 
        student.student_id = ?
    AND
        score.score IS NOT NULL
    ORDER BY
        score.time DESC");

        $query->bind_param("s", $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $allResults = $result->fetch_all(MYSQLI_ASSOC);

            foreach ($allResults as &$record) {
                $record['time'] = date('F j, Y', strtotime($record['time']));
            }

            return $allResults;
        } else {
            return null;
        }
    }

    public function studentFetchGrades($studentId)
    {
        $query = $this->conn->prepare("
    SELECT 
        subject.subject_id,
        subject.subject,
        level.level_id,
        level.grade_level,
        section.section,
        section.section_id,
        grade.grade_id,
        grade.grade,
        grade.remarks,
        grade.quarter
    FROM
        grade_tbl grade
    INNER JOIN
        subject_tbl subject ON subject.subject_id = grade.subject_id
    INNER JOIN 
        section_tbl section ON section.section_id = subject.section_id
    INNER JOIN 
        level_tbl level ON level.level_id = section.level_id
    LEFT JOIN 
        student_tbl student ON student.section_id = section.section_id
    WHERE 
        student.student_id = ?
    ORDER BY
        level.grade_level DESC");

        $query->bind_param("s", $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $allResults = $result->fetch_all(MYSQLI_ASSOC);
            return $allResults;
        } else {
            return null;
        }
    }

    public function studentFetchScoresPerMonth($studentId)
    {
        // Define start and end of the academic year (June to April)
        $currentMonth = date('n');  // Numeric representation of the current month (1 to 12)
        $currentYear = date('Y');

        // Check if we are currently in or after June (to determine the academic year range)
        if ($currentMonth >= 6) {
            // If the current month is June or later, the academic year starts in June of this year
            $startYear = $currentYear;
            $endYear = $currentYear + 1;  // It will end in April of next year
        } else {
            // If the current month is before June, the academic year started in June of the previous year
            $startYear = $currentYear - 1;
            $endYear = $currentYear;  // It will end in April of the current year
        }

        // Initialize an array to store months and set all to 0 initially
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year (June 1)
        $endDate = strtotime("$endYear-04-30");       // End of academic year (April 30)

        while ($currentDate <= $endDate) {
            $monthLabel = date('F', $currentDate);   // Month only, no year
            $months[date('Y-m', $currentDate)] = [
                'month' => $monthLabel,
                'avg_score' => 0  // Initialize score to 0 for every month
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Increment to next month
        }

        // Query to get the average scores per month within the academic year range
        $query = $this->conn->prepare("
        SELECT 
            DATE_FORMAT(score.time, '%Y-%m') AS month,  -- Group by Year-Month format
            AVG(score.score) AS avg_score               -- Get the average score per month
        FROM
            quiz_tbl quiz
        INNER JOIN
            score_tbl score ON score.quiz_id = quiz.quiz_id
        WHERE 
            score.student_id = ?
        AND 
            score.score IS NOT NULL
        AND 
            score.time BETWEEN ? AND ?  -- Limit the scores to the academic year range
        GROUP BY 
            month
        ORDER BY 
            month ASC
    ");

        // Bind parameters: studentId, start date (June 1), and end date (April 30)
        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $studentId, $startDate, $endDate);

        if ($query->execute()) {
            $result = $query->get_result();

            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];  // 'Y-m' format

                // Update the score for the month if it exists in the query results
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['avg_score'] = (float) $row['avg_score'];
                }
            }

            // Prepare the data to return for the line chart
            $data = [
                'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
                'scores' => array_column($months, 'avg_score')  // Average scores
            ];

            return $data;  // Return the final data for the line chart
        } else {
            return null;  // Return null in case of failure
        }
    }

    public function fetchGWAByAcademicYear($lrn)
    {
        // Prepare the SQL query to get GWA records for the student by LRN
        $query = $this->conn->prepare("
        SELECT 
            grade_level,          -- Select grade_level
            gwa                   -- Select GWA for each record
        FROM 
            record_tbl 
        WHERE 
            lrn = ?              -- Filter by the given LRN
        ORDER BY 
            grade_level ASC      -- Order the results by grade_level
    ");

        // Bind the LRN parameter
        $query->bind_param("s", $lrn);

        // Execute the query
        if ($query->execute()) {
            $result = $query->get_result();
            $gwaRecords = $result->fetch_all(MYSQLI_ASSOC);

            // Prepare arrays for labels and GWA values
            $labels = [];
            $gwaValues = [];

            // Loop through GWA records to populate labels and GWA values
            foreach ($gwaRecords as $record) {
                // Capitalize and format grade_level as "Grade X"
                $labels[] = ucfirst(strtolower($record['grade_level']));  // Capitalize 'Grade' and append level
                $gwaValues[] = round($record['gwa'], 2);    // Store rounded GWA values
            }

            // Return both labels and GWA values
            return [
                'labels' => $labels,
                'gwaValues' => $gwaValues,
            ];
        }

        return null; // Return null if no GWA records are found or query fails
    }

    public function getStudentsBySection($sectionId)
    {
        $query = $this->conn->prepare("
            SELECT
                student.lrn,
                student.student_id,
                student.student_lname,
                student.student_fname,
                student.student_mname,
                student.age,
                student.gender,
                student.profile_image,
                level.grade_level,
                section.section
            FROM
                student_tbl student
            INNER JOIN
                level_tbl level
            ON
                student.level_id = level.level_id
            INNER JOIN
                section_tbl section
            ON
                student.section_id = section.section_id
            WHERE 
                student.section_id = ?
            ORDER BY
                student.student_lname ASC
        ");
        $query->bind_param("s", $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);
            return $students;
        } else {

            return false;
        }
    }

    public function facultyFetchScores($studentId, $teacherId)
    {
        $query = $this->conn->prepare("
    SELECT 
        subject.subject_id,
        subject.subject,
        level.level_id,
        level.grade_level,
        section.section,
        section.section_id,
        quiz.quiz_id,
        quiz.quiz_number,
        quiz.title,
        score.score,
        student.student_lname,
        student.student_fname,
        student.student_mname,
        score.item_number,
        score.remarks,
        score.time,
        score.percentage
    FROM
        quiz_tbl quiz
    INNER JOIN
        subject_tbl subject ON subject.subject_id = quiz.subject_id
    INNER JOIN 
        section_tbl section ON section.section_id = subject.section_id
    INNER JOIN 
        level_tbl level ON level.level_id = section.level_id
    LEFT JOIN 
        student_tbl student ON student.section_id = section.section_id
    LEFT JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
    WHERE 
        student.student_id = ?
    AND
        subject.teacher_id = ?
    AND
        score.score IS NOT NULL
    ORDER BY
        score.time DESC");

        $query->bind_param("ss", $studentId, $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $allResults = $result->fetch_all(MYSQLI_ASSOC);

            foreach ($allResults as &$record) {
                $record['time'] = date('F j, Y', strtotime($record['time']));
            }

            return $allResults;
        } else {
            return null;
        }
    }
    public function facultyGetTotalQuizzesCount($studentId, $teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_tbl student
        ON student.section_id = subject.section_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        WHERE 
            student.student_id = ?
        AND 
            score.score IS NOT NULL
        AND
            subject.teacher_id = ?
    ");

        $query->bind_param("ss", $studentId, $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function facultyGetPendingQuizzesCount($sectionId, $studentId, $teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_tbl student
        ON student.section_id = subject.section_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        WHERE 
            student.section_id = ?
        AND 
            student.student_id = ?
        AND 
            quiz.status = 'Active'
        AND 
            score.score IS NULL
        AND
            subject.teacher_id = ?
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("sss", $sectionId, $studentId, $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function computeStudentGWAByLRN($lrn)
    {
        // Prepare the SQL query to get all GWA records for the student by LRN
        $query = $this->conn->prepare("
        SELECT gwa 
        FROM record_tbl 
        WHERE lrn = ?
    ");

        // Bind the LRN parameter
        $query->bind_param("s", $lrn);

        // Execute the query
        if ($query->execute()) {
            $result = $query->get_result();
            $gwaRecords = $result->fetch_all(MYSQLI_ASSOC);

            // Check if there are any GWA records
            if (count($gwaRecords) > 0) {
                $totalGwa = 0;
                $gwaCount = 0;

                // Loop through all GWA records and compute the sum
                foreach ($gwaRecords as $record) {
                    $totalGwa += $record['gwa'];
                    $gwaCount++;
                }

                // Compute the average GWA
                $generalAverage = $totalGwa / $gwaCount;

                return round($generalAverage, 2); // Return the rounded average GWA
            }
        }

        return null;
    }

    public function facultyGetAverageScore($studentId, $teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            AVG(score.score) AS average_score
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_tbl student
        ON student.section_id = subject.section_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id
        WHERE 
            student.student_id = ?
        AND 
            score.score IS NOT NULL
        AND
            subject.teacher_id = ?
    ");

        $query->bind_param("ss", $studentId, $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $scoreDetails = $result->fetch_assoc();

            if ($scoreDetails && isset($scoreDetails['average_score'])) {
                return round($scoreDetails['average_score'], 2);
            }
        }

        return null;
    }

    public function getStudentLRN($studentId)
    {
        $query = $this->conn->prepare("SELECT lrn FROM student_tbl WHERE student_id = ?");
        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result['lrn'];
        }

        return null;
    }

    public function getStudentGWA($lrn)
    {
        // Prepare the SQL query to concatenate grade_level and section without capitalization
        $query = $this->conn->prepare("
            SELECT gwa, 
                   CONCAT(grade_level, ' - ', section) AS grade_section
            FROM record_tbl 
            WHERE lrn = ?
        ");

        // Bind the LRN parameter
        $query->bind_param("s", $lrn);

        // Execute the query
        if ($query->execute()) {
            $result = $query->get_result();
            $gwaRecords = $result->fetch_all(MYSQLI_ASSOC);

            // Capitalize first letter of each word in PHP
            foreach ($gwaRecords as &$record) {
                $record['grade_section'] = ucwords(strtolower($record['grade_section']));
            }

            return $gwaRecords;
        } else {
            return [];
        }
    }

}