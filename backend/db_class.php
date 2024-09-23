<?php
include 'db.php';
date_default_timezone_set('Asia/Manila');

class globalClass extends db_connect
{
    public function __construct()
    {
        $this->connect();
    }

    public function studentLogin($email, $password)
    {
        $query = $this->conn->prepare("SELECT *, `password` FROM `login_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();

                if (password_verify($password, $user['password'])) {
                    return $user;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    public function studentSignUp($gradeLevelId, $sectionId, $firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $guardian_name, $guardian_contact, $city, $barangay, $street, $registration, $image, $emailVerification)
    {
        $year = date("Y");
        $studentId = $year . sprintf('%04d', rand(0, 9999));
        $checkIdResult = $this->checkStudentId($studentId);

        while ($checkIdResult->num_rows > 0) {
            $studentId = $year . sprintf('%04d', rand(0, 9999));
            $checkIdResult = $this->checkStudentId($studentId);
        }
        $query = $this->conn->prepare("INSERT INTO `student_tbl` (`student_id`, `level_id`, `section_id`, `student_fname`, `student_mname`, `student_lname`, `age`, `gender`, `guardian_name`, `guardian_contact`, `city`, `barangay`, `street`, `registration`, `profile_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssssissssssss", $studentId, $gradeLevelId, $sectionId, $firstName, $middleName, $lastName, $age, $gender, $guardian_name, $guardian_contact, $city, $barangay, $street, $registration, $image);


        if ($query->execute()) {
            $loginQuery = $this->conn->prepare("INSERT INTO `login_tbl` (`student_id`, `email`, `password`, `email_verification`) VALUES (?, ?, ?, ?)");
            $loginQuery->bind_param("ssss", $studentId, $email, $hashedPassword, $emailVerification);
            if ($loginQuery->execute()) {
                return $studentId;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function adminSignUp($firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $registration, $image, $role, $emailVerification, $city, $street, $barangay, $contactNumber)
    {
        $year = date("Y");
        $adminId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
        $checkIdResult = $this->checkAdminId($adminId);

        while ($checkIdResult->num_rows > 0) {
            $adminId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
            $checkIdResult = $this->checkAdminId($adminId);
        }

        $query = $this->conn->prepare("INSERT INTO `teacher_tbl` (`teacher_id`, `teacher_fname`, `teacher_mname`, `teacher_lname`, `age`, `gender`, `registration`, `image_profile`, `city`, `barangay`, `street`, `contact_number`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssissssssss", $adminId, $firstName, $middleName, $lastName, $age, $gender, $registration, $image, $city, $barangay, $street, $contactNumber, $role);

        if ($query->execute()) {
            $loginQuery = $this->conn->prepare("INSERT INTO `admin_tbl` (`teacher_id`, `email`, `password`, `email_verification`) VALUES (?, ?, ?, ?)");
            $loginQuery->bind_param("ssss", $adminId, $email, $hashedPassword, $emailVerification);
            if ($loginQuery->execute()) {
                return $adminId;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function facultySignUp($firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $registration, $image, $role, $emailVerification, $city, $street, $barangay, $contactNumber)
    {
        $year = date("Y");
        $facultyId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
        $checkIdResult = $this->checkAdminId($facultyId);

        while ($checkIdResult->num_rows > 0) {
            $facultyId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
            $checkIdResult = $this->checkAdminId($facultyId);
        }

        $query = $this->conn->prepare("INSERT INTO `teacher_tbl` (`teacher_id`, `teacher_fname`, `teacher_mname`, `teacher_lname`, `age`, `gender`, `registration`, `image_profile`, `city`, `barangay`, `street`, `contact_number`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssissssssss", $facultyId, $firstName, $middleName, $lastName, $age, $gender, $registration, $image, $city, $barangay, $street, $contactNumber, $role);

        if ($query->execute()) {
            $loginQuery = $this->conn->prepare("INSERT INTO `faculty_tbl` (`teacher_id`, `email`, `password`, `email_verification`) VALUES (?, ?, ?, ?)");
            $loginQuery->bind_param("ssss", $facultyId, $email, $hashedPassword, $emailVerification);
            if ($loginQuery->execute()) {
                return $facultyId;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function checkEmail($email)
    {
        $query = $this->conn->prepare("SELECT * FROM `login_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $checkEmail = $query->get_result();
            return $checkEmail;
        }
    }

    public function checkAdminEmail($email)
    {
        $query = $this->conn->prepare("SELECT * FROM `admin_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $checkEmail = $query->get_result();
            return $checkEmail;
        }
    }

    public function checkFacultyEmail($email)
    {
        $query = $this->conn->prepare("SELECT * FROM `faculty_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $checkEmail = $query->get_result();
            return $checkEmail;
        }
    }

    public function editProfileForm($firstName, $lastName, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET student_fname = ?, student_lname = ? WHERE student_id = ?");
        $query->bind_param("ssi", $firstName, $lastName, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function editPersonalForm($firstName, $lastName, $middleName, $age, $gender, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET student_fname = ?, student_lname = ?, student_mname = ?, age = ?, gender = ? WHERE student_id = ?");
        $query->bind_param("sssisi", $firstName, $lastName, $middleName, $age, $gender, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function editBackgroundForm($city, $barangay, $street, $guardianFullName, $guardianContact, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET city = ?, barangay = ?, street = ?, guardian_name = ?, guardian_contact = ? WHERE student_id = ?");
        $query->bind_param("sssssi", $city, $barangay, $street, $guardianFullName, $guardianContact, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function getSection($sectionId)
    {
        $query = $this->conn->prepare("SELECT `section` FROM `section_tbl` WHERE section_id = ?");
        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $row = $result->fetch_assoc();
            return $row['section'];
        } else {
            return false;
        }
    }

    public function getGradeLevel($levelId)
    {
        $query = $this->conn->prepare("SELECT `grade_level` FROM `level_tbl` WHERE level_id = ?");
        $query->bind_param("s", $levelId);

        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['grade_level'];
            } else {
                return false;
            }
        }
    }

    public function updateAvatar($newFileName, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET profile_image = ? WHERE student_id = ?");
        $query->bind_param("ss", $newFileName, $studentId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function getStudentData($studentId)
    {
        $query = $this->conn->prepare("SELECT * FROM student_tbl WHERE student_id = ?");
        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result();
            $student = $result->fetch_assoc();
            return $student;
        } else {
            return false;
        }
    }

    public function checkStudentId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM student_tbl WHERE student_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function checkAdminId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM teacher_tbl WHERE teacher_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function getSubjects($sectionId, $level_id)
    {

        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.link,
            s.subject_title,
            s.subject_code,
            t.teacher_fname,
            t.teacher_lname,
            t.gender
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        WHERE 
            s.level_id = ? 
        AND 
            s.section_id = ?
        AND
            s.archived = 'No'");
        $query->bind_param("ss", $level_id, $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjects = $result->fetch_all(MYSQLI_ASSOC);
            return $subjects;
        } else {
            return false;
        }
    }

    public function getAdminSubjects($teacherId)
    {

        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.link,
            s.section_id,
            s.subject_title,
            s.subject_code,
            t.teacher_fname,
            t.teacher_lname,
            t.gender,
            l.level_id,
            l.grade_level,
            c.section
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        INNER JOIN
            level_tbl l
        ON
            s.level_id = l.level_id
        INNER JOIN
            section_tbl c
        ON
            s.section_id = c.section_id
        WHERE 
            s.teacher_id = ? 
         AND
            s.archived = 'No'");
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjects = $result->fetch_all(MYSQLI_ASSOC);
            return $subjects;
        } else {
            return false;
        }
    }

    public function getSubjectDetails($subject, $sectionId, $level_id)
    {
        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.link,
            s.subject_title,
            s.subject_code,
            t.teacher_fname,
            t.teacher_lname,
            t.gender
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        WHERE 
            s.subject = ?
        AND
            s.level_id = ? 
        AND 
            s.section_id = ?");
        $query->bind_param("sss", $subject, $level_id, $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        } else {
            return false;
        }
    }

    public function getTeacherSubjectDetails($teacherId, $section, $subject, $gradeLevelId)
    {
        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.link,
            s.subject_title,
            s.subject_code,
            t.teacher_fname,
            t.teacher_lname,
            t.gender,
            l.level_id,
            l.grade_level,
            c.section,
            c.section_id
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        INNER JOIN
            section_tbl c
        ON
            s.section_id = c.section_id
        INNER JOIN
            level_tbl l
        ON
            s.level_id = l.level_id
        WHERE 
            s.teacher_id = ?
        AND
            s.section_id = ?
        AND
            s.subject = ?
        AND
            s.level_id = ?
        ");
        $query->bind_param("ssss", $teacherId, $section, $subject, $gradeLevelId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        } else {
            return false;
        }
    }

    public function adminLogin($email, $password)
    {
        $query = $this->conn->prepare("SELECT *, `password` FROM `admin_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $admin = $result->fetch_assoc();

                if (password_verify($password, $admin['password'])) {
                    return $admin;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    public function facultyLogin($email, $password)
    {
        $query = $this->conn->prepare("SELECT *, `password` FROM `faculty_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                $faculty = $result->fetch_assoc();

                if (password_verify($password, $faculty['password'])) {
                    return $faculty;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    public function getTeacherData($teacherId)
    {
        $query = $this->conn->prepare("SELECT * FROM teacher_tbl WHERE teacher_id = ?");
        $query->bind_param("s", $teacherId);

        if ($query->execute()) {
            $result = $query->get_result();
            $admin = $result->fetch_assoc();
            return $admin;
        } else {
            return false;
        }
    }

    public function getTotalStudent()
    {
        $query = $this->conn->prepare("SELECT COUNT(`student_id`) as total FROM student_tbl");

        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return 'System Error';
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
            student_tbl c
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

    public function getTotalTeacherLesson($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT `lesson_id`) as total
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        INNER JOIN
            lesson_tbl c
        ON
            s.subject_id = c.subject_id
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

    public function getTotalTeacherArchived($teacherId)
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(`subject_id`) as total
        FROM subject_tbl s
        INNER JOIN
            teacher_tbl t
        ON
            s.teacher_id = t.teacher_id
        WHERE
            t.teacher_id = ?
        AND
            s.archived = 'Yes'
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

    public function getTotalTeacher()
    {
        $query = $this->conn->prepare("SELECT COUNT(`teacher_id`) as total FROM teacher_tbl");

        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return 'System Error';
        }
    }

    public function getTotalSubject()
    {
        $query = $this->conn->prepare("SELECT COUNT(`subject_id`) as total FROM subject_tbl");

        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return 'System Error';
        }
    }

    public function getTotalQuiz()
    {
        $query = $this->conn->prepare("SELECT COUNT(`quiz_id`) as total FROM quiz_tbl");

        if ($query->execute()) {
            $result = $query->get_result();
            $total = $result->fetch_assoc();
            return $total['total'];
        } else {
            return 'System Error';
        }
    }

    public function adminEditProfileForm($firstName, $lastName, $teacherId)
    {
        $query = $this->conn->prepare("UPDATE teacher_tbl SET teacher_fname = ?, teacher_lname = ? WHERE teacher_id = ?");
        $query->bind_param("sss", $firstName, $lastName, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function adminEditPersonalForm($firstName, $lastName, $middleName, $age, $gender, $teacherId)
    {
        $query = $this->conn->prepare("UPDATE teacher_tbl SET teacher_fname = ?, teacher_lname = ?, teacher_mname = ?, age = ?, gender = ? WHERE teacher_id = ?");
        $query->bind_param("sssiss", $firstName, $lastName, $middleName, $age, $gender, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function adminEditBackgroundForm($city, $barangay, $street, $contactNumber, $teacherId)
    {
        $query = $this->conn->prepare("UPDATE teacher_tbl SET city = ?, barangay = ?, street = ?, contact_number = ? WHERE teacher_id = ?");
        $query->bind_param("sssss", $city, $barangay, $street, $contactNumber, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function adminUpdateAvatar($newFileName, $teacherId)
    {
        $query = $this->conn->prepare("UPDATE teacher_tbl SET image_profile = ? WHERE teacher_id = ?");
        $query->bind_param("ss", $newFileName, $teacherId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function adminGetPassword($teacherId)
    {
        $query = $this->conn->prepare("SELECT password FROM admin_tbl WHERE teacher_id = ?");
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result['password'];
        } else {
            return false;
        }
    }

    public function facultyGetPassword($teacherId)
    {
        $query = $this->conn->prepare("SELECT password FROM faculty_tbl WHERE teacher_id = ?");
        $query->bind_param("s", $teacherId);
        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result['password'];
        } else {
            return false;
        }
    }
    public function updateAdminPassword($newPassword, $currentDate, $teacherId)
    {

        $query = $this->conn->prepare("UPDATE admin_tbl SET password = ?, password_change = ? WHERE teacher_id =?");
        $query->bind_param("sss", $newPassword, $currentDate, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateFacultyPassword($newPassword, $currentDate, $teacherId)
    {

        $query = $this->conn->prepare("UPDATE faculty_tbl SET password = ?, password_change = ? WHERE teacher_id =?");
        $query->bind_param("sss", $newPassword, $currentDate, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function studentGetPassword($studentId)
    {
        $query = $this->conn->prepare("SELECT password FROM login_tbl WHERE student_id = ?");
        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result['password'];
        } else {
            return false;
        }
    }
    public function updateStudentPassword($newPassword, $currentDate, $studentId)
    {

        $query = $this->conn->prepare("UPDATE login_tbl SET password = ?, password_change = ? WHERE student_id =?");
        $query->bind_param("sss", $newPassword, $currentDate, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateStudentEmailVerif($studentId)
    {
        $verified = 'Verified';
        $query = $this->conn->prepare("UPDATE login_tbl SET email_verification = ? WHERE student_id =?");
        $query->bind_param("ss", $verified, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateAdminEmailVerif($teacherId)
    {
        $verified = 'Verified';
        $query = $this->conn->prepare("UPDATE admin_tbl SET email_verification = ? WHERE teacher_id =?");
        $query->bind_param("ss", $verified, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateFacultyEmailVerif($teacherId)
    {
        $verified = 'Verified';
        $query = $this->conn->prepare("UPDATE faculty_tbl SET email_verification = ? WHERE teacher_id =?");
        $query->bind_param("ss", $verified, $teacherId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function facultyAddLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $fileDestination)
    {
        $year = date("Y");
        $lessonId = 'L' . $year . sprintf('%04d', rand(0, 9999));
        $checkIdResult = $this->checkLessonId($lessonId);

        while ($checkIdResult->num_rows > 0) {
            $lessonId = 'L' . $year . sprintf('%04d', rand(0, 9999));
            $checkIdResult = $this->checkLessonId($lessonId);
        }
        $query = $this->conn->prepare("INSERT INTO `lesson_tbl` (`lesson_id`, `level_id`, `subject_id`, `teacher_id`, `section_id`, `lesson_title`, `lesson_number`, `quarter`, `pdf_file`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssssssss", $lessonId, $levelId, $subjectId, $teacherId, $sectionId, $lessonTitle, $lessonNumber, $quarter, $fileDestination);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function checkLessonId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM lesson_tbl WHERE lesson_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
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


}

