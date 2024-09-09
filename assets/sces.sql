-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2024 at 02:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sces`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `admin_id` int(5) NOT NULL,
  `teacher_id` varchar(9) NOT NULL,
  `role` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_verification` varchar(20) NOT NULL DEFAULT 'Not Verified'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`admin_id`, `teacher_id`, `role`, `email`, `password`, `email_verification`) VALUES
(10000, 'T2024-000', 'Admin', 'test@gmail.com', '$2y$10$yMVLsGGNO22W4anLo8ygOemnKeYbIVcGKaTAvbXkJFgxX2wAsBrhS', 'Not Verified'),
(10004, 'T2024-837', 'Admin', 'johndoe@gmail.com', '$2y$10$yMVLsGGNO22W4anLo8ygOemnKeYbIVcGKaTAvbXkJFgxX2wAsBrhS', 'Not Verified');

-- --------------------------------------------------------

--
-- Table structure for table `grade_tbl`
--

CREATE TABLE `grade_tbl` (
  `grade_id` varchar(9) NOT NULL,
  `student_id` int(9) NOT NULL,
  `subject_id` varchar(20) NOT NULL,
  `grade` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lesson_tbl`
--

CREATE TABLE `lesson_tbl` (
  `lesson_id` varchar(9) NOT NULL,
  `level_id` varchar(5) NOT NULL,
  `subject_id` varchar(20) NOT NULL,
  `topic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level_tbl`
--

CREATE TABLE `level_tbl` (
  `level_id` varchar(5) NOT NULL,
  `grade_level` varchar(50) NOT NULL,
  `short` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level_tbl`
--

INSERT INTO `level_tbl` (`level_id`, `grade_level`, `short`) VALUES
('G0001', 'Grade 1', 'G1'),
('G0002', 'Grade 2', 'G2'),
('G0003', 'Grade 3', 'G3'),
('G0004', 'Grade 4', 'G4'),
('G0005', 'Grade 5', 'G5'),
('G0006', 'Grade 6', 'G6');

-- --------------------------------------------------------

--
-- Table structure for table `login_tbl`
--

CREATE TABLE `login_tbl` (
  `login_id` int(5) NOT NULL,
  `student_id` int(9) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_verification` varchar(20) NOT NULL DEFAULT 'Not Verified'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_tbl`
--

INSERT INTO `login_tbl` (`login_id`, `student_id`, `email`, `password`, `email_verification`) VALUES
(10000, 20240001, 'johndoe@gmail.com', '$2y$10$yMVLsGGNO22W4anLo8ygOemnKeYbIVcGKaTAvbXkJFgxX2wAsBrhS', 'Not Verified'),
(10001, 20244714, 'johndoe1@gmail.com', '$2y$10$YTbOviJ8qSbZRdqnj3Ht6.nD4TFPbuWmBlTHkhc6TX/jadIS1Ce0G', 'Not Verified'),
(20240004, 20245905, 'zoalyt.1@gmail.com', '$2y$10$Q6t1snEf7gb9trv7EyhW8usz0lW62lIhYIuSSRWccS82BGbUi8C0O', 'Not Verified');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_tbl`
--

CREATE TABLE `quiz_tbl` (
  `quiz_id` varchar(5) NOT NULL,
  `subject_id` varchar(20) NOT NULL,
  `lesson_id` varchar(9) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `item_number` int(3) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `score_tbl`
--

CREATE TABLE `score_tbl` (
  `score_id` varchar(9) NOT NULL,
  `quiz_id` varchar(5) NOT NULL,
  `student_id` int(9) NOT NULL,
  `score` int(3) NOT NULL,
  `item_number` int(3) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `section_tbl`
--

CREATE TABLE `section_tbl` (
  `section_id` varchar(9) NOT NULL,
  `level_id` varchar(5) NOT NULL,
  `section` varchar(50) NOT NULL,
  `teacher_id` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section_tbl`
--

INSERT INTO `section_tbl` (`section_id`, `level_id`, `section`, `teacher_id`) VALUES
('G1-001', 'G0001', 'Banana', 'T2024-000');

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

CREATE TABLE `student_tbl` (
  `student_id` int(9) NOT NULL,
  `level_id` varchar(5) NOT NULL,
  `section_id` varchar(9) NOT NULL,
  `student_fname` varchar(100) NOT NULL,
  `student_mname` varchar(100) NOT NULL,
  `student_lname` varchar(100) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `guardian_name` varchar(100) NOT NULL,
  `guardian_contact` varchar(15) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `registration` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`student_id`, `level_id`, `section_id`, `student_fname`, `student_mname`, `student_lname`, `age`, `gender`, `city`, `barangay`, `street`, `guardian_name`, `guardian_contact`, `profile_image`, `registration`) VALUES
(20240001, 'G0001', 'G1-001', 'John', 'Dela Cruz', 'Doe', 5, 'Male', 'San Jose', 'Galamay‑Amo', 'Sitio Centro', 'Juan Dela Cruz', '09476196868', 'c540093d98e3b22be24a4e7e0803d7ca.jpg', 'INCOMPLETE'),
(20244714, 'G0001', 'G1-001', 'Franz', 'Barroga', 'Andal', 5, 'Male', 'Batangas City', 'Alangilan', 'GCH', 'John Doe Sr.', '09476196868', 'fc056b3dad0587958ca90eda8ea4aec0.jpg', 'incomplete'),
(20245905, 'G0001', 'G1-001', 'Franz Marlo', 'Barroga', 'Andal', 0, 'Not Se', 'Not Set', 'Not Set', 'Not Set', 'Not Set', 'Not Set', 'default-profile.png', 'incomplete');

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE `subject_tbl` (
  `subject_id` varchar(20) NOT NULL,
  `teacher_id` varchar(9) NOT NULL,
  `level_id` varchar(5) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `subject_title` varchar(50) NOT NULL,
  `section_id` varchar(9) NOT NULL,
  `link` varchar(100) NOT NULL,
  `icon` varchar(30) NOT NULL,
  `subject_code` varchar(10) NOT NULL,
  `archived` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`subject_id`, `teacher_id`, `level_id`, `subject`, `subject_title`, `section_id`, `link`, `icon`, `subject_code`, `archived`) VALUES
('AP1-0001', 'T2024-000', 'G0001', 'AP 1', 'Araling Panlipunan', 'G1-001', 'ap.php', 'ap-icon.png', 'AP', 'No'),
('ENG1-0001', 'T2024-000', 'G0001', 'English 1', 'English', 'G1-001', 'english.php', 'english-icon.png', 'ENG', 'No'),
('ESP1-0001', 'T2024-000', 'G0001', 'ESP 1', 'Edukasyon Sa Pagpapakatao', 'G1-001', 'esp.php', 'esp-icon.png', 'ESP', 'No'),
('FIL1-0001', 'T2024-000', 'G0001', 'Filipino 1', 'Filipino', 'G1-001', 'filipino.php', 'filipino-icon.png', 'FIL', 'No'),
('MAPEH1-0001', 'T2024-000', 'G0001', 'MAPEH 1', 'MAPEH', 'G1-001', 'mapeh.php', 'mapeh-icon.png', 'MAPEH', 'No'),
('MATH1-0001', 'T2024-000', 'G0001', 'Mathematics 1', 'Mathematics', 'G1-001', 'math.php', 'math-icon.png', 'MATH', 'No'),
('MT1-0001', 'T2024-000', 'G0001', 'Mother Tongue 1', 'Mother Tongue', 'G1-001', 'mother-tongue.php', 'mother-tongue-icon.png', 'MT', 'No'),
('SCI1-0001', 'T2024-000', 'G0001', 'Science 1', 'Science', 'G1-001', 'science.php', 'science-icon.png', 'SCI', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_tbl`
--

CREATE TABLE `teacher_tbl` (
  `teacher_id` varchar(9) NOT NULL,
  `teacher_fname` varchar(100) NOT NULL,
  `teacher_mname` varchar(100) NOT NULL,
  `teacher_lname` varchar(100) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `image_profile` varchar(255) NOT NULL,
  `registration` varchar(20) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `contact_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_tbl`
--

INSERT INTO `teacher_tbl` (`teacher_id`, `teacher_fname`, `teacher_mname`, `teacher_lname`, `age`, `gender`, `image_profile`, `registration`, `city`, `barangay`, `street`, `contact_number`) VALUES
('T2024-000', 'Ella', 'Amparado', 'Besa', 21, 'Female', 'ed81fbfb69d4ae3c5e21cf8578ca58b5.jpg', 'Incomplete', 'Batangas City', 'Banaba Ibaba', 'Sitio Pulong Gubat', '09476196868'),
('T2024-837', 'Franz Marlo', 'Barroga', 'Andal', 22, 'Male', '1a79d07127d3ebc854ab78aff180eab8.jpg', 'Incomplete', 'Lipa', 'Plaridel', 'Bulacan', '09476196868');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `fk_admin_teacher` (`teacher_id`);

--
-- Indexes for table `grade_tbl`
--
ALTER TABLE `grade_tbl`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `fk_grade_student` (`student_id`),
  ADD KEY `fk_subject_grade` (`subject_id`);

--
-- Indexes for table `lesson_tbl`
--
ALTER TABLE `lesson_tbl`
  ADD PRIMARY KEY (`lesson_id`),
  ADD KEY `fk_level_id` (`level_id`),
  ADD KEY `fk_subject_lesson` (`subject_id`);

--
-- Indexes for table `level_tbl`
--
ALTER TABLE `level_tbl`
  ADD PRIMARY KEY (`level_id`);

--
-- Indexes for table `login_tbl`
--
ALTER TABLE `login_tbl`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `fk_student_login` (`student_id`);

--
-- Indexes for table `quiz_tbl`
--
ALTER TABLE `quiz_tbl`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `fk_lesson_quiz` (`lesson_id`),
  ADD KEY `fk_subject_quiz` (`subject_id`);

--
-- Indexes for table `score_tbl`
--
ALTER TABLE `score_tbl`
  ADD PRIMARY KEY (`score_id`),
  ADD KEY `fk_student_score` (`student_id`) USING BTREE,
  ADD KEY `fk_quiz_score` (`quiz_id`);

--
-- Indexes for table `section_tbl`
--
ALTER TABLE `section_tbl`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `fk_level_section` (`level_id`),
  ADD KEY `fk_adviser` (`teacher_id`);

--
-- Indexes for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `fk_level_student` (`level_id`),
  ADD KEY `fk_section_student` (`section_id`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `fk_teacher_subject` (`teacher_id`),
  ADD KEY `fk_level_subject` (`level_id`),
  ADD KEY `fk_section_subject` (`section_id`);

--
-- Indexes for table `teacher_tbl`
--
ALTER TABLE `teacher_tbl`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `admin_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10005;

--
-- AUTO_INCREMENT for table `login_tbl`
--
ALTER TABLE `login_tbl`
  MODIFY `login_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20240005;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD CONSTRAINT `fk_admin_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_tbl` (`teacher_id`);

--
-- Constraints for table `grade_tbl`
--
ALTER TABLE `grade_tbl`
  ADD CONSTRAINT `fk_grade_student` FOREIGN KEY (`student_id`) REFERENCES `student_tbl` (`student_id`),
  ADD CONSTRAINT `fk_subject_grade` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `lesson_tbl`
--
ALTER TABLE `lesson_tbl`
  ADD CONSTRAINT `fk_level_id` FOREIGN KEY (`level_id`) REFERENCES `level_tbl` (`level_id`),
  ADD CONSTRAINT `fk_subject_lesson` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `login_tbl`
--
ALTER TABLE `login_tbl`
  ADD CONSTRAINT `fk_student_login` FOREIGN KEY (`student_id`) REFERENCES `student_tbl` (`student_id`);

--
-- Constraints for table `quiz_tbl`
--
ALTER TABLE `quiz_tbl`
  ADD CONSTRAINT `fk_lesson_quiz` FOREIGN KEY (`lesson_id`) REFERENCES `lesson_tbl` (`lesson_id`),
  ADD CONSTRAINT `fk_subject_quiz` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `score_tbl`
--
ALTER TABLE `score_tbl`
  ADD CONSTRAINT `fk_quiz_score` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_tbl` (`quiz_id`);

--
-- Constraints for table `section_tbl`
--
ALTER TABLE `section_tbl`
  ADD CONSTRAINT `fk_adviser` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_tbl` (`teacher_id`),
  ADD CONSTRAINT `fk_level_section` FOREIGN KEY (`level_id`) REFERENCES `level_tbl` (`level_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `fk_level_student` FOREIGN KEY (`level_id`) REFERENCES `level_tbl` (`level_id`),
  ADD CONSTRAINT `fk_section_student` FOREIGN KEY (`section_id`) REFERENCES `section_tbl` (`section_id`);

--
-- Constraints for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD CONSTRAINT `fk_level_subject` FOREIGN KEY (`level_id`) REFERENCES `level_tbl` (`level_id`),
  ADD CONSTRAINT `fk_section_subject` FOREIGN KEY (`section_id`) REFERENCES `section_tbl` (`section_id`),
  ADD CONSTRAINT `fk_teacher_subject` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_tbl` (`teacher_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
