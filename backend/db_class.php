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
        } else {
            return false;
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

    public function getFacultySubjects($teacherId)
    {

        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
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

    public function getAdminSubjects()
    {

        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.section_id,
            s.subject_title,
            s.subject_code,
            t.teacher_id,
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
            s.archived = 'No'");
        if ($query->execute()) {
            $result = $query->get_result();
            $subjects = $result->fetch_all(MYSQLI_ASSOC);
            return $subjects;
        } else {
            return false;
        }
    }

    public function getAdminArchivedSubjects()
    {

        $query = $this->conn->prepare("
        SELECT 
            s.subject_id,
            s.subject,
            s.level_id,
            s.icon,
            s.section_id,
            s.subject_title,
            s.subject_code,
            t.teacher_id,
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
            s.archived = 'Yes'");
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
            s.subject_title,
            s.subject_code,
            t.teacher_fname,
            t.teacher_lname,
            t.gender,
            s.section_id
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
            s.subject_code,
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
            s.subject_id = ?
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

    public function adminGetTotalTeacherStudent()
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT `student_id`) as total
        FROM student_tbl
            ");
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
        FROM 
            lesson_tbl
        WHERE
            teacher_id = ?
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

    public function adminGetTotalTeacherLesson()
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(DISTINCT `lesson_id`) as total
        FROM lesson_tbl
            ");
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

    public function adminGetTotalTeacherArchived()
    {
        $query = $this->conn->prepare("
        SELECT 
            COUNT(`subject_id`) as total
        FROM subject_tbl 
        WHERE
            archived = 'Yes'
            ");
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

    public function addLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $fileDestination)
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

    public function adminAddLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $fileDestination)
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

    public function facultyGetLessons($levelId, $subjectId, $sectionId)
    {
        $query = $this->conn->prepare("SELECT * FROM lesson_tbl WHERE level_id = ? AND subject_id = ? AND section_id = ? ORDER BY lesson_number ASC");
        $query->bind_param("sss", $levelId, $subjectId, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();

            $lessons = $result->fetch_all(MYSQLI_ASSOC);

            return $lessons;
        } else {
            return false;
        }
    }

    public function adminGetLessons($levelId, $subjectID, $teacherId, $sectionId)
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
    public function studentGetLessons($levelId, $subjectID, $sectionId)
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

    public function checkLessonNumber($levelId, $subjectID, $sectionId, $lessonNumber)
    {
        $query = $this->conn->prepare("SELECT * FROM lesson_tbl WHERE level_id = ? AND subject_id = ? AND section_id = ? AND lesson_number = ?");
        $query->bind_param("sssi", $levelId, $subjectID, $sectionId, $lessonNumber);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function getSubject($subjectId)
    {
        $query = $this->conn->prepare("SELECT * FROM subject_tbl WHERE subject_id = ?");
        $query->bind_param("s", $subjectId);
        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result;
        }
    }

    public function facultyGetQuizzes($teacherId, $status)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.icon,
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
            subject.teacher_id = ?
        AND
            quiz.status = ?
        GROUP BY
            quiz.quiz_id
        ORDER BY
            quiz.add_time DESC;
        ");
        $query->bind_param("ss", $teacherId, $status);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_all(MYSQLI_ASSOC);
            return $subjectDetails;
        }

        return [];
    }
    public function adminGetQuizzes($status)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.icon,
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
            quiz.status = ?
        GROUP BY
            quiz.quiz_id
        ORDER BY
            quiz.add_time DESC;
        ");
        $query->bind_param("s", $status);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_all(MYSQLI_ASSOC);
            return $subjectDetails;
        }

        return [];
    }
    public function addQuiz($subjectId, $lessonId, $quizNumber, $quizTitle, $itemNumber)
    {
        $year = date("Y");
        $quizId = 'Q' . $year . sprintf('%05d', rand(0, 99999));
        $checkIdResult = $this->checkQuizId($quizId);

        while ($checkIdResult->num_rows > 0) {
            $quizId = 'Q' . $year . sprintf('%05d', rand(0, 99999));
            $checkIdResult = $this->checkQuizId($quizId);
        }
        $query = $this->conn->prepare("INSERT INTO `quiz_tbl` (`quiz_id`, `subject_id`, `lesson_id`, `quiz_number`, `title`, `item_number`) VALUES (?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssisi", $quizId, $subjectId, $lessonId, $quizNumber, $quizTitle, $itemNumber);
        if ($query->execute()) {
            return $quizId;
        } else {
            return false;
        }
    }
    public function checkQuizId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM quiz_tbl WHERE quiz_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function checkQuizNumber($subjectID, $lessonId, $quizNumber)
    {
        $query = $this->conn->prepare("SELECT * FROM quiz_tbl WHERE subject_id = ? AND lesson_id = ? AND quiz_number = ?");
        $query->bind_param("ssi", $subjectID, $lessonId, $quizNumber);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }
    public function getQuestions($quizId): array
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

    public function getChoices($questionId, $quizId): array
    {
        $query = $this->conn->prepare("SELECT * FROM choices_tbl WHERE question_id = ? AND quiz_id = ? ORDER BY choice_order ASC");
        $query->bind_param("ss", $questionId, $quizId);

        if ($query->execute()) {
            $result = $query->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }
    public function addQuestion($quizId, $question)
    {
        $questionId = $quizId . sprintf('%02d', rand(0, 99));
        $checkIdResult = $this->checkQuestionId($questionId);

        while ($checkIdResult->num_rows > 0) {
            $questionId = $quizId . sprintf('%02d', rand(0, 99));
            $checkIdResult = $this->checkQuestionId($questionId);
        }
        $query = $this->conn->prepare("INSERT INTO `question_tbl` (`question_id`, `quiz_id`, `question`) VALUES (?, ?, ?)");
        $query->bind_param("sss", $questionId, $quizId, $question);
        if ($query->execute()) {
            return $questionId;
        } else {
            return false;
        }
    }

    public function checkQuestionId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM question_tbl WHERE question_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        } else {
            return false;
        }
    }

    public function addChoice($questionId, $quizId, $choice, $order, $value)
    {
        $year = date("Y");
        $choiceId = 'C' . $year . sprintf('%05d', rand(0, 99999));
        $checkIdResult = $this->checkChoiceId($choiceId);

        while ($checkIdResult->num_rows > 0) {
            $choiceId = 'C' . $year . sprintf('%05d', rand(0, 99999));
            $checkIdResult = $this->checkChoiceId($choiceId);
        }
        $query = $this->conn->prepare("INSERT INTO `choices_tbl` (`choice_id`, `question_id`, `quiz_id`, `choice`, `choice_order`, `value`) VALUES (?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssii", $choiceId, $questionId, $quizId, $choice, $order, $value);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkChoiceId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM choices_tbl WHERE choice_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        } else {
            return false;
        }
    }

    public function editQuestion($editQuestionId, $editQuestionText)
    {
        $query = $this->conn->prepare("UPDATE question_tbl SET question = ? WHERE question_id = ?");
        $query->bind_param("ss", $editQuestionText, $editQuestionId);
        if ($query->execute()) {
            return $editQuestionId;
        } else {
            return false;
        }
    }

    public function editChoice($choiceId, $choice, $value, $questionId)
    {
        $query = $this->conn->prepare("UPDATE choices_tbl SET choice = ?, value = ? WHERE choice_id = ? AND question_id = ?");
        $query->bind_param("ssss", $choice, $value, $choiceId, $questionId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteChoice($choiceId, $questionId)
    {
        $query = $this->conn->prepare("DELETE FROM choices_tbl WHERE choice_id = ? AND question_id = ?");
        $query->bind_param("ss", $choiceId, $questionId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function getQuizId($questionId)
    {
        $query = $this->conn->prepare("SELECT `quiz_id` FROM question_tbl WHERE question_id = ?");
        $query->bind_param("s", $questionId);
        if ($query->execute()) {
            $result = $query->get_result();
            if ($row = $result->fetch_assoc()) {
                return $row['quiz_id'];
            } else {
                return null;
            }
        } else {
            return false;
        }
    }

    public function getItemCount($quizId)
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

    public function updateQuizItemCount($quizId, $itemCount)
    {
        $query = $this->conn->prepare("UPDATE quiz_tbl SET item_number = ? WHERE quiz_id = ?");
        $query->bind_param("is", $itemCount, $quizId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function editQuiz($editQuizId, $editQuizTitle, $editQuizNumber, $editSubject, $editLesson)
    {
        $query = $this->conn->prepare("UPDATE quiz_tbl SET subject_id = ?, lesson_id = ?, quiz_number = ?, title = ? WHERE quiz_id = ?");
        $query->bind_param("ssiss", $editSubject, $editLesson, $editQuizNumber, $editQuizTitle, $editQuizId);
        if ($query->execute()) {
            return $editQuizId;
        } else {
            return false;
        }
    }

    public function toggleQuizStatus($quizId, $status, $dueDate)
    {
        $query = $this->conn->prepare("UPDATE quiz_tbl SET status = ?, due_date = ? WHERE quiz_id = ?");
        $query->bind_param("sss", $status, $dueDate, $quizId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkQuizInfo($quizId)
    {
        $query = $this->conn->prepare("SELECT item_number, status FROM quiz_tbl WHERE quiz_id = ?");
        $query->bind_param("s", $quizId);
        if ($query->execute()) {
            $quiz = $query->get_result()->fetch_assoc();
            return $quiz;
        } else {
            return 0;
        }
    }

    public function deleteQuestion($questionId)
    {
        $query = $this->conn->prepare("DELETE FROM question_tbl WHERE question_id = ?");
        $query->bind_param("s", $questionId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteChoices($questionId)
    {
        $query = $this->conn->prepare("DELETE FROM choices_tbl WHERE question_id = ?");
        $query->bind_param("s", $questionId);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function studentGetQuizzes($sectionId, $studentId, $status)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            subject.icon,
            subject.subject_title,
            subject.subject_code,
            level.level_id,
            level.grade_level,
            section.section,
            quiz.quiz_id,
            quiz.title,
            quiz.quiz_number,
            quiz.status,
            quiz.due_date,
            quiz.item_number,
            lesson.lesson_id,
            student.section_id,
            teacher.teacher_id,
            teacher.teacher_lname,
            teacher.teacher_fname,
            teacher.teacher_mname,
            teacher.gender,
            lesson.lesson_title,
            score.score,
            score.remarks,
            score.attempts
        FROM quiz_tbl quiz
        INNER JOIN
            subject_tbl subject
        ON
            subject.subject_id = quiz.subject_id
        INNER JOIN
            student_tbl student
        ON
            student.section_id = subject.section_id
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
        LEFT JOIN
            score_tbl score
        ON
            quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        INNER JOIN
            teacher_tbl teacher
        ON
            teacher.teacher_id = subject.teacher_id
        WHERE 
            student.section_id = ?
        AND
            student.student_id = ?
        AND
            quiz.status = ?
       GROUP BY
            quiz.quiz_id
        ORDER BY
            quiz.add_time DESC;
        ");
        $query->bind_param("sss", $sectionId, $studentId, $status);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_all(MYSQLI_ASSOC);
            return $subjectDetails;
        }

        return [];
    }

    public function checkQuizAnswer($choiceId)
    {
        $query = $this->conn->prepare("SELECT value FROM choices_tbl WHERE choice_id = ?");
        $query->bind_param("s", $choiceId);

        if ($query->execute()) {
            $result = $query->get_result()->fetch_assoc();
            return $result['value'] ?? null;
        }
        return null;
    }

    public function recordAnswer($studentId, $quizId, $questionId, $choiceId, $value)
    {
        $year = date("Y");
        $answerId = 'A' . $year . sprintf('%05d', rand(0, 99999));

        while ($this->checkAnswerId($answerId)->num_rows > 0) {
            $answerId = 'A' . $year . sprintf('%05d', rand(0, 99999));
        }

        $query = $this->conn->prepare("INSERT INTO `answer_tbl` (`answer_id`, `student_id`, `quiz_id`, `question_id`, `choice_id`, `value`) VALUES (?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssssi", $answerId, $studentId, $quizId, $questionId, $choiceId, $value);

        return $query->execute();
    }

    public function checkAnswerId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM answer_tbl WHERE answer_id = ?");
        $query->bind_param("s", $id);

        if ($query->execute()) {
            return $query->get_result();
        }
        return false;
    }

    public function updateAnswer($studentId, $quizId, $questionId, $choiceId, $value)
    {
        $query = $this->conn->prepare("UPDATE answer_tbl SET choice_id = ?, value = ? WHERE student_id = ? AND quiz_id = ? AND question_id = ?");
        $query->bind_param("sisss", $choiceId, $value, $studentId, $quizId, $questionId);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function recordScore($quizId, $studentId, $score, $itemCount, $remarks, $scorePercentage)
    {
        $year = date("Y");
        $scoreId = 'R' . $year . sprintf('%05d', rand(0, 99999));

        while ($this->checkScoreId($scoreId)->num_rows > 0) {
            $scoreId = 'R' . $year . sprintf('%05d', rand(0, 99999));
        }

        $query = $this->conn->prepare("INSERT INTO `score_tbl` (`score_id`, `quiz_id`, `student_id`, `score`, `item_number`, `remarks`, `percentage`) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssiisi", $scoreId, $quizId, $studentId, $score, $itemCount, $remarks, $scorePercentage);

        return $query->execute();
    }

    public function updateScore($quizId, $studentId, $score, $itemCount, $remarks, $attempts, $scorePercentage)
    {
        $query = $this->conn->prepare("UPDATE score_tbl SET score = ?, item_number = ?, remarks = ?, attempts = ?, percentage = ? WHERE student_id = ? AND quiz_id = ?");
        $query->bind_param("iisiiss", $score, $itemCount, $remarks, $attempts, $scorePercentage, $studentId, $quizId);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

    public function getAttempts($quizId, $studentId)
    {
        $query = $this->conn->prepare("SELECT attempts FROM score_tbl WHERE quiz_id = ? AND student_id = ?");
        $query->bind_param("ss", $quizId, $studentId);

        if ($query->execute()) {
            $attempts = $query->get_result()->fetch_assoc();
            return $attempts['attempts'] ?? null;
        }
        return false;
    }

    public function checkScoreId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM score_tbl WHERE score_id = ?");
        $query->bind_param("s", $id);

        if ($query->execute()) {
            return $query->get_result();
        }
        return false;
    }

    public function studentGetTotalQuizzesCount($studentId)
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
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        INNER JOIN teacher_tbl teacher
        ON teacher.teacher_id = subject.teacher_id
        WHERE 
            student.student_id = ?
        AND 
            score.score IS NOT NULL -- Ensure score is not null
    ");

        $query->bind_param("s", $studentId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails['quiz_count'];
        }

        return 0;
    }

    public function studentGetPendingQuizzesCount($sectionId, $studentId)
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

        return null; // Return null if no GWA records are found or query fails
    }

    public function studentGetAverageScore($studentId)
    {
        // Prepare the SQL query to calculate the average score for the student
        $query = $this->conn->prepare("
        SELECT 
            AVG(score.score) AS average_score
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_tbl student
        ON student.section_id = subject.section_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id
        WHERE 
            student.student_id = ?
        AND 
            score.score IS NOT NULL
    ");

        // Bind the studentId parameter
        $query->bind_param("s", $studentId);

        // Execute the query
        if ($query->execute()) {
            $result = $query->get_result();
            $scoreDetails = $result->fetch_assoc();

            // Return the average score if the result is valid
            if ($scoreDetails && isset($scoreDetails['average_score'])) {
                return round($scoreDetails['average_score'], 2); // Round to 2 decimal places
            }
        }

        return null; // Return null if no scores are found or query fails
    }

    public function studentGetQuizCompletion($studentId)
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
            INNER JOIN student_tbl student
            ON student.section_id = subject.section_id
            WHERE 
                student.student_id = ?
            AND quiz.status IN ('Active', 'Completed')
            AND quiz.due_date BETWEEN ? AND ?
        ");
        $totalQuizzesQuery->bind_param("sss", $studentId, $schoolYearStart, $schoolYearEnd);

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
            INNER JOIN student_tbl student
            ON student.section_id = subject.section_id
            LEFT JOIN score_tbl score
            ON quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
            WHERE 
                student.student_id = ?
            AND quiz.status IN ('Active', 'Completed')
            AND quiz.due_date BETWEEN ? AND ?
            AND score.score IS NOT NULL
        ");
        $completedQuizzesQuery->bind_param("sss", $studentId, $schoolYearStart, $schoolYearEnd);

        if ($completedQuizzesQuery->execute()) {
            $result = $completedQuizzesQuery->get_result();
            $completedQuizData = $result->fetch_assoc();
            $completedQuizCount = $completedQuizData['completed_quiz_count'];
        } else {
            return $emptyValue;
        }

        if ($totalQuizCount > 0) {
            $completionPercentage = ($completedQuizCount / $totalQuizCount) * 100;
            return round($completionPercentage) . "%";
        }

        return $emptyValue;
    }

    public function studentGetAverageScoreBySubject($studentId, $sectionId)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject,          -- Get the subject name
            AVG(score.score) AS average_score -- Calculate the average score for the subject
        FROM quiz_tbl quiz
        INNER JOIN subject_tbl subject
        ON subject.subject_id = quiz.subject_id
        INNER JOIN student_tbl student
        ON student.section_id = subject.section_id
        LEFT JOIN score_tbl score
        ON quiz.quiz_id = score.quiz_id
        WHERE 
            score.student_id = ?
        AND 
            score.score IS NOT NULL
        AND
            subject.section_id = ?
        GROUP BY 
            subject.subject_id         -- Group by subject to calculate per subject
        ORDER BY 
            subject.subject ASC   -- Order by subject name (optional)
    ");

        $query->bind_param("ss", $studentId, $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $averageScores = $result->fetch_all(MYSQLI_ASSOC);

            if (empty($averageScores) || count($averageScores) === 1) {
                return 'No Data';
            }

            $largest = null;
            $smallest = null;

            foreach ($averageScores as $scoreData) {
                $averageScore = $scoreData['average_score'];

                if ($largest === null || $averageScore > $largest['average_score']) {
                    $largest = $scoreData;
                }
                if ($smallest === null || $averageScore < $smallest['average_score']) {
                    $smallest = $scoreData;
                }
            }

            return [
                'largest' => $largest['subject'] ?? null,
                'smallest' => $smallest['subject'] ?? null,
            ];
        }

        return null;
    }

    public function studentGetPendingQuizzes($sectionId, $studentId)
    {
        $query = $this->conn->prepare("
        SELECT 
            subject.subject_id,
            subject.subject,
            subject.level_id,
            level.grade_level,
            quiz.quiz_id,
            quiz.title,
            quiz.quiz_number,
            quiz.status,
            quiz.due_date,
            lesson.lesson_id,
            lesson.lesson_number,
            student.section_id,
            teacher.teacher_id,
            lesson.lesson_title
        FROM quiz_tbl quiz
        INNER JOIN
            subject_tbl subject
        ON
            subject.subject_id = quiz.subject_id
        INNER JOIN
            student_tbl student
        ON
            student.section_id = subject.section_id
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
        LEFT JOIN
            score_tbl score
        ON
            quiz.quiz_id = score.quiz_id AND score.student_id = student.student_id
        INNER JOIN
            teacher_tbl teacher
        ON
            teacher.teacher_id = subject.teacher_id
        WHERE 
            student.section_id = ?
        AND
            student.student_id = ?
        AND
            quiz.status = 'Active'
        AND
            score.score IS NULL
        GROUP BY
            quiz.quiz_id
        ORDER BY
            quiz.due_date DESC
        LIMIT 3 
    ");

        $query->bind_param("ss", $sectionId, $studentId);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_all(MYSQLI_ASSOC);
            return $subjectDetails;
        }

        return [];
    }

    public function facultyGetSection()
    {
        $query = $this->conn->prepare("
        SELECT 
            level.level_id,
            level.grade_level,
            level.short,
            section.section,
            section.section_id,
            teacher.teacher_lname,
            teacher.teacher_fname,
            teacher.gender
        FROM
            section_tbl section
        INNER JOIN
            level_tbl level
        ON
            section.level_id = level.level_id
        LEFT JOIN
            teacher_tbl teacher
        ON
            section.teacher_id = teacher.teacher_id
        GROUP BY
            section.section_id
        ORDER BY
                section.section ASC
        ");
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_all(MYSQLI_ASSOC);
            return $subjectDetails;
        }

        return [];
    }

    public function getTotalStudentBySection($sectionId)
    {
        $query = $this->conn->prepare("SELECT COUNT(`student_id`) as total FROM student_tbl WHERE section_id = ?");

        $query->bind_param("s", $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $count = $result->fetch_assoc();
            return $count['total'];
        } else {
            return '0';
        }
    }

    public function facultyGetSectionData($sectionId)
    {
        $query = $this->conn->prepare("
        SELECT 
            level.level_id,
            level.grade_level,
            level.short,
            section.section,
            section.section_id
        FROM 
            section_tbl section
        INNER JOIN
            level_tbl level
        ON
            section.level_id = level.level_id
        WHERE 
            section.section_id = ?
        ");
        $query->bind_param("s", $sectionId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectDetails = $result->fetch_assoc();
            return $subjectDetails;
        }

        return [];
    }

    public function checkGrade($studentId, $subjectId, $quarter)
    {
        $query = $this->conn->prepare("SELECT * FROM grade_tbl WHERE student_id = ? AND subject_id = ? AND quarter = ?");
        $query->bind_param("sss", $studentId, $subjectId, $quarter);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function addGrade($studentId, $subjectId, $studentGrade, $remarks, $quarter)
    {
        $year = date("Y");
        $gradeId = 'G' . $year . sprintf('%05d', rand(0, 99999));
        $checkIdResult = $this->checkGradeId($gradeId);

        while ($checkIdResult->num_rows > 0) {
            $gradeId = 'G' . $year . sprintf('%05d', rand(0, 99999));
            $checkIdResult = $this->checkGradeId($gradeId);
        }
        $query = $this->conn->prepare("INSERT INTO `grade_tbl` (`grade_id`, `student_id`, `subject_id`, `grade`, `remarks`, `quarter`) VALUES (?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssss", $gradeId, $studentId, $subjectId, $studentGrade, $remarks, $quarter);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkGradeId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM grade_tbl WHERE grade_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function editGrade($gradeId, $editGrade, $remarks, $quarter)
    {
        $query = $this->conn->prepare("UPDATE grade_tbl SET grade = ?, remarks = ?, quarter = ? WHERE grade_id = ?");
        $query->bind_param("ssss", $editGrade, $remarks, $quarter, $gradeId);
        if ($query->execute()) {
            return true;
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

    public function addFacultyList($teacherLname, $teacherFname, $teacherMname, $teacherSuffix, $role)
    {
        $year = date("Y");
        $trn = '109625' . $year . sprintf('%05d', rand(0, 99999));
        $checkIdResult = $this->checkTRN($trn);

        while ($checkIdResult->num_rows > 0) {
            $trn = '109625' . $year . sprintf('%05d', rand(0, 99999));
            $checkIdResult = $this->checkTRN($trn);
        }
        $query = $this->conn->prepare("INSERT INTO `faculty_masterlist` (`trn`, `teacher_fname`, `teacher_mname`, `teacher_lname`, `teacher_suffix`, `role`, `year`) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssssss", $trn, $teacherFname, $teacherMname, $teacherLname, $teacherSuffix, $role, $year);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkTRN($id)
    {
        $query = $this->conn->prepare("SELECT * FROM faculty_masterlist WHERE trn = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function checkLRN($id)
    {
        $query = $this->conn->prepare("SELECT * FROM student_masterlist WHERE lrn = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function addStudentList($studLRN, $studLname, $studFname, $studMname, $studAge, $studGender, $studGradeLevel, $studSection)
    {
        $year = date("Y");
        $query = $this->conn->prepare("INSERT INTO `student_masterlist` (`lrn`, `student_lname`, `student_fname`, `student_mname`, `gender`, `age`, `grade_level`, `section`, `year`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("sssssisss", $studLRN, $studLname, $studFname, $studMname, $studGender, $studAge, $studGradeLevel, $studSection, $year);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function subjectTeacherOptions()
    {
        $query = $this->conn->prepare("
        SELECT
            teacher_id,
            CONCAT(teacher_fname, ' ', teacher_lname) AS full_name,
            gender
        FROM teacher_tbl 
        ");
        if ($query->execute()) {
            $result = $query->get_result();
            $options = $result->fetch_all(MYSQLI_ASSOC);
            return $options;
        }
    }

    public function getSubjectData($subject)
    {
        $query = $this->conn->prepare("
        SELECT * FROM subject_masterlist WHERE subject = ?
    ");
        $query->bind_param("s", $subject);

        if ($query->execute()) {
            $result = $query->get_result();
            $subjectData = $result->fetch_assoc();
            return $subjectData;
        }

        return false;
    }

    public function addSubject($teacherId, $levelId, $subject, $subject_title, $sectionId, $icon, $subject_code, $code, $link)
    {
        $year = date("Y");
        $subjectId = 'S' . $code . $year . sprintf('%04d', rand(0, 9999));
        $checkIdResult = $this->checkSubjectId($subjectId);

        while ($checkIdResult->num_rows > 0) {
            $subjectId = 'S' . $code . $year . sprintf('%04d', rand(0, 9999));
            $checkIdResult = $this->checkSubjectId($subjectId);
        }
        $query = $this->conn->prepare("INSERT INTO `subject_tbl` (`subject_id`, `teacher_id`, `level_id`, `subject`, `subject_title`, `section_id`, `icon`, `subject_code`, `year`, `link`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssssssis", $subjectId, $teacherId, $levelId, $subject, $subject_title, $sectionId, $icon, $subject_code, $year, $link);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkSubjectId($id)
    {
        $query = $this->conn->prepare("SELECT * FROM subject_tbl WHERE subject_id = ?");
        $query->bind_param("s", $id);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function checkSubjectBySection($sectionId, $subject)
    {
        $query = $this->conn->prepare("SELECT * FROM subject_tbl WHERE section_id = ? AND subject = ?");
        $query->bind_param("ss", $sectionId, $subject);
        if ($query->execute()) {
            $result = $query->get_result();
            return $result;
        }
    }

    public function updateSubject($subjectId, $teacherId, $levelId, $subject, $subject_title, $sectionId, $icon, $subject_code, $link)
    {
        $query = $this->conn->prepare("UPDATE subject_tbl SET teacher_id = ?, level_id = ?, subject = ?, subject_title = ?, section_id = ?, icon = ?, subject_code = ?, link = ? WHERE subject_id = ?");
        $query->bind_param("sssssssss", $teacherId, $levelId, $subject, $subject_title, $sectionId, $icon, $subject_code, $link, $subjectId,);
        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function checkSubjectInfo($subjectId)
    {
        $query = $this->conn->prepare("
        SELECT * FROM subject_tbl WHERE subject_id = ?
    ");
        $query->bind_param("s", $subjectId);
        if ($query->execute()) {
            $result = $query->get_result();
            $subjectData = $result->fetch_assoc();
            return $subjectData;
        }

        return false;
    }

    public function archiveSubject($subjectId, $archived)
    {
        $query = $this->conn->prepare("UPDATE subject_tbl SET archived = ? WHERE subject_id = ?");
        $query->bind_param("ss", $archived, $subjectId);
        if ($query->execute()) {
            return true;
        }
        return false;
    }

}


