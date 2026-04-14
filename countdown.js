// Number of assignments/tiles
const NUM_ASSIGNMENTS = 25;

const assignments = [
  { title: "COS2601 Quiz-1", due: new Date(2026, 4, 18, 23, 0, 0) },
  { title: "COS2601 Quiz-2", due: new Date(2026, 5, 15, 23, 0, 0) },
  { title: "COS2601 Asign-1", due: new Date(2026, 6, 27, 23, 0, 0) },
  { title: "COS2601 Quiz-3", due: new Date(2026, 7, 17, 23, 0, 0) },
  { title: "COS2601 Quiz-4", due: new Date(2026, 8, 14, 23, 0, 0) },
  { title: "MAT1613 Asign-1", due: new Date(2026, 4, 11, 23, 0, 0) },
  { title: "MAT1613 Quiz-1", due: new Date(2026, 5, 29, 23, 0, 0) },
  { title: "MAT1613 Asign-2", due: new Date(2026, 7, 13, 23, 0, 0) },
  { title: "MAT1613 Quiz-2", due: new Date(2026, 8, 14, 23, 0, 0) },
  { title: "APM1513 Quiz-1", due: new Date(2026, 4, 6, 23, 0, 0) },
  { title: "APM1513 Asign-1", due: new Date(2026, 5, 8, 23, 0, 0) },
  { title: "APM1513 Asign-2", due: new Date(2026, 6, 6, 23, 0, 0) },
  { title: "APM1513 Asign-3", due: new Date(2026, 7, 11, 23, 0, 0) },
  { title: "COS2661 Quiz-1", due: new Date(2026, 4, 27, 23, 0, 0) },
  { title: "COS2661 Quiz-2", due: new Date(2026, 5, 17, 23, 0, 0) },
  { title: "COS2661 Quiz-3", due: new Date(2026, 6, 22, 23, 0, 0) },
  { title: "COS2661 Forum", due: new Date(2026, 7, 12, 23, 0, 0) },
  { title: "COS2661 Quiz-4", due: new Date(2026, 8, 2, 23, 0, 0) },
  { title: "COS2611 Asign-1", due: new Date(2026, 4, 18, 23, 0, 0) },
  { title: "COS2611 Review-1", due: new Date(2026, 5, 29, 23, 0, 0) },
  { title: "COS2611 Asign-2", due: new Date(2026, 6, 27, 23, 0, 0) },
  { title: "COS2611 Quiz-1", due: new Date(2026, 7, 24, 23, 0, 0) },
  { title: "COS2611 Asign-3", due: new Date(2026, 8, 11, 23, 0, 0) },
  { title: "COS2614 Asign-1", due: new Date(2026, 4, 25, 23, 0, 0) },
  { title: "COS2614 Quiz-1", due: new Date(2026, 5, 30, 23, 0, 0) },
  { title: "COS2614 Asign-2", due: new Date(2026, 7, 11, 23, 0, 0) },
  { title: "COS2614 Quiz-2", due: new Date(2026, 8, 7, 23, 0, 0) },
  { title: "MAT1503 Quiz-1", due: new Date(2026, 4, 29, 23, 0, 0) }, //Ended here
  { title: "MAT1503 Asign-1", due: new Date(2026, 5, 30, 23, 0, 0) },
  { title: "MAT1503 Asign-2", due: new Date(2026, 6, 31, 23, 0, 0) },
  { title: "MAT1503 Asign-3", due: new Date(2026, 7, 31, 23, 0, 0) },
  { title: "MAT1503 Quiz-2", due: new Date(2026, 8, 11, 23, 0, 0) },
  { title: "APM1514 Quiz-1", due: new Date(2026, 3, 24, 23, 0, 0) },
  { title: "APM1514 Asign-1", due: new Date(2026, 4, 11, 23, 0, 0) },
  { title: "APM1514 Asign-2", due: new Date(2026, 5, 10, 23, 0, 0) },
  { title: "APM1514 Asign-3", due: new Date(2026, 5, 29, 23, 0, 0) },
  { title: "APM1514 Asign-4", due: new Date(2026, 6, 27, 23, 0, 0) },

  // ... (keep the rest of your assignments here)
];

// Sort assignments by due date (earliest first)
assignments.sort((a, b) => a.due - b.due);

// Color map for courses
const courseColors = {
  COS2601: "#ffb703",
  MAT1613: "#219ebc",
  APM1513: "#8ac926",
  COS2661: "#00c7c1",
  COS2611: "#1982c4",
  COS2614: "#6a4c93",
  MAT1503: "#fb5607",
  APM1514: "#292b29",
};

// Create tiles in the DOM
const container = document.getElementById("tilesContainer");
assignments.forEach((assignment, idx) => {
  const tile = document.createElement("div");
  tile.className = "tile";

  // Get course code prefix (first part of the title)
  const courseCode = assignment.title.split(" ")[0];

  // Set background color based on course
  tile.style.backgroundColor = courseColors[courseCode] || "#e0e0e0"; // fallback color if not found

  tile.innerHTML = `
    <div class="assignment-title">${assignment.title}</div>
    <div class="countdown" id="countdown${idx}">Loading...</div>
    <div class="due-date">Due: ${assignment.due.toLocaleString()}</div>
  `;
  container.appendChild(tile);
});

function updateCountdowns() {
  assignments.forEach((assignment, idx) => {
    const now = new Date();
    const distance = assignment.due - now;
    const countdownElem = document.getElementById(`countdown${idx}`);

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      countdownElem.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Change color to red if 7 days or less left, else default color
      if (days <= 7) {
        countdownElem.style.color = "#d7263d"; // red
      } else {
        countdownElem.style.color = "f1f7f0"; // default blue
      }
    } else {
      countdownElem.textContent = "Time's up!";
      countdownElem.style.color = "f1f7f0"; // red
    }
  });
}

// Start the countdown timer
updateCountdowns();
setInterval(updateCountdowns, 1000);
