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

    public function studentSignUp($gradeLevelId, $sectionId, $firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $guardian_name, $guardian_contact, $city, $barangay, $street, $registration, $image)
    {
        $year = date("Y");
        $studentId = $year . rand(0000, 9999);
        $checkIdResult = $this->checkStudentId($studentId);

        while ($checkIdResult->num_rows > 0) {
            $studentId = $year . rand(0000, 9999);
            $checkIdResult = $this->checkStudentId($studentId);
        }

        $query = $this->conn->prepare("INSERT INTO `student_tbl` (`student_id`, `level_id`, `section_id`, `student_fname`, `student_mname`, `student_lname`, `age`, `gender`, `guardian_name`, `guardian_contact`, `city`, `barangay`, `street`, `registration`, `profile_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssssissssssss", $studentId, $gradeLevelId, $sectionId, $firstName, $middleName, $lastName, $age, $gender, $guardian_name, $guardian_contact, $city, $barangay, $street, $registration, $image);


        if ($query->execute()) {
            $loginQuery = $this->conn->prepare("INSERT INTO `login_tbl` (`student_id`, `email`, `password`) VALUES (?, ?, ?)");
            $loginQuery->bind_param("sss", $studentId, $email, $hashedPassword);
            if ($loginQuery->execute()) {
                return $studentId;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function adminSignUp($firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $registration, $image, $role)
    {
        $year = date("Y");
        $adminId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
        $checkIdResult = $this->checkAdminId($adminId);

        while ($checkIdResult->num_rows > 0) {
            $adminId = 'T' . $year . '-' . sprintf('%03d', rand(0, 999));
            $checkIdResult = $this->checkAdminId($adminId);
        }

        $query = $this->conn->prepare("INSERT INTO `teacher_tbl` (`teacher_id`, `teacher_fname`, `teacher_mname`, `teacher_lname`, `age`, `gender`, `registration`, `image_profile`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $query->bind_param("ssssisss", $adminId, $firstName, $middleName, $lastName, $age, $gender, $registration, $image);

        if ($query->execute()) {
            $loginQuery = $this->conn->prepare("INSERT INTO `admin_tbl` (`teacher_id`, `role`, `email`, `password`) VALUES (?, ?, ?, ?)");
            $loginQuery->bind_param("ssss", $adminId, $role, $email, $hashedPassword);
            if ($loginQuery->execute()) {
                return $adminId;
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
            s.section_id = ?");
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
            s.teacher_id = ? ");
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
}

