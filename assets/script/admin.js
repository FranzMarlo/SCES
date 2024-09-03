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

// Custom Plugin for Donut Chart Only
const donutLabelPlugin = {
  id: "doughnutlabel",
  afterDatasetDraw(chart) {
    if (chart.config.type === "doughnut") {
      const {
        ctx,
        chartArea: { top, bottom, left, right },
      } = chart;
      const { datasets } = chart.data;

      ctx.save();

      const fontSize = (bottom - top) / 4;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#273b4a";

      // Calculate the center point
      const textX = (left + right) / 2;
      const textY = (top + bottom) / 2;

      const text = `${datasets[0].data[0]}%`;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    }
  },
};

// Donut Chart
const donutCtx = document.getElementById("myDonutChart").getContext("2d");
const myDonutChart = new Chart(donutCtx, {
  type: "doughnut",
  data: {
    labels: ["Accomplished", "Pending"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#46d2b7", "#ffffff"],
        borderColor: ["#2ea993", "#ffffff"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%",
    plugins: {
      title: {
        display: true,
        text: "Subject Quizzes Completion",
        font: {
          size: 20,
        }
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  },
  plugins: [donutLabelPlugin],
});

const barCtx = document.getElementById("myBarChart").getContext("2d");
const myBarChart = new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
    datasets: [
      {
        label: "2023",
        data: [205, 216, 170, 149, 146, 206],
        backgroundColor: "#ffaade",
        borderColor: "#ff66c4",
        borderWidth: 1,
      },
      {
        label: "2024",
        data: [210, 220, 165, 155, 150, 210],
        backgroundColor: "#e4c2f3",
        borderColor: "#c964f9",
        borderWidth: 1,
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
    plugins: {
      title: {
        display: true,
        text: "Students By Grade Level Per Year",
        font: {
          size: 18,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  },
});

