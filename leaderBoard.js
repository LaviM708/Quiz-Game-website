function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");

    const users = [];
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            try {
                const user = JSON.parse(localStorage[key]);
                if (user.highestScore !== undefined) {
                    users.push(user);
                }
            } catch (error) {
                console.error("Error reading user data from localStorage:", error);
            }
        }
    }

    // sorting users score
    users.sort((a, b) => b.highestScore - a.highestScore);

    // clear contents that is already in leaderboard Element
    leaderboardElement.innerHTML = "";

    // create and append each user's highscore as a new list item 
    users.forEach(user => {
        const userScoreElement = document.createElement("div");
        userScoreElement.textContent = `${user.id}: ${user.highestScore}`;
        leaderboardElement.appendChild(userScoreElement);
    });
}

window.onload = loadLeaderboard;









