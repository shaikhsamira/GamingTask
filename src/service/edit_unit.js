window.onload = function () {
    const unit_id=document.getElementById("unitId");
    unit_id.innerText="Your are editing "+JSON.parse(localStorage.getItem('edit_id'));

};

function update(){
        document.getElementById("updateForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        var accessToken = localStorage.getItem("access_token");
        var tokenType = "Bearer"; // Change this based on your token type

        const unitId = JSON.parse(localStorage.getItem("edit_id"));
        const quality = document.getElementById("quality").value;
        const health = parseInt(document.getElementById("health").value);
        const attack = parseInt(document.getElementById("attack").value);
        const maxTargetCount = parseInt(document.getElementById("maxTargetCount").value);
        const spawnCost = parseInt(document.getElementById("spawnCost").value);
        const spawnCooldown = parseFloat(document.getElementById("spawnCooldown").value);
        if(!(quality=='none' && isNaN(health)  && isNaN(attack)  && isNaN(maxTargetCount)  && isNaN(spawnCooldown)  && isNaN(spawnCost)) ){
            const data = {
                id: JSON.parse(localStorage.getItem('edit_id'))
            };
            
            if (quality!=="none") {
                data.quality = quality;
            }
            
            if (health) {
                data.health = health;
            }
            
            if (attack) {
                data.attack = attack;
            }
            
            if (maxTargetCount) {
                data.maxTargetCount = maxTargetCount;
            }
            
            if (spawnCost) {
                data.spawnCost = spawnCost;
            }
            
            if (spawnCooldown) {
                data.spawnCooldownInSeconds = spawnCooldown;
            }   
             fetch(`https://test.indusgame.com/units/${unitId}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `${tokenType} ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
        
            .then(response=>{
                if (response["status"] == 200) {
                    return response.json()
                }
                else if ((response["status"] == 404) || (response["status"] == 409)) {
                    throw new Error('Invalid credentials. Please try again. ');
                }
                
                else if (response["status"] == 401) {
                    const popup = document.getElementById("session_popup");
                     popup.style.display = "block";
                    throw Error("Session Timeout")
                }
    
                else {
                    throw new Error('An error occurred. Please try again later.');
                }
            })
            .then(result=> {
                localStorage.setItem('updated_unit',JSON.stringify(result));
                const units_data=JSON.parse(localStorage.getItem('units'));
                units_data.forEach((unit)=>{
                    if(unit.id==JSON.parse(localStorage.getItem('edit_id'))){
                        
                        unit=result
                    }
                });
                // showToaster("Update successful!");

                setTimeout(()=>{
                    window.location.href = "../views/units.html";   
                },1000)
                
            })
            .catch(err=> console.error(err));            
 
        }

        

    });
    
}