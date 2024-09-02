$(".menu-btn").on("click", function (e) {
  e.stopPropagation();
  $(".pop-up").toggleClass("active");
  $(".overlay").toggle();
});

$(document).on("click", function (e) {
  if (
    !$(e.target).closest(".pop-up").length &&
    $(".pop-up").hasClass("active")
  ) {
    $(".pop-up").removeClass("active");
    $(".overlay").hide();
  }
});

$(".overlay").on("click", function () {
  $(".pop-up").removeClass("active");
  $(this).hide();
});

$(".menu > ul > li").on("click", function (e) {
  $(this).toggleClass("active");
  $(this).siblings().removeClass("active");
  $(this).find("ul").slideToggle();
  $(this).siblings().find("ul").slideUp();
  $(this).siblings().find("ul").find("li").removeClass("active");
});

// Donut Chart
const donutCtx = document.getElementById("myDonutChart").getContext("2d");
const myDonutChart = new Chart(donutCtx, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Line Chart
const lineCtx = document.getElementById("myLineChart").getContext("2d");
const myLineChart = new Chart(lineCtx, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});
