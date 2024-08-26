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
        $query = $this->conn->prepare("SELECT *, `password` FROM `student_tbl` WHERE `email` = ?");
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

        $query = $this->conn->prepare("INSERT INTO `student_tbl` (`level_id`, `section_id`, `student_fname`, `student_mname`, `student_lname`, `age`, `gender`, `email`, `password`, `guardian_name`, `guardian_contact`, `city`, `barangay`, `street`, `registration`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


        $query->bind_param("sssssissssssssss", $gradeLevelId, $sectionId, $firstName, $middleName, $lastName, $age, $gender, $email, $hashedPassword, $guardian_name, $guardian_contact, $city, $barangay, $street, $registration, $image);


        if ($query->execute()) {
            return $this->conn->insert_id;
        } else {
            return false;
        }
    }

    public function checkEmail($email)
    {
        $query = $this->conn->prepare("SELECT * FROM `student_tbl` WHERE `email` = ?");
        $query->bind_param("s", $email);

        if ($query->execute()) {
            $checkEmail = $query->get_result();
            return $checkEmail;
        }
    }

    public function editProfileForm($firstName, $lastName, $email, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET student_fname = ?, student_lname = ?, email = ? WHERE student_id = ?");
        $query->bind_param("sssi", $firstName, $lastName, $email, $studentId);

        if ($query->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function editPersonalForm($firstName, $lastName, $middleName, $age, $gender, $email, $studentId)
    {
        $query = $this->conn->prepare("UPDATE student_tbl SET student_fname = ?, student_lname = ?, student_mname = ?, age = ?, gender = ?, email = ? WHERE student_id = ?");
        $query->bind_param("ssssssi", $firstName, $lastName, $middleName, $age, $gender, $email, $studentId);

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
        $query = $this->conn->prepare("SELECT `section_name` FROM `section_tbl` WHERE section_id = ?");
        $query->bind_param("s", $sectionId);

        if ($query->execute()) {
            $result = $query->get_result();
            $row = $result->fetch_assoc();
            return $row['section_name'];
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
        $query = $this->conn->prepare("UPDATE student_tbl SET image = ? WHERE student_id = ?");
        $query->bind_param("ss", $newFileName, $studentId);
        if ($query->execute()) {
            return true;
        }else{
            return false;
        }
    }



}

