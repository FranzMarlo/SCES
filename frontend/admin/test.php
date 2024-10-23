<div id="studentModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title">
                <h2>Student Details</h2>
                <span class="close-btn">&times;</span>
            </div>
            <div class="student-info">
                <div class="avatar" id="studentAvatar">

                </div>
                <div class="student-data" id="studentData">

                </div>
            </div>
        </div>
        <div class="student-container">
            <div class="menu-controller">
                <button class="menu-button active" onclick="toggleProfile()" id="initialBtn">Profile</button>
                <button class="menu-button" onclick="toggleRecords()">Records</button>
                <button class="menu-button" onclick="toggleAnalytics()">Analytics</button>
            </div>
            <div class="student-data-container" id="profile">
                <div class="data-container" id="namePart"></div>
                <div class="data-container" id="profilePart"></div>
                <div class="data-container" id="addressPart"></div>
            </div>
            <div class="student-data-container" id="records"></div>
            <div class="student-data-container" id="analytics">
                <div class="chart">
                    <canvas id="analyticsChart"></canvas>
                </div>
            </div>
        </div>

    </div>