$("#studLogin").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "studentLogin",
      email: email,
      password: password,
    },
    success: function (response) {
      if (response == "200") {
        window.location.href = "/SCES/frontend/student/dashboard.php";
      } else if (response == "451") {
        showAlert("warning", "Please Enter Your Email", "Ensure that the email you are using is registered in the platform");
      } else if (response == "452") {
        showAlert("warning", "Please Enter Your Password");
      } else if (response == "453") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "454") {
        showAlert("error", "Account Disabled", "Your account has been disabled, if this is wrong please contact your adviser.");
      } else {
        showAlert("error", "Login Failed", "Please check your email and password and try again");
      }
    },
  });
});

$("#studSignUp").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var middleName = $("#middleName").val();
  var lastName = $("#lastName").val();
  var studSuffix = $("#studSuffix").val();
  var studentLRN = $("#studentLRN").val();
  var gradeLevel = $("#gradeLevel").val();
  var section = $("#section").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "studentSignUp",
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      studSuffix: studSuffix,
      studentLRN: studentLRN,
      gradeLevel: gradeLevel,
      section: section,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showRedirectAlert("success", "Sign Up Succesful", "", "/SCES/frontend/student/dashboard.php");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty", "If middle name is not applicable, please enter N/A");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "455") {
        showAlert("warning", "Please Select Grade Level");
      } else if (response == "456") {
        showAlert("warning", "Please Select Section");
      } else if (response == "457") {
        showAlert("warning", "Email Cannot Be Empty");
      } else if (response == "458") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "459") {
        showAlert("warning", "Password Cannot Be Empty");
      } else if (response == "460") {
        showAlert("warning", "Password Should Be At Least 6 Characters");
      } else if (response == "461") {
        showAlert("warning", "Please Confirm Your Password");
      } else if (response == "462") {
        showAlert("warning", "Password Does Not Match Please Try Again");
      } else if (response == "463") {
        showAlert("warning", "Email Already In Use");
      } else if (response == "464") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else if (response == "465") {
        showAlert("warning", "Please Enter Your LRN", "LRN or Learner Reference Number is provided by your school and can be seen on your school ID");
      } else if (response == "466") {
        showAlert("warning", "Invalid Student Details", "Please register with your LRN and current Grade & Section");
      } else if (response == "467") {
        showAlert("warning", "LRN Already Registered In The System", "Please proceed to login if you are already registered. If this is wrong, please contact your adviser");
      } else {
        showAlert("warning", "Sign Up Failed", "Please Try Again");
      }
    },
  });
});

$("#editProfileForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "editProfileForm",
      firstName: firstName,
      lastName: lastName,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#editPersonalForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#personalFirstName").val();
  var lastName = $("#personalLastName").val();
  var middleName = $("#personalMiddleName").val();
  var suffix = $("#personalSuffix").val();
  var age = $("#personalAge").val();
  var gender = $("#personalGender").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "editPersonalForm",
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      suffix: suffix,
      age: age,
      gender: gender,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "469") {
        showAlert("warning", "Age Cannot Be Zero Or Null");
      } else if (response == "470") {
        showAlert("warning", "Age Shall Be At Least 5");
      } else if (response == "471") {
        showAlert("warning", "Age Cannot Be Higher Than 100");
      } else if (response == "472") {
        showAlert("warning", "Please Select Your Gender");
      } else if (response == "464") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#editBackgroundForm").on("submit", function (e) {
  e.preventDefault();
  var city = $("#city").val();
  var barangay = $("#barangay").val();
  var street = $("#street").val();
  var guardianFullName = $("#guardianFullName").val();
  var guardianContact = $("#guardianContact").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "editBackgroundForm",
      city: city,
      barangay: barangay,
      street: street,
      guardianFullName: guardianFullName,
      guardianContact: guardianContact,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "464") {
        showAlert("warning", "Please Enter Valid Phone Number");
      } else if (response == "465") {
        showAlert("warning", "Please Select Your City Address");
      } else if (response == "466") {
        showAlert("warning", "Please Select Your Barangay Address");
      } else if (response == "467") {
        showAlert("warning", "Street Address Cannot Be Empty");
      } else if (response == "473") {
        showAlert("warning", "Please Enter Your Guardian's Full Name");
      } else if (response == "474") {
        showAlert("warning", "Please Enter Your Guardian's Contact Number");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#changeAvatarForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "uploadAvatar");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Picture Updated");
      } else if (response == "475") {
        showAlert("error", "Error In Moving The Uploaded File Please Try Again");
      } else if (response == "476") {
        showAlert("warning", "Please Upload Valid Image File");
      } else if (response == "477") {
        showAlert("error", "Error In Uploading File Please Try Again");
      } else {
        showReloadAlert("error", "Update Profile Failed Please Try Again Later");
      }
    },
  });
});

$("#updatePassword").on("submit", function (e) {
  e.preventDefault();
  var currentPassword = $("#currentPassword").val();
  var newPassword = $("#newPassword").val();
  var confirmPassword = $("#confirmPassword").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "updatePassword",
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Password Updated");
      } else if (response == "479") {
        showAlert("warning", "Please Enter Current Password");
      } else if (response == "480") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "481") {
        showAlert("warning", "Please Confirm New Password");
      } else if (response == "462") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else if (response == "482") {
        showAlert("warning", " Incorrect Current Password Please Try Again");
      } else if (response == "483") {
        showAlert("warning", "Please Use A New Different Password");
      } else if (response == "460") {
        showAlert("warning", "New Password Should Be At Least 6 Characters");
      } else {
        showAlert("error", "Update Password Failed", "Please Try Again Later");
      }
    },
  });
});

$("#adminLogin").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminLogin",
      email: email,
      password: password,
    },
    success: function (response) {
      if (response == "200") {
        window.location.href = "/SCES/frontend/admin/dashboard.php";
      } else if (response == "451") {
        showAlert("warning", "Please Enter Your Email", "Ensure that the email you are using is registered in the platform");
      } else if (response == "452") {
        showAlert("warning", "Please Enter Your Password");
      } else if (response == "453") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "454") {
        showAlert("error", "Account Disabled", "Your account has been disabled, if this is wrong please contact an admin.");
      } else {
        showAlert("error", "Login Failed", "Please check your email and password and try again");
      }
    },
  });
});

$("#adminSignUp").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var middleName = $("#middleName").val();
  var lastName = $("#lastName").val();
  var suffix = $("#suffix").val();
  var gender = $("#gender").val();
  var controlNumber = $("#controlNumber").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminSignUp",
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      suffix: suffix,
      gender: gender,
      controlNumber: controlNumber,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showRedirectAlert("success", "Sign Up Succesful", "", "/SCES/frontend/admin/dashboard.php");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty", "If middle name is not applicable, please enter N/A");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "455") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else if (response == "472") {
        showAlert("warning", "Please Select Your Gender");
      } else if (response == "457") {
        showAlert("warning", "Email Cannot Be Empty");
      } else if (response == "458") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "459") {
        showAlert("warning", "Password Cannot Be Empty");
      } else if (response == "460") {
        showAlert("warning", "Password Should Be At Least 6 Characters");
      } else if (response == "461") {
        showAlert("warning", "Please Confirm Your Password");
      } else if (response == "462") {
        showAlert("warning", "Password Does Not Match Please Try Again");
      } else if (response == "463") {
        showAlert("warning", "Email Already In Use");
      } else if (response == "464") {
        showAlert("error", "Admin Data Not Found", "Please check your control number");
      } else if (response == "465") {
        showAlert("error", "Control Number Already Registered In The System", "If this is wrong, please contact an admin");
      } else if (response == "466") {
        showAlert("warning", "Please enter control number", "Your control number is provided by your admin");
      } else {
        showAlert("error", "Sign Up Failed", "Please Try Again");
      }
    },
  });
});

$("#adminEditProfileForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminEditProfileForm",
      firstName: firstName,
      lastName: lastName,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#adminEditPersonalForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#personalFirstName").val();
  var lastName = $("#personalLastName").val();
  var middleName = $("#personalMiddleName").val();
  var suffix = $("#personalSuffix").val();
  var age = $("#personalAge").val();
  var gender = $("#personalGender").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminEditPersonalForm",
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      suffix: suffix,
      age: age,
      gender: gender,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "469") {
        showAlert("warning", "Age Cannot Be Zero Or Null");
      } else if (response == "470") {
        showAlert("warning", "Age Shall Be At Least 18");
      } else if (response == "471") {
        showAlert("warning", "Age Cannot Be Higher Than 100");
      } else if (response == "472") {
        showAlert("warning", "Please Select Your Gender");
      } else if (response == "464") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#adminEditBackgroundForm").on("submit", function (e) {
  e.preventDefault();
  var city = $("#city").val();
  var barangay = $("#barangay").val();
  var street = $("#street").val();
  var contactNumber = $("#contactNumber").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminEditBackgroundForm",
      city: city,
      barangay: barangay,
      street: street,
      contactNumber: contactNumber,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "465") {
        showAlert("warning", "Please Select Your City Address");
      } else if (response == "466") {
        showAlert("warning", "Please Select Your Barangay Address");
      } else if (response == "467") {
        showAlert("warning", "Street Address Cannot Be Empty");
      } else if (response == "474") {
        showAlert("warning", "Please Enter Your Contact Number");
      } else if (response == "464") {
        showAlert("warning", "Please Enter Valid Phone Number");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#adminChangeAvatarForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "adminUploadAvatar");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Picture Updated");
      } else if (response == "475") {
        showAlert("error", "Error In Moving The Uploaded File Please Try Again");
      } else if (response == "476") {
        showAlert("warning", "Please Upload Valid Image File");
      } else if (response == "477") {
        showAlert("error", "Error In Uploading File Please Try Again");
      } else {
        showReloadAlert("error", "Update Profile Failed Please Try Again Later");
      }
    },
  });
});

$("#adminUpdatePassword").on("submit", function (e) {
  e.preventDefault();
  var currentPassword = $("#currentPassword").val();
  var newPassword = $("#newPassword").val();
  var confirmPassword = $("#confirmPassword").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminUpdatePassword",
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Password Updated");
      } else if (response == "479") {
        showAlert("warning", "Please Enter Current Password");
      } else if (response == "480") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "481") {
        showAlert("warning", "Please Confirm New Password");
      } else if (response == "462") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else if (response == "482") {
        showAlert("warning", " Incorrect Current Password Please Try Again");
      } else if (response == "483") {
        showAlert("warning", "Please Use A New Different Password");
      } else if (response == "460") {
        showAlert("warning", "New Password Should Be At Least 6 Characters");
      } else {
        showAlert("error", "Update Password Failed", "Please Try Again Later");
      }
    },
  });
});

$("#adminAddLesson").on("submit", function (e) {
  e.preventDefault();
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");
  var subject_id = bodyElement.getAttribute("data-subject");
  var level_id = bodyElement.getAttribute("data-level");
  var grade_level = bodyElement.getAttribute("data-gradeLevel");
  var subjectTitle = bodyElement.getAttribute("data-title");

  var formData = new FormData(this);
  formData.append("submitType", "adminAddLesson");
  formData.append("level_id", level_id);
  formData.append("grade_level", grade_level);
  formData.append("subject_id", subject_id);
  formData.append("section_id", section_id);
  formData.append("subject_title", subjectTitle);
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Lesson Added");
      } else if (response == "484") {
        showAlert("warning", "Lesson Number Cannot Be Empty");
      } else if (response == "485") {
        showAlert("warning", "Lesson Title Cannot Be Empty");
      } else if (response == "486") {
        showAlert("warning", "Please Select Lesson Quarter");
      } else if (response == "487") {
        showAlert("error", "PDF File Upload Failed", "Please Try Again");
      } else if (response == "488") {
        showAlert("warning", "File Type Not Supported", "Please Upload PDF Files Only");
      } else if (response == "489") {
        showAlert("warning", "Please Attach A PDF File");
      } else if (response == "490") {
        showAlert("warning", "Lesson Number Exists", "Please Enter A Different Lesson Number");
      } else {
        showAlert("error", "Lesson Upload Failed", "Please Try Again Later");
      }
    },
  });
});

$("#facultyLogin").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyLogin",
      email: email,
      password: password,
    },
    success: function (response) {
      if (response == "200") {
        window.location.href = "/SCES/frontend/faculty/dashboard.php";
      } else if (response == "451") {
        showAlert("warning", "Please Enter Your Email", "Ensure that the email you are using is registered in the platform");
      } else if (response == "452") {
        showAlert("warning", "Please Enter Your Password");
      } else if (response == "453") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "454") {
        showAlert("error", "Account Disabled", "Your account has been disabled, if this is wrong please contact an admin.");
      } else {
        showAlert("error", "Login Failed", "Please check your email and password and try again");
      }
    },
  });
});

$("#facultySignUp").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var middleName = $("#middleName").val();
  var lastName = $("#lastName").val();
  var suffix = $("#suffix").val();
  var gender = $("#gender").val();
  var controlNumber = $("#controlNumber").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultySignUp",
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      suffix: suffix,
      gender: gender,
      controlNumber: controlNumber,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showRedirectAlert("success", "Sign Up Succesful", "", "/SCES/frontend/faculty/dashboard.php");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty", "If middle name is not applicable, please enter N/A");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "455") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else if (response == "472") {
        showAlert("warning", "Please Select Your Gender");
      } else if (response == "457") {
        showAlert("warning", "Email Cannot Be Empty");
      } else if (response == "458") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "459") {
        showAlert("warning", "Password Cannot Be Empty");
      } else if (response == "460") {
        showAlert("warning", "Password Should Be At Least 6 Characters");
      } else if (response == "461") {
        showAlert("warning", "Please Confirm Your Password");
      } else if (response == "462") {
        showAlert("warning", "Password Does Not Match Please Try Again");
      } else if (response == "463") {
        showAlert("warning", "Email Already In Use");
      } else if (response == "464") {
        showAlert("error", "Faculty Data Not Found", "Please check your control number");
      } else if (response == "465") {
        showAlert("error", "Control Number Already Registered In The System", "If this is wrong, please contact an admin");
      } else if (response == "466") {
        showAlert("warning", "Please enter control number", "Your control number is provided by your admin");
      } else {
        showAlert("error", "Sign Up Failed", "Please Try Again");
      }
    },
  });
});

$("#facultyEditProfileForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyEditProfileForm",
      firstName: firstName,
      lastName: lastName,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#facultyEditPersonalForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#personalFirstName").val();
  var lastName = $("#personalLastName").val();
  var middleName = $("#personalMiddleName").val();
  var suffix = $("#personalSuffix").val();
  var age = $("#personalAge").val();
  var gender = $("#personalGender").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyEditPersonalForm",
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      suffix: suffix,
      age: age,
      gender: gender,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "452") {
        showAlert("warning", "First Name Cannot Be Empty");
      } else if (response == "453") {
        showAlert("warning", "Middle Name Cannot Be Empty");
      } else if (response == "454") {
        showAlert("warning", "Last Name Cannot Be Empty");
      } else if (response == "469") {
        showAlert("warning", "Age Cannot Be Zero Or Null");
      } else if (response == "470") {
        showAlert("warning", "Age Shall Be At Least 18");
      } else if (response == "471") {
        showAlert("warning", "Age Cannot Be Higher Than 100");
      } else if (response == "472") {
        showAlert("warning", "Please Select Your Gender");
      } else if (response == "464") {
        showAlert("warning", "Please Select Suffix", "Select None if not applicable");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#facultyEditBackgroundForm").on("submit", function (e) {
  e.preventDefault();
  var city = $("#city").val();
  var barangay = $("#barangay").val();
  var street = $("#street").val();
  var contactNumber = $("#contactNumber").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyEditBackgroundForm",
      city: city,
      barangay: barangay,
      street: street,
      contactNumber: contactNumber,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Updated");
      } else if (response == "100") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "465") {
        showAlert("warning", "Please Select Your City Address");
      } else if (response == "466") {
        showAlert("warning", "Please Select Your Barangay Address");
      } else if (response == "467") {
        showAlert("warning", "Street Address Cannot Be Empty");
      } else if (response == "474") {
        showAlert("warning", "Please Enter Your Contact Number");
      } else if (response == "464") {
        showAlert("warning", "Please Enter Valid Phone Number");
      } else {
        showAlert("error", "Update Profile Failed Please Try Again");
      }
    },
  });
});

$("#facultyChangeAvatarForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "facultyUploadAvatar");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Profile Picture Updated");
      } else if (response == "475") {
        showAlert("error", "Error In Moving The Uploaded File Please Try Again");
      } else if (response == "476") {
        showAlert("warning", "Please Upload Valid Image File");
      } else if (response == "477") {
        showAlert("error", "Error In Uploading File Please Try Again");
      } else {
        showReloadAlert("error", "Update Profile Failed Please Try Again Later");
      }
    },
  });
});

$("#facultyUpdatePassword").on("submit", function (e) {
  e.preventDefault();
  var currentPassword = $("#currentPassword").val();
  var newPassword = $("#newPassword").val();
  var confirmPassword = $("#confirmPassword").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyUpdatePassword",
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Password Updated");
      } else if (response == "479") {
        showAlert("warning", "Please Enter Current Password");
      } else if (response == "480") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "481") {
        showAlert("warning", "Please Confirm New Password");
      } else if (response == "462") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else if (response == "482") {
        showAlert("warning", " Incorrect Current Password Please Try Again");
      } else if (response == "483") {
        showAlert("warning", "Please Use A New Different Password");
      } else if (response == "460") {
        showAlert("warning", "New Password Should Be At Least 6 Characters");
      } else {
        showAlert("error", "Update Password Failed", "Please Try Again Later");
      }
    },
  });
});

$("#facultyAddLesson").on("submit", function (e) {
  e.preventDefault();
  var bodyElement = document.querySelector("body");
  var section_id = bodyElement.getAttribute("data-section");
  var subject_id = bodyElement.getAttribute("data-subject");
  var level_id = bodyElement.getAttribute("data-level");
  var grade_level = bodyElement.getAttribute("data-gradeLevel");
  var subjectTitle = bodyElement.getAttribute("data-title");

  var formData = new FormData(this);
  formData.append("submitType", "addLesson");
  formData.append("level_id", level_id);
  formData.append("grade_level", grade_level);
  formData.append("subject_id", subject_id);
  formData.append("section_id", section_id);
  formData.append("subject_title", subjectTitle);

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Lesson Added");
      } else if (response == "484") {
        showAlert("warning", "Lesson Number Cannot Be Empty");
      } else if (response == "485") {
        showAlert("warning", "Lesson Title Cannot Be Empty");
      } else if (response == "486") {
        showAlert("warning", "Please Select Lesson Quarter");
      } else if (response == "487") {
        showAlert("error", "PDF File Upload Failed", "Please Try Again");
      } else if (response == "488") {
        showAlert("warning", "File Type Not Supported", "Please Upload PDF Files Only");
      } else if (response == "489") {
        showAlert("warning", "Please Attach A PDF File");
      } else if (response == "490") {
        showAlert("warning", "Lesson Number Exists", "Please Enter A Different Lesson Number");
      } else {
        showAlert("error", "Lesson Upload Failed", "Please Try Again Later");
      }
    },
  });
});

$("#addGradeForm").on("submit", function (e) {
  e.preventDefault();
  var bodyElement = document.querySelector("body");
  var subject_id = bodyElement.getAttribute("data-subject");
  var studentId = document.getElementById("gradeStudentId").value;

  var formData = new FormData(this);
  formData.append("submitType", "addGrade");
  formData.append("subject_id", subject_id);

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Subject Grade Uploaded For Student",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                document.getElementById("studentModal").style.display = "flex";
                addGradeModal.style.display = "none";
                addGradeForm.reset();
                if ($.fn.DataTable.isDataTable("#gradesTable")) {
                  $("#gradesTable").DataTable().ajax.reload(null, false); // Keep the current page
                }
              }
            });
          }
        );
      } else if (response == "491") {
        showAlert("warning", "Subject Grade For Selected Quarter Already Uploaded");
      } else if (response == "492") {
        showAlert("warning", "Subject Grade For Student Cannot Be Empty");
      } else if (response == "493") {
        showAlert("warning", "Subject Grade For Student Cannot Be Lower Than 0");
      } else if (response == "494") {
        showAlert("warning", "Subject Grade For Student Cannot Be Higher Than 100");
      } else if (response == "495") {
        showAlert("warning", "Please Select Quarter For Subject Grade");
      } else {
        showAlert("error", "Grade Upload Failed", "Please Try Again");
      }
    },
  });
});

$("#editGradeForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "editGrade");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Subject Grade Updated For Student",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                document.getElementById("editGradeModal").style.display =
                  "none";
                document.getElementById("editGradeForm").reset();
                document.getElementById("studentModal").style.display = "flex";
                if ($.fn.DataTable.isDataTable("#gradesTable")) {
                  $("#gradesTable").DataTable().ajax.reload(null, false);
                }
              }
            });
          }
        );
      } else if (response == "491") {
        showAlert("warning", "Subject Grade For Selected Quarter Already Uploaded");
      } else if (response == "492") {
        showAlert("warning", "Subject Grade For Student Cannot Be Empty");
      } else if (response == "493") {
        showAlert("warning", "Subject Grade For Student Cannot Be Lower Than 0");
      } else if (response == "494") {
        showAlert("warning", "Subject Grade For Student Cannot Be Higher Than 100");
      } else if (response == "495") {
        showAlert("warning", "Please Select Quarter For Subject Grade");
      } else {
        showAlert("error", "Grade Upload Failed", "Please Try Again");
      }
    },
  });
});

$("#addTeacherForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "addFacultyList");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Teacher Inserted To Masterlist", "You can share the control number generated for their registration");
      } else if (response == "491") {
        showAlert("warning", "Last Name For Teacher Cannot Be Empty");
      } else if (response == "492") {
        showAlert("warning", "First Name For Teacher Cannot Be Empty");
      } else if (response == "493") {
        showAlert("warning", "Middle Name For Teacher Cannot Be Empty");
      } else if (response == "494") {
        showAlert("warning", "Please Select Suffix", "Select 'None' if not applicable");
      } else if (response == "495") {
        showAlert("warning", "Please Select Role For Teacher");
      } else {
        showAlert("error", "Teacher Adding Failed", "Please Try Again");
      }
    },
  });
});

$("#addStudentForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "addStudentList");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Student Inserted To Masterlist", "Student can now register in the system by referencing their LRN");
      } else if (response == "489") {
        showAlert("warning", "Student LRN Already Exists In The Masterlist");
      } else if (response == "490") {
        showAlert("warning", "LRN Cannot Be Empty");
      } else if (response == "491") {
        showAlert("warning", "Last Name For Student Cannot Be Empty");
      } else if (response == "492") {
        showAlert("warning", "First Name For Student Cannot Be Empty");
      } else if (response == "493") {
        showAlert("warning", "Middle Name For Student Cannot Be Empty");
      } else if (response == "494") {
        showAlert("warning", "Please Select Suffix", "Select 'None' if not applicable");
      } else if (response == "495") {
        showAlert("warning", "Student Age Cannot Be Empty Or Zero");
      } else if (response == "496") {
        showAlert("warning", "Student Age Cannot Be Lower Than Zero");
      } else if (response == "497") {
        showAlert("warning", "Student Age Cannot Be Higher Than 100");
      } else if (response == "498") {
        showAlert("warning", "Please Select Gender Of Student");
      } else if (response == "499") {
        showAlert("warning", "Please Select Grade Level Of Student");
      } else if (response == "500") {
        showAlert("warning", "Please Enter The Section Of The Student");
      } else {
        showAlert("error", "Student Adding Failed", "Please Try Again");
      }
    },
  });
});

$("#addQuiz").on("submit", function (e) {
  e.preventDefault();
  var quizNumber = $("#quizNumber").val();
  var quizTitle = $("#quizTitle").val();
  var subject = $("#subject").val();
  var lesson = $("#lesson").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "addQuiz",
      quizNumber: quizNumber,
      quizTitle: quizTitle,
      subject: subject,
      lesson: lesson,
    },
    dataType: "json",
    success: function (response) {
      if (response.status == "200") {
        showRedirectAlert("success", "Quiz Added Successfully", "", `?active=2&quiz_id=${response.quizId}`);
      } else if (response.status == "482") {
        showAlert("warning", "Quiz Number Cannot Be Empty");
      } else if (response.status == "483") {
        showAlert("warning", "Please Enter A Different Quiz Number");
      } else if (response.status == "484") {
        showAlert("warning", "Quiz Title Cannot Be Empty");
      } else if (response.status == "485") {
        showAlert("warning", "Please Select Subject Of Quiz");
      } else if (response.status == "486") {
        showAlert("warning", "Please Select Lesson Of Quiz");
      } else {
        showAlert("error", "Quiz Upload Failed", "Please Try Again");
      }
    },
  });
});

$("#addQuestion").on("submit", function (e) {
  e.preventDefault();
  var quizId = $("#quizId").val();
  var question = $("#question").val();
  var choice1 = $("#choice1").val();
  var choice2 = $("#choice2").val();
  var choice3 = $("#choice3").val();
  var choice4 = $("#choice4").val();
  var correctAnswer = $("#correctAnswer").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "addQuestion",
      quizId: quizId,
      question: question,
      choice1: choice1,
      choice2: choice2,
      choice3: choice3,
      choice4: choice4,
      correctAnswer: correctAnswer,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Question Added To Quiz Successfully");
      } else if (response == "482") {
        showAlert("warning", "Please Enter A Valid Question For Quiz");
      } else if (response == "483") {
        showAlert("warning", "Please Enter The First Answer Choice For Question");
      } else if (response == "484") {
        showAlert("warning", "Please Enter The Second Answer Choice For Question");
      } else if (response == "485") {
        showAlert("warning", "Please Enter At Least 2 Answer Choice For Question");
      } else if (response == "486") {
        showAlert("warning", "Please Select The Correct Answer Choice For Question");
      } else if (response == "487") {
        showAlert("warning", "Please Select Valid Correct Answer", "Correct Answer Cannot Be Null Please Check Your Input");
      } else {
        showAlert("error", "Question Upload Failed", "Please Try Again");
      }
    },
  });
});

$("#editQuestion").on("submit", function (e) {
  e.preventDefault();
  var editQuestionId = $("#editQuestionId").val();
  var editQuestionText = $("#editQuestionText").val();
  var choice1_update = $("#choice1_update").val();
  var choice1_id = $("#choice1_id").val();
  var choice2_update = $("#choice2_update").val();
  var choice2_id = $("#choice2_id").val();
  var choice3_update = $("#choice3_update").val();
  var choice3_id = $("#choice3_id").val();
  var choice4_update = $("#choice4_update").val();
  var choice4_id = $("#choice4_id").val();
  var correctChoice = $("#correctChoice").val();
  var choice1_value = $("#choice1_value").val();
  var choice2_value = $("#choice2_value").val();
  var choice3_value = $("#choice3_value").val();
  var choice4_value = $("#choice4_value").val();
  var correct_value = $("#correct_value").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "editQuestion",
      editQuestionId: editQuestionId,
      editQuestionText: editQuestionText,
      choice1_update: choice1_update,
      choice1_id: choice1_id,
      choice2_update: choice2_update,
      choice2_id: choice2_id,
      choice3_update: choice3_update,
      choice3_id: choice3_id,
      choice4_update: choice4_update,
      choice4_id: choice4_id,
      correctChoice: correctChoice,
      choice1_value: choice1_value,
      choice2_value: choice2_value,
      choice3_value: choice3_value,
      choice4_value: choice4_value,
      correct_value: correct_value,
    },
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Question Updated");
      } else if (response == "481") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "482") {
        showAlert("warning", "Please Enter A Valid Question For Quiz");
      } else if (response == "483") {
        showAlert("warning", "Please Enter The First Answer Choice For Question");
      } else if (response == "484") {
        showAlert("warning", "Please Enter The Second Answer Choice For Question");
      } else if (response == "485") {
        showAlert("warning", "Please Enter At Least 2 Answer Choice For Question");
      } else if (response == "486") {
        showAlert("warning", "Please Select The Correct Answer Choice For Question");
      } else if (response == "487") {
        showAlert("warning", "Please Select Valid Correct Answer", "Correct Answer Cannot Be Null Please Check Your Input");
      } else {
        showAlert("error", "Error Updating Question", "Please Try Again");
      }
    },
  });
});

$("#editQuiz").on("submit", function (e) {
  e.preventDefault();
  var editQuizId = $("#editQuizId").val();
  var editQuizTitle = $("#editQuizTitle").val();
  var editQuizNumber = $("#editQuizNumber").val();
  var editQuizTitle = $("#editQuizTitle").val();
  var editSubject = $("#editSubject").val();
  var editLesson = $("#editLesson").val();
  var editQuizTitleHolder = $("#editQuizTitleHolder").val();
  var editQuizNumberHolder = $("#editQuizNumberHolder").val();
  var editQuizTitleHolder = $("#editQuizTitleHolder").val();
  var editSubjectHolder = $("#editSubjectHolder").val();
  var editLessonHolder = $("#editLessonHolder").val();

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "editQuiz",
      editQuizId: editQuizId,
      editQuizNumber: editQuizNumber,
      editQuizTitle: editQuizTitle,
      editSubject: editSubject,
      editLesson: editLesson,
      editQuizNumberHolder: editQuizNumberHolder,
      editQuizTitleHolder: editQuizTitleHolder,
      editSubjectHolder: editSubjectHolder,
      editLessonHolder: editLessonHolder,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Quiz Updated Successfully");
      } else if (response == "481") {
        showReloadAlert("info", "No Change Has Been Made");
      } else if (response == "482") {
        showAlert("warning", "Quiz Title Cannot Be Empty");
      } else if (response == "483") {
        showAlert("warning", "Quiz Number Cannot Be Empty");
      } else if (response == "484") {
        showAlert("warning", "Quiz Number Exists", "Please Enter A Different Quiz Number");
      } else if (response == "485") {
        showAlert("warning", "Please Select Subject Of Quiz");
      } else if (response == "486") {
        showAlert("warning", "Please Select Lesson Of Quiz");
      } else {
        showAlert("error", "Error Updating Quiz", "Please Try Again");
      }
    },
  });
});

$("#addSubjectForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "addSubjectData");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Subject Added Successfully");
      } else if (response == "490") {
        showAlert("warning", "Subject Already Exists For Section");
      } else if (response == "491") {
        showAlert("warning", "Please Select Grade Level For Subject");
      } else if (response == "492") {
        showAlert("warning", "Please Select A Subject");
      } else if (response == "493") {
        showAlert("warning", "Please Select Section For Subject");
      } else if (response == "494") {
        showAlert("warning", "Please Select Teacher For Subject");
      } else {
        showAlert("error", "Error Adding Subject", "Please Try Again");
      }
    },
  });
});

$("#editSubjectForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "editSubjectData");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response == "200") {
        showReloadAlert("success", "Subject Updated Successfully");
      } else if (response == "201") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "490") {
        showAlert("error", "Subject Already Exists For Section");
      } else if (response == "491") {
        showAlert("warning", "Please Select Grade Level For Subject");
      } else if (response == "492") {
        showAlert("warning", "Please Select A Subject");
      } else if (response == "493") {
        showAlert("warning", "Please Select Section For Subject");
      } else if (response == "494") {
        showAlert("warning", "Please Select Teacher For Subject");
      } else {
        showAlert("error", "Error Updating Subject", "Please Try Again");
      }
    },
  });
});

$("#addSectionForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "addSectionData");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Section Added Successfully");
      } else if (response == "490") {
        showAlert("error", "Section Name Already In Use For Grade Level");
      } else if (response == "491") {
        showAlert("warning", "Please Select Grade Level For Section");
      } else if (response == "492") {
        showAlert("warning", "Please Enter Name For New Section");
      } else if (response == "493") {
        showAlert("warning", "Please Select Adviser For Section");
      } else {
        showAlert("error", "Error Adding Section", "Please Try Again");
      }
    },
  });
});

$("#editSectionForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "editSectionData");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Section Updated Successfully");
      } else if (response == "201") {
        showReloadAlert("info", "No Changes Has Been Made");
      } else if (response == "490") {
        showAlert("error", "Section Name Already In Use For Grade Level");
      } else if (response == "491") {
        showAlert("warning", "Please Select Grade Level For Section");
      } else if (response == "492") {
        showAlert("warning", "Please Enter Name For Section");
      } else if (response == "493") {
        showAlert("warning", "Please Select Adviser For Section");
      } else {
        showAlert("error", "Error Updating Section", "Please Try Again");
      }
    },
  });
});

$("#promoteStudentForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "promoteStudent");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Student Promoted To Next Grade Level");
      } else if (response == "483") {
        showAlert("warning", "Please Select New Section For Student");
      } else if (response == "484") {
        showReloadAlert("error", "Updating Student Records Failed", "Please Try Again Later");
      } else if (response == "485") {
        showReloadAlert("error", "Updating Student Section Failed", "Please Try Again Later");
      } else {
        showAlert("error", "Operation Failed", "Please Try Again Later");
      }
    },
  });
});

$("#retainStudentForm").on("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(this);
  formData.append("submitType", "retainStudent");

  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showReloadAlert("success", "Student Assigned To New Section For Grade Level");
      } else if (response == "483") {
        showAlert("warning", "Please Select New Section For Student");
      } else if (response == "484") {
        showReloadAlert("error", "Updating Student Records Failed", "Please Try Again Later");
      } else if (response == "485") {
        showReloadAlert("error", "Updating Student Section Failed", "Please Try Again Later");
      } else {
        showAlert("error", "Operation Failed", "Please Try Again Later");
      }
    },
  });
});

$("#studForgotPass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "studentForgotPass",
      email: email,
    },
    success: function (response) {
      if (response == "200") {
        $.ajax({
          type: "POST",
          url: "/SCES/backend/student/send-password-link.php",
          success: function (sendEmailResponse) {
            if (sendEmailResponse === "200") {
              showAlert("success", "Email Sent", "The password reset link has been sent to your email");
            } else {
              showAlert("error", "Failed to Send Email", "Please try again later");
            }
          },
          error: function () {
            showAlert("error", "Server Error", "Unable to complete your request. Please try again later.");
          },
        });
      } else if (response == "450") {
        showAlert("warning", "Please Enter Your Email");
      } else if (response == "451") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "452") {
        showAlert("error", "Account Recovery Cannot Be Processed", "Registered email is unverified");
      } else {
        showAlert("error", "Account Not Found", "Please enter the email used in your registration");
      }
    },
  });
});

$("#studChangePass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "studentChangePass",
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showRedirectAlert("success", "Password Changed", "Please login with your new password", "/SCES/frontend/student/login.php");
      } else if (response == "450") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "451") {
        showAlert("warning", "New Password Must Be At Least 6 Characters");
      } else if (response == "452") {
        showAlert("warning", "Please Confirm Your New Password");
      } else if (response == "453") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else {
        showAlert("error", "Change Password Failed", "Please try again later");
      }
    },
  });
});

$("#facultyForgotPass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyForgotPass",
      email: email,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.ajax({
          type: "POST",
          url: "/SCES/backend/faculty/send-password-link.php",
          success: function (sendEmailResponse) {
            if (sendEmailResponse === "200") {
              showAlert("success", "Email Sent", "The password reset link has been sent to your email");
            } else {
              showAlert("error", "Failed to Send Email", "Please try again later");
            }
          },
          error: function () {
            showAlert("error", "Server Error", "Unable to complete your request. Please try again later.");
          },
        });
      } else if (response == "450") {
        showAlert("warning", "Please Enter Your Email");
      } else if (response == "451") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "452") {
        showAlert("error", "Account Recovery Cannot Be Processed", "Registered email is unverified");
      } else {
        showAlert("error", "Account Not Found", "Please enter the email used in your registration");
      }
    },
  });
});

$("#facultyChangePass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "facultyChangePass",
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showRedirectAlert("success", "Password Changed", "Please login with your new password", "/SCES/frontend/faculty/login.php");
      } else if (response == "450") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "451") {
        showAlert("warning", "New Password Must Be At Least 6 Characters");
      } else if (response == "452") {
        showAlert("warning", "Please Confirm Your New Password");
      } else if (response == "453") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else {
        showAlert("error", "Change Password Failed", "Please try again later");
      }
    },
  });
});

$("#adminForgotPass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminForgotPass",
      email: email,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.ajax({
          type: "POST",
          url: "/SCES/backend/admin/send-password-link.php",
          success: function (sendEmailResponse) {
            if (sendEmailResponse === "200") {
              showAlert("success", "Email Sent", "The password reset link has been sent to your email");
            } else {
              showAlert("error", "Failed to Send Email", "Please try again later");
            }
          },
          error: function () {
            showAlert("error", "Server Error", "Unable to complete your request. Please try again later.");
          },
        });
      } else if (response == "450") {
        showAlert("warning", "Please Enter Your Email");
      } else if (response == "451") {
        showAlert("warning", "Please Enter Valid Email");
      } else if (response == "452") {
        showAlert("error", "Account Recovery Cannot Be Processed", "Registered email is unverified");
      } else {
        showAlert("error", "Account Not Found", "Please enter the email used in your registration");
      }
    },
  });
});

$("#adminChangePass").on("submit", function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  $.ajax({
    type: "POST",
    url: "/SCES/backend/global.php",
    data: {
      submitType: "adminChangePass",
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        showRedirectAlert("success", "Password Changed", "Please login with your new password", "/SCES/frontend/admin/login.php");
      } else if (response == "450") {
        showAlert("warning", "Please Enter New Password");
      } else if (response == "451") {
        showAlert("warning", "New Password Must Be At Least 6 Characters");
      } else if (response == "452") {
        showAlert("warning", "Please Confirm Your New Password");
      } else if (response == "453") {
        showAlert("warning", "New Passwords Don't Match Please Try Again");
      } else {
        showAlert("error", "Change Password Failed", "Please try again later");
      }
    },
  });
});


function logoutFunc() {
  Swal.fire({
    icon: "question",
    title: "Do you want to log out?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#f44336",
    allowOutsideClick: false,
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/SCES/backend/student/student-logout.php";
    }
  });
}

function adminLogoutFunc() {
  Swal.fire({
    icon: "question",
    title: "Do you want to log out?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#f44336",
    allowOutsideClick: false,
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/SCES/backend/admin/admin-logout.php";
    }
  });
}

function facultyLogoutFunc() {
  Swal.fire({
    icon: "question",
    title: "Do you want to log out?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#f44336",
    allowOutsideClick: false,
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/SCES/backend/faculty/faculty-logout.php";
    }
  });
}

function showAlert(icon, title, text=""){
  $.getScript("/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js", function () {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: "#4CAF50",
    });
  });
}

function showRedirectAlert(icon, title, text = "", redirectUrl = null) {
  $.getScript(
    "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
    function () {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: "#4CAF50",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed && redirectUrl) {
          window.location.href = redirectUrl;
        }
      });
    }
  );
}

function showReloadAlert(icon, title, text = "") {
  $.getScript(
    "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
    function () {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: "#4CAF50",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  );
}