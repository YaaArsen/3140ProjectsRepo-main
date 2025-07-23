async function getStats() {
  const username = document.getElementById('usernameInput').value.trim();
  const statsDiv = document.getElementById('stats');
  const errorMsg = document.getElementById('errorMsg');
  statsDiv.classList.add('hidden');
  errorMsg.classList.add('hidden');
  if (!username) return;

  const apiUrl = `https://jstris.jezevec10.com/api/userstats/${username}`;
  try {
    const response = await fetch(apiUrl);
    console.log('Fetch response:', response);
    if (!response.ok) {
      console.error('Response status:', response.status);
      throw new Error(response.status === 404 ? 'User not found' : 'Fetch error');
    }

    const data = await response.json();
    console.log('Received data:', data);

    document.getElementById('displayName').textContent = username;
    document.getElementById('gamesPlayed').textContent = data.gamesplayed ?? 'N/A';
    document.getElementById('apm').textContent = data.apm?.toFixed(2) ?? 'N/A';
    document.getElementById('pps').textContent = data.pps?.toFixed(2) ?? 'N/A';
    document.getElementById('vs').textContent = data.vs?.toFixed(2) ?? 'N/A';
    document.getElementById('rank').textContent = data.rank ?? 'N/A';
    document.getElementById('tscore').textContent = data.tscore ?? 'N/A';
    statsDiv.classList.remove('hidden');

  } catch (err) {
    console.error('Error fetching stats:', err);
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
  }
}