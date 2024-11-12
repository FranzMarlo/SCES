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
      console.log(response);
      if (response == "200") {
        window.location.href = "/SCES/frontend/student/dashboard.php";
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              text: "Ensure that the email you are using is registered in the platform",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Invalid Credentials",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Sign Up Succesful",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/student/dashboard.php";
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              text: "If middle name is not applicable, please enter N/A",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "455") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "456") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "457") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "458") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "459") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "461") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "463") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Already In Use",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "464") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select None if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your LRN",
              text: "LRN or Learner Reference Number is provided by your school and can be seen on your school ID",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Invalid Student Details",
              text: "Please register with your LRN and current Grade & Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "467") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "LRN Already Registered In The System",
              text: "Please proceed to login if you are already registered. If this is wrong, please contact your adviser",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Sign Up Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "469") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Zero Or Null",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "470") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Shall Be At Least 5",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "471") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "472") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Gender",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "464") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select None if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your City Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Barangay Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "467") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Street Address Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "473") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Guardian's Full Name",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "474") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Guardian's Contact Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "User Icon Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "475") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Moving The Uploaded File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "476") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Upload Valid Image File",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "477") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Uploading File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again Later",
              confirmButtonColor: "#4CAF50",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "479") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Current Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "480") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "481") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Current Password Incorrect Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Use A New Different Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        window.location.href = "/SCES/frontend/admin/dashboard.php";
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              text: "Ensure that the email you are using is registered in the platform",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Invalid Credentials",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Sign Up Succesful",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/admin/dashboard.php";
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "455") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select None if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "456") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please enter control number",
              text: "Your control number is provided by your admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "472") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Gender",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "457") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "458") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "459") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "461") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "463") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Already In Use",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "464") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Admin Data Not Found",
              text: "Please check your control number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Control Number Already Registered In The System",
              text: "If this is wrong, please contact an admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Control Number",
              text: "Your control number is provided by your admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Sign Up Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      }
    },
  });
});

$("#adminEditPersonalForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#personalFirstName").val();
  var lastName = $("#personalLastName").val();
  var middleName = $("#personalMiddleName").val();
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
      age: age,
      gender: gender,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "469") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Zero Or Null",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "470") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Shall Be At Least 5",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "471") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "472") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Gender",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your City Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Barangay Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "467") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Street Address Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "474") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Contact Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "User Icon Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "475") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Moving The Uploaded File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "476") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Upload Valid Image File",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "477") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Uploading File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again Later",
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "479") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Current Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "480") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "481") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Current Password Incorrect Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Use A New Different Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Lesson Added",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Number Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Title Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Lesson Quarter",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "487") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "PDF File Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "488") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "File Type Not Supported",
              text: "Please Upload PDF Files Only",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "489") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Attach A PDF File",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Number Exists",
              text: "Please Enter A Different Lesson Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Lesson Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        window.location.href = "/SCES/frontend/faculty/dashboard.php";
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              text: "Ensure that the email you are using is registered in the platform",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Invalid Credentials",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Sign Up Succesful",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/faculty/dashboard.php";
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "455") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select None if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "456") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please enter control number",
              text: "Your control number is provided by your admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "472") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Gender",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "457") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "458") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "459") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "461") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "463") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Email Already In Use",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "464") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Faculty Data Not Found",
              text: "Please check your control number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Control Number Already Registered In The System",
              text: "If this is wrong, please contact your admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Control Number",
              text: "Your control number is provided by your admin",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Sign Up Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      }
    },
  });
});

$("#facultyEditPersonalForm").on("submit", function (e) {
  e.preventDefault();
  var firstName = $("#personalFirstName").val();
  var lastName = $("#personalLastName").val();
  var middleName = $("#personalMiddleName").val();
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
      age: age,
      gender: gender,
    },
    success: function (response) {
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "454") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "469") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Zero Or Null",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "470") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Shall Be At Least 5",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "471") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Age Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "472") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Gender",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "100") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "465") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your City Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "466") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Your Barangay Address",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "467") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Street Address Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "474") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Contact Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "User Icon Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "475") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Moving The Uploaded File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "476") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Upload Valid Image File",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "477") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Error In Uploading File Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Profile Failed Please Try Again Later",
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "479") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Current Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "480") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "481") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "462") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Current Password Incorrect Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Use A New Different Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "460") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Should Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Lesson Added",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Number Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Title Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Lesson Quarter",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "487") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "PDF File Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "488") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "File Type Not Supported",
              text: "Please Upload PDF Files Only",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "489") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Attach A PDF File",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Lesson Number Exists",
              text: "Please Enter A Different Lesson Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Lesson Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Selected Quarter Already Uploaded",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Lower Than 0",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "495") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Quarter For Subject Grade",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Grade Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Selected Quarter Already Uploaded",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Lower Than 0",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Subject Grade For Student Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "495") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Quarter For Subject Grade",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Grade Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Teacher Inserted To Masterlist",
              text: "You can share the control number generated for their registration",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name For Teacher Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name For Teacher Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name For Teacher Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select 'None' if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "495") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Role For Teacher",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Teacher Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Student Inserted To Masterlist",
              text: "Student can now register in the system by referencing their LRN",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "489") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Student LRN Already Exists In The Masterlist",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "LRN Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Last Name For Student Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "First Name For Student Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Middle Name For Student Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Suffix",
              text: "Select 'None' if not applicable",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "495") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Student Age Cannot Be Empty Or Zero",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "496") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Student Age Cannot Be Lower Than Zero",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "497") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Student Age Cannot Be Higher Than 100",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "498") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Gender Of Student",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "499") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level Of Student",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "500") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter The Section Of The Student",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Student Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response.status == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Quiz Added Successfully",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = `?active=2&quiz_id=${response.quizId}`;
              }
            });
          }
        );
      } else if (response.status == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Number Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response.status == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Number Exists",
              text: "Enter A Different Quiz Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response.status == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Title Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response.status == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Subject Of Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response.status == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Lesson Of Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Quiz Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Question Added To Quiz Successfully",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter A Valid Question For Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter The First Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter The Second Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter At Least 2 Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select The Correct Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "487") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Valid Correct Answer",
              text: "Correct Answer Cannot Be Null Please Check Your Input",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Question Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Question Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "481") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter A Valid Question For Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter The First Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter The Second Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter At Least 2 Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select The Correct Answer Choice For Question",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "487") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Valid Correct Answer",
              text: "Correct Answer Cannot Be Null Please Check Your Input",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Question Upload Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Quiz Updated Successfully",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "481") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Change Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        );
      } else if (response == "482") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Title Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Number Cannot Be Empty",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Quiz Number Exists",
              text: "Enter A Different Quiz Number",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Subject Of Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "486") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Lesson Of Quiz",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Quiz Update Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Subject Added Succesfully",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Subject Already Exists For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select A Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Section For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Teacher For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Subject Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Subject Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "201") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Subject Already Exists For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select A Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Section For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "494") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Teacher For Subject",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Subject Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Section Added Successfully",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Section Name Already In Use For Grade Level",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Name For New Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Adviser For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Section Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Section Updated",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "201") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "info",
              title: "No Changes Has Been Made",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "490") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Section Name Already In Use For Grade Level",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "491") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Grade Level For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "492") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Name For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "493") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select Adviser For Section",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Section Adding Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Student Promoted To Next Grade Level",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select New Section For Student",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Records Failed",
              text: "Please Try Again Later",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Section Failed",
              text: "Please Try Again Later",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Section Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Student Assigned To New Section For Grade Level",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "483") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Select New Section For Student",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "484") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Records Failed",
              text: "Please Try Again Later",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else if (response == "485") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Section Failed",
              text: "Please Try Again Later",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              window.location.reload();
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Updating Student Section Failed",
              text: "Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
      console.log(response);
      if (response == "200") {
        $.ajax({
          type: "POST",
          url: "/SCES/backend/student/send-password-link.php",
          success: function (sendEmailResponse) {
            if (sendEmailResponse === "200") {
              Swal.fire({
                icon: "success",
                title: "Email Sent",
                text: "The password reset link has been sent to your email",
                confirmButtonColor: "#4CAF50",
                allowOutsideClick: false,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed to Send Email",
                text: "Please try again later.",
                confirmButtonColor: "#4CAF50",
              });
            }
          },
          error: function () {
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Unable to complete your request. Please try again later.",
              confirmButtonColor: "#4CAF50",
            });
          },
        });
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Recovery Cannot Be Processed",
              text: "Registered email is unverified",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Not Found",
              text: "Please enter the email used in your registration",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Changed",
              text: "Please login with your new password",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/student/login.php";
              }
            });
          }
        );
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Must Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please try again later",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
              Swal.fire({
                icon: "success",
                title: "Email Sent",
                text: "The password reset link has been sent to your email",
                confirmButtonColor: "#4CAF50",
                allowOutsideClick: false,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed to Send Email",
                text: "Please try again later.",
                confirmButtonColor: "#4CAF50",
              });
            }
          },
          error: function () {
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Unable to complete your request. Please try again later.",
              confirmButtonColor: "#4CAF50",
            });
          },
        });
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Recovery Cannot Be Processed",
              text: "Registered email is unverified",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Not Found",
              text: "Please enter the email used in your registration",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Changed",
              text: "Please login with your new password",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/faculty/login.php";
              }
            });
          }
        );
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Must Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please try again later",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
              Swal.fire({
                icon: "success",
                title: "Email Sent",
                text: "The password reset link has been sent to your email",
                confirmButtonColor: "#4CAF50",
                allowOutsideClick: false,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed to Send Email",
                text: "Please try again later.",
                confirmButtonColor: "#4CAF50",
              });
            }
          },
          error: function () {
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Unable to complete your request. Please try again later.",
              confirmButtonColor: "#4CAF50",
            });
          },
        });
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Your Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter Valid Email",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Recovery Cannot Be Processed",
              text: "Registered email is unverified",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Account Not Found",
              text: "Please enter the email used in your registration",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "success",
              title: "Password Changed",
              text: "Please login with your new password",
              confirmButtonColor: "#4CAF50",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/SCES/frontend/admin/login.php";
              }
            });
          }
        );
      } else if (response == "450") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Enter New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "451") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Password Must Be At Least 6 Characters",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "452") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Please Confirm Your New Password",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else if (response == "453") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "New Passwords Don't Match Please Try Again",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
      } else {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "error",
              title: "Update Password Failed",
              text: "Please try again later",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
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

setInterval(function () {
  fetch("/SCES/backend/update-quiz.php").catch((error) =>
    console.error("Error in updating quiz status:", error)
  );
}, 10000);
