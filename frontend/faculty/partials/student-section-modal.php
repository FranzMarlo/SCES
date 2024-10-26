<div id="studentModal" class="modal">
    <div class="modal-content">
        <div class="modal-head" id="studentHeader">
            <div class="modal-header">
                <h2>Student Info</h2>
                <span class="close-btn" id="closeStudentModal">&times;</span>
            </div>
            <div class="head-row">
                <img src="/SCES/storage/student/images/default-profile.png" alt="default-profile.png" id="profileImage">
                <div class="head-col">
                    <span id="fullName"></span>
                    <span id="studId"></span>
                    <span id="gradeSection"></span>
                </div>
            </div>
        </div>
        <div class="tab-controller">
            <div class="tab-item" id="profileTab">Profile</div>
            <div class="tab-item" id="recordsTab">Records</div>
            <div class="tab-item" id="analyticsTab">Analytics</div>
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
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Birthday</p>
                        <span id="birthday">August 14, 2002</span>
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
                        <p>LRN</p>
                        <span id="lrn"></span>
                    </div>
                    <div class="tab-col">
                        <p>Student ID</p>
                        <span id="studentId">20240001</span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Grade Level</p>
                        <span id="gradeLevel"></span>
                    </div>
                    <div class="tab-col">
                        <p>Section</p>
                        <span id="section"></span>
                    </div>
                </div>
                <div class="tab-row">
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
                        <p>Guardian Name</p>
                        <span id="guardian"></span>
                    </div>
                </div>
                <div class="tab-row">
                    <div class="tab-col">
                        <p>Guardian Contact</p>
                        <span id="contact"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-container" id="recordsContainer">
            <div class="title-box">
                <img src="/SCES/assets/images/profile-scores.png" alt="profile-scores.png">
                <h1>Quiz Scores</h1>
            </div>
            <div class="table-responsive">
                <table id="quizScoresTable" class="display data-table">
                    <thead>
                        <tr class="colored-row">
                            <th>Quiz No.</th>
                            <th>Subject</th>
                            <th>Title</th>
                            <th>Score</th>
                            <th>Total Question</th>
                            <th>Remarks</th>
                            <th>Date Taken</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="title-box">
                <img src="/SCES/assets/images/profile-grades.png" alt="profile-grades.png">
                <h1>Grades</h1>
            </div>
            <div class="table-responsive">
                <table id="gradesTable" class="display data-table">
                    <thead>
                        <tr class="colored-row">
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Remarks</th>
                            <th>Quarter</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="tab-container" id="analyticsContainer">
            <div class="title-box">
                <img src="/SCES/assets/images/profile-analytics.png" alt="profile-analytics.png">
                <h1>Analytics</h1>
            </div>
            <div class="stats-panel">
                <div class="panel-box completed">
                    <img src="/SCES/assets/images/quiz-passed.png" alt="quiz-passed.png">
                    <div class="panel-col">
                        <p>Quiz Completed</p>
                        <span id="totalCompletion"></span>
                    </div>
                </div>
                <div class="panel-box pending">
                    <img src="/SCES/assets/images/hourglass.png" alt="hourglass.png">
                    <div class="panel-col">
                        <p>Pending Quiz</p>
                        <span id="totalQuizzes"></span>
                    </div>
                </div>
                <div class="panel-box quiz-score">
                    <img src="/SCES/assets/images/gpa.png" alt="gpa.png">
                    <div class="panel-col">
                        <p>Average Score</p>
                        <span id="averageScore"></span>
                    </div>
                </div>
                <div class="panel-box average">
                    <img src="/SCES/assets/images/profile-gwa.png" alt="profile-gwa.png">
                    <div class="panel-col">
                        <p>General Average</p>
                        <span id="generalAverage"></span>
                    </div>
                </div>
            </div>
            <div class="stats-container">
                <div class="stats-box completed">
                    <img id="studentPredictedPerformanceIcon" src="/SCES/assets/images/passed.png" alt="performance.png">
                    <div class="stats-col">
                        <p>Predicted Performance</p>
                        <span id="studentPredictedPerformance">Passed</span>
                    </div>
                </div>
                <div class="stats-box pending">
                    <img src="/SCES/assets/images/success-rate.png" alt="success-rate.png">
                    <div class="stats-col">
                        <p>Predicted Success Rate</p>
                        <span id="studentPredictedSuccess">Passed</span>
                    </div>
                </div>
            </div>
            <div class="stats-container">
            <div class="stats-box average">
                    <img src="/SCES/assets/images/gwa.png" alt="gwa.png">
                    <div class="stats-col">
                        <p>Predicted GWA</p>
                        <span id="studentPredictedGWA"></span>
                    </div>
                </div>
                <div class="stats-box quiz-score">
                    <img id="studentPredictedRemarksIcon" src="/SCES/assets/images/outstanding.png" alt="remarks.png">
                    <div class="stats-col">
                        <p>Predicted Remarks</p>
                        <span id="studentPredictedRemarks"></span>
                    </div>
                </div>
            </div>
            <div class="graph-container">
                <div class="graph">
                    <canvas id="studentLineChart"></canvas>
                </div>
                <div class="graph">
                    <canvas id="studentBarChart"></canvas>
                </div>
            </div>
            <div class="graph-container">
                <div class="full-graph">
                    <canvas id="studentFullBarChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="viewQuizModal" class="modal">
    <div class="modal-content-quiz">
        <div class="modal-head-quiz">
            <div class="student-info">
                <span><strong id="quizTaker"></strong></span>
                <span id="quizSubject"></span>
            </div>
            <span id="closeViewQuizModal" class="close-btn">&times;</span>
        </div>

        <div class="modal-quiz-header">
            <div class="modal-header-bg">
                <div class="modal-icon-container">
                    <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                </div>
            </div>
            <div class="modal-header-text">
                <img src="/SCES/assets/images/quiz-1.png" alt="quiz-icon">
                <h1></h1>
            </div>
        </div>
        <div class="modal-direction">
            <span><strong>Note: &nbsp;</strong>The green marked option is the correct answer while the answers that are
                marked red are wrong. The theme color represents the student's selected answer.</span>
        </div>

        <div class="modal-quiz-content" id="viewQuestionsContainer"></div>

        <div class="modal-footer">
            <button id="close-quiz" class="save-btn">Close Window</button>
        </div>
    </div>
</div>