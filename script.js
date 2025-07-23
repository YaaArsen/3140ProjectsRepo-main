async function fetchStats() {
  const username = document.getElementById("usernameInput").value.trim();
  const statsDiv = document.getElementById("statsDisplay");
  
  if (!username) {
    statsDiv.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  statsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://jstris.jezevec10.com/api/user/${username}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    statsDiv.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Games Played:</strong> ${data.games}</p>
      <p><strong>Wins:</strong> ${data.gamesWon}</p>
      <p><strong>Joined:</strong> ${new Date(data.registered * 1000).toLocaleDateString()}</p>
      <p><strong>XP:</strong> ${data.xp}</p>
      <p><strong>Level:</strong> ${data.lvl}</p>
    `;
  } catch (error) {
    statsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}