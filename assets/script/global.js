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
            }).then((result) => {
              if (result.value) {
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/student/settings.php";
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
  var gender = $("#gender").val();
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
      gender: gender,
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
            }).then((result) => {
              if (result.value) {
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/admin/settings.php";
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
  var gender = $("#gender").val();
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
      gender: gender,
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
            }).then((result) => {
              if (result.value) {
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
  var formData = new FormData(this);
  formData.append("submitType", "facultyAddLesson");
  
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
            }).then((result) => {
              if (result.value) {
                window.location.href = "/SCES/frontend/faculty/settings.php";
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
    if (result.value) {
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
    if (result.value) {
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
    if (result.value) {
      window.location.href = "/SCES/backend/faculty/faculty-logout.php";
    }
  });
}
