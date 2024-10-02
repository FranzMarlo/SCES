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

    public function fetchQuestion($questionId): array
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

    public function fetchChoices($questionId): array
    {
        $query = $this->conn->prepare("SELECT * FROM choices_tbl WHERE question_id = ?");
        $query->bind_param("s", $questionId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
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
            lesson.lesson_id
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

}