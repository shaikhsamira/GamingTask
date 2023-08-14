// Function to log out the user
function logout() {
    var accessToken = localStorage.getItem("access_token");
    var tokenType = "Bearer"; // Change this based on your token type

    if (!accessToken) {
        showToaster("No access token found. Already logged out.");
        return;
    }

    fetch('url/logouts', {
        method: 'POST',
        headers: {
            'Authorization': `${tokenType} ${accessToken}`
        }
    })
    .then(response => {
        if (response.status === 202) {
            localStorage.clear(); 

            window.location.href = "../views/login.html"; 
        } else {
            console.error("Logout failed.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.log("An error occurred during logout.");
    });
}
