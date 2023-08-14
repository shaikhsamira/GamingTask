
var sliceEnd=30;
var sliceStart=0;
function dateChange() {
    const sdate = document.getElementById('start-date').value;
    const edate = document.getElementById('start-date');
    console.log(new Date(sdate));
    sliceValue=0;
    
}
function changeMonth(){
  var month = document.getElementById("month").value;
  if(month=="jan"){
    sliceStart=0;
    sliceEnd=31;
  }
  else if(month="feb"){
    sliceStart=31;
    sliceEnd=59;
  }
  else{
    sliceStart=59;
    sliceEnd=91;
  }
  chart();
}
function chart() {
    // Make API request to get units
    const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token

    fetch('https://test.indusgame.com/sales', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => {
          if (response["status"] == 200) {
            return response.json()
        }
        else if (response["status"] == 401) {
            const popup = document.getElementById("session_popup");
             popup.style.display = "block";
            throw Error("Session Timeout")
        }
        })
        .then(data => {
            const chartData = data.slice(sliceStart,sliceEnd);
            var valuesArr={};
            var avaiable_packs="";
            chartData.forEach(item => {
                item.packs.forEach((pack)=>{
                    if(valuesArr.hasOwnProperty(pack.id)){
                        valuesArr[pack.id]+=pack.quantity;
                    }
                    else{
                        valuesArr[pack.id]=pack.quantity;
                        
                    }
                })
            });

           
            const barColors = [
                "#5e88b0", "#bf5e3b", "#5e965b", "#9e4343", "#6c5d7c",
                "#7b645c", "#a16791", "#6b6b6b", "#9b966a", "#5b8e9e",
                "#4a7a3a", "#b54c3e", "#7a8dbd", "#b06a9a", "#8b9a5e",
                "#6c9a8d", "#bda875", "#8a8a8a", "#7ec4b5", "#ada0a0"
              ];
            
            new Chart("salesChart", {
              type: "pie",
              data: {
                labels: Object.keys(valuesArr),
                datasets: [{
                  backgroundColor: barColors,
                  data: Object.values(valuesArr)
                }]
              },
              options: {
                title: {
                  display: true,
                  text: "Sale distribution as per quantity"
                }
              }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });


}

