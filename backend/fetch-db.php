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

}