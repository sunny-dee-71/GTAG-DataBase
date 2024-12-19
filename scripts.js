// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKayWApP-GNh2v23trRVToSPXK85xVrDg",
  authDomain: "gtag-database.firebaseapp.com",
  databaseURL: "https://gtag-database.firebaseio.com",
  projectId: "gtag-database",
  storageBucket: "gtag-database.appspot.com",
  messagingSenderId: "858392947976",
  appId: "1:858392947976:web:1df12083cd4a8303b890bd",
  measurementId: "G-6BQD81LZG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fetch players from the database
async function fetchPlayers() {
  const playerTable = document.getElementById("playerTable");
  playerTable.innerHTML = ""; // Clear table before populating

  const playersRef = ref(database, "players/");
  const snapshot = await get(playersRef);

  if (snapshot.exists()) {
    const players = snapshot.val();
    Object.keys(players).forEach((key) => {
      const player = players[key];
      addPlayerRow(player.PlayerName, player.PlayerId, player.Timestamp);
    });
  } else {
    console.log("No data available");
  }
}

// Add a row to the table for each player
function addPlayerRow(name, id, timestamp) {
  const playerTable = document.getElementById("playerTable");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td>${id}</td>
    <td>${timestamp}</td>
  `;

  playerTable.appendChild(row);
}

// Implement search functionality
document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll("#playerTable tr");

  rows.forEach((row) => {
    const name = row.cells[0]?.textContent.toLowerCase();
    const id = row.cells[1]?.textContent.toLowerCase();
    if (name.includes(filter) || id.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Load all players on page load
fetchPlayers();