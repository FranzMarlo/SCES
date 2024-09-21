<?php
include 'db_class.php';

$db = new globalClass();

if (isset($_POST['submitType'])) {
    if ($_POST['submitType'] === 'studentLogin') {
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);

        $result = $db->studentLogin($email, $password);

        if ($result !== false) {
            $studentId = $result['student_id'];
            $getStudentData = $db->getStudentData($studentId);

            if ($getStudentData !== false) {
                $getGradeLevel = $db->getGradeLevel($getStudentData['level_id']);
                if ($getGradeLevel !== false) {
                    $gradeLevel = $getGradeLevel;
                } else {
                    echo '400';
                    exit();
                }
                $getSection = $db->getSection($getStudentData['section_id']);
                if ($getSection !== false) {
                    $section = $getSection;
                } else {
                    echo '400';
                    exit();
                }
                session_start();
                $_SESSION['student_id'] = $getStudentData['student_id'];
                $_SESSION['level_id'] = $getStudentData['level_id'];
                $_SESSION['section_id'] = $getStudentData['section_id'];
                $_SESSION['student_fname'] = $getStudentData['student_fname'];
                $_SESSION['student_mname'] = $getStudentData['student_mname'];
                $_SESSION['student_lname'] = $getStudentData['student_lname'];
                $_SESSION['age'] = $getStudentData['age'];
                $_SESSION['gender'] = $getStudentData['gender'];
                $_SESSION['email'] = $result['email'];
                $_SESSION['password'] = $result['password'];
                $_SESSION['guardian_name'] = $getStudentData['guardian_name'];
                $_SESSION['guardian_contact'] = $getStudentData['guardian_contact'];
                $_SESSION['city'] = $getStudentData['city'];
                $_SESSION['barangay'] = $getStudentData['barangay'];
                $_SESSION['street'] = $getStudentData['street'];
                $_SESSION['profile_image'] = $getStudentData['profile_image'];
                $_SESSION['registration'] = $getStudentData['registration'];
                $_SESSION['section'] = $section;
                $_SESSION['grade_level'] = $gradeLevel;
                $_SESSION['email_verification'] = $result['email_verification'];
                $_SESSION['password_change'] = $result['password_change'];
                echo '200';
            }
        } else {
            echo '400';
        }
    } else if ($_POST['submitType'] === 'studentSignUp') {

        $firstName = validate($_POST['firstName']);
        $middleName = validate($_POST['middleName']);
        $lastName = validate($_POST['lastName']);
        $gradeLevelId = validate($_POST['gradeLevel']);
        $sectionId = validate($_POST['section']);
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);
        $confirmPassword = validate($_POST['confirmPassword']);

        $emailPattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";


        if (empty($firstName)) {
            echo '452';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($gradeLevelId)) {
            echo '455';
        } else if (empty($sectionId)) {
            echo '456';
        } else if (empty($email)) {
            echo '457';
        } else if (!preg_match($emailPattern, $email)) {
            echo '458';
        } else if (empty($password)) {
            echo '459';
        } else if (strlen($password) < 6) {
            echo '460';
        } else if (empty($confirmPassword)) {
            echo '461';
        } else if ($password !== $confirmPassword) {
            echo '462';
        } else {
            $checkEmail = $db->checkEmail($email);
            if ($checkEmail->num_rows > 0) {
                echo '463';
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $signUpResult = $db->studentSignUp($gradeLevelId, $sectionId, $firstName, $middleName, $lastName, 0, 'Not Set', $email, $hashedPassword, 'Not Set', 'Not Set', 'Not Set', 'Not Set', 'Not Set', 'Incomplete', 'default-profile.png', 'Not Verified');


                if ($signUpResult !== false) {
                    $getGradeLevel = $db->getGradeLevel($gradeLevelId);
                    if ($getGradeLevel !== false) {
                        $gradeLevel = $getGradeLevel;
                    } else {
                        echo '400';
                        exit();
                    }
                    $getSection = $db->getSection($sectionId);
                    if ($getSection !== false) {
                        $section = $getSection;
                    } else {
                        echo '400';
                        exit();
                    }
                    session_start();
                    $_SESSION['student_id'] = $signUpResult;
                    $_SESSION['level_id'] = $gradeLevelId;
                    $_SESSION['section_id'] = $sectionId;
                    $_SESSION['student_fname'] = $firstName;
                    $_SESSION['student_mname'] = $middleName;
                    $_SESSION['student_lname'] = $lastName;
                    $_SESSION['age'] = 0;
                    $_SESSION['gender'] = 'Not Set';
                    $_SESSION['email'] = $email;
                    $_SESSION['password'] = $hashedPassword;
                    $_SESSION['guardian_name'] = 'Not Set';
                    $_SESSION['guardian_contact'] = 'Not Set';
                    $_SESSION['city'] = 'Not Set';
                    $_SESSION['barangay'] = 'Not Set';
                    $_SESSION['street'] = 'Not Set';
                    $_SESSION['registration'] = 'Incomplete';
                    $_SESSION['profile_image'] = 'default-profile.png';
                    $_SESSION['section'] = $section;
                    $_SESSION['grade_level'] = $gradeLevel;
                    $_SESSION['email_verification'] = 'Not Verified';
                    $_SESSION['password_change'] = NULL;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'editProfileForm') {
        session_start();
        $studentId = $_SESSION['student_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);

        if (
            $firstName == $_SESSION['student_fname'] &&
            $lastName == $_SESSION['student_lname']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else {
            $editProfileInfo = $db->editProfileForm($firstName, $lastName, $studentId);
            if ($editProfileInfo !== false) {
                $_SESSION['student_fname'] = $firstName;
                $_SESSION['student_lname'] = $lastName;
                echo '200';
            } else {
                echo '400';

            }


        }
    } else if ($_POST['submitType'] === 'editPersonalForm') {
        session_start();
        $studentId = $_SESSION['student_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);
        $middleName = validate($_POST['middleName']);
        $age = validate($_POST['age']);
        $gender = validate($_POST['gender']);

        if (
            $firstName == $_SESSION['student_fname'] &&
            $lastName == $_SESSION['student_lname'] &&
            $middleName == $_SESSION['student_mname'] &&
            $age == $_SESSION['age'] &&
            $gender == $_SESSION['gender']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($age)) {
            echo '469';
        } else if ($age < 5) {
            echo '470';
        } else if ($age > 100) {
            echo '471';
        } else if (empty($gender)) {
            echo '472';
        } else {
            $editPersonalInfo = $db->editPersonalForm($firstName, $lastName, $middleName, $age, $gender, $studentId);
            if ($editPersonalInfo !== false) {
                $_SESSION['student_fname'] = $firstName;
                $_SESSION['student_lname'] = $lastName;
                $_SESSION['student_mname'] = $middleName;
                $_SESSION['age'] = $age;
                $_SESSION['gender'] = $gender;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'editBackgroundForm') {
        session_start();
        $studentId = $_SESSION['student_id'];
        $city = $_POST['city'];
        $barangay = $_POST['barangay'];
        $street = validate($_POST['street']);
        $guardianFullName = validate($_POST['guardianFullName']);
        $guardianContact = validate($_POST['guardianContact']);
        if (
            $city == $_SESSION['city'] &&
            $barangay == $_SESSION['barangay'] &&
            $street == $_SESSION['street'] &&
            $guardianFullName == $_SESSION['guardian_name'] &&
            $guardianContact == $_SESSION['guardian_contact']
        ) {
            echo '100';
        } else if (empty($city) || $city == "Not Set") {
            echo '465';
        } else if (empty($barangay) || $barangay == "Not Set") {
            echo '466';
        } else if (empty($street) || $street == "Not Set") {
            echo '467';
        } else if (empty($guardianFullName) || $guardianFullName == "Not Set") {
            echo '473';
        } else if (empty($guardianContact) || $guardianContact == "Not Set") {
            echo '474';
        } else {
            $editBackgroundInfo = $db->editBackgroundForm($city, $barangay, $street, $guardianFullName, $guardianContact, $studentId);
            if ($editBackgroundInfo !== false) {
                $_SESSION['city'] = $city;
                $_SESSION['barangay'] = $barangay;
                $_SESSION['street'] = $street;
                $_SESSION['guardian_name'] = $guardianFullName;
                $_SESSION['guardian_contact'] = $guardianContact;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'uploadAvatar') {
        if (isset($_FILES['new-avatar']) && $_FILES['new-avatar']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['new-avatar']['tmp_name'];
            $fileName = $_FILES['new-avatar']['name'];
            $fileSize = $_FILES['new-avatar']['size'];
            $fileType = $_FILES['new-avatar']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));


            $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
            if (in_array($fileExtension, $allowedfileExtensions)) {

                $uploadFileDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/student/images/';
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    session_start();
                    $studentId = $_SESSION['student_id'];
                    $updateAvatar = $db->updateAvatar($newFileName, $studentId);
                    if ($updateAvatar !== false) {
                        $_SESSION['profile_image'] = $newFileName;
                        echo '200';
                    } else {
                        echo '400';
                    }
                } else {
                    echo '475';
                }
            } else {
                echo '476';
            }
        } else {
            echo '476';
        }
        exit;
    } else if ($_POST['submitType'] === 'updatePassword') {
        session_start();
        $studentId = $_SESSION['student_id'];
        $currentPassword = validate($_POST['currentPassword']);
        $newPassword = validate($_POST['newPassword']);
        $confirmPassword = validate($_POST['confirmPassword']);

        if (empty($currentPassword)) {
            echo '479';
        } else if (empty($newPassword)) {
            echo '480';
        } else if (empty($confirmPassword)) {
            echo '481';
        } else if (strlen($newPassword) < 6) {
            echo '460';
        } else if ($newPassword != $confirmPassword) {
            echo '462';
        } else {
            $hashedPassword = $db->studentGetPassword($studentId);
            if (!password_verify($currentPassword, $hashedPassword)) {
                echo '482';
            } else if (password_verify($newPassword, $hashedPassword)) {
                echo '483';
            } else {
                $currentDate = date("Y-m-d");
                $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
                $updatePassword = $db->updateStudentPassword($newPasswordHash, $currentDate, $studentId);
                if ($updatePassword != false) {
                    $_SESSION['password'] = $newPasswordHash;
                    $_SESSION['password_change'] = $currentDate;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'adminLogin') {
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);

        $result = $db->adminLogin($email, $password);

        if ($result !== false) {
            $teacherId = $result['teacher_id'];
            $getTeacherData = $db->getTeacherData($teacherId);

            if ($getTeacherData !== false) {

                session_start();
                $_SESSION['teacher_id'] = $getTeacherData['teacher_id'];
                $_SESSION['teacher_fname'] = $getTeacherData['teacher_fname'];
                $_SESSION['teacher_mname'] = $getTeacherData['teacher_mname'];
                $_SESSION['teacher_lname'] = $getTeacherData['teacher_lname'];
                $_SESSION['age'] = $getTeacherData['age'];
                $_SESSION['gender'] = $getTeacherData['gender'];
                $_SESSION['email'] = $result['email'];
                $_SESSION['password'] = $result['password'];
                $_SESSION['registration'] = $getTeacherData['registration'];
                $_SESSION['image_profile'] = $getTeacherData['image_profile'];
                $_SESSION['role'] = $getTeacherData['role'];
                $_SESSION['email_verification'] = $result['email_verification'];
                $_SESSION['city'] = $getTeacherData['city'];
                $_SESSION['barangay'] = $getTeacherData['barangay'];
                $_SESSION['street'] = $getTeacherData['street'];
                $_SESSION['contact_number'] = $getTeacherData['contact_number'];
                $_SESSION['password_change'] = $result['password_change'];
                echo '200';
            } else {
                echo '400';
            }
        } else {
            echo '400';
        }
    } else if ($_POST['submitType'] === 'adminSignUp') {

        $firstName = validate($_POST['firstName']);
        $middleName = validate($_POST['middleName']);
        $lastName = validate($_POST['lastName']);
        $gender = validate($_POST['gender']);
        $role = 'Admin';
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);
        $confirmPassword = validate($_POST['confirmPassword']);

        $emailPattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";


        if (empty($firstName)) {
            echo '452';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($gender)) {
            echo '472';
        } else if (empty($email)) {
            echo '457';
        } else if (!preg_match($emailPattern, $email)) {
            echo '458';
        } else if (empty($password)) {
            echo '459';
        } else if (strlen($password) < 6) {
            echo '460';
        } else if (empty($confirmPassword)) {
            echo '461';
        } else if ($password !== $confirmPassword) {
            echo '462';
        } else {
            $checkEmail = $db->checkAdminEmail($email);
            if ($checkEmail->num_rows > 0) {
                echo '463';
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $signUpResult = $db->adminSignUp($firstName, $middleName, $lastName, 0, $gender, $email, $hashedPassword, 'Incomplete', 'default-profile.png', $role, 'Not Verified', 'Not Set', 'Not Set', 'Not Set', 'Not Set');

                if ($signUpResult !== false) {
                    session_start();
                    $_SESSION['teacher_id'] = $signUpResult;
                    $_SESSION['teacher_fname'] = $firstName;
                    $_SESSION['teacher_mname'] = $middleName;
                    $_SESSION['teacher_lname'] = $lastName;
                    $_SESSION['age'] = 0;
                    $_SESSION['gender'] = $gender;
                    $_SESSION['email'] = $email;
                    $_SESSION['password'] = $hashedPassword;
                    $_SESSION['registration'] = 'Incomplete';
                    $_SESSION['image_profile'] = 'default-profile.png';
                    $_SESSION['role'] = $role;
                    $_SESSION['email_verification'] = 'Not Verified';
                    $_SESSION['city'] = 'Not Set';
                    $_SESSION['barangay'] = 'Not Set';
                    $_SESSION['street'] = 'Not Set';
                    $_SESSION['contact_number'] = 'Not Set';
                    $_SESSION['password_change'] = NULL;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'adminEditProfileForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);

        if (
            $firstName == $_SESSION['teacher_fname'] &&
            $lastName == $_SESSION['teacher_lname']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else {
            $editProfileInfo = $db->adminEditProfileForm($firstName, $lastName, $teacherId);
            if ($editProfileInfo !== false) {
                $_SESSION['teacher_fname'] = $firstName;
                $_SESSION['teacher_lname'] = $lastName;
                echo '200';
            } else {
                echo '400';

            }
        }
    } else if ($_POST['submitType'] === 'adminEditPersonalForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);
        $middleName = validate($_POST['middleName']);
        $age = validate($_POST['age']);
        $gender = validate($_POST['gender']);

        if (
            $firstName == $_SESSION['teacher_fname'] &&
            $lastName == $_SESSION['teacher_lname'] &&
            $middleName == $_SESSION['teacher_mname'] &&
            $age == $_SESSION['age'] &&
            $gender == $_SESSION['gender']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($age)) {
            echo '469';
        } else if ($age < 5) {
            echo '470';
        } else if ($age > 100) {
            echo '471';
        } else if (empty($gender)) {
            echo '472';
        } else {
            $editPersonalInfo = $db->adminEditPersonalForm($firstName, $lastName, $middleName, $age, $gender, $teacherId);
            if ($editPersonalInfo !== false) {
                $_SESSION['teacher_fname'] = $firstName;
                $_SESSION['teacher_lname'] = $lastName;
                $_SESSION['teacher_mname'] = $middleName;
                $_SESSION['age'] = $age;
                $_SESSION['gender'] = $gender;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'adminEditBackgroundForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $city = $_POST['city'];
        $barangay = $_POST['barangay'];
        $street = validate($_POST['street']);
        $contactNumber = validate($_POST['contactNumber']);
        if (
            $city == $_SESSION['city'] &&
            $barangay == $_SESSION['barangay'] &&
            $street == $_SESSION['street'] &&
            $contactNumber == $_SESSION['contact_number']
        ) {
            echo '100';
        } else if (empty($city) || $city == "Not Set") {
            echo '465';
        } else if (empty($barangay) || $barangay == "Not Set") {
            echo '466';
        } else if (empty($street) || $street == "Not Set") {
            echo '467';
        } else if (empty($contactNumber) || $contactNumber == "Not Set") {
            echo '474';
        } else {
            $editBackgroundInfo = $db->adminEditBackgroundForm($city, $barangay, $street, $contactNumber, $teacherId);
            if ($editBackgroundInfo !== false) {
                $_SESSION['city'] = $city;
                $_SESSION['barangay'] = $barangay;
                $_SESSION['street'] = $street;
                $_SESSION['contact_number'] = $contactNumber;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'adminUploadAvatar') {
        if (isset($_FILES['new-avatar']) && $_FILES['new-avatar']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['new-avatar']['tmp_name'];
            $fileName = $_FILES['new-avatar']['name'];
            $fileSize = $_FILES['new-avatar']['size'];
            $fileType = $_FILES['new-avatar']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));


            $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
            if (in_array($fileExtension, $allowedfileExtensions)) {

                $uploadFileDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/admin/images/';
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    session_start();
                    $teacherId = $_SESSION['teacher_id'];
                    $updateAvatar = $db->adminUpdateAvatar($newFileName, $teacherId);
                    if ($updateAvatar !== false) {
                        $_SESSION['image_profile'] = $newFileName;
                        echo '200';
                    } else {
                        echo '400';
                    }
                } else {
                    echo '475';
                }
            } else {
                echo '476';
            }
        } else {
            echo '476';
        }
        exit;
    } else if ($_POST['submitType'] === 'adminUpdatePassword') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $currentPassword = validate($_POST['currentPassword']);
        $newPassword = validate($_POST['newPassword']);
        $confirmPassword = validate($_POST['confirmPassword']);

        if (empty($currentPassword)) {
            echo '479';
        } else if (empty($newPassword)) {
            echo '480';
        } else if (empty($confirmPassword)) {
            echo '481';
        } else if (strlen($newPassword) < 6) {
            echo '460';
        } else if ($newPassword != $confirmPassword) {
            echo '462';
        } else {
            $hashedPassword = $db->adminGetPassword($teacherId);
            if (!password_verify($currentPassword, $hashedPassword)) {
                echo '482';
            } else if (password_verify($newPassword, $hashedPassword)) {
                echo '483';
            } else {
                $currentDate = date("Y-m-d");
                $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
                $updatePassword = $db->updateAdminPassword($newPasswordHash, $currentDate, $teacherId);
                if ($updatePassword != false) {
                    $_SESSION['password'] = $newPasswordHash;
                    $_SESSION['password_change'] = $currentDate;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'facultyLogin') {
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);

        $result = $db->facultyLogin($email, $password);

        if ($result !== false) {
            $teacherId = $result['teacher_id'];
            $getTeacherData = $db->getTeacherData($teacherId);

            if ($getTeacherData !== false) {

                session_start();
                $_SESSION['teacher_id'] = $getTeacherData['teacher_id'];
                $_SESSION['teacher_fname'] = $getTeacherData['teacher_fname'];
                $_SESSION['teacher_mname'] = $getTeacherData['teacher_mname'];
                $_SESSION['teacher_lname'] = $getTeacherData['teacher_lname'];
                $_SESSION['age'] = $getTeacherData['age'];
                $_SESSION['gender'] = $getTeacherData['gender'];
                $_SESSION['email'] = $result['email'];
                $_SESSION['password'] = $result['password'];
                $_SESSION['registration'] = $getTeacherData['registration'];
                $_SESSION['image_profile'] = $getTeacherData['image_profile'];
                $_SESSION['role'] = $getTeacherData['role'];
                $_SESSION['email_verification'] = $result['email_verification'];
                $_SESSION['city'] = $getTeacherData['city'];
                $_SESSION['barangay'] = $getTeacherData['barangay'];
                $_SESSION['street'] = $getTeacherData['street'];
                $_SESSION['contact_number'] = $getTeacherData['contact_number'];
                $_SESSION['password_change'] = $result['password_change'];
                echo '200';
            } else {
                echo '400';
            }
        } else {
            echo '400';
        }
    } else if ($_POST['submitType'] === 'facultySignUp') {

        $firstName = validate($_POST['firstName']);
        $middleName = validate($_POST['middleName']);
        $lastName = validate($_POST['lastName']);
        $gender = validate($_POST['gender']);
        $role = 'Faculty';
        $email = validate($_POST['email']);
        $password = validate($_POST['password']);
        $confirmPassword = validate($_POST['confirmPassword']);

        $emailPattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";


        if (empty($firstName)) {
            echo '452';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($gender)) {
            echo '472';
        } else if (empty($email)) {
            echo '457';
        } else if (!preg_match($emailPattern, $email)) {
            echo '458';
        } else if (empty($password)) {
            echo '459';
        } else if (strlen($password) < 6) {
            echo '460';
        } else if (empty($confirmPassword)) {
            echo '461';
        } else if ($password !== $confirmPassword) {
            echo '462';
        } else {
            $checkEmail = $db->checkFacultyEmail($email);
            if ($checkEmail->num_rows > 0) {
                echo '463';
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $signUpResult = $db->facultySignUp($firstName, $middleName, $lastName, 0, $gender, $email, $hashedPassword, 'Incomplete', 'default-profile.png', $role, 'Not Verified', 'Not Set', 'Not Set', 'Not Set', 'Not Set');

                if ($signUpResult !== false) {
                    session_start();
                    $_SESSION['teacher_id'] = $signUpResult;
                    $_SESSION['teacher_fname'] = $firstName;
                    $_SESSION['teacher_mname'] = $middleName;
                    $_SESSION['teacher_lname'] = $lastName;
                    $_SESSION['age'] = 0;
                    $_SESSION['gender'] = $gender;
                    $_SESSION['email'] = $email;
                    $_SESSION['password'] = $hashedPassword;
                    $_SESSION['registration'] = 'Incomplete';
                    $_SESSION['image_profile'] = 'default-profile.png';
                    $_SESSION['role'] = $role;
                    $_SESSION['email_verification'] = 'Not Verified';
                    $_SESSION['city'] = 'Not Set';
                    $_SESSION['barangay'] = 'Not Set';
                    $_SESSION['street'] = 'Not Set';
                    $_SESSION['contact_number'] = 'Not Set';
                    $_SESSION['password_change'] = NULL;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'facultyEditProfileForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);

        if (
            $firstName == $_SESSION['teacher_fname'] &&
            $lastName == $_SESSION['teacher_lname']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else {
            $editProfileInfo = $db->adminEditProfileForm($firstName, $lastName, $teacherId);
            if ($editProfileInfo !== false) {
                $_SESSION['teacher_fname'] = $firstName;
                $_SESSION['teacher_lname'] = $lastName;
                echo '200';
            } else {
                echo '400';

            }
        }
    } else if ($_POST['submitType'] === 'facultyEditPersonalForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $firstName = validate($_POST['firstName']);
        $lastName = validate($_POST['lastName']);
        $middleName = validate($_POST['middleName']);
        $age = validate($_POST['age']);
        $gender = validate($_POST['gender']);

        if (
            $firstName == $_SESSION['teacher_fname'] &&
            $lastName == $_SESSION['teacher_lname'] &&
            $middleName == $_SESSION['teacher_mname'] &&
            $age == $_SESSION['age'] &&
            $gender == $_SESSION['gender']
        ) {
            echo '100';
        } else if (empty($firstName)) {
            echo '452';
        } else if (empty($lastName)) {
            echo '454';
        } else if (empty($middleName)) {
            echo '453';
        } else if (empty($age)) {
            echo '469';
        } else if ($age < 5) {
            echo '470';
        } else if ($age > 100) {
            echo '471';
        } else if (empty($gender)) {
            echo '472';
        } else {
            $editPersonalInfo = $db->adminEditPersonalForm($firstName, $lastName, $middleName, $age, $gender, $teacherId);
            if ($editPersonalInfo !== false) {
                $_SESSION['teacher_fname'] = $firstName;
                $_SESSION['teacher_lname'] = $lastName;
                $_SESSION['teacher_mname'] = $middleName;
                $_SESSION['age'] = $age;
                $_SESSION['gender'] = $gender;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'facultyEditBackgroundForm') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $city = $_POST['city'];
        $barangay = $_POST['barangay'];
        $street = validate($_POST['street']);
        $contactNumber = validate($_POST['contactNumber']);
        if (
            $city == $_SESSION['city'] &&
            $barangay == $_SESSION['barangay'] &&
            $street == $_SESSION['street'] &&
            $contactNumber == $_SESSION['contact_number']
        ) {
            echo '100';
        } else if (empty($city) || $city == "Not Set") {
            echo '465';
        } else if (empty($barangay) || $barangay == "Not Set") {
            echo '466';
        } else if (empty($street) || $street == "Not Set") {
            echo '467';
        } else if (empty($contactNumber) || $contactNumber == "Not Set") {
            echo '474';
        } else {
            $editBackgroundInfo = $db->adminEditBackgroundForm($city, $barangay, $street, $contactNumber, $teacherId);
            if ($editBackgroundInfo !== false) {
                $_SESSION['city'] = $city;
                $_SESSION['barangay'] = $barangay;
                $_SESSION['street'] = $street;
                $_SESSION['contact_number'] = $contactNumber;
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'facultyUploadAvatar') {
        if (isset($_FILES['new-avatar']) && $_FILES['new-avatar']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['new-avatar']['tmp_name'];
            $fileName = $_FILES['new-avatar']['name'];
            $fileSize = $_FILES['new-avatar']['size'];
            $fileType = $_FILES['new-avatar']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));


            $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
            if (in_array($fileExtension, $allowedfileExtensions)) {

                $uploadFileDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/faculty/images/';
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    session_start();
                    $teacherId = $_SESSION['teacher_id'];
                    $updateAvatar = $db->adminUpdateAvatar($newFileName, $teacherId);
                    if ($updateAvatar !== false) {
                        $_SESSION['image_profile'] = $newFileName;
                        echo '200';
                    } else {
                        echo '400';
                    }
                } else {
                    echo '475';
                }
            } else {
                echo '476';
            }
        } else {
            echo '476';
        }
        exit;
    } else if ($_POST['submitType'] === 'facultyUpdatePassword') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $currentPassword = validate($_POST['currentPassword']);
        $newPassword = validate($_POST['newPassword']);
        $confirmPassword = validate($_POST['confirmPassword']);

        if (empty($currentPassword)) {
            echo '479';
        } else if (empty($newPassword)) {
            echo '480';
        } else if (empty($confirmPassword)) {
            echo '481';
        } else if (strlen($newPassword) < 6) {
            echo '460';
        } else if ($newPassword != $confirmPassword) {
            echo '462';
        } else {
            $hashedPassword = $db->facultyGetPassword($teacherId);
            if (!password_verify($currentPassword, $hashedPassword)) {
                echo '482';
            } else if (password_verify($newPassword, $hashedPassword)) {
                echo '483';
            } else {
                $currentDate = date("Y-m-d");
                $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
                $updatePassword = $db->updateFacultyPassword($newPasswordHash, $currentDate, $teacherId);
                if ($updatePassword != false) {
                    $_SESSION['password'] = $newPasswordHash;
                    $_SESSION['password_change'] = $currentDate;
                    echo '200';
                } else {
                    echo '400';
                }
            }
        }
    } else if ($_POST['submitType'] === 'facultyAddLesson') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $levelId = $_SESSION['level_id'];
        $gradeLevel = $_SESSION['grade_level'];
        $sectionId = $_SESSION['section_id'];
        $subjectId = $_SESSION['subject_id'];
        $subject = $_SESSION['subject_title'];
        $lessonNumber = validate($_POST['lessonNumber']);
        $lessonTitle = validate($_POST['lessonTitle']);
        $quarter = validate($_POST['quarter']);

        if (empty($lessonNumber)) {
            echo '484';
        } else if (empty($lessonTitle)) {
            echo '485';
        } else if (empty($quarter) || $quarter == 'Not Set') {
            echo '486';
        } else {
            if (isset($_FILES['lessonFile']) && $_FILES['lessonFile']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['lessonFile'];
                $fileName = $file['name'];
                $fileTmpName = $file['tmp_name'];
                $fileError = $file['error'];
                $fileSize = $file['size'];
                $fileType = mime_content_type($fileTmpName);
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

                if ($fileType === 'application/pdf' && $fileExtension === 'pdf') {
                    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/lessons/'.$gradeLevel.'/'.$quarter.' Quarter/'.$subject.'/';
                    $fileDestination = $uploadDir . basename($fileName);

                    if (move_uploaded_file($fileTmpName, $fileDestination)) {
                        $currentDate = date("Y-m-d");
                        $filePath = $gradeLevel.'/'.$quarter.' Quarter/'.$subject.'/'.basename($fileName);
                        $result = $db->facultyAddLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $filePath);

                        if ($result) {
                            echo '200';
                        } else {
                            echo '400';
                        }
                    } else {
                        echo '487';
                    }
                } else {
                    echo '488';
                }
            } else {
                echo '489';
            }
        }
    } else {
        echo '400';
    }

}

class loggedIn
{
    public function needLogin()
    {

        if (!isset($_SESSION['student_id'])) {
            session_destroy();
            header('Location:/SCES/frontend/student/login.php');
            exit();
        }

    }
    public function needLogout()
    {

        if (isset($_SESSION['student_id'])) {
            header('Location:/SCES/frontend/student/dashboard.php');
            exit();
        }
    }
}

class adminLoggedIn
{
    public function needLogin()
    {

        if (!isset($_SESSION['teacher_id'])) {
            session_destroy();
            header('Location:/SCES/frontend/admin/login.php');
            exit();
        }

    }
    public function needLogout()
    {

        if (isset($_SESSION['teacher_id'])) {
            header('Location:/SCES/frontend/admin/dashboard.php');
            exit();
        }
    }
}

class facultyLoggedIn
{
    public function needLogin()
    {

        if (!isset($_SESSION['teacher_id'])) {
            session_destroy();
            header('Location:/SCES/frontend/faculty/login.php');
            exit();
        }

    }
    public function needLogout()
    {

        if (isset($_SESSION['teacher_id'])) {
            header('Location:/SCES/frontend/faculty/dashboard.php');
            exit();
        }
    }
}

function validate($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}



