// Function to refresh access token
function refreshAccessToken() {
    console.log("Refresh token");
    var data = {
        refreshToken:localStorage.getItem("refresh_token")
    };

    return fetch('https://test.indusgame.com/auths', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
       
        if (response["status"] == 200) {
            return response.json()
        }
        else if ((response["status"] == 404) || (response["status"] == 400)) {
            throw new Error('Invalid token');
        }

        else {
            throw new Error('Invalid token');
        }
    })
    .then(result=>{
        console.log(result);
        var accessToken = result.accessToken;
        var refreshToken = result.refreshToken;
        var expiresInSeconds=result.expiresInSeconds;
        // Save tokens in local storage or session storage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("expiresInSeconds", expiresInSeconds);
        location.reload();

    })
    .catch(error => {
        console.error( error);
    });
}