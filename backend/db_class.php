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

            } else {
                return false;
            }
            return $studentId;
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

    public function editPersonalForm($firstName, $lastName, $middleName, $age, $gender, $email, $studentId)
    {   
        $emailQuery = $this->conn->prepare("UPDATE login_tbl SET email = ? WHERE student_id = ?");
        $emailQuery->bind_param("ss", $email, $studentId);

        $query = $this->conn->prepare("UPDATE student_tbl SET student_fname = ?, student_lname = ?, student_mname = ?, age = ?, gender = ? WHERE student_id = ?");
        $query->bind_param("sssisi", $firstName, $lastName, $middleName, $age, $gender, $studentId);

        if ($query->execute() && $emailQuery->execute()) {
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

    public function getStudentCredentials($studentId)
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

}

