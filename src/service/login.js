function showToaster(message) {
    var toaster = document.getElementById("toaster");
    toaster.innerText = message;
    toaster.classList.add("show");

    setTimeout(function () {
        toaster.classList.remove("show");
    }, 3000); // Show for 3 seconds
}

function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Validate username and password format
    if(username.length==0 ||password.length==0){
        showToaster("Please enter credentials ");

        return;
    }
    if (!isValidUsername(username) || !isValidPassword(password)) {
        showToaster("Invalid credentials. Please try again. ");

        return;
    }
    authenticatePost(username, password);
}

function isValidUsername(username) {
    var usernameRegex = /^[a-z](?!.*\.\.)(?!.*\.$)[a-z.]{4,19}$/;
    return usernameRegex.test(username);
}

function isValidPassword(password) {
    return password.length >= 10 && password.length <= 64;
}


function authenticatePost(username, password) {
    // Prepare the data for the request
    var data = {
        username,
        password
    };

    // Make the POST request to the /logins endpoint
    fetch('url/logins', {
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
            else if ((response["status"] == 404) || (response["status"] == 409)) {
                throw new Error('Invalid credentials. Please try again. ');
            }

            else {
                throw new Error('An error occurred. Please try again later.');
            }
        })
        .then(result => {
            var accessToken = result.auth.accessToken;
            var refreshToken = result.auth.refreshToken;
            var expiresInSeconds=result.auth.expiresInSeconds;
            // Save tokens in local storage or session storage
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("expiresInSeconds", expiresInSeconds);
            showToaster("Login successful!");
            setTimeout(()=>{
                window.location.href = "../views/units.html";            },3000)

         
        })
        .catch(error => {
            showToaster(error);
        });
}



