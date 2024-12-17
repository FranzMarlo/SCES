function initializeFullBarChart(year, grade) {
    var ctxBar = document.getElementById("fullBarChart").getContext("2d");

    // Destroy the existing chart if it exists
    if (Chart.getChart("fullBarChart")) {
      Chart.getChart("fullBarChart").destroy();
    }

    $.ajax({
      url: "/backend/fetch-class.php",
      type: "POST",
      dataType: "json",
      data: {
        submitType: "analyticsFullBarChartWithFilter",
        year: year,
        gradeLevel: grade,
      },
      success: function (data) {
        const barColors = data.barData.map((gwa) =>
          gwa < 80 ? "#FF6961" : "#8CD47E"
        );

        var barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "GWA",
                data: data.barData,
                backgroundColor: barColors, // Assign conditional colors
                borderColor: "#ccc",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Average GWA by Grade Level",
                font: {
                  size: 18,
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const gwa = context.raw; // GWA value
                    const students = data.studentCounts[context.dataIndex]; // Number of students
                    return `GWA: ${gwa}, Students: ${students}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });

        // Fetch interpretation from Flask
        $.ajax({
          url: "https://predictive-model-sces-1.onrender.com/interpret-gwa",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            year: year,
            gradeLevel: grade,
            labels: data.labels,
            barData: data.barData,
            studentCounts: data.studentCounts,
          }),
          success: function (interpretationResponse) {
            const interpretationSpan =
              document.getElementById("lvlInterpretation");
            interpretationSpan.innerHTML = "";

            const hasWarning = interpretationResponse.warning === 0;

            const legendHtml = `
              <legend style="color: ${hasWarning ? "red" : "green"};">
                ${
                  hasWarning
                    ? `<img src="/assets/images/at-risk.png" alt="Warning"> Action Required`
                    : `<img src="/assets/images/quiz-passed.png" alt="Check"> No Warnings Found`
                }
              </legend>
            `;
            const interpretation = interpretationResponse.interpretation
              ? `<p><strong>${interpretationResponse.interpretation}</strong></p>`
              : "";

            let insightsHtml = "";

            if (grade === "All" && year === "All") {
              if (
                interpretationResponse.trends &&
                interpretationResponse.trends.length > 0
              ) {
                const trendsList = interpretationResponse.trends
                .map((trend) => {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");
                insightsHtml = `
                  <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                  <p><strong>${interpretationResponse.initial}</strong></p>
                  <ul>${trendsList}</ul>
                  `;
              } else {
                let iconHtml = "";
                insightsHtml = `
                <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                <p><strong>Lowest Average GWA:  </strong>${interpretationResponse.lowest} <i class="fas fa-arrow-down" style="color: red;"></i></p>
                `;
              }
            }
            if (grade === "All" && year !== "All") {
              if (
                interpretationResponse.trends &&
                interpretationResponse.trends.length > 0
              ) {
                const trendsList = interpretationResponse.trends
                .map((trend) => {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");
                insightsHtml = `
                  <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                  <p><strong>${interpretationResponse.initial}</strong></p>
                  <ul>${trendsList}</ul>
                  `;
              } else {
                let iconHtml = "";
                insightsHtml = `
                <p><strong>Highest Average GWA: </strong>${interpretationResponse.highest} <i class="fas fa-arrow-up" style="color: green;"></i></p>
                <p><strong>Lowest Average GWA: </strong>${interpretationResponse.lowest} <i class="fas fa-arrow-down" style="color: red;"></i></p>
                `;
              }
            }
            if (grade !== "All" && year === "All") {
              const trendsList = interpretationResponse.trends
                .map((trend) => {
                  let iconHtml = "";
                  if (trend.includes("Improvement")) {
                    iconHtml = `<i class="fas fa-arrow-up" style="color: green;"></i>`;
                  } else if (trend.includes("Decline")) {
                    iconHtml = `<i class="fas fa-arrow-down" style="color: red;"></i>`;
                  } else if (trend.includes("No significant")) {
                    iconHtml = `<i class="fas fa-minus" style="color: goldenrod;"></i>`;
                  }
                  return `<li>${trend} ${iconHtml}</li>`;
                })
                .join("");

              insightsHtml = `
                <p><strong>${interpretationResponse.initial}</strong></p>
                <ul>${trendsList}</ul>
              `;
            }

            const recommendation = interpretationResponse.recommendation
              ? `<p><strong>Recommendation: </strong>${interpretationResponse.recommendation}</p>`
              : "";

            // Combine everything into a single HTML block
            interpretationSpan.innerHTML = `
              ${legendHtml}
              ${interpretation}
              ${insightsHtml}
              ${recommendation}
            `;
          },
          error: function () {
            document.getElementById("lvlInterpretation").textContent =
              "Error fetching interpretation.";
          },
        });
      },
    });
  }