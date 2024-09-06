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
  
  const donutCtx = document.getElementById("myDonutChart").getContext("2d");
  const myDonutChart = new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: ["Accomplished", "Pending"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#46d2b7", "#ffffff"],
          borderColor: ["#2ea993", "#000000"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        title: {
          display: true,
          text: "Quizzes Completion",
          font: {
            size: 20,
          },
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
      maintainAspectRatio: false,
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

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  }
  
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  
  function updateDateTime() {
    const now = new Date();
    document.getElementById("current-date").innerText = formatDate(now);
    document.getElementById("current-time").innerText = formatTime(now);
  }
  
  window.onload = function () {
    updateDateTime(); // Initial call
    setInterval(updateDateTime, 60000);
  };