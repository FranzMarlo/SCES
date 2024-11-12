<div id="facultyModal" class="modal">
    <div class="modal-content">
        <div class="modal-head" id="facultyHeader">
            <div class="modal-header">
                <h2>Teacher Info</h2>
                <span class="close-btn" id="closeFacultyModal">&times;</span>
            </div>
            <div class="head-row">
                <img src="/SCES/storage/faculty/images/default-profile.png" alt="default-profile.png" id="profileImage">
                <div class="head-col">
                    <span id="fullName"></span>
                    <span id="teachId"></span>
                    <span id="roleSpan"></span>
                </div>
            </div>
        </div>
        <div class="tab-controller">
            <div class="tab-part">
                <div class="tab-item" id="profileTab">Profile</div>
                <div class="tab-item" id="analyticsTab">Analytics</div>
            </div>
            <button id="toggleAccountStatus"></button>
        </div>
        <div class="tab-container" id="profileContainer">
            <div class="tab-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/personal-info.png" alt="personal-info.png">
                    <h1>Personal Information</h1>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Last Name</p>
                        <span id="lastName"></span>
                    </div>
                    <div class="tab-col">
                        <p>First Name</p>
                        <span id="firstName"></span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Middle Name</p>
                        <span id="middleName"></span>
                    </div>
                    <div class="tab-col">
                        <p>Suffix</p>
                        <span id="suffix">N/A</span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Gender</p>
                        <span id="gender"></span>
                    </div>
                    <div class="tab-col">
                        <p>Age</p>
                        <span id="age"></span>
                    </div>
                </div>
            </div>
            <div class="tab-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/school-info.png" alt="school-info.png">
                    <h1>School Information</h1>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>TRN</p>
                        <span id="trn"></span>
                    </div>
                    <div class="tab-col">
                        <p>Teacher ID</p>
                        <span id="teacherId"></span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Role</p>
                        <span id="role"></span>
                    </div>
                    <div class="tab-col">
                        <p>Email</p>
                        <span id="email"></span>
                    </div>
                </div>
            </div>
            <div class="tab-panel">
                <div class="title-box">
                    <img src="/SCES/assets/images/background-info.png" alt="background-info.png">
                    <h1>Background Information</h1>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>City/State</p>
                        <span id="city"></span>
                    </div>
                    <div class="tab-col">
                        <p>Barangay</p>
                        <span id="barangay"></span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Street</p>
                        <span id="street"></span>
                    </div>
                    <div class="tab-col">
                        <p>Contact Number</p>
                        <span id="contact"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-container" id="analyticsContainer">
            <div class="title-box">
                <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                <h1>Analytics</h1>
            </div>
            <div class="stats-panel">
                <div class="panel-box pending">
                    <img src="/SCES/assets/images/quiz-lesson.png" alt="quiz-lesson.png">
                    <div class="panel-col">
                        <p>Uploaded Lessons</p>
                        <span id="totalLessons"></span>
                    </div>
                </div>
                <div class="panel-box quiz-score">
                    <img src="/SCES/assets/images/quiz-grade-section.png" alt="quiz-grade-section.png">
                    <div class="panel-col">
                        <p>Handled Students</p>
                        <span id="totalStudents"></span>
                    </div>
                </div>
                <div class="panel-box completed">
                    <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                    <div class="panel-col">
                        <p>Completed Quizzes</p>
                        <span id="totalCompleted"></span>
                    </div>
                </div>
                <div class="panel-box average">
                    <img src="/SCES/assets/images/quiz-pending.png" alt="quiz-pending.png">
                    <div class="panel-col">
                        <p>Pending Quizzes</p>
                        <span id="totalPending"></span>
                    </div>
                </div>
            </div>
            <div class="graph-container">
                <div class="graph">
                    <canvas id="pieChart"></canvas>
                </div>
                <div class="graph">
                    <canvas id="barChart"></canvas>
                </div>
            </div>
            <div class="graph-container">
                <div class="full-graph">
                    <canvas id="lineChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="addTeacherModal" class="modal-small">
    <div class="modal-content-small">
        <div class="modal-header-small">
            <h2>Add Teacher</h2>
            <span class="close-btn" id="closeAddTeacherModal">&times;</span>
        </div>
        <div class="modal-body">
            <form id="addTeacherForm">
                <div class="form-group">
                    <label for="teacherLname">Teacher Last Name:</label>
                    <input type="text" id="teacherLname" name="teacherLname" placeholder="Enter Last Name">
                </div>
                <div class="form-group">
                    <label for="teacherFname">Teacher First Name:</label>
                    <input type="text" id="teacherFname" name="teacherFname" placeholder="Enter First Name">
                </div>
                <div class="form-group">
                    <label for="teacherMname">Teacher Middle Name:</label>
                    <input type="text" id="teacherMname" name="teacherMname" placeholder="Enter Middle Name">
                </div>
                <div class="form-group">
                    <label for="teacherSuffix">Suffix:</label>
                    <select name="teacherSuffix" id="teacherSuffix">
                        <option value="" selected>Select Suffix:</option>
                        <option value="N/A">None</option>
                        <option value="Sr.">Sr.</option>
                        <option value="Jr.">Jr.</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                        <option value="VII">VII</option>
                        <option value="VIII">VIII</option>
                        <option value="IX">IX</option>
                        <option value="X">X</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="teacherRole">Select Role:</label>
                    <select name="teacherRole" id="teacherRole">
                        <option value="" selected>Select Role</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="save-btn">Add Teacher</button>
                </div>
            </form>
        </div>
    </div>
</div>