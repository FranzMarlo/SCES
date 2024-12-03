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
                student.section_id,
                login.email,
                login.disabled
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
    public function facultyGetLessons($levelId, $subjectID, $sectionId)
    {
        $query = $this->conn->prepare("SELECT * FROM lesson_tbl WHERE level_id = ? AND subject_id = ? AND section_id = ? ORDER BY lesson_number ASC");
        $query->bind_param("sss", $levelId, $subjectID, $sectionId);

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
            student_record record ON record.section_id = section.section_id
        INNER JOIN
            student_tbl student ON student.student_id = record.student_id
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
        LEFT JOIN student_record student ON student.section_id = section.section_id
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
        LEFT JOIN student_record student ON student.section_id = section.section_id
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
        LEFT JOIN student_record student ON student.section_id = section.section_id
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
                    quiz.status,
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
        student_record student ON student.section_id = section.section_id
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
    WHERE 
        grade.student_id = ?
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

    public function studentFetchGradesBySection($studentId, $sectionId)
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
    WHERE 
        grade.student_id = ?
    AND 
        subject.section_id = ?
    ORDER BY
        level.grade_level DESC");

        $query->bind_param("ss", $studentId, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $allResults = $result->fetch_all(MYSQLI_ASSOC);
            return $allResults;
        } else {
            return null;
        }
    }

    public function studentFetchGradesBySubject($studentId, $subjectId)
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
            grade.quarter,
            grade.student_id
        FROM
            grade_tbl grade
        INNER JOIN
            subject_tbl subject ON subject.subject_id = grade.subject_id
        INNER JOIN 
            section_tbl section ON section.section_id = subject.section_id
        INNER JOIN 
            level_tbl level ON level.level_id = section.level_id
        WHERE 
            grade.student_id = ?
        AND
            subject.subject_id = ?
        ORDER BY
            grade.quarter ASC");

        $query->bind_param("ss", $studentId, $subjectId);

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
        $studentData = $this->getStudentDetails($studentId);
        $sectionId = $studentData['section_id'];
        $currentMonth = date('n');
        $currentYear = date('Y');

        // Determine academic year range
        if ($currentMonth >= 6) {
            $startYear = $currentYear;
            $endYear = $currentYear + 1; // Ends in April next year
        } else {
            $startYear = $currentYear - 1;
            $endYear = $currentYear; // Ends in April this year
        }

        // Prepare months array with default values
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start from June 1 of academic year
        $endDate = strtotime("$endYear-04-30");        // Until April 30 of the next year

        while ($currentDate <= $endDate) {
            $monthLabel = date('F', $currentDate);  // Month only, no year
            $months[date('Y-m', $currentDate)] = [
                'month' => $monthLabel,
                'totalScore' => 0,
                'quizCount' => 0,
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Move to next month
        }

        // Query to get all quizzes for the section within the academic year
        $query = $this->conn->prepare("
        SELECT 
            quiz.quiz_id, DATE_FORMAT(quiz.add_time, '%Y-%m') AS month
        FROM
            quiz_tbl quiz
        INNER JOIN
            subject_tbl subject ON quiz.subject_id = subject.subject_id
        WHERE 
            quiz.add_time BETWEEN ? AND ?
        AND
            subject.section_id = ?
        AND 
            quiz.status IN ('Active', 'Completed')
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $startDate, $endDate, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Process each quiz and calculate scores by month
            while ($row = $result->fetch_assoc()) {
                $quizId = $row['quiz_id'];
                $monthKey = $row['month'];

                // Fetch the student score for the current quiz
                $score = $this->fetchScoreByQuizId($quizId, $studentId);

                // Update monthly data, using score 0 if no score is found
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['quizCount']++;
                    $months[$monthKey]['totalScore'] += ($score !== null) ? $score : 0;
                }
            }

            // Calculate average scores for each month
            $scores = [];
            foreach ($months as $month) {
                if ($month['quizCount'] > 0) {
                    $averageScore = $month['totalScore'] / $month['quizCount'];
                    $scores[] = round($averageScore, 2);
                } else {
                    $scores[] = 0; // No quizzes in that month
                }
            }

            // Prepare final data for return
            $data = [
                'months' => array_column($months, 'month'), // Month names (June, July, etc.)
                'scores' => $scores                          // Calculated scores
            ];

            return $data;
        } else {
            return null; // Handle error in case of query failure
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

    public function fetchAverageGWA()
    {
        $query = $this->conn->prepare("
        SELECT 
            grade_level,         
            AVG(gwa) AS average_gwa
        FROM 
            record_tbl 
        GROUP BY 
            grade_level
        ORDER BY 
            grade_level ASC
    ");

        if ($query->execute()) {
            $result = $query->get_result();
            $gwaRecords = $result->fetch_all(MYSQLI_ASSOC);

            $labels = [];
            $averageGwaValues = [];

            foreach ($gwaRecords as $record) {
                $labels[] = ucfirst(strtolower($record['grade_level']));
                $averageGwaValues[] = round($record['average_gwa'], 2); // Round to 2 decimal places
            }

            // Return both labels and average GWA values
            return [
                'labels' => $labels,
                'averageGwaValues' => $averageGwaValues,
            ];
        }

        return null; // Return null if no GWA records are found or query fails
    }

    public function fetchAverageGWAWithFilter($year, $gradeLevel)
    {
        if ($year === 'All' && $gradeLevel === 'All') {
            // Case 1: All years and all grade levels, grouped by grade_level
            $query = $this->conn->prepare("
            SELECT 
                grade_level,
                AVG(gwa) AS average_gwa
            FROM 
                record_tbl
            GROUP BY 
                grade_level
            ORDER BY 
                grade_level ASC
        ");
        } elseif ($year === 'All') {
            // Case 2: All years for a specific grade level
            $query = $this->conn->prepare("
            SELECT 
                year,
                grade_level,
                AVG(gwa) AS average_gwa
            FROM 
                record_tbl
            WHERE 
                grade_level = ?
            GROUP BY 
                year, grade_level
            ORDER BY 
                year ASC, grade_level ASC
            LIMIT 
                6
        ");
            $query->bind_param("s", $gradeLevel);
        } elseif ($gradeLevel === 'All') {
            // Case 3: A specific year for all grade levels, with labeling by year
            $query = $this->conn->prepare("
            SELECT 
                grade_level,
                AVG(gwa) AS average_gwa
            FROM 
                record_tbl
            WHERE 
                year = ?
            GROUP BY 
                grade_level
            ORDER BY 
                grade_level ASC
        ");
            $query->bind_param("i", $year);
        } else {
            // Case 4: A specific year and a specific grade level
            $query = $this->conn->prepare("
            SELECT 
                grade_level,
                AVG(gwa) AS average_gwa
            FROM 
                record_tbl
            WHERE 
                year = ?
            AND 
                grade_level = ?
            GROUP BY 
                grade_level
            ORDER BY 
                grade_level ASC
        ");
            $query->bind_param("is", $year, $gradeLevel);
        }

        if ($query->execute()) {
            $result = $query->get_result();
            $gwaRecords = $result->fetch_all(MYSQLI_ASSOC);

            $labels = [];
            $averageGwaValues = [];

            foreach ($gwaRecords as $record) {
                if ($year === 'All' && $gradeLevel === 'All') {
                    // Label for all years and all grade levels
                    $labels[] = ucfirst(strtolower($record['grade_level']));
                } elseif ($year === 'All') {
                    // Label for all years but specific grade level
                    $labels[] = ucfirst(strtolower($record['year'])) . " - " . ucfirst(strtolower($record['grade_level']));
                } elseif ($gradeLevel === 'All') {
                    // Label for specific year and all grade levels
                    $labels[] = ucfirst(strtolower($record['grade_level']));
                } else {
                    // Label for specific year and specific grade level
                    $labels[] = ucfirst(strtolower($record['grade_level']));
                }
                $averageGwaValues[] = round($record['average_gwa'], 2); // Round to 2 decimal places
            }

            return [
                'labels' => $labels,
                'averageGwaValues' => $averageGwaValues,
            ];
        }

        return null; // Return null if no GWA records are found or query fails
    }





    public function getStudentsBySection($sectionId)
    {
        $query = $this->conn->prepare("
            SELECT
                student.lrn,
                record.student_id,
                student.student_lname,
                student.student_fname,
                student.student_mname,
                student.age,
                student.gender,
                student.profile_image,
                level.grade_level,
                record.level_id,
                student.level_id AS present_id,
                record.section_id,
                section.section,
                section.teacher_id
            FROM
                student_record record
            INNER JOIN
                student_tbl student
            ON
                student.student_id = record.student_id
            INNER JOIN
                level_tbl level
            ON
                record.level_id = level.level_id
            INNER JOIN
                section_tbl section
            ON
                record.section_id = section.section_id
            WHERE 
                record.section_id = ?
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

    public function getStudentClassmate($sectionId)
    {
        $query = $this->conn->prepare("
            SELECT
                CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
                student.profile_image,
                level.grade_level,
                record.level_id,
                record.section_id
            FROM
                student_record record
            INNER JOIN
                student_tbl student
            ON
                student.student_id = record.student_id
            INNER JOIN
                level_tbl level
            ON
                record.level_id = level.level_id
            INNER JOIN
                section_tbl section
            ON
                record.section_id = section.section_id
            WHERE 
                record.section_id = ?
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

    public function getAllStudents()
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
            ORDER BY
                student.student_lname ASC
        ");
        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);
            return $students;
        } else {

            return false;
        }
    }

    public function getAllStudentsWithFilter($year, $gradeLevel)
    {
        if ($year === 'All' && $gradeLevel === 'All') {
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
                section.section,
                section.year
            FROM
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            ORDER BY
                student.student_lname ASC
        ");
        } elseif ($year === 'All') {
            // Case 2: All years for a specific grade level
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
                section.section,
                section.year
            FROM
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            WHERE
                level.grade_level = ?
            ORDER BY
                student.student_lname ASC
        ");
            $query->bind_param("s", $gradeLevel);
        } elseif ($gradeLevel === 'All') {
            // Case 3: A specific year for all grade levels
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
                section.section,
                section.year
            FROM
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            WHERE
                section.year = ?
            ORDER BY
                student.student_lname ASC
        ");
            $query->bind_param("i", $year);
        } else {
            // Case 4: A specific year and a specific grade level
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
                section.section,
                section.year
            FROM
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            WHERE
                section.year = ?
                AND level.grade_level = ?
            ORDER BY
                student.student_lname ASC
        ");
            $query->bind_param("is", $year, $gradeLevel);
        }

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return false;
        }
    }



    public function facultyFetchScores($studentId)
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
        student.student_id,
        CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
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
    INNER JOIN 
        student_record record ON record.section_id = section.section_id
    INNER JOIN
        student_tbl student ON student.student_id = record.student_id
    INNER JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
    WHERE 
        score.student_id = ?
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

    public function facultyFetchScoresBySection($studentId, $sectionId)
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
        student.student_id,
        CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
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
    INNER JOIN 
        student_record record ON record.section_id = section.section_id
    INNER JOIN
        student_tbl student ON student.student_id = record.student_id
    INNER JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = student.student_id
    WHERE 
        score.student_id = ?
    AND
        score.score IS NOT NULL
    AND
        subject.section_id = ?
    ORDER BY
        score.time DESC");

        $query->bind_param("ss", $studentId, $sectionId);

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

    public function facultyFetchScoresBySubject($studentId, $subjectId)
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
        record.student_id,
        CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
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
    INNER JOIN 
        student_record record ON record.section_id = section.section_id
    INNER JOIN
        student_tbl student ON student.student_id = record.student_id
    INNER JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = record.student_id
    WHERE 
        score.student_id = ?
    AND
        quiz.subject_id = ?
    AND
        score.score IS NOT NULL
    ORDER BY
        score.time DESC");

        $query->bind_param("ss", $studentId, $subjectId);

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

    public function facultyGetTotalQuizzesCount($studentId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
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
    ");

        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function facultyGetTotalQuizzesCountBySection($studentId, $sectionId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
        ON student.section_id = subject.section_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        WHERE 
            student.student_id = ?
        AND
            subject.section_id = ?
        AND
            score.score IS NOT NULL
    ");

        $query->bind_param("ss", $studentId, $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function sectionGetTotalQuizzesCount($sectionId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        WHERE 
            subject.section_id = ?
        AND
            quiz.status = 'Completed'
    ");

        $query->bind_param("s", $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function facultyGetTotalQuizzesCountBySubject($studentId, $subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
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
            quiz.subject_id = ?
    ");

        $query->bind_param("ss", $studentId, $subjectId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function facultyGetPendingQuizzesCount($studentId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
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
            student.student_id = ?
        AND 
            score.score IS NULL
        AND
            (quiz.status = 'Active' OR quiz.status = 'Completed')
    ");

        $query->bind_param("s", $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function facultyGetPendingQuizzesCountBySection($sectionId, $studentId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
        ON student.section_id = subject.section_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        WHERE 
            subject.section_id = ?
        AND 
            student.student_id = ?
        AND 
            score.score IS NULL
        AND
            (quiz.status = 'Active' OR quiz.status = 'Completed')
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("ss", $sectionId, $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function sectionGetPendingQuizzesCount($sectionId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        WHERE 
            subject.section_id = ?
        AND
            quiz.status = 'Active'
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function facultyGetPendingQuizzesCountBySubject($studentId, $subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student
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
            student.student_id = ?
        AND
            (quiz.status = 'Active' OR quiz.status = 'Completed')
        AND 
            score.score IS NULL
        AND
            quiz.subject_id = ?
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("ss", $studentId, $subjectId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0;
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

    public function facultyGetAverageScore($studentId)
    {
        $query = $this->conn->prepare("
        SELECT 
            AVG(score.score) AS average_score
        FROM score_tbl score
        INNER JOIN quiz_tbl quiz ON score.quiz_id = quiz.quiz_id
        WHERE 
            score.student_id = ?
        AND 
            score.score IS NOT NULL
    ");

        $query->bind_param("s", $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $scoreDetails = $result->fetch_assoc();

            if ($scoreDetails && isset($scoreDetails['average_score'])) {
                return round($scoreDetails['average_score'], 2);
            }
        }

        return null;
    }


    public function facultyGetAverageScoreBySection($studentId, $sectionId)
    {
        // Query 1: Count all quizzes in the section
        $totalQuizzesQuery = $this->conn->prepare("
        SELECT COUNT(quiz.quiz_id) AS total_quizzes
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        WHERE subject.section_id = ?
        AND quiz.status IN ('Active', 'Completed')
    ");
        $totalQuizzesQuery->bind_param("s", $sectionId);

        if ($totalQuizzesQuery->execute()) {
            $totalQuizzesResult = $totalQuizzesQuery->get_result();
            $totalQuizzesData = $totalQuizzesResult->fetch_assoc();
            $totalQuizzes = $totalQuizzesData['total_quizzes'] ?? 0;
        } else {
            return null; // Return null if the query fails
        }

        if ($totalQuizzes === 0) {
            return 0;
        }

        $totalScoreQuery = $this->conn->prepare("
        SELECT SUM(score.score) AS total_score
        FROM score_tbl score
        INNER JOIN quiz_tbl quiz ON quiz.quiz_id = score.quiz_id
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        WHERE score.student_id = ?
        AND subject.section_id = ?
        AND score.score IS NOT NULL
    ");
        $totalScoreQuery->bind_param("ss", $studentId, $sectionId);

        if ($totalScoreQuery->execute()) {
            $totalScoreResult = $totalScoreQuery->get_result();
            $totalScoreData = $totalScoreResult->fetch_assoc();
            $totalScore = $totalScoreData['total_score'] ?? 0;
        } else {
            return null; // Return null if the query fails
        }

        // Calculate the average score by dividing the total score by the number of quizzes
        $averageScore = $totalScore / $totalQuizzes;
        return round($averageScore, 2); // Round to 2 decimal places
    }


    public function facultyGetAverageScoreBySubject($studentId, $subjectId)
    {
        // Query 1: Count all quizzes for the subject
        $totalQuizzesQuery = $this->conn->prepare("
        SELECT COUNT(quiz.quiz_id) AS total_quizzes
        FROM quiz_tbl quiz
        WHERE quiz.subject_id = ?
        AND quiz.status IN ('Active', 'Completed')
    ");
        $totalQuizzesQuery->bind_param("s", $subjectId);

        if ($totalQuizzesQuery->execute()) {
            $totalQuizzesResult = $totalQuizzesQuery->get_result();
            $totalQuizzesData = $totalQuizzesResult->fetch_assoc();
            $totalQuizzes = $totalQuizzesData['total_quizzes'] ?? 0;
        } else {
            return null;
        }

        if ($totalQuizzes === 0) {
            return 0;
        }

        $totalScoreQuery = $this->conn->prepare("
        SELECT SUM(score.score) AS total_score
        FROM score_tbl score
        INNER JOIN quiz_tbl quiz ON quiz.quiz_id = score.quiz_id
        WHERE score.student_id = ?
        AND quiz.subject_id = ?
        AND score.score IS NOT NULL
    ");
        $totalScoreQuery->bind_param("ss", $studentId, $subjectId);

        if ($totalScoreQuery->execute()) {
            $totalScoreResult = $totalScoreQuery->get_result();
            $totalScoreData = $totalScoreResult->fetch_assoc();
            $totalScore = $totalScoreData['total_score'] ?? 0;
        } else {
            return null; // Return null if the query fails
        }

        // Calculate the average score (total score divided by total quizzes)
        $averageScore = $totalScore / $totalQuizzes;
        return round($averageScore, 2); // Round to 2 decimal places
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
                   CONCAT(grade_level, ' - ', section) AS grade_section,
                   remarks
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
                $record['remarks'] = ucwords(strtolower($record['remarks']));
            }

            return $gwaRecords;
        } else {
            return [];
        }
    }

    public function studentGetQuizCompletionBySubject($studentId, $subjectId)
    {
        $currentMonth = date('n');
        $currentYear = date('Y');
        $emptyValue = "0%";

        if ($currentMonth >= 6) {
            $schoolYearStart = "$currentYear-06-01";
            $schoolYearEnd = ($currentYear + 1) . "-04-30";
        } else {
            $schoolYearStart = ($currentYear - 1) . "-06-01";
            $schoolYearEnd = "$currentYear-04-30";
        }

        $totalQuizzesQuery = $this->conn->prepare("
            SELECT 
                COUNT(DISTINCT quiz.quiz_id) AS total_quiz_count
            FROM quiz_tbl quiz
            INNER JOIN subject_tbl subject
            ON subject.subject_id = quiz.subject_id
            INNER JOIN student_record student
            ON student.section_id = subject.section_id
            WHERE 
                student.student_id = ?
            AND quiz.subject_id = ?
            AND quiz.status IN ('Active', 'Completed')
            AND quiz.due_date BETWEEN ? AND ?
        ");
        $totalQuizzesQuery->bind_param("ssss", $studentId, $subjectId, $schoolYearStart, $schoolYearEnd);

        if ($totalQuizzesQuery->execute()) {
            $result = $totalQuizzesQuery->get_result();
            $totalQuizData = $result->fetch_assoc();
            $totalQuizCount = $totalQuizData['total_quiz_count'];
        } else {
            return $emptyValue;
        }

        $completedQuizzesQuery = $this->conn->prepare("
            SELECT 
                COUNT(DISTINCT quiz.quiz_id) AS completed_quiz_count
            FROM quiz_tbl quiz
            INNER JOIN subject_tbl subject
            ON subject.subject_id = quiz.subject_id
            INNER JOIN student_record student
            ON student.section_id = subject.section_id
            LEFT JOIN score_tbl score
            ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
            WHERE 
                student.student_id = ?
            AND quiz.subject_id = ?
            AND quiz.status IN ('Active', 'Completed')
            AND quiz.due_date BETWEEN ? AND ?
            AND score.score IS NOT NULL
        ");
        $completedQuizzesQuery->bind_param("ssss", $studentId, $subjectId, $schoolYearStart, $schoolYearEnd);

        if ($completedQuizzesQuery->execute()) {
            $result = $completedQuizzesQuery->get_result();
            $completedQuizData = $result->fetch_assoc();
            $completedQuizCount = $completedQuizData['completed_quiz_count'];
        } else {
            return $emptyValue;
        }

        return [
            'totalQuizzes' => $totalQuizCount,
            'totalCompleted' => $completedQuizCount
        ];
    }

    public function studentFetchScoresBySubject($studentId, $subjectId)
    {
        $currentMonth = date('n');  // Current month number (1-12)
        $currentYear = date('Y');   // Current year

        // Determine the academic year based on the current month
        if ($currentMonth >= 6) {
            $startYear = $currentYear;       // Academic year starts this year
            $endYear = $currentYear + 1;     // Academic year ends next year
        } else {
            $startYear = $currentYear - 1;   // Academic year started last year
            $endYear = $currentYear;         // Academic year ends this year
        }

        // Initialize months array with all months in the academic year (June-April)
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year (June 1)
        $endDate = strtotime("$endYear-04-30");       // End of academic year (April 30)

        while ($currentDate <= $endDate) {
            $monthKey = date('Y-m', $currentDate);
            $monthLabel = date('F', $currentDate);   // e.g., "June", "July"
            $months[$monthKey] = [
                'month' => $monthLabel,
                'avg_score' => 0,  // Initialize average score to 0 for each month
                'quiz_ids' => []
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Move to next month
        }

        // Query to get all quizzes within the academic year range, using due_date
        $query = $this->conn->prepare("
        SELECT 
            quiz.quiz_id, DATE_FORMAT(quiz.add_time, '%Y-%m') AS month
        FROM
            quiz_tbl quiz
        WHERE 
            quiz.add_time BETWEEN ? AND ?
        AND
            quiz.subject_id = ?
        AND 
            quiz.status IN ('Active', 'Completed')
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $startDate, $endDate, $subjectId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Populate quiz IDs for each month
            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['quiz_ids'][] = $row['quiz_id'];
                }
            }

            // Calculate average score per month based on quizzes available and attempted by the student
            foreach ($months as $monthKey => &$monthData) {
                $totalScore = 0;
                $quizCount = count($monthData['quiz_ids']);  // Total quizzes in the month

                foreach ($monthData['quiz_ids'] as $quizId) {
                    $score = $this->fetchScoreByQuizId($quizId, $studentId);

                    if ($score !== null) { // Only add to total score if the student attempted it
                        $totalScore += $score;
                    }
                }

                // Calculate average score for the month, including unattempted quizzes in the count
                if ($quizCount > 0) {
                    $monthData['avg_score'] = round($totalScore / $quizCount, 2);
                }
            }

            // Prepare data for the line chart
            $data = [
                'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
                'scores' => array_column($months, 'avg_score')  // Average scores
            ];

            return $data;
        } else {
            return null;  // Return null in case of failure
        }
    }

    public function studentFetchScoresBySection($studentId, $sectionId)
    {
        $currentMonth = date('n');  // Current month number (1-12)
        $currentYear = date('Y');   // Current year

        // Determine the academic year based on the current month
        if ($currentMonth >= 6) {
            $startYear = $currentYear;       // Academic year starts this year
            $endYear = $currentYear + 1;     // Academic year ends next year
        } else {
            $startYear = $currentYear - 1;   // Academic year started last year
            $endYear = $currentYear;         // Academic year ends this year
        }

        // Initialize months array with all months in the academic year (June-April)
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year (June 1)
        $endDate = strtotime("$endYear-04-30");        // End of academic year (April 30)

        while ($currentDate <= $endDate) {
            $monthKey = date('Y-m', $currentDate);
            $monthLabel = date('F', $currentDate);      // e.g., "June", "July"
            $months[$monthKey] = [
                'month' => $monthLabel,
                'avg_score' => 0,                      // Initialize average score to 0 for each month
                'quiz_ids' => []
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Move to next month
        }

        // Query to get all quizzes within the academic year range
        $query = $this->conn->prepare("
        SELECT 
            quiz.quiz_id, DATE_FORMAT(quiz.add_time, '%Y-%m') AS month
        FROM
            quiz_tbl quiz
        INNER JOIN
            subject_tbl subject ON quiz.subject_id = subject.subject_id
        INNER JOIN
            section_tbl section ON subject.section_id = section.section_id
        WHERE 
            quiz.add_time BETWEEN ? AND ?
        AND 
            quiz.status IN ('Active', 'Completed')
        AND
            subject.section_id = ?
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $startDate, $endDate, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Populate quiz IDs for each month
            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['quiz_ids'][] = $row['quiz_id'];
                }
            }

            // Calculate average score per month based on quizzes attempted by the student
            foreach ($months as $monthKey => &$monthData) {
                $totalScore = 0;
                $quizCount = count($monthData['quiz_ids']);  // Total quizzes in the month

                foreach ($monthData['quiz_ids'] as $quizId) {
                    $score = $this->fetchScoreByQuizId($quizId, $studentId);

                    if ($score !== null) { // Only add to total score if the student attempted it
                        $totalScore += $score;
                    }
                }

                // Calculate average score for the month, including unattempted quizzes in the count
                if ($quizCount > 0) {
                    $monthData['avg_score'] = round($totalScore / $quizCount, 2);
                }
            }

            // Prepare data for output
            $data = [
                'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
                'scores' => array_column($months, 'avg_score')  // Average scores
            ];

            return $data;
        } else {
            return null;  // Return null in case of failure
        }
    }

    public function studentFetchScoresByMonth($studentId)
    {
        $currentMonth = date('n');
        $currentYear = date('Y');

        if ($currentMonth >= 6) {
            $startYear = $currentYear;
            $endYear = $currentYear + 1;
        } else {
            $startYear = $currentYear - 1;
            $endYear = $currentYear;
        }

        $months = [];
        $currentDate = strtotime("$startYear-06-01");
        $endDate = strtotime("$endYear-04-30");

        while ($currentDate <= $endDate) {
            $monthLabel = date('F', $currentDate);
            $months[date('Y-m', $currentDate)] = [
                'month' => $monthLabel,
                'avg_score' => 0
            ];
            $currentDate = strtotime("+1 month", $currentDate);
        }

        $query = $this->conn->prepare("
        SELECT 
            DATE_FORMAT(score.time, '%Y-%m') AS month,  
            AVG(score.score) AS avg_score
        FROM
            quiz_tbl quiz
        INNER JOIN
            score_tbl score ON score.quiz_id = quiz.quiz_id
        WHERE 
            score.student_id = ?
        AND 
            score.score IS NOT NULL
        AND 
            score.time BETWEEN ? AND ?
        GROUP BY 
            month
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $studentId, $startDate, $endDate);

        if ($query->execute()) {
            $result = $query->get_result();

            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];

                if (isset($months[$monthKey])) {
                    $months[$monthKey]['avg_score'] = (float) $row['avg_score'];
                }
            }

            $data = [
                'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
                'scores' => array_column($months, 'avg_score')  // Average scores
            ];

            return $data;
        } else {
            return null;
        }
    }
    public function studentFetchScoresBySectionMonthly($studentId, $sectionId)
    {
        $currentMonth = date('n');  // Current month number (1-12)
        $currentYear = date('Y');   // Current year

        // Determine the academic year based on the current month
        if ($currentMonth >= 6) {
            $startYear = $currentYear;       // Academic year starts this year
            $endYear = $currentYear + 1;     // Academic year ends next year
        } else {
            $startYear = $currentYear - 1;   // Academic year started last year
            $endYear = $currentYear;         // Academic year ends this year
        }

        // Initialize months array with all months in the academic year (June-April)
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year (June 1)
        $endDate = strtotime("$endYear-04-30");        // End of academic year (April 30)

        while ($currentDate <= $endDate) {
            $monthKey = date('Y-m', $currentDate);
            $monthLabel = date('F', $currentDate);      // e.g., "June", "July"
            $months[$monthKey] = [
                'month' => $monthLabel,
                'avg_score' => 0,                      // Initialize average score to 0 for each month
                'quiz_ids' => []
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Move to next month
        }

        // Query to get all quizzes within the academic year range
        $query = $this->conn->prepare("
        SELECT 
            quiz.quiz_id, DATE_FORMAT(quiz.add_time, '%Y-%m') AS month
        FROM
            quiz_tbl quiz
        INNER JOIN
            subject_tbl subject ON quiz.subject_id = subject.subject_id
        WHERE 
            quiz.add_time BETWEEN ? AND ?
        AND 
            quiz.status IN ('Active', 'Completed')
        AND
            subject.section_id = ?
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $startDate, $endDate, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Populate quiz IDs for each month
            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['quiz_ids'][] = $row['quiz_id'];
                }
            }

            // Calculate average score per month based on quizzes attempted by the student
            foreach ($months as $monthKey => &$monthData) {
                $totalScore = 0;
                $quizCount = count($monthData['quiz_ids']);  // Total quizzes in the month

                foreach ($monthData['quiz_ids'] as $quizId) {
                    $score = $this->fetchScoreByQuizId($quizId, $studentId);

                    if ($score !== null) { // Only add to total score if the student attempted it
                        $totalScore += $score;
                    }
                }

                // Calculate average score for the month, including unattempted quizzes in the count
                if ($quizCount > 0) {
                    $monthData['avg_score'] = round($totalScore / $quizCount, 2);
                }
            }

            // Prepare data for output
            $data = [
                'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
                'scores' => array_column($months, 'avg_score')  // Average scores
            ];

            return $data;
        } else {
            return null;  // Return null in case of failure
        }
    }


    public function studentFetchScoresByMonthWithFilter($studentId, $year, $gradeLevel)
    {
        $months = [];
        $currentYear = date('Y');

        // Prepare months array with labels from June to April
        $currentDate = strtotime("$currentYear-06-01");
        $endDate = strtotime(($currentYear + 1) . "-04-30");
        while ($currentDate <= $endDate) {
            $monthLabel = date('F', $currentDate);
            $months[date('Y-m', $currentDate)] = [
                'month' => $monthLabel,
                'avg_score' => 0
            ];
            $currentDate = strtotime("+1 month", $currentDate);
        }

        // Adjust queries based on year and grade level parameters
        if ($year === 'All' && $gradeLevel === 'All') {
            // Case 1: All years and all grade levels
            $query = $this->conn->prepare("
            SELECT 
                DATE_FORMAT(score.time, '%Y-%m') AS month,  
                AVG(score.score) AS avg_score
            FROM
                score_tbl score
            WHERE 
                score.student_id = ?
                AND score.score IS NOT NULL
            GROUP BY 
                month
            ORDER BY 
                month ASC
        ");
            $query->bind_param("s", $studentId);

        } elseif ($year === 'All') {
            // Case 2: All years for a specific grade level
            $query = $this->conn->prepare("
            SELECT 
                DATE_FORMAT(score.time, '%Y-%m') AS month,  
                AVG(score.score) AS avg_score
            FROM
                score_tbl score
            INNER JOIN
                student_record students ON students.student_id = score.student_id
            INNER JOIN
                section_tbl section ON students.section_id = section.section_id
            INNER JOIN
                level_tbl level ON section.level_id = level.level_id
            WHERE 
                score.student_id = ?
                AND level.grade_level = ?
                AND score.score IS NOT NULL
            GROUP BY 
                month
            ORDER BY 
                month ASC
        ");
            $query->bind_param("ss", $studentId, $gradeLevel);

        } elseif ($gradeLevel === 'All') {
            // Case 3: A specific year for all grade levels
            $query = $this->conn->prepare("
            SELECT 
                DATE_FORMAT(score.time, '%Y-%m') AS month,  
                AVG(score.score) AS avg_score
            FROM
                quiz_tbl quiz
            INNER JOIN
                score_tbl score ON score.quiz_id = quiz.quiz_id
            INNER JOIN
                subject_tbl subject ON quiz.subject_id = subject.subject_id
            WHERE 
                score.student_id = ?
                AND subject.year = ?
                AND score.score IS NOT NULL
            GROUP BY 
                month
            ORDER BY 
                month ASC
        ");
            $query->bind_param("si", $studentId, $year);

        } else {
            // Case 4: A specific year and a specific grade level
            $query = $this->conn->prepare("
            SELECT 
                DATE_FORMAT(score.time, '%Y-%m') AS month,  
                AVG(score.score) AS avg_score
            FROM
                quiz_tbl quiz
            INNER JOIN
                score_tbl score ON score.quiz_id = quiz.quiz_id
            INNER JOIN
                student_tbl students ON students.student_id = score.student_id
            INNER JOIN
                section_tbl section ON students.section_id = section.section_id
            INNER JOIN
                level_tbl level ON section.level_id = level.level_id
            INNER JOIN
                subject_tbl subject ON quiz.subject_id = subject.subject_id
            WHERE 
                score.student_id = ?
                AND level.grade_level = ?
                AND subject.year = ?
                AND score.score IS NOT NULL
            GROUP BY 
                month
            ORDER BY 
                month ASC
        ");
            $query->bind_param("ssi", $studentId, $gradeLevel, $year);
        }

        if ($query->execute()) {
            $result = $query->get_result();

            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['avg_score'] = (float) $row['avg_score'];
                }
            }

            return [
                'months' => array_column($months, 'month'),
                'scores' => array_column($months, 'avg_score')
            ];
        } else {
            return null;
        }
    }




    public function studentFetchScoresByGradeLevel($studentId)
    {
        // Step 1: Retrieve all grade levels from level_tbl
        $allLevelsQuery = $this->conn->prepare("SELECT grade_level FROM level_tbl ORDER BY grade_level ASC");
        $allLevelsQuery->execute();
        $allLevelsResult = $allLevelsQuery->get_result();

        // Initialize grades and scores arrays with all grade levels and default scores of 0
        $grades = [];
        $scores = [];
        while ($row = $allLevelsResult->fetch_assoc()) {
            $grades[$row['grade_level']] = 0;  // Initialize each grade level with a score of 0
        }

        // Step 2: Retrieve average scores for each grade level associated with the student
        $query = $this->conn->prepare("
        SELECT 
            level.grade_level AS grade_level,  
            AVG(score.score) AS avg_score
        FROM
            quiz_tbl quiz
        INNER JOIN
            score_tbl score ON score.quiz_id = quiz.quiz_id
        INNER JOIN
            subject_tbl subject ON quiz.subject_id = subject.subject_id
        INNER JOIN
            level_tbl level ON subject.level_id = level.level_id
        WHERE 
            score.student_id = ?
        AND 
            score.score IS NOT NULL
        GROUP BY 
            level.grade_level
        ORDER BY 
            level.grade_level ASC
    ");
        $query->bind_param("s", $studentId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Update scores for grade levels that have data
            while ($row = $result->fetch_assoc()) {
                $grades[$row['grade_level']] = (float) $row['avg_score'];
            }

            return [
                'grades' => array_keys($grades),  // Grade level labels
                'scores' => array_values($grades)  // Average scores, with 0 for missing grade levels
            ];
        } else {
            return null;
        }
    }

    public function studentFetchScoresByGradeLevelWithFilter($studentId, $year, $gradeLevel)
    {
        // Step 1: Retrieve all grade levels from level_tbl for initializing scores
        $allLevelsQuery = $this->conn->prepare("SELECT grade_level FROM level_tbl ORDER BY grade_level ASC");
        $allLevelsQuery->execute();
        $allLevelsResult = $allLevelsQuery->get_result();

        // Initialize grades and scores arrays with default scores of 0
        $grades = [];
        while ($row = $allLevelsResult->fetch_assoc()) {
            $grades[$row['grade_level']] = 0;  // Initialize each grade level with a score of 0
        }

        // Step 2: Build the SQL query based on filter conditions
        $sql = "
        SELECT 
            level.grade_level AS grade_level,  
            AVG(score.score) AS avg_score
        FROM
            quiz_tbl quiz
        INNER JOIN
            score_tbl score ON score.quiz_id = quiz.quiz_id
        INNER JOIN
            subject_tbl subject ON quiz.subject_id = subject.subject_id
        INNER JOIN
            level_tbl level ON subject.level_id = level.level_id
        WHERE 
            score.student_id = ? AND score.score IS NOT NULL";
        // Add conditional filters based on the year and grade level
        $params = ["s", $studentId]; // Parameter types and values
        if ($year !== 'All') {
            $sql .= " AND subject.year = ?";
            $params[0] .= "i"; // Append "i" for integer year
            $params[] = $year;
        }

        // If grade level is not "All," filter by the selected grade level
        if ($gradeLevel !== 'All') {
            $sql .= " AND level.grade_level = ?";
            $params[0] .= "s"; // Append "s" for string grade level
            $params[] = $gradeLevel;
        }

        // Group by grade level to get average scores per grade level
        $sql .= " GROUP BY level.grade_level ORDER BY level.grade_level ASC";

        // Prepare and bind the parameters dynamically
        $query = $this->conn->prepare($sql);
        $query->bind_param(...$params);

        if ($query->execute()) {
            $result = $query->get_result();

            // Create a mapping of grade levels to scores
            $filteredGrades = [];
            while ($row = $result->fetch_assoc()) {
                $filteredGrades[$row['grade_level']] = (float) $row['avg_score']; // Map grade level to average score
            }

            // Create the final grades and scores to return
            $displayGrades = ($gradeLevel === 'All') ? array_keys($grades) : [$gradeLevel]; // Show all or just the selected
            $displayScores = [];

            // Map scores to display grades
            foreach ($displayGrades as $grade) {
                $displayScores[] = isset($filteredGrades[$grade]) ? $filteredGrades[$grade] : 0; // Set score to 0 if no score found
            }

            return [
                'grades' => $displayGrades,  // Return only selected or all grade levels
                'scores' => $displayScores    // Corresponding scores
            ];
        } else {
            return null;
        }
    }



    public function getStudentQuizRecords($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT
            student.student_id,
            quiz.quiz_id,
            CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
            quiz.quiz_number,
            CONCAT(score_tbl.score, '/', score_tbl.item_number) AS quiz_score,
            score_tbl.remarks,
            score_tbl.time
        FROM student_tbl student
        LEFT JOIN score_tbl ON student.student_id = score_tbl.student_id
        LEFT JOIN quiz_tbl quiz ON score_tbl.quiz_id = quiz.quiz_id
        INNER JOIN subject_tbl subject ON quiz.subject_id = subject.subject_id
        WHERE subject.subject_id = ?
        AND quiz.status IN ('Active', 'Completed')
        ORDER BY score_tbl.time DESC
    ");

        $query->bind_param("s", $subjectId);
        if ($query->execute()) {
            $result = $query->get_result();
            $studentQuizRecords = $result->fetch_all(MYSQLI_ASSOC);
            return $studentQuizRecords;
        }

        return [];
    }

    public function studentAverageScoreBySubject($studentId, $sectionId)
    {
        $currentMonth = date('n');
        $currentYear = date('Y');

        // Determine the academic year based on the current month
        if ($currentMonth >= 6) {
            $startYear = $currentYear;
            $endYear = $currentYear + 1;
        } else {
            $startYear = $currentYear - 1;
            $endYear = $currentYear;
        }

        // Define the academic year start and end dates
        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";

        // Query to get all subjects for the section, and quiz IDs within the academic year
        $query = $this->conn->prepare("
        SELECT 
            subj.subject AS subject_label,
            subj.subject_code,
            subj.subject_id,
            quiz.quiz_id
        FROM
            subject_tbl subj
        LEFT JOIN
            quiz_tbl quiz ON subj.subject_id = quiz.subject_id
            AND quiz.add_time BETWEEN ? AND ?
            AND quiz.status IN ('Active', 'Completed')
        WHERE
            subj.section_id = ?
        ORDER BY 
            subj.subject ASC
    ");

        // Bind the parameters
        $query->bind_param("sss", $startDate, $endDate, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            // Initialize arrays to store data for each subject
            $subjects = [];
            $scores = [];
            $subjectCodes = [];
            $subjectsData = [];

            while ($row = $result->fetch_assoc()) {
                $subjectLabel = $row['subject_label'];
                $subjectCode = strtolower($row['subject_code']);
                $subjectId = $row['subject_id'];
                $quizId = $row['quiz_id'];

                // Initialize if subject is not already in the data array
                if (!isset($subjectsData[$subjectId])) {
                    $subjectsData[$subjectId] = [
                        'label' => $subjectLabel,
                        'code' => $subjectCode,
                        'totalScore' => 0,
                        'quizCount' => 0,
                        'attemptedQuizCount' => 0,
                    ];
                }

                // Fetch the student score if there is a quiz ID
                if ($quizId) {
                    $score = $this->fetchScoreByQuizId($quizId, $studentId);

                    $subjectsData[$subjectId]['quizCount']++;
                    if ($score !== null) {
                        $subjectsData[$subjectId]['totalScore'] += $score;
                        $subjectsData[$subjectId]['attemptedQuizCount']++;
                    }
                }
            }

            // Calculate averages and prepare final arrays for return
            foreach ($subjectsData as $subject) {
                $subjects[] = $subject['label'];
                $subjectCodes[] = $subject['code'];

                // Calculate average score, setting to zero if no attempted quizzes
                if ($subject['quizCount'] > 0) {
                    $averageScore = $subject['totalScore'] / $subject['quizCount'];
                    $scores[] = round($averageScore, 2);
                } else {
                    $scores[] = 0; // No score available if no quizzes were present
                }
            }

            // Prepare data for the bar chart
            $data = [
                'subjects' => $subjects,
                'scores' => $scores,
                'subjectCodes' => $subjectCodes,
            ];

            return $data;
        } else {
            return null;
        }
    }

    public function studentSubjectGrade($studentId, $subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            g.grade,
            g.quarter,
            s.subject_code
        FROM
            grade_tbl g
        INNER JOIN
            subject_tbl s
        ON
            g.subject_id = s.subject_id
        WHERE
            g.student_id = ?
        AND
            g.subject_id = ?
        ORDER BY 
            quarter
    ");

        $query->bind_param("ss", $studentId, $subjectId);

        if ($query->execute()) {
            $result = $query->get_result();
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            return $data; // Return the fetched data
        }

        return [];
    }

    public function studentGradeBySubject($studentId, $subject = null, $quarter = null)
    {
        $params = [$studentId];
        $types = "s"; // Initial type for student ID
        $queryStr = "";

        // Case 1: All subjects and all quarters
        if (($subject === null || $subject === 'All') && ($quarter === null || $quarter === 'All')) {
            $queryStr = "
            SELECT 
                subj.subject_code AS subject_label,
                subj.subject_code AS subject_code,
                subj.subject_id AS subject_id,
                AVG(grade.grade) AS average_grade
            FROM
                subject_tbl subj
            INNER JOIN
                grade_tbl grade ON subj.subject_id = grade.subject_id
            WHERE
                grade.student_id = ?
            GROUP BY subj.subject_code
            ORDER BY subj.subject ASC";
        }

        // Case 2: Specific subject and all quarters
        elseif (($subject !== null && $subject !== 'All') && ($quarter === null || $quarter === 'All')) {
            $queryStr = "
            SELECT 
                subj.subject AS subject_label,
                subj.subject_code AS subject_code,
                subj.subject_id AS subject_id,
                AVG(grade.grade) AS average_grade
            FROM
                subject_tbl subj
            INNER JOIN
                grade_tbl grade ON subj.subject_id = grade.subject_id
            WHERE
                grade.student_id = ? AND subj.subject_code = ?
            GROUP BY subj.subject
            ORDER BY subj.subject ASC";

            $params[] = $subject;
            $types .= "s";
        }

        // Case 3: All subjects for a specific quarter
        elseif (($subject === null || $subject === 'All') && ($quarter !== null && $quarter !== 'All')) {
            $queryStr = "
            SELECT 
                subj.subject_code AS subject_label,
                subj.subject_code AS subject_code,
                subj.subject_id AS subject_id,
                AVG(grade.grade) AS average_grade
            FROM
                subject_tbl subj
            INNER JOIN
                grade_tbl grade ON subj.subject_id = grade.subject_id
            WHERE
                grade.student_id = ? AND grade.quarter = ?
            GROUP BY subj.subject_code
            ORDER BY subj.subject ASC";

            $params[] = $quarter;
            $types .= "s";
        }

        // Case 4: Specific subject and specific quarter
        elseif (($subject !== null && $subject !== 'All') && ($quarter !== null && $quarter !== 'All')) {
            $queryStr = "
            SELECT 
                subj.subject AS subject_label,
                subj.subject_code AS subject_code,
                subj.subject_id AS subject_id,
                grade.grade AS individual_grade
            FROM
                subject_tbl subj
            INNER JOIN
                grade_tbl grade ON subj.subject_id = grade.subject_id
            WHERE
                grade.student_id = ? AND subj.subject_code = ? AND grade.quarter = ?
            GROUP BY subj.subject, grade.quarter
            ORDER BY subj.subject ASC";

            $params[] = $subject;
            $params[] = $quarter;
            $types .= "ss";
        }

        // Prepare and execute the query
        $query = $this->conn->prepare($queryStr);
        $query->bind_param($types, ...$params);

        if ($query->execute()) {
            $result = $query->get_result();

            $subjects = [];
            $scores = [];
            $subjectCodes = [];

            while ($row = $result->fetch_assoc()) {
                $subjects[] = $row['subject_label'];
                $subjectCodes[] = $row['subject_code'];

                if (isset($row['average_grade'])) {
                    $scores[] = $row['average_grade'] ? (int) round($row['average_grade']) : 0; // For cases 1, 2, and 3
                } elseif (isset($row['individual_grade'])) {
                    $scores[] = (int) $row['individual_grade']; // For case 4
                }
            }

            return [
                'subjects' => $subjects,
                'scores' => $scores,
                'subjectCodes' => $subjectCodes,
            ];
        } else {
            return null;
        }
    }

    public function getSectionQuizRecords($sectionId)
    {
        $query = $this->conn->prepare("
        SELECT
            student.student_id,
            quiz.quiz_id,
            CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
            subject.subject,
            quiz.quiz_number,
            CONCAT(score_tbl.score, '/', score_tbl.item_number) AS quiz_score,
            score_tbl.remarks,
            score_tbl.time
        FROM student_tbl student
        INNER JOIN level_tbl level ON student.level_id = level.level_id
        INNER JOIN section_tbl section ON student.section_id = section.section_id
        LEFT JOIN score_tbl ON student.student_id = score_tbl.student_id
        LEFT JOIN quiz_tbl quiz ON score_tbl.quiz_id = quiz.quiz_id
        INNER JOIN subject_tbl subject ON quiz.subject_id = subject.subject_id
        WHERE subject.section_id = ?
        AND quiz.status IN ('Active', 'Completed')
        ORDER BY score_tbl.time DESC
    ");

        $query->bind_param("s", $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $studentQuizRecords = $result->fetch_all(MYSQLI_ASSOC);
            return $studentQuizRecords;
        }

        return [];
    }

    public function facultyGetTotalSubjectQuizzesCount($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        WHERE
            quiz.subject_id = ?
        AND
            quiz.status  = 'Completed'
    ");

        $query->bind_param("s", $subjectId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }
        return 0;
    }

    public function facultyGetPendingSubjectQuizzesCount($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN level_tbl level
        ON subject.level_id = level.level_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        WHERE 
            quiz.subject_id = ?
        AND 
            quiz.status IN ('Active', 'Inactive')
    ");

        $query->bind_param("s", $subjectId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function facultyGetSubjectAverageScore($subjectId)
    {
        // Prepare the query to fetch students enrolled in the subject
        $query = $this->conn->prepare("
        SELECT DISTINCT student.student_id
        FROM student_record student
        INNER JOIN section_tbl section ON student.section_id = section.section_id
        INNER JOIN subject_tbl subject ON section.section_id = subject.section_id
        WHERE subject.subject_id = ?
    ");
        $query->bind_param("s", $subjectId);

        // Execute the query to get the student records
        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);

            // Initialize variables for total score and student count
            $totalScore = 0;
            $studentCount = 0;

            // Loop through each student and get their average score
            foreach ($students as $student) {
                // Get the average score for each student for this subject
                $averageScore = $this->facultyGetAverageScoreBySubject($student['student_id'], $subjectId);

                // Add the average score to the total score
                $totalScore += $averageScore;
                $studentCount++; // Increment the student count
            }

            // Calculate the subject average score if there are any students
            if ($studentCount > 0) {
                return round($totalScore / $studentCount, 2); // Return the rounded average of all students
            } else {
                return 0; // No students, so return 0
            }
        }

        return null; // Return null if the query fails
    }



    public function facultyGetHighestStudentAverageScore($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT DISTINCT student.student_id
        FROM student_record student
        INNER JOIN section_tbl section ON student.section_id = section.section_id
        INNER JOIN subject_tbl subject ON section.section_id = subject.section_id
        WHERE subject.subject_id = ?
    ");

        $query->bind_param("s", $subjectId);

        // Execute query and fetch student records
        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);

            $highestAverage = 0;

            foreach ($students as $student) {
                $averageScore = $this->facultyGetAverageScoreBySubject($student['student_id'], $subjectId);

                if ($averageScore > $highestAverage) {
                    $highestAverage = $averageScore;
                }
            }

            return $highestAverage;
        } else {
            return null;
        }
    }


    public function subjectFetchScores($subjectId)
    {
        $currentMonth = date('n');  // Current month number (1-12)
        $currentYear = date('Y');   // Current year

        // Determine the academic year based on the current month
        if ($currentMonth >= 6) {
            $startYear = $currentYear;       // Academic year starts this year
            $endYear = $currentYear + 1;     // Academic year ends next year
        } else {
            $startYear = $currentYear - 1;   // Academic year started last year
            $endYear = $currentYear;         // Academic year ends this year
        }

        // Initialize months array with all months in the academic year (June-April)
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year (June 1)
        $endDate = strtotime("$endYear-04-30");        // End of academic year (April 30)

        while ($currentDate <= $endDate) {
            $monthKey = date('Y-m', $currentDate);
            $monthLabel = date('F', $currentDate);     // e.g., "June", "July"
            $months[$monthKey] = [
                'month' => $monthLabel,
                'avg_score' => 0,                      // Initialize average score to 0 for each month
                'quiz_ids' => []
            ];
            $currentDate = strtotime("+1 month", $currentDate);  // Move to next month
        }

        // Fetch all students associated with the subject
        $studentQuery = $this->conn->prepare("
        SELECT student_id
        FROM student_record AS sr
        INNER JOIN section_tbl AS sec ON sr.section_id = sec.section_id
        INNER JOIN subject_tbl AS sub ON sec.section_id = sub.section_id
        WHERE sub.subject_id = ?
    ");
        $studentQuery->bind_param("s", $subjectId);
        $studentQuery->execute();
        $studentsResult = $studentQuery->get_result();

        $students = [];
        while ($studentRow = $studentsResult->fetch_assoc()) {
            $students[] = $studentRow['student_id'];
        }

        // Fetch quizzes for the subject within the academic year, grouped by month
        $quizQuery = $this->conn->prepare("
        SELECT quiz.quiz_id, DATE_FORMAT(quiz.add_time, '%Y-%m') AS month
        FROM quiz_tbl quiz
        WHERE quiz.add_time BETWEEN ? AND ?
        AND quiz.subject_id = ?
        AND quiz.status IN ('Active', 'Completed')
        ORDER BY month ASC
    ");
        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $quizQuery->bind_param("sss", $startDate, $endDate, $subjectId);
        $quizQuery->execute();
        $quizzesResult = $quizQuery->get_result();

        // Populate quiz IDs for each month
        while ($row = $quizzesResult->fetch_assoc()) {
            $monthKey = $row['month'];
            if (isset($months[$monthKey])) {
                $months[$monthKey]['quiz_ids'][] = $row['quiz_id'];
            }
        }

        // Calculate the average score for each month by iterating through students and quizzes
        foreach ($months as $monthKey => &$monthData) {
            $totalScore = 0;
            $totalQuizzes = count($monthData['quiz_ids']);  // Total quizzes in the month
            $totalStudentScores = 0;

            if ($totalQuizzes > 0) {
                foreach ($students as $studentId) {
                    $studentTotalScore = 0;
                    $studentAttemptedQuizzes = 0;

                    foreach ($monthData['quiz_ids'] as $quizId) {
                        $score = $this->fetchScoreByQuizId($quizId, $studentId);

                        if ($score !== null) { // Include only if quiz was attempted
                            $studentTotalScore += $score;
                            $studentAttemptedQuizzes++;
                        }
                    }

                    // Add this student’s average (or zero if no attempts)
                    $studentAverage = $studentAttemptedQuizzes > 0 ? $studentTotalScore / $totalQuizzes : 0;
                    $totalStudentScores += $studentAverage;
                }

                // Calculate the overall monthly average for all students
                $monthData['avg_score'] = round($totalStudentScores / count($students), 2);
            }
        }

        // Prepare data for output
        $data = [
            'months' => array_column($months, 'month'),  // Month labels (June, July, etc.)
            'scores' => array_column($months, 'avg_score')  // Average scores
        ];

        return $data;
    }



    public function subjectQuizCompletion($subjectId)
    {
        $emptyValue = [
            'active' => 0,
            'inactive' => 0,
            'completed' => 0
        ];

        $quizzesQuery = $this->conn->prepare("
        SELECT 
            SUM(CASE WHEN quiz.status = 'Active' THEN 1 ELSE 0 END) AS active_count,
            SUM(CASE WHEN quiz.status = 'Inactive' THEN 1 ELSE 0 END) AS inactive_count,
            SUM(CASE WHEN quiz.status = 'Completed' THEN 1 ELSE 0 END) AS completed_count
        FROM quiz_tbl quiz
        WHERE 
            quiz.subject_id = ?
    ");
        $quizzesQuery->bind_param("s", $subjectId);

        // Execute the query
        if ($quizzesQuery->execute()) {
            $result = $quizzesQuery->get_result();
            $quizData = $result->fetch_assoc();

            // Return the count of quizzes based on their status
            return [
                'active' => (int) $quizData['active_count'],
                'inactive' => (int) $quizData['inactive_count'],
                'completed' => (int) $quizData['completed_count']
            ];
        } else {
            return $emptyValue;  // Return default values in case of failure
        }
    }

    public function rankingStudentsBySubject($sectionId, $subjectId)
    {
        $query = $this->conn->prepare("
        SELECT 
            record.student_id,
            record.lrn,
            CONCAT(student.student_fname, ' ', student.student_lname) AS full_name
        FROM 
            student_record record
        INNER JOIN
            student_tbl student ON student.student_id = record.student_id
        INNER JOIN 
            subject_tbl subject ON record.section_id = subject.section_id
        WHERE 
            record.section_id = ?
        GROUP BY 
            record.student_id
    ");

        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $students = [];

            // Loop through each student to calculate accurate average scores
            while ($row = $result->fetch_assoc()) {
                // Use facultyGetAverageScoreBySubject to get a more accurate average score for each student
                $averageScore = $this->facultyGetAverageScoreBySubject($row['student_id'], $subjectId);

                $students[] = [
                    'student_id' => $row['student_id'],
                    'lrn' => $row['lrn'],
                    'full_name' => $row['full_name'],
                    'average_score' => $averageScore,
                ];
            }

            usort($students, function ($a, $b) {
                return $b['average_score'] <=> $a['average_score'];
            });

            foreach ($students as $index => &$student) {
                $student['rank'] = $index + 1;
            }

            return $students;
        }

        return null;
    }



    public function rankingStudentsBySection($sectionId)
    {
        // Query to get unique students in the specified section
        $query = $this->conn->prepare("
        SELECT 
            record.student_id,
            student.lrn,
            CONCAT(student.student_fname, ' ', student.student_lname) AS full_name
        FROM 
            student_record record
        INNER JOIN
            student_tbl student ON student.student_id = record.student_id
        WHERE 
            record.section_id = ?
        GROUP BY 
            record.student_id
    ");

        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $students = [];

            // Loop through each student to calculate accurate average scores
            while ($row = $result->fetch_assoc()) {
                // Calculate average score using the facultyGetAverageScoreBySection function
                $averageScore = $this->facultyGetAverageScoreBySection($row['student_id'], $sectionId);

                $students[] = [
                    'student_id' => $row['student_id'],
                    'lrn' => $row['lrn'],
                    'full_name' => $row['full_name'],
                    'average_score' => $averageScore,
                ];
            }

            // Sort students by average score in descending order
            usort($students, function ($a, $b) {
                return $b['average_score'] <=> $a['average_score'];
            });

            // Assign rank to each student based on sorted order
            foreach ($students as $index => &$student) {
                $student['rank'] = $index + 1;
            }

            return $students;
        }

        return null;
    }
    public function rankingStudentsByYear()
    {
        $query = $this->conn->prepare("
        SELECT 
            student.student_id,
            student.lrn,
            ROW_NUMBER() OVER (ORDER BY AVG(score.score) DESC) AS rank,
            CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
            AVG(score.score) AS average_score 
        FROM 
            student_tbl student
        INNER JOIN 
            subject_tbl subject ON student.section_id = subject.section_id
        INNER JOIN 
            quiz_tbl quiz ON quiz.subject_id = subject.subject_id
        LEFT JOIN 
            score_tbl score ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        WHERE 
            score.score IS NOT NULL
        GROUP BY 
            full_name
        ORDER BY 
            average_score DESC
    ");
        if ($query->execute()) {
            $result = $query->get_result();
            $students = [];

            while ($row = $result->fetch_assoc()) {
                $students[] = [
                    'student_id' => $row['student_id'],
                    'lrn' => $row['lrn'],
                    'rank' => $row['rank'],
                    'full_name' => $row['full_name'],
                    'average_score' => round($row['average_score'], 2),
                ];
            }

            return $students;
        }


        return null;
    }


    public function gwaRankingStudentsByYearWithFilter($year, $gradeLevel)
    {
        if ($gradeLevel == "All") {
            $query = $this->conn->prepare("
            SELECT 
                lrn,
                CONCAT(student_fname, ' ', student_lname) AS full_name,
                gwa,
                grade_level,
                section
            FROM 
                record_tbl
            WHERE 
                year = ?
            GROUP BY 
                full_name
            ORDER BY 
                gwa DESC
            LIMIT 10
        ");
            $query->bind_param("i", $year);
        } else {
            $query = $this->conn->prepare("
            SELECT 
                lrn,
                CONCAT(student_fname, ' ', student_lname) AS full_name,
                gwa,
                grade_level,
                section
            FROM 
                record_tbl
            WHERE 
                year = ?
            AND
                grade_level = ?
            GROUP BY 
                full_name
            ORDER BY 
                gwa DESC
            LIMIT 10
        ");
            $query->bind_param("is", $year, $gradeLevel);
        }

        if ($query->execute()) {
            $result = $query->get_result();
            $students = [];

            while ($row = $result->fetch_assoc()) {
                $students[] = [
                    'lrn' => $row['lrn'],
                    'full_name' => ucwords(strtolower($row['full_name'])),
                    'gwa' => $row['gwa'],
                    'grade_level' => ucwords(strtolower($row['grade_level'])),
                    'section' => ucwords(strtolower($row['section'])),
                ];
            }

            return $students;
        }
        return null;
    }


    public function rankingStudentsByYearWithFilter($year, $gradeLevel)
    {
        if ($year == 'All' && $gradeLevel == 'All') {
            $query = $this->conn->prepare("
            SELECT 
                student.student_id,
                student.lrn,
                CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
                AVG(grade.grade) AS average_grade,
                level.grade_level,
                section.section
            FROM 
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            INNER JOIN 
                subject_tbl subject ON record.section_id = subject.section_id
            INNER JOIN 
                grade_tbl grade ON subject.subject_id = grade.subject_id AND grade.student_id = student.student_id
            WHERE 
                grade.grade IS NOT NULL
            GROUP BY 
                full_name
            ORDER BY 
                average_grade DESC
            LIMIT 10
        ");

        } elseif ($year === 'All') {
            $query = $this->conn->prepare("
            SELECT 
                student.student_id,
                student.lrn,
                CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
                AVG(grade.grade) AS average_grade,
                level.grade_level,
                section.section
            FROM 
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            INNER JOIN 
                subject_tbl subject ON record.section_id = subject.section_id
            INNER JOIN 
                grade_tbl grade ON subject.subject_id = grade.subject_id AND grade.student_id = student.student_id
            WHERE 
                grade.grade IS NOT NULL
            AND
                level.grade_level = ?
            GROUP BY 
                full_name
            ORDER BY 
                average_grade DESC
            LIMIT 10
        ");
            $query->bind_param("s", $gradeLevel);
        } elseif ($gradeLevel === 'All') {
            $query = $this->conn->prepare("
            SELECT 
                student.student_id,
                student.lrn,
                CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
                AVG(grade.grade) AS average_grade,
                level.grade_level,
                section.section
            FROM 
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            INNER JOIN 
                subject_tbl subject ON record.section_id = subject.section_id
            INNER JOIN 
                grade_tbl grade ON subject.subject_id = grade.subject_id AND grade.student_id = student.student_id
            WHERE 
                grade.grade IS NOT NULL
            AND
                section.year = ?
            GROUP BY 
                full_name
            ORDER BY 
                average_grade DESC
            LIMIT 10
        ");
            $query->bind_param("i", $year);
        } else {
            $query = $this->conn->prepare("
            SELECT 
                student.student_id,
                student.lrn,
                CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
                AVG(grade.grade) AS average_grade,
                level.grade_level,
                section.section
            FROM 
                student_record record
            INNER JOIN
                student_tbl student ON student.student_id = record.student_id
            INNER JOIN
                level_tbl level ON record.level_id = level.level_id
            INNER JOIN
                section_tbl section ON record.section_id = section.section_id
            INNER JOIN 
                subject_tbl subject ON record.section_id = subject.section_id
            IINNER JOIN 
                grade_tbl grade ON subject.subject_id = grade.subject_id AND grade.student_id = student.student_id
            WHERE 
                grade.grade IS NOT NULL
            AND
                section.year = ?
            AND
                level.grade_level = ?
            GROUP BY 
                full_name
            ORDER BY 
                average_grade DESC
            LIMIT 10
        ");
            $query->bind_param("is", $year, $gradeLevel);
        }
        if ($query->execute()) {
            $result = $query->get_result();
            $students = [];

            while ($row = $result->fetch_assoc()) {
                $students[] = [
                    'student_id' => $row['student_id'],
                    'lrn' => $row['lrn'],
                    'full_name' => $row['full_name'],
                    'average_grade' => round($row['average_grade'], 2),
                    'grade_level' => $row['grade_level'],
                    'section' => $row['section'],
                ];
            }

            return $students;
        }
    }

    public function fetchTotalStudentsWithFilter($year, $gradeLevel)
    {
        if ($year != 'All' && $year <= 2023) {
            if ($gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT record.lrn) AS student_count
                FROM record_tbl record
                WHERE year = ?
                ");
                $query->bind_param("i", $year);
            } else {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT record.lrn) AS student_count
                FROM record_tbl record
                WHERE record.year = ?
                AND record.grade_level = ?
                ");
                $query->bind_param("is", $year, $gradeLevel);
            }
        } else {
            if ($year === 'All' && $gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT student.student_id) AS student_count
                FROM student_record student
                INNER JOIN section_tbl section ON student.section_id = section.section_id
                INNER JOIN level_tbl level ON student.level_id = level.level_id
                ");
            } elseif ($year === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT student.student_id) AS student_count
                FROM student_record student
                INNER JOIN section_tbl section ON student.section_id = section.section_id
                INNER JOIN level_tbl level ON student.level_id = level.level_id
                WHERE level.grade_level = ?
            ");
                $query->bind_param("s", $gradeLevel);
            } elseif ($gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT student.student_id) AS student_count
                FROM student_record student
                INNER JOIN section_tbl section ON student.section_id = section.section_id
                INNER JOIN level_tbl level ON student.level_id = level.level_id
                WHERE section.year = ?
            ");
                $query->bind_param("i", $year);
            } else {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT student.student_id) AS student_count
                FROM student_record student
                INNER JOIN section_tbl section ON student.section_id = section.section_id
                INNER JOIN level_tbl level ON student.level_id = level.level_id
                WHERE section.year = ?
                AND level.grade_level = ?
        ");
                $query->bind_param("is", $year, $gradeLevel);
            }
        }
        if ($query->execute()) {
            $result = $query->get_result();
            $studentCount = $result->fetch_assoc();
            return $studentCount['student_count'];
        } else {
            return 0;
        }
    }

    public function fetchTotalTeachersWithFilter($year, $gradeLevel)
    {
        if ($year != 'All' && $year <= 2023) {
            return 'No Data';
        } else {
            if ($year === 'All' && $gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT teacher.teacher_id) AS teacher_count
                FROM teacher_tbl teacher
                LEFT JOIN section_tbl section ON teacher.teacher_id = section.teacher_id
                LEFT JOIN level_tbl level ON section.level_id = level.level_id
                ");
            } elseif ($year === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT teacher.teacher_id) AS teacher_count
                FROM teacher_tbl teacher
                LEFT JOIN section_tbl section ON teacher.teacher_id = section.teacher_id
                LEFT JOIN level_tbl level ON section.level_id = level.level_id
                WHERE level.grade_level = ? 
            ");
                $query->bind_param("s", $gradeLevel);
            } elseif ($gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT teacher.teacher_id) AS teacher_count
                FROM teacher_tbl teacher
                LEFT JOIN section_tbl section ON teacher.teacher_id = section.teacher_id
                LEFT JOIN level_tbl level ON section.level_id = level.level_id
                WHERE section.year = ?
            ");
                $query->bind_param("i", $year);
            } else {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT teacher.teacher_id) AS teacher_count
                FROM teacher_tbl teacher
                LEFT JOIN section_tbl section ON teacher.teacher_id = section.teacher_id
                LEFT JOIN level_tbl level ON section.level_id = level.level_id
                WHERE section.year = ?
                AND level.grade_level = ?
        ");
                $query->bind_param("is", $year, $gradeLevel);
            }
        }
        if ($query->execute()) {
            $result = $query->get_result();
            $teacherCount = $result->fetch_assoc();
            return $teacherCount['teacher_count'];
        } else {
            return 0;
        }
    }

    public function fetchTotalLessonsWithFilter($year, $gradeLevel)
    {
        if ($year != 'All' && $year <= 2023) {
            return 'No Data';
        } else {
            if ($year === 'All' && $gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT lesson.lesson_id) AS lesson_count
                FROM lesson_tbl lesson
                INNER JOIN subject_tbl subject ON subject.subject_id = lesson.subject_id
                INNER JOIN section_tbl section ON section.section_id = lesson.section_id
                INNER JOIN level_tbl level ON lesson.level_id = level.level_id
                ");
            } elseif ($year === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT lesson.lesson_id) AS lesson_count
                FROM lesson_tbl lesson
                INNER JOIN subject_tbl subject ON subject.subject_id = lesson.subject_id
                INNER JOIN section_tbl section ON section.section_id = lesson.section_id
                INNER JOIN level_tbl level ON lesson.level_id = level.level_id
                WHERE level.grade_level = ? 
            ");
                $query->bind_param("s", $gradeLevel);
            } elseif ($gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT lesson.lesson_id) AS lesson_count
                FROM lesson_tbl lesson
                INNER JOIN subject_tbl subject ON subject.subject_id = lesson.subject_id
                INNER JOIN section_tbl section ON section.section_id = lesson.section_id
                INNER JOIN level_tbl level ON lesson.level_id = level.level_id
                WHERE subject.year = ?
            ");
                $query->bind_param("i", $year);
            } else {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT lesson.lesson_id) AS lesson_count
                FROM lesson_tbl lesson
                INNER JOIN subject_tbl subject ON subject.subject_id = lesson.subject_id
                INNER JOIN section_tbl section ON section.section_id = lesson.section_id
                INNER JOIN level_tbl level ON lesson.level_id = level.level_id
                WHERE subject.year = ?
                AND level.grade_level = ?
        ");
                $query->bind_param("is", $year, $gradeLevel);
            }
        }
        if ($query->execute()) {
            $result = $query->get_result();
            $lessonCount = $result->fetch_assoc();
            return $lessonCount['lesson_count'];
        } else {
            return 0;
        }
    }

    public function fetchTotalQuizzesWithFilter($year, $gradeLevel)
    {
        if ($year != 'All' && $year <= 2023) {
            return 'No Data';
        } else {
            if ($year === 'All' && $gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT quiz.quiz_id) AS quiz_count
                FROM quiz_tbl quiz
                INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
                INNER JOIN section_tbl section ON section.section_id = subject.section_id
                INNER JOIN level_tbl level ON subject.level_id = level.level_id
                ");
            } elseif ($year === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT quiz.quiz_id) AS quiz_count
                FROM quiz_tbl quiz
                INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
                INNER JOIN section_tbl section ON section.section_id = subject.section_id
                INNER JOIN level_tbl level ON subject.level_id = level.level_id
                WHERE level.grade_level = ? 
            ");
                $query->bind_param("s", $gradeLevel);
            } elseif ($gradeLevel === 'All') {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT quiz.quiz_id) AS quiz_count
                FROM quiz_tbl quiz
                INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
                INNER JOIN section_tbl section ON section.section_id = subject.section_id
                INNER JOIN level_tbl level ON subject.level_id = level.level_id
                WHERE subject.year = ?
            ");
                $query->bind_param("i", $year);
            } else {
                $query = $this->conn->prepare("
                SELECT
                    COUNT(DISTINCT quiz.quiz_id) AS quiz_count
                FROM quiz_tbl quiz
                INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
                INNER JOIN section_tbl section ON section.section_id = subject.section_id
                INNER JOIN level_tbl level ON subject.level_id = level.level_id
                WHERE subject.year = ?
                AND level.grade_level = ?
        ");
                $query->bind_param("is", $year, $gradeLevel);
            }
        }
        if ($query->execute()) {
            $result = $query->get_result();
            $quizCount = $result->fetch_assoc();
            return $quizCount['quiz_count'];
        } else {
            return 0;
        }
    }

    public function getGradeDetails($gradeId)
    {
        $query = $this->conn->prepare(
            "SELECT
                *
            FROM
                grade_tbl
            WHERE
                grade_id = ?
            "
        );
        $query->bind_param("s", $gradeId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $grade = $result->fetch_assoc();

                return $grade;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function getStudentMasterlist()
    {
        $query = $this->conn->prepare("
        SELECT
            master.lrn,
            student.student_id,
            master.student_lname,
            master.student_fname,
            master.student_mname,
            master.age,
            master.gender,
            student.profile_image,
            master.grade_level,
            master.section,
            student.section_id
        FROM
            student_masterlist master
        LEFT JOIN
            student_tbl student ON master.lrn = student.lrn
        ORDER BY
            master.student_lname ASC
    ");

        if ($query->execute()) {
            $result = $query->get_result();
            $students = $result->fetch_all(MYSQLI_ASSOC);

            foreach ($students as &$student) {
                $student['student_lname'] = ucwords(strtolower(trim($student['student_lname'])));
                $student['student_fname'] = ucwords(strtolower(trim($student['student_fname'])));
                $student['student_mname'] = ucwords(strtolower(trim($student['student_mname'])));
                $student['gender'] = ucwords(strtolower(trim($student['gender'])));
                $student['grade_level'] = ucwords(strtolower(trim($student['grade_level'])));
                $student['section'] = ucwords(strtolower(trim($student['section'])));

                if (is_null($student['profile_image']) || $student['profile_image'] === '') {
                    $student['profile_image'] = 'default-profile.png';
                }
            }

            return $students;
        } else {
            return false;
        }
    }

    public function facultyLessonsPerMonth($teacherId)
    {
        $currentMonth = date('n');
        $currentYear = date('Y');

        if ($currentMonth >= 6) {
            $startYear = $currentYear;
            $endYear = $currentYear + 1;  // End in April of next year
        } else {
            $startYear = $currentYear - 1;
            $endYear = $currentYear;
        }

        // Initialize an array with the month-year keys in sequential order
        $months = [];
        $currentDate = strtotime("$startYear-06-01");  // Start of academic year
        $endDate = strtotime("$endYear-04-30");        // End of academic year

        while ($currentDate <= $endDate) {
            $monthKey = date('Y-m', $currentDate);  // Year-Month format
            $monthLabel = date('F', $currentDate);  // Full month name
            $months[$monthKey] = [
                'month' => $monthLabel,
                'lesson_count' => 0  // Initialize count to 0 for every month
            ];
            $currentDate = strtotime("+1 month", $currentDate);
        }

        // Query for lesson counts within the academic year range
        $query = $this->conn->prepare("
        SELECT 
            DATE_FORMAT(add_time, '%Y-%m') AS month,  
            COUNT(DISTINCT lesson_id) AS lesson_count  
        FROM
            lesson_tbl
        WHERE 
            teacher_id = ?
        AND 
            add_time BETWEEN ? AND ?
        GROUP BY 
            month
        ORDER BY 
            month ASC
    ");

        $startDate = "$startYear-06-01";
        $endDate = "$endYear-04-30";
        $query->bind_param("sss", $teacherId, $startDate, $endDate);

        if ($query->execute()) {
            $result = $query->get_result();

            while ($row = $result->fetch_assoc()) {
                $monthKey = $row['month'];  // 'Y-m' format

                // Ensure we update the correct month-year key in $months
                if (isset($months[$monthKey])) {
                    $months[$monthKey]['lesson_count'] = (int) $row['lesson_count'];
                }
            }

            // Prepare data for return
            $data = [
                'months' => array_column($months, 'month'),  // Month names in order
                'lesson_count' => array_column($months, 'lesson_count')  // Counts for each month
            ];

            return $data;
        } else {
            return null;
        }
    }

    public function facultyLessonBySubject($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject AS subject_label,
            COUNT(lesson.lesson_id) AS lesson_count,
            subject.subject_code
        FROM
            lesson_tbl lesson
        INNER JOIN
            subject_tbl subject ON lesson.subject_id = subject.subject_id
        WHERE
            subject.teacher_id = ?
        GROUP BY 
            subject.subject, subject.subject_code
        ORDER BY 
            subject.subject ASC
    ");

        // Bind the teacherId parameter
        $query->bind_param("s", $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();

            $subjects = [];
            $count = [];
            $subjectCodes = [];

            while ($row = $result->fetch_assoc()) {
                $subjects[] = $row['subject_label'];
                $count[] = (float) $row['lesson_count'];
                $subjectCodes[] = strtolower($row['subject_code']);
            }

            $data = [
                'subjects' => $subjects,
                'count' => $count,
                'subjectCodes' => $subjectCodes
            ];

            return $data;
        } else {
            return null;
        }
    }

    public function facultyQuizCompletion($teacherId)
    {
        $emptyValue = [
            'active' => 0,
            'inactive' => 0,
            'completed' => 0
        ];

        $quizzesQuery = $this->conn->prepare("
        SELECT 
            SUM(CASE WHEN quiz.status = 'Active' THEN 1 ELSE 0 END) AS active_count,
            SUM(CASE WHEN quiz.status = 'Inactive' THEN 1 ELSE 0 END) AS inactive_count,
            SUM(CASE WHEN quiz.status = 'Completed' THEN 1 ELSE 0 END) AS completed_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON quiz.subject_id = subject.subject_id
        WHERE 
            subject.teacher_id = ?
    ");
        $quizzesQuery->bind_param("s", $teacherId);

        // Execute the query
        if ($quizzesQuery->execute()) {
            $result = $quizzesQuery->get_result();
            $quizData = $result->fetch_assoc();

            // Return the count of quizzes based on their status
            return [
                'active' => (int) $quizData['active_count'],
                'inactive' => (int) $quizData['inactive_count'],
                'completed' => (int) $quizData['completed_count']
            ];
        } else {
            return $emptyValue;  // Return default values in case of failure
        }
    }

    public function mainQuizCompletion()
    {
        $emptyValue = [
            'accomplished' => 0,
            'pending' => 0
        ];

        $quizzesQuery = $this->conn->prepare("
        SELECT 
            SUM(CASE WHEN quiz.status = 'Active' THEN 1 ELSE 0 END) AS active_count,
            SUM(CASE WHEN quiz.status = 'Inactive' THEN 1 ELSE 0 END) AS inactive_count,
            SUM(CASE WHEN quiz.status = 'Completed' THEN 1 ELSE 0 END) AS completed_count
        FROM quiz_tbl quiz
    ");
        if ($quizzesQuery->execute()) {
            $result = $quizzesQuery->get_result();
            $quizData = $result->fetch_assoc();

            return [
                'accomplished' => (int) $quizData['completed_count'],
                'pending' => (int) $quizData['active_count'] + (int) $quizData['inactive_count']
            ];
        } else {
            return $emptyValue;
        }
    }

    public function mainFacultyQuizCompletion($teacherId)
    {
        $emptyValue = [
            'accomplished' => 0,
            'pending' => 0
        ];

        $quizzesQuery = $this->conn->prepare("
        SELECT 
            SUM(CASE WHEN quiz.status = 'Active' THEN 1 ELSE 0 END) AS active_count,
            SUM(CASE WHEN quiz.status = 'Inactive' THEN 1 ELSE 0 END) AS inactive_count,
            SUM(CASE WHEN quiz.status = 'Completed' THEN 1 ELSE 0 END) AS completed_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject ON subject.subject_id = quiz.subject_id
        WHERE
            subject.teacher_id = ?
    ");
        $quizzesQuery->bind_param("s", $teacherId);
        if ($quizzesQuery->execute()) {
            $result = $quizzesQuery->get_result();
            $quizData = $result->fetch_assoc();

            return [
                'accomplished' => (int) $quizData['completed_count'],
                'pending' => (int) $quizData['active_count'] + (int) $quizData['inactive_count']
            ];
        } else {
            return $emptyValue;
        }
    }

    public function getStudentsByYear()
    {
        $currentYear = date("Y");
        $currentMonth = date("m");

        // Determine the school year based on the month
        if ($currentMonth < 6) {
            $schoolYear = ($currentYear - 1) . "-" . $currentYear;
        } else {
            $schoolYear = $currentYear . "-" . ($currentYear + 1);
        }

        $query = $this->conn->prepare("
        SELECT 
            level.grade_level,
            COALESCE(COUNT(student.student_id), 0) AS student_count
        FROM 
            level_tbl level
        LEFT JOIN 
            student_tbl student ON student.level_id = level.level_id
        LEFT JOIN 
            section_tbl section ON student.section_id = section.section_id
        AND 
            section.year = ?
        GROUP BY 
            level.grade_level
        ORDER BY 
            level.grade_level ASC
    ");

        $query->bind_param("s", $schoolYear);
        if ($query->execute()) {
            $result = $query->get_result();
            $studentsCount = $result->fetch_all(MYSQLI_ASSOC);
            return $studentsCount;
        } else {
            return false;
        }
    }

    public function getTeacherStudentsByYear($teacherId)
    {
        $currentYear = date("Y");
        $currentMonth = date("m");

        if ($currentMonth < 6) {
            $schoolYear = ($currentYear - 1) . "-" . $currentYear;
        } else {
            $schoolYear = $currentYear . "-" . ($currentYear + 1);
        }

        $query = $this->conn->prepare("
        SELECT 
            level.grade_level,
            COALESCE(COUNT(DISTINCT student.student_id), 0) AS student_count
        FROM 
            level_tbl level
        INNER JOIN 
            student_tbl student ON student.level_id = level.level_id
        INNER JOIN 
            section_tbl section ON student.section_id = section.section_id
        INNER JOIN
            subject_tbl subject ON section.section_id = subject.section_id
        AND 
            section.year = ?
        AND
            subject.teacher_id = ?
        GROUP BY 
            level.grade_level
        ORDER BY 
            level.grade_level ASC
    ");

        $query->bind_param("ss", $schoolYear, $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            $studentsCount = $result->fetch_all(MYSQLI_ASSOC);
            return $studentsCount;
        } else {
            return false;
        }
    }

    public function getFacultyMasterlist()
    {
        $query = $this->conn->prepare("
        SELECT
            master.trn,
            teacher.teacher_id,
            master.teacher_lname,
            master.teacher_fname,
            master.role,
            teacher.image_profile
        FROM
            faculty_masterlist master
        LEFT JOIN
            teacher_tbl teacher ON master.trn = teacher.trn
        ORDER BY
            master.teacher_lname ASC
    ");

        if ($query->execute()) {
            $result = $query->get_result();
            $faculties = $result->fetch_all(MYSQLI_ASSOC);

            foreach ($faculties as &$faculty) {
                $faculty['teacher_lname'] = ucwords(strtolower(trim($faculty['teacher_lname'])));
                $faculty['teacher_fname'] = ucwords(strtolower(trim($faculty['teacher_fname'])));
                $faculty['role'] = ucwords(strtolower(trim($faculty['role'])));

                if (is_null($faculty['image_profile']) || $faculty['image_profile'] === '') {
                    $faculty['image_profile'] = 'default-profile.png';
                }
            }

            return $faculties;
        } else {
            return false;
        }
    }

    public function getFacultyDetails($teacherId)
    {
        $query = $this->conn->prepare(
            "SELECT
                teacher.image_profile,
                teacher.trn,
                teacher.teacher_id,
                teacher.teacher_lname,
                teacher.teacher_fname,
                teacher.teacher_mname,
                teacher.age,
                teacher.gender,
                teacher.city,
                teacher.barangay,
                teacher.street,
                teacher.contact_number,
                teacher.role,
                faculty.email,
                faculty.disabled
            FROM
                teacher_tbl teacher
            INNER JOIN
                faculty_tbl faculty
            ON
                teacher.teacher_id = faculty.teacher_id
            WHERE
                teacher.teacher_id = ?
            "
        );
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $teacher = $result->fetch_assoc();

                return $teacher;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function getAdminDetails($teacherId)
    {
        $query = $this->conn->prepare(
            "SELECT
                teacher.image_profile,
                teacher.trn,
                teacher.teacher_id,
                teacher.teacher_lname,
                teacher.teacher_fname,
                teacher.teacher_mname,
                teacher.age,
                teacher.gender,
                teacher.city,
                teacher.barangay,
                teacher.street,
                teacher.contact_number,
                teacher.role,
                admin.email,
                admin.disabled
            FROM
                teacher_tbl teacher
            INNER JOIN
                admin_tbl admin
            ON
                teacher.teacher_id = admin.teacher_id
            WHERE
                teacher.teacher_id = ?
            "
        );
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $teacher = $result->fetch_assoc();

                return $teacher;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function getTotalTeacherLesson($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT `lesson_id`) as total
        FROM lesson_tbl
        WHERE teacher_id = ?
            ");
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return false;
        }
    }

    public function getTotalTeacherStudent($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT `student_id`) as total
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        INNER JOIN
            student_record c
        ON
            s.section_id = c.section_id
        WHERE
            t.teacher_id = ?
            ");
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return false;
        }
    }

    public function teacherGetQuizzesCount($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        WHERE 
            teacher.teacher_id = ?
        AND 
            quiz.status = 'Completed'
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("s", $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function teacherGetPendingQuizzesCount($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(quiz.quiz_id) AS quiz_count
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN section_tbl section
        ON subject.section_id = section.section_id
        INNER JOIN lesson_tbl lesson
        ON quiz.lesson_id = lesson.lesson_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        WHERE 
            teacher.teacher_id = ?
        AND 
            quiz.status IN ('Inactive', 'Active')
    ");

        // Bind parameters for sectionId, studentId, and status (pending)
        $query->bind_param("s", $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc(); // Fetch as associative array
            return $subjectDetails['quiz_count']; // Return the count of pending quizzes
        }

        return 0; // Return 0 if no result
    }

    public function getSubjectMasterlist($levelId)
    {
        $query = $this->conn->prepare("
        SELECT * FROM subject_masterlist WHERE level_id = ?
    ");
        $query->bind_param("s", $levelId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjects = $result->fetch_all(MYSQLI_ASSOC); // Fetch all rows as an associative array
            return $subjects;
        }

        return null;
    }

    public function getSectionByLevel($levelId)
    {
        $currentYear = date("Y");
        $currentMonth = date("m");

        // Determine the school year start based on the month
        if ($currentMonth >= 6) {
            $schoolYearStart = $currentYear;
        } else {
            $schoolYearStart = $currentYear - 1;
        }

        $query = $this->conn->prepare("
        SELECT * FROM section_tbl WHERE level_id = ? AND year = ?
    ");
        $query->bind_param("ss", $levelId, $schoolYearStart);

        if ($query->execute()) {
            $result = $query->get_result();
            $sections = $result->fetch_all(MYSQLI_ASSOC); // Fetch all rows as an associative array
            return $sections;
        }

        return null;
    }

    public function getSubjectDetails($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT * FROM subject_tbl WHERE subject_id = ?
    ");
        $query->bind_param("s", $subjectId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        }

        return null;
    }

    public function getSectionDetails($sectionId)
    {
        $query = $this->conn->prepare("
        SELECT * FROM section_tbl WHERE section_id = ?
    ");
        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $sectionDetails = $result->fetch_assoc();
            return $sectionDetails;
        }

        return null;
    }

    public function checkStudentGrades($studentId, $sectionId)
    {
        // Step 1: Fetch all subjects for the given section
        $subjectQuery = "
        SELECT subject_id 
        FROM subject_tbl 
        WHERE section_id = ?
    ";
        $subjectStmt = $this->conn->prepare($subjectQuery);
        $subjectStmt->bind_param("s", $sectionId);
        $subjectStmt->execute();
        $subjectResult = $subjectStmt->get_result();

        $hasSubjects = false;

        while ($subject = $subjectResult->fetch_assoc()) {
            $hasSubjects = true; // At least one subject found
            $subjectId = $subject['subject_id'];

            $gradeQuery = "
            SELECT COUNT(grade_id) as grade_count
            FROM grade_tbl
            WHERE student_id = ? 
              AND subject_id = ?
        ";
            $gradeStmt = $this->conn->prepare($gradeQuery);
            $gradeStmt->bind_param("ss", $studentId, $subjectId);
            $gradeStmt->execute();
            $gradeResult = $gradeStmt->get_result();
            $gradeCount = $gradeResult->fetch_assoc()['grade_count'] ?? 0;

            if ($gradeCount < 4) {
                return false;
            }
        }
        return $hasSubjects;
    }





    public function getStudentGeneralAverage($studentId, $sectionId)
    {
        $query = "
        SELECT 
            AVG(subject_average) as general_average
        FROM (
            SELECT 
                AVG(grade.grade) as subject_average
            FROM 
                grade_tbl grade
            INNER JOIN 
                subject_tbl subject
            ON 
                subject.subject_id = grade.subject_id
            WHERE 
                grade.student_id = ?
            AND 
                subject.section_id = ?
            GROUP BY 
                grade.subject_id
        ) as subject_averages
    ";

        $queryResult = $this->conn->prepare($query);
        $queryResult->bind_param("ss", $studentId, $sectionId);
        $queryResult->execute();
        $result = $queryResult->get_result();

        if ($row = $result->fetch_assoc()) {
            return $row['general_average'] !== null ? round($row['general_average']) : null;
        }

        return null;
    }

    public function studentFetchQuizRecordsBySubject($studentId, $subjectId)
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
        record.student_id,
        CONCAT(student.student_fname, ' ', student.student_lname) AS full_name,
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
    INNER JOIN 
        student_record record ON record.section_id = section.section_id
    INNER JOIN
        student_tbl student ON student.student_id = record.student_id
    INNER JOIN 
        score_tbl score ON score.quiz_id = quiz.quiz_id AND score.student_id = record.student_id
    WHERE 
        score.student_id = ?
    AND
        quiz.subject_id = ?
    AND
        score.score IS NOT NULL
    ORDER BY
        score.time DESC");

        $query->bind_param("ss", $studentId, $subjectId);

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

    public function studentGetAverageScore($studentId)
    {
        // Query 1: Count all quizzes in the section
        $totalQuizzesQuery = $this->conn->prepare("
        SELECT COUNT(quiz.quiz_id) AS total_quizzes
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
            ON subject.subject_id = quiz.subject_id
        INNER JOIN student_record student ON student.section_id = subject.section_id
        WHERE student.student_id = ?
        AND quiz.status IN ('Active', 'Completed')
    ");
        $totalQuizzesQuery->bind_param("s", $studentId);

        if ($totalQuizzesQuery->execute()) {
            $totalQuizzesResult = $totalQuizzesQuery->get_result();
            $totalQuizzesData = $totalQuizzesResult->fetch_assoc();
            $totalQuizzes = $totalQuizzesData['total_quizzes'] ?? 0;
        } else {
            return null;
        }

        if ($totalQuizzes === 0) {
            return 0;
        }

        $totalScoreQuery = $this->conn->prepare("
        SELECT SUM(score.score) AS total_score
        FROM score_tbl score
        INNER JOIN quiz_tbl quiz
            ON quiz.quiz_id = score.quiz_id
        INNER JOIN subject_tbl subject
            ON subject.subject_id = quiz.subject_id
        WHERE score.student_id = ?
        AND score.score IS NOT NULL
    ");
        $totalScoreQuery->bind_param("s", $studentId);

        // Execute the second query to get the total score
        if ($totalScoreQuery->execute()) {
            $totalScoreResult = $totalScoreQuery->get_result();
            $totalScoreData = $totalScoreResult->fetch_assoc();
            $totalScore = $totalScoreData['total_score'] ?? 0;
        } else {
            return null; // Return null if the query fails
        }

        // Calculate the average score (total score divided by total quizzes)
        $averageScore = $totalScore / $totalQuizzes;
        return round($averageScore, 2); // Round to 2 decimal places
    }

    public function fetchScoreByQuizId($quizId, $studentId)
    {
        $query = $this->conn->prepare("
            SELECT score
            FROM score_tbl
            WHERE quiz_id = ?
            AND student_id = ?
        ");
        $query->bind_param("ss", $quizId, $studentId);

        if ($query->execute()) {
            $result = $query->get_result();

            if ($row = $result->fetch_assoc()) {
                return (float) $row['score'];
            } else {
                return null;
            }
        }

        return null;
    }


}


