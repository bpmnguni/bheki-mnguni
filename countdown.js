// Number of assignments/tiles
const NUM_ASSIGNMENTS = 27;

const assignments = [
  { title: "COS1501 Quiz-1", due: new Date(2025, 4, 13, 11, 0, 0) },
  { title: "COS1501 Quiz-2", due: new Date(2025, 5, 13, 11, 0, 0) },
  { title: "COS1501 Asign-1", due: new Date(2025, 6, 25, 11, 0, 0) },
  { title: "MAT1512 Asign-1", due: new Date(2025, 5, 20, 11, 0, 0) },
  { title: "MAT1512 Asign-2", due: new Date(2025, 5, 30, 9, 0, 0) },
  { title: "MAT1512 Asign-3", due: new Date(2025, 6, 18, 11, 0, 0) },
  { title: "MAT1512 Asign-4", due: new Date(2025, 6, 31, 11, 0, 0) },
  { title: "APM1513 Quiz-1", due: new Date(2025, 4, 6, 11, 59, 0) },
  { title: "APM1513 Asign-1", due: new Date(2025, 5, 6, 11, 59, 0) },
  { title: "APM1513 Asign-2", due: new Date(2025, 6, 4, 11, 59, 0) },
  { title: "APM1513 Asign-3", due: new Date(2025, 7, 8, 11, 59, 0) },
  { title: "COS1521 Quiz-1", due: new Date(2025, 4, 27, 11, 59, 0) },
  { title: "COS1521 Quiz-2", due: new Date(2025, 5, 17, 11, 59, 0) },
  { title: "COS1521 Quiz-3", due: new Date(2025, 6, 22, 11, 59, 0) },
  { title: "COS1521 Forum", due: new Date(2025, 7, 12, 11, 59, 0) },
  { title: "COS1521 Quiz-4", due: new Date(2025, 8, 2, 11, 59, 0) },
  { title: "COS1511 Quiz-1", due: new Date(2025, 3, 16, 15, 0, 0) },
  { title: "COS1511 Asign-1", due: new Date(2025, 5, 18, 11, 59, 0) },
  { title: "COS1511 Quiz-2", due: new Date(2025, 7, 4, 9, 0, 0) },
  { title: "COS1512 Quiz-1", due: new Date(2025, 4, 20, 11, 0, 0) },
  { title: "COS1512 Review-1", due: new Date(2025, 7, 26, 11, 0, 0) },
  { title: "COS1512 Review-2", due: new Date(2025, 8, 9, 11, 0, 0) },
  { title: "COS1512 Quiz-2", due: new Date(2025, 8, 23, 11, 0, 0) },
  { title: "MAT1503 Quiz-1", due: new Date(2025, 5, 10, 11, 0, 0) },
  { title: "MAT1503 Asign-1", due: new Date(2025, 6, 15, 12, 0, 0) },
  { title: "MAT1503 Asign-2", due: new Date(2025, 6, 31, 12, 0, 0) },
  { title: "MAT1503 Asign-3", due: new Date(2025, 7, 29, 12, 0, 0) },
  { title: "MAT1503 Quiz-2", due: new Date(2025, 8, 30, 12, 0, 0) },

  // ... (keep the rest of your assignments here)
];

// Sort assignments by due date (earliest first)
assignments.sort((a, b) => a.due - b.due);

// Color map for courses
const courseColors = {
  COS1501: "#ffb703",
  MAT1512: "#219ebc",
  APM1513: "#8ac926",
  COS1521: "#00c7c1",
  COS1511: "#1982c4",
  COS1512: "#6a4c93",
  MAT1503: "#fb5607",
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
