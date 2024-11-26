<div id="facultyChangeAvatarModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeAvatarModal">&times;</span>
        <h2>Change Avatar</h2>
        <div class="current-avatar">
            <img src="/SCES/storage/faculty/images/<?php echo $image; ?>" alt="user icon" id="avatar-preview">
            <img src="/SCES/assets/images/change-avatar.png" alt="change user icon" id="change-user-icon">
        </div>
        <form id="facultyChangeAvatarForm" enctype="multipart/form-data">
            <input type="file" id="new-avatar" name="new-avatar" accept="image/*" style="display: none;">
            <button type="submit" class="save-btn">Save</button>
        </form>
    </div>
</div>

<div id="facultyEditProfileModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeModal">&times;</span>
        <h2>Edit Profile Information</h2>
        <form id="facultyEditProfileForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value="<?php echo htmlspecialchars($teacherFname); ?>">

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value="<?php echo htmlspecialchars($teacherLname); ?>">

            <button type="submit" class="save-btn">Save</button>
        </form>
    </div>
</div>

<div id="facultyEditPersonalModal" class="modal" novalidate>
    <div class="modal-content">
        <span class="close-btn" id="closePersonalModal">&times;</span>
        <h2>Edit Personal Information</h2>
        <form id="facultyEditPersonalForm">
            <label for="personalFirstName">First Name:</label>
            <input type="text" id="personalFirstName" name="personalFirstName"
                value="<?php echo htmlspecialchars($teacherFname); ?>">

            <label for="personalLastName">Last Name:</label>
            <input type="text" id="personalLastName" name="personalLastName"
                value="<?php echo htmlspecialchars($teacherLname); ?>">

            <label for="personalMiddleName">Middle Name:</label>
            <input type="text" id="personalMiddleName" name="personalMiddleName"
                value="<?php echo htmlspecialchars($teacherMname); ?>">

            <label for="personalAge">Age:</label>
            <input type="number" id="personalAge" name="personalAge" value="<?php echo htmlspecialchars($age); ?>">

            <label for="personalGender">Gender:</label>
            <select id="personalGender" name="personalGender">
                <option value="" disabled<?php if ($gender == 'Not Set')
                    echo 'selected'; ?>>Select Gender</option>
                <option value="Male" <?php if ($gender == 'Male')
                    echo 'selected'; ?>>Male</option>
                <option value="Female" <?php if ($gender == 'Female')
                    echo 'selected'; ?>>Female</option>
            </select>

            <button type="submit" class="save-btn">Save</button>
        </form>
    </div>
</div>

<div id="facultyEditBackgroundModal" class="modal" novalidate>
    <div class="modal-content">
        <span class="close-btn" id="closeBackgroundModal">&times;</span>
        <h2>Edit Background Information</h2>
        <form id="facultyEditBackgroundForm">
            <label for="city">City:</label>
            <select id="city" name="city" data-initial-city="<?php echo htmlspecialchars($city); ?>">
                <option value="Not Set" disabled <?php if ($city == 'Not Set')
                    echo 'selected'; ?>>Select City</option>
                <option value="Agoncillo" <?php if ($city == 'Agoncillo')
                    echo 'selected'; ?>>Agoncillo</option>
                <option value="Alitagtag" <?php if ($city == 'Alitagtag')
                    echo 'selected'; ?>>Alitagtag</option>
                <option value="Balayan" <?php if ($city == 'Balayan')
                    echo 'selected'; ?>>Balayan</option>
                <option value="Balete" <?php if ($city == 'Balete')
                    echo 'selected'; ?>>Balete</option>
                <option value="Batangas City" <?php if ($city == 'Batangas City')
                    echo 'selected'; ?>>Batangas City
                </option>
                <option value="Bauan" <?php if ($city == 'Bauan')
                    echo 'selected'; ?>>Bauan</option>
                <option value="Calaca" <?php if ($city == 'Calaca')
                    echo 'selected'; ?>>Calaca</option>
                <option value="Calatagan" <?php if ($city == 'Calatagan')
                    echo 'selected'; ?>>Calatagan</option>
                <option value="Cuenca" <?php if ($city == 'Cuenca')
                    echo 'selected'; ?>>Cuenca</option>
                <option value="Ibaan" <?php if ($city == 'Ibaan')
                    echo 'selected'; ?>>Ibaan</option>
                <option value="Laurel" <?php if ($city == 'Laurel')
                    echo 'selected'; ?>>Laurel</option>
                <option value="Lemery" <?php if ($city == 'Lemery')
                    echo 'selected'; ?>>Lemery</option>
                <option value="Lian" <?php if ($city == 'Lian')
                    echo 'selected'; ?>>Lian</option>
                <option value="Lipa" <?php if ($city == 'Lipa')
                    echo 'selected'; ?>>Lipa</option>
                <option value="Lobo" <?php if ($city == 'Lobo')
                    echo 'selected'; ?>>Lobo</option>
                <option value="Mabini" <?php if ($city == 'Mabini')
                    echo 'selected'; ?>>Balayan</option>
                <option value="Malvar" <?php if ($city == 'Malvar')
                    echo 'selected'; ?>>Malvar</option>
                <option value="Mataasnakahoy" <?php if ($city == 'Mataasnakahoy')
                    echo 'selected'; ?>>Mataasnakahoy
                </option>
                <option value="Nasugbu" <?php if ($city == 'Nasugbu')
                    echo 'selected'; ?>>Nasugbu</option>
                <option value="Padre Garcia" <?php if ($city == 'Padre Garcia')
                    echo 'selected'; ?>>Padre Garcia</option>
                <option value="Rosario" <?php if ($city == 'Rosario')
                    echo 'selected'; ?>>Rosario</option>
                <option value="San Jose" <?php if ($city == 'San Jose')
                    echo 'selected'; ?>>San Jose</option>
                <option value="San Juan" <?php if ($city == 'San Juan')
                    echo 'selected'; ?>>San Juan</option>
                <option value="San Luis" <?php if ($city == 'San Luis')
                    echo 'selected'; ?>>San Luis</option>
                <option value="San Nicolas" <?php if ($city == 'San Nicolas')
                    echo 'selected'; ?>>San Nicolas</option>
                <option value="San Pascual" <?php if ($city == 'San Pascual')
                    echo 'selected'; ?>>San Pascual</option>
                <option value="Santa Teresita" <?php if ($city == 'Santa Teresita')
                    echo 'selected'; ?>>Santa Teresita
                </option>
                <option value="Santo Tomas" <?php if ($city == 'Santo Tomas')
                    echo 'selected'; ?>>Santo Tomas</option>
                <option value="Taal" <?php if ($city == 'Taal')
                    echo 'selected'; ?>>Taal</option>
                <option value="Talisay" <?php if ($city == 'Talisay')
                    echo 'selected'; ?>>Talisay</option>
                <option value="Tanauan" <?php if ($city == 'Tanauan')
                    echo 'selected'; ?>>Tanauan</option>
                <option value="Taysan" <?php if ($city == 'Taysan')
                    echo 'selected'; ?>>Taysan</option>
                <option value="Tingloy" <?php if ($city == 'Tingloy')
                    echo 'selected'; ?>>Tingloy</option>
                <option value="Tuy" <?php if ($city == 'Tuy')
                    echo 'selected'; ?>>Tuy</option>
            </select>

            <label for="barangay">Barangay:</label>
            <select id="barangay" name="barangay" data-initial-barangay="<?php echo htmlspecialchars($barangay); ?>">
                <option value="" <?php if ($barangay == 'Not Set')
                    echo 'disabled selected'; ?>>Select City First</option>
            </select>

            <label for="street">Street:</label>
            <input type="text" id="street" name="street" value="<?php echo htmlspecialchars($street); ?>">

            <label for="contactNumber">Contact Number:</label>
            <input type="text" id="contactNumber" name="contactNumber"
                value="<?php echo htmlspecialchars($contactNumber); ?>">

            <button type="submit" class="save-btn">Save</button>
        </form>
    </div>
</div>

<div id="facultyPasswordModal" class="modal" novalidate>
    <div class="modal-content">
        <span class="close-btn" id="closePasswordModal">&times;</span>
        <h2>Update Password</h2>
        <form id="facultyUpdatePassword">
            <label for="currentPassword">Current Password:</label>
            <div class="input-container">
                <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter Current Password">
                <i class="fa-solid fa-eye-slash toggle-password" toggle="#currentPassword"></i>
            </div>

            <label for="newPassword">New Password:</label>
            <div class="input-container">
                <input type="password" id="newPassword" name="newPassword" placeholder="Enter New Password">
                <i class="fa-solid fa-eye-slash toggle-password" toggle="#newPassword"></i>
            </div>

            <label for="confirmPassword">Confirm New Password:</label>
            <div class="input-container">
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm New Password">
                <i class="fa-solid fa-eye-slash toggle-password" toggle="#confirmPassword"></i>
            </div>

            <button type="submit" class="save-btn">Update Password</button>
        </form>
    </div>
</div>

<div id="emailVerificationModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" id="closeEmailVerifModal">&times;</span>
        <h2>Verify Your Email</h2>
        <p>Please enter the verification code sent to your email:</p>
        <input type="text" id="verificationCode" placeholder="Enter verification code">
        <button id="verifyCodeBtn" class="save-btn">Verify</button>
    </div>
</div>