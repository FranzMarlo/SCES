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
                $_SESSION['lrn'] = $getStudentData['lrn'];
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
    } else if ($_POST['submitType'] === 'adminAddLesson') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $levelId = $_POST['level_id'];
        $gradeLevel = $_POST['grade_level'];
        $sectionId = $_POST['section_id'];
        $subjectId = $_POST['subject_id'];
        $subject = $_POST['subject_title'];
        $lessonNumber = validate($_POST['lessonNumber']);
        $lessonTitle = validate($_POST['lessonTitle']);
        $quarter = validate($_POST['quarter']);
        $checkNumber = $db->checkLessonNumber($levelId, $subjectId, $sectionId, $lessonNumber);
        if (empty($lessonNumber)) {
            echo '484';
        } else if ($checkNumber->num_rows > 0) {
            echo '490';
        } else if (empty($lessonTitle)) {
            echo '485';
        } else if (empty($quarter) || $quarter == 'Not Set') {
            echo '486';
        } else {
            if (isset($_FILES['lessonFile']) && $_FILES['lessonFile']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['lessonFile'];
                $fileTmpName = $file['tmp_name'];
                $fileSize = $file['size'];
                $fileType = mime_content_type($fileTmpName);
                $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

                if ($fileType === 'application/pdf' && $fileExtension === 'pdf') {
                    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/lessons/' . $gradeLevel . '/' . $quarter . ' Quarter/' . $subject . '/';

                    $newFileName = 'Lesson_' . $lessonNumber . '_' . uniqid() . '.pdf';
                    $fileDestination = $uploadDir . $newFileName;

                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    if (move_uploaded_file($fileTmpName, $fileDestination)) {
                        $currentDate = date("Y-m-d");
                        $filePath = $gradeLevel . '/' . $quarter . ' Quarter/' . $subject . '/' . $newFileName;

                        $result = $db->addLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $filePath);

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
    } else if ($_POST['submitType'] === 'addLesson') {
        session_start();
        $teacherId = $_SESSION['teacher_id'];
        $levelId = $_POST['level_id'];
        $gradeLevel = $_POST['grade_level'];
        $sectionId = $_POST['section_id'];
        $subjectId = $_POST['subject_id'];
        $subject = $_POST['subject_title'];
        $lessonNumber = validate($_POST['lessonNumber']);
        $lessonTitle = validate($_POST['lessonTitle']);
        $quarter = validate($_POST['quarter']);
        $checkNumber = $db->checkLessonNumber($levelId, $subjectId, $teacherId, $lessonNumber);
        if (empty($lessonNumber)) {
            echo '484';
        } else if ($checkNumber->num_rows > 0) {
            echo '490';
        } else if (empty($lessonTitle)) {
            echo '485';
        } else if (empty($quarter) || $quarter == 'Not Set') {
            echo '486';
        } else {
            if (isset($_FILES['lessonFile']) && $_FILES['lessonFile']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['lessonFile'];
                $fileTmpName = $file['tmp_name'];
                $fileSize = $file['size'];
                $fileType = mime_content_type($fileTmpName);
                $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

                if ($fileType === 'application/pdf' && $fileExtension === 'pdf') {
                    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/SCES/storage/lessons/' . $gradeLevel . '/' . $quarter . ' Quarter/' . $subject . '/';

                    $newFileName = 'Lesson_' . $lessonNumber . '_' . uniqid() . '.pdf';
                    $fileDestination = $uploadDir . $newFileName;

                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    if (move_uploaded_file($fileTmpName, $fileDestination)) {
                        $currentDate = date("Y-m-d");
                        $filePath = $gradeLevel . '/' . $quarter . ' Quarter/' . $subject . '/' . $newFileName;

                        $result = $db->addLesson($teacherId, $levelId, $sectionId, $subjectId, $lessonNumber, $lessonTitle, $quarter, $filePath);

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
    } else if ($_POST['submitType'] === 'addQuiz') {
        header('Content-Type: application/json');
        session_start();
        $quizNumber = validate($_POST['quizNumber']);
        $quizTitle = validate($_POST['quizTitle']);
        $subjectId = validate($_POST['subject']);
        $lessonId = validate($_POST['lesson']);
        $checkNumber = $db->checkQuizNumber($subjectId, $lessonId, $quizNumber);

        if (empty($quizNumber)) {
            echo json_encode(['status' => '482']);
        } else if ($checkNumber->num_rows > 0) {
            echo json_encode(['status' => '483']);
        } else if (empty($quizTitle)) {
            echo json_encode(['status' => '484']);
        } else if (empty($subjectId)) {
            echo json_encode(['status' => '485']);
        } else if (empty($lessonId)) {
            echo json_encode(['status' => '486']);
        } else {
            $addQuiz = $db->addQuiz($subjectId, $lessonId, $quizNumber, $quizTitle, 0);

            if ($addQuiz != false) {
                $quizId = $addQuiz;
                echo json_encode(['status' => '200', 'quizId' => $quizId]);
            } else {
                echo json_encode(['status' => '400']);
            }
        }
    } else if ($_POST['submitType'] === 'addQuestion') {
        session_start();
        $quizId = validate($_POST['quizId']);
        $question = validate($_POST['question']);
        $choice1 = validate($_POST['choice1']);
        $choice2 = validate($_POST['choice2']);
        $choice3 = validate($_POST['choice3']);
        $choice4 = validate($_POST['choice4']);
        $correctAnswer = validate($_POST['correctAnswer']);
        if (empty($question)) {
            echo '482';
        } else if (empty($choice1)) {
            echo '483';
        } else if (empty($choice2)) {
            echo '484';
        } else if ((empty($choice3) || empty($choice4)) && (empty($choice1) || empty($choice2))) {
            echo '485';
        } else if (empty($correctAnswer)) {
            echo '486';
        } else if ($correctAnswer == 'choice1' && empty($choice1)) {
            echo '487';
        } else if ($correctAnswer == 'choice2' && empty($choice2)) {
            echo '487';
        } else if ($correctAnswer == 'choice3' && empty($choice3)) {
            echo '487';
        } else if ($correctAnswer == 'choice4' && empty($choice4)) {
            echo '487';
        } else {
            $addQuestion = $db->addQuestion($quizId, $question);
            if ($addQuestion != false) {
                $questionId = $addQuestion;


                $value1 = $correctAnswer == 'choice1' ? 1 : 0;
                $value2 = $correctAnswer == 'choice2' ? 1 : 0;
                $value3 = $correctAnswer == 'choice3' ? 1 : 0;
                $value4 = $correctAnswer == 'choice4' ? 1 : 0;

                $db->addChoice($questionId, $quizId, $choice1, 1, $value1);
                $db->addChoice($questionId, $quizId, $choice2, 2, $value2);
                if (!empty($choice3)) {
                    $db->addChoice($questionId, $quizId, $choice3, 3, $value3);
                }

                if (!empty($choice4)) {
                    $db->addChoice($questionId, $quizId, $choice4, 4, $value4);
                }
                $itemCount = $db->getItemCount($quizId);
                $updateQuizItemCount = $db->updateQuizItemCount($quizId, $itemCount + 1);
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'editQuestion') {
        session_start();
        $editQuestionId = validate($_POST['editQuestionId']);
        $editQuestionText = validate($_POST['editQuestionText']);
        $choice1_update = validate($_POST['choice1_update']);
        $choice1_id = validate($_POST['choice1_id']);
        $choice2_update = validate($_POST['choice2_update']);
        $choice2_id = validate($_POST['choice2_id']);
        $choice3_update = validate($_POST['choice3_update']);
        $choice3_id = validate($_POST['choice3_id']);
        $choice4_update = validate($_POST['choice4_update']);
        $choice4_id = validate($_POST['choice4_id']);
        $correctChoice = validate($_POST['correctChoice']);
        $choice1_value = validate($_POST['choice1_value']);
        $choice2_value = validate($_POST['choice2_value']);
        $choice3_value = validate($_POST['choice3_value']);
        $choice4_value = validate($_POST['choice4_value']);
        $correct_value = validate($_POST['correct_value']);
        if ($choice1_update == $choice1_value && $choice2_update == $choice2_value && $choice3_update == $choice3_value && $choice4_update == $choice4_value && $correctChoice == $correct_value) {
            echo '481';
        } else if (empty($editQuestionText)) {
            echo '482';
        } else if (empty($choice1_update)) {
            echo '483';
        } else if (empty($choice2_update)) {
            echo '484';
        } else if ((empty($choice3_update) || empty($choice4_update)) && (empty($choice1_update) || empty($choice2_update))) {
            echo '485';
        } else if (empty($correctChoice)) {
            echo '486';
        } else if ($correctChoice == 'choice1' && empty($choice1_update)) {
            echo '487';
        } else if ($correctChoice == 'choice2' && empty($choice2_update)) {
            echo '487';
        } else if ($correctChoice == 'choice3' && empty($choice3_update)) {
            echo '487';
        } else if ($correctChoice == 'choice4' && empty($choice4_update)) {
            echo '487';
        } else {
            $editQuestion = $db->editQuestion($editQuestionId, $editQuestionText);
            if ($editQuestion != false) {
                $questionId = $editQuestion;
                $quizId = $db->getQuizId($questionId);
                $value1 = $correctChoice == 'choice1' ? 1 : 0;
                $value2 = $correctChoice == 'choice2' ? 1 : 0;
                $value3 = $correctChoice == 'choice3' ? 1 : 0;
                $value4 = $correctChoice == 'choice4' ? 1 : 0;

                $db->editChoice($choice1_id, $choice1_update, $value1, $questionId);
                $db->editChoice($choice2_id, $choice2_update, $value2, $questionId);

                if (!empty($choice3_update) && empty($choice3_id)) {
                    $db->addChoice($questionId, $quizId, $choice3_update, 3, $value3);
                } else if (!empty($choice3_update) && !empty($choice3_id)) {
                    $db->editChoice($choice3_id, $choice3_update, $value3, $questionId);
                } else if (empty($choice3_update) && !empty($choice3_id)) {
                    $db->deleteChoice($choice3_id, $questionId);
                }

                if (!empty($choice4_update) && empty($choice4_id)) {
                    $db->addChoice($questionId, $quizId, $choice4_update, 4, $value4);
                } else if (!empty($choice4_update) && !empty($choice4_id)) {
                    $db->editChoice($choice4_id, $choice4_update, $value4, $questionId);
                } else if (empty($choice4_update) && !empty($choice4_id)) {
                    $db->deleteChoice($choice4_id, $questionId);
                }

                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'editQuiz') {
        session_start();
        $editQuizId = validate($_POST['editQuizId']);
        $editQuizTitle = validate($_POST['editQuizTitle']);
        $editQuizNumber = validate($_POST['editQuizNumber']);
        $editSubject = validate($_POST['editSubject']);
        $editLesson = validate($_POST['editLesson']);
        $editQuizTitleHolder = validate($_POST['editQuizTitleHolder']);
        $editQuizNumberHolder = validate($_POST['editQuizNumberHolder']);
        $editSubjectHolder = validate($_POST['editSubjectHolder']);
        $editLessonHolder = validate($_POST['editLessonHolder']);
        $checkNumber = $db->checkQuizNumber($editSubject, $editLesson, $editQuizNumber);

        if ($editQuizTitle == $editQuizTitleHolder && $editQuizNumber == $editQuizNumberHolder && $editSubject == $editSubjectHolder && $editLesson == $editLessonHolder) {
            echo '481';
        } else if (empty($editQuizTitle)) {
            echo '482';
        } else if (empty($editQuizNumber)) {
            echo '483';
        } else if ($checkNumber->num_rows > 0) {
            echo '484';
        } else if (empty($editSubject)) {
            echo '485';
        } else if (empty($editLesson)) {
            echo '486';
        } else {
            $editQuiz = $db->editQuiz($editQuizId, $editQuizTitle, $editQuizNumber, $editSubject, $editLesson);
            if ($editQuiz != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'enableQuiz') {
        session_start();
        $quizId = validate($_POST['quiz_id']);
        $dueDate = validate($_POST['due_date']);
        $quiz = $db->checkQuizInfo($quizId);
        $quizStatus = $quiz['status'];
        if ($quizStatus == 'Active') {
            echo '482';
        } else {
            $enableQuiz = $db->toggleQuizStatus($quizId, 'Active', $dueDate);
            if ($enableQuiz != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'disableQuiz') {
        session_start();
        $quizId = validate($_POST['quiz_id']);

        $quiz = $db->checkQuizInfo($quizId);
        $quizStatus = $quiz['status'];
        if ($quizStatus == 'Inactive') {
            echo '482';
        } else {
            $enableQuiz = $db->toggleQuizStatus($quizId, 'Inactive', null);
            if ($enableQuiz != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'removeQuestion') {
        session_start();
        $questionId = validate($_POST['question_id']);

        $choices = $db->deleteChoices($questionId);
        $quizId = $db->getQuizId($questionId);
        if ($choices != false) {
            $removeQuestion = $db->deleteQuestion($questionId);
            if ($removeQuestion != false) {
                $itemCount = $db->getItemCount($quizId);
                $updateQuizItemCount = $db->updateQuizItemCount($quizId, $itemCount - 1);
                echo '200';
            } else {
                echo '400';
            }
        } else {
            echo '481';
        }
    } else if ($_POST['submitType'] === 'submitQuiz') {
        session_start();
        $quizId = validate($_POST['quiz_id']);
        $studentId = $_SESSION['student_id'];
        $answers = $_POST['answers'];

        $totalQuestions = $db->getItemCount($quizId); // Fetch total number of questions in the quiz
        $correctAnswers = 0;

        foreach ($answers as $answer) {
            $questionId = validate($answer['question_id']);
            $selectedChoiceId = isset($answer['choice_id']) ? validate($answer['choice_id']) : null;

            $answerValue = $db->checkQuizAnswer($selectedChoiceId);
            if ($answerValue && $answerValue == 1) {
                $correctAnswers++;
            }

            $db->recordAnswer($studentId, $quizId, $questionId, $selectedChoiceId, $answerValue);
        }

        $scorePercentage = ($totalQuestions > 0) ? ($correctAnswers / $totalQuestions) * 100 : 0;
        $remarks = ($scorePercentage >= 60) ? 'Passed' : 'Failed';

        $score = $db->recordScore($quizId, $studentId, $correctAnswers, $totalQuestions, $remarks, $scorePercentage);
        if ($score != false) {
            echo json_encode([
                'success' => true,
                'score' => $correctAnswers,
                'totalQuestions' => $totalQuestions,
                'remarks' => $remarks
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error recording score.']);
        }
    } else if ($_POST['submitType'] === 'resubmitQuiz') {
        session_start();
        $quizId = validate($_POST['quiz_id']);
        $studentId = $_SESSION['student_id'];
        $answers = $_POST['answers'];

        $totalQuestions = $db->getItemCount($quizId);
        $correctAnswers = 0;

        foreach ($answers as $answer) {
            $questionId = validate($answer['question_id']);
            $selectedChoiceId = isset($answer['choice_id']) ? validate($answer['choice_id']) : null;

            $answerValue = $db->checkQuizAnswer($selectedChoiceId);
            if ($answerValue && $answerValue == 1) {
                $correctAnswers++;
            }

            $db->updateAnswer($studentId, $quizId, $questionId, $selectedChoiceId, $answerValue);
        }

        $scorePercentage = ($totalQuestions > 0) ? ($correctAnswers / $totalQuestions) * 100 : 0;
        $remarks = ($scorePercentage >= 60) ? 'Passed' : 'Failed';
        $attempts = $db->getAttempts($quizId, $studentId);
        $score = $db->updateScore($quizId, $studentId, $correctAnswers, $totalQuestions, $remarks, $attempts + 1, $scorePercentage);
        if ($score != false) {
            echo json_encode([
                'success' => true,
                'score' => $correctAnswers,
                'totalQuestions' => $totalQuestions,
                'remarks' => $remarks
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error recording score.']);
        }
    } else if ($_POST['submitType'] === 'addGrade') {
        $studentId = $_POST['gradeStudentId'];
        $subjectId = $_POST['subject_id'];
        $studentGrade = validate($_POST['studentGrade']);
        $quarter = validate($_POST['gradeQuarter']);
        $checkGrade = $db->checkGrade($studentId, $subjectId, $quarter);
        if ($checkGrade->num_rows > 0) {
            echo '491';
        } else if (empty($studentGrade)) {
            echo '492';
        } else if ($studentGrade < 0) {
            echo '493';
        } else if ($studentGrade > 100) {
            echo '494';
        } else if (empty($quarter) || $quarter == 'Not Set') {
            echo '495';
        } else {
            if ($studentGrade >= 90) {
                $remarks = 'Outstanding';
            } else if ($studentGrade >= 85) {
                $remarks = 'Very Good';
            } else if ($studentGrade >= 80) {
                $remarks = 'Good';
            } else if ($studentGrade >= 75) {
                $remarks = 'Fair';
            } else {
                $remarks = 'Failed';
            }
            $addGrade = $db->addGrade($studentId, $subjectId, $studentGrade, $remarks, $quarter);
            if ($addGrade != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'editGrade') {
        $gradeId = $_POST['editGradeId'];
        $studentId = $_POST['editStudentGradeId'];
        $subjectId = $_POST['editSubjectGradeId'];
        $editQuarter = $_POST['editQuarterHolder'];
        $editGrade = validate($_POST['editGrade']);
        $quarter = validate($_POST['editGradeQuarter']);
        $checkGrade = $db->checkGrade($studentId, $subjectId, $quarter);
        if ($checkGrade->num_rows > 0 && $editQuarter != $quarter) {
            echo '491';
        } else if (empty($editGrade)) {
            echo '492';
        } else if ($editGrade < 0) {
            echo '493';
        } else if ($editGrade > 100) {
            echo '494';
        } else if (empty($quarter) || $quarter == 'Not Set') {
            echo '495';
        } else {
            if ($editGrade >= 90) {
                $remarks = 'Outstanding';
            } else if ($editGrade >= 85) {
                $remarks = 'Very Good';
            } else if ($editGrade >= 80) {
                $remarks = 'Good';
            } else if ($editGrade >= 75) {
                $remarks = 'Fair';
            } else {
                $remarks = 'Failed';
            }
            $updateGrade = $db->editGrade($gradeId, $editGrade, $remarks, $quarter);
            if ($updateGrade != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'addFacultyList') {
        $teacherLname = strtoupper(validate($_POST['teacherLname']));
        $teacherFname = strtoupper(validate($_POST['teacherFname']));
        $teacherMname = strtoupper(validate($_POST['teacherMname']));
        $teacherSuffix = strtoupper(validate($_POST['teacherSuffix']));
        $role = strtoupper(validate($_POST['teacherRole']));
        if (empty($teacherLname)) {
            echo '491';
        } else if (empty($teacherFname)) {
            echo '492';
        } else if (empty($teacherMname)) {
            echo '493';
        } else if (empty($teacherSuffix)) {
            echo '494';
        } else if (empty($role)) {
            echo '495';
        } else {
            $addFaculty = $db->addFacultyList($teacherLname, $teacherFname, $teacherMname, $teacherSuffix, $role);
            if ($addFaculty != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'addStudentList') {
        $studLRN = strtoupper(validate($_POST['studLRN']));
        $studLname = strtoupper(validate($_POST['studLname']));
        $studFname = strtoupper(validate($_POST['studFname']));
        $studMname = strtoupper(validate($_POST['studMname']));
        $studSuffix = strtoupper(validate($_POST['studSuffix']));
        $studAge = strtoupper(validate($_POST['studAge']));
        $studGender = strtoupper(validate($_POST['studGender']));
        $studGradeLevel = strtoupper(validate($_POST['studGradeLevel']));
        $studSection = strtoupper(validate($_POST['studSection']));
        $checkLRN = $db->checkLRN($studLRN);
        if ($checkLRN->num_rows > 0) {
            echo '489';
        } else if (empty($studLRN)) {
            echo '490';
        } else if (empty($studLname)) {
            echo '491';
        } else if (empty($studFname)) {
            echo '492';
        } else if (empty($studMname)) {
            echo '493';
        } else if (empty($studSuffix)) {
            echo '494';
        } else if (empty($studAge) || $studAge == 0) {
            echo '495';
        } else if ($studAge <= 0) {
            echo '496';
        } else if ($studAge > 100) {
            echo '497';
        } else if (empty($studGender)) {
            echo '498';
        } else if (empty($studGradeLevel)) {
            echo '499';
        } else if (empty($studSection)) {
            echo '500';
        } else {
            if ($studSuffix != 'N/A') {
                $studFname = $studFname . ' ' . $studSuffix;
            } else {
                //pass
            }
            $addStudent = $db->addStudentList($studLRN, $studLname, $studFname, $studMname, $studAge, $studGender, $studGradeLevel, $studSection);
            if ($addStudent != false) {
                echo '200';
            } else {
                echo '400';
            }
        }
    } else if ($_POST['submitType'] === 'addSubjectData') {
        $addGradeLevel = validate($_POST['addGradeLevel']);
        $addSubject = validate($_POST['addSubject']);
        $addSection = validate($_POST['addSection']);
        $addTeacher = validate($_POST['addTeacher']);
        if (empty($addGradeLevel)) {
            echo '491';
        } else if (empty($addSubject)) {
            echo '492';
        } else if (empty($addSection)) {
            echo '493';
        } else if (empty($addTeacher)) {
            echo '494';
        } else {
            $subjectData = $db->getSubjectData($addSubject);
            if ($subjectData != false) {
                $subject_title = $subjectData['subject_title'];
                $icon = $subjectData['icon'];
                $subject_code = $subjectData['subject_code'];
                $code = substr($subjectData['subject'], -1);
                $addSubject = $db->addSubject($addTeacher, $addGradeLevel, $addSubject, $subject_title, $addSection, $icon, $subject_code, $code);
                if ($addSubject != false) {
                    echo '200';
                } else {
                    echo '400';
                }
            }
            else{
                echo '400';
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

        if (!isset($_SESSION['teacher_id']) && $_SESSION['role'] == 'Faculty') {
            session_destroy();
            header('Location:/SCES/frontend/admin/login.php');
            exit();
        }

    }
    public function needLogout()
    {

        if (isset($_SESSION['teacher_id']) && $_SESSION['role'] == 'Admin') {
            header('Location:/SCES/frontend/admin/dashboard.php');
            exit();
        }
    }
}

class facultyLoggedIn
{
    public function needLogin()
    {

        if (!isset($_SESSION['teacher_id']) && $_SESSION['role'] == 'Admin') {
            session_destroy();
            header('Location:/SCES/frontend/faculty/login.php');
            exit();
        }

    }
    public function needLogout()
    {

        if (isset($_SESSION['teacher_id']) && $_SESSION['role'] == 'Faculty') {
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



