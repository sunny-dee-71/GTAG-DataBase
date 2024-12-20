// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// Fetch players from the database and populate the table
function fetchPlayers() {
  const playersRef = ref(database, "players/");
  const playerTable = document.getElementById("playerTable");

  onValue(playersRef, (snapshot) => {
    if (snapshot.exists()) {
      const players = snapshot.val();
      displayPlayers(players);
    } else {
      console.log("No data available");
      playerTable.innerHTML = `<tr><td colspan="3">No players found</td></tr>`;
    }
  });
}

// Display players in the table
function displayPlayers(players, filter = "") {
  const playerTable = document.getElementById("playerTable");
  playerTable.innerHTML = ""; // Clear the table

  Object.keys(players).forEach((key) => {
    const player = players[key];
    const name = player.PlayerName.toLowerCase();
    const id = player.PlayerId.toLowerCase();

    // If there's a search term, filter by name or ID
    if (!filter || name.includes(filter) || id.includes(filter)) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${player.PlayerName}</td>
        <td>${player.PlayerId}</td>
        <td>${player.Timestamp}</td>
      `;
      playerTable.appendChild(row);
    }
  });

  // If no players match the search term
  if (!playerTable.hasChildNodes()) {
    playerTable.innerHTML = `<tr><td colspan="3">No players found</td></tr>`;
  }
}

// Handle search input
document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const playersRef = ref(database, "players/");

  onValue(playersRef, (snapshot) => {
    if (snapshot.exists()) {
      const players = snapshot.val();
      displayPlayers(players, filter);
    }
  });
});

// Load all players on page load
fetchPlayers();