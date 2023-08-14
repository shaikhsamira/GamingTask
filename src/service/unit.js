var code_sort_order = 'asc';
var health_sort_order = 'asc';
var attack_sort_order = 'asc';
function toolTip() {
    const unit_name = document.getElementsByClassName("name-wrap-details");
    unit_name.classList.add('-active');
}

function fetchUnit() {
    const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token
    const unitList = document.getElementById("unitList");

    // Make API request to get units
    fetch('url/units', {
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
        .then(units => {
            localStorage.setItem('units', JSON.stringify(units));
            localStorage.setItem('all_units', JSON.stringify(units));
            if (units.length !== 0) {
                display_table();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function data_sort(sort_key) {
    if (sort_key == 'code') {
        var new_units;
        if (code_sort_order == 'asc') {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.code > b.code) ? 1 : -1);
            code_sort_order = 'desc';

        }
        else {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.code < b.code) ? 1 : -1);
            code_sort_order = 'asc';

        }
        var units = localStorage.setItem('units', JSON.stringify(new_units));
        display_table();
    }
    else if (sort_key == 'health') {
        var new_units;
        if (health_sort_order == 'asc') {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.health > b.health) ? 1 : -1);
            health_sort_order = 'desc';

        }
        else {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.health < b.health) ? 1 : -1);
            health_sort_order = 'asc';

        }
        var units = localStorage.setItem('units', JSON.stringify(new_units));
        display_table();
    }
    else {
        var new_units;
        if (attack_sort_order == 'asc') {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.attack > b.attack) ? 1 : -1);
            attack_sort_order = 'desc';

        }
        else {
            new_units = JSON.parse(localStorage.getItem('units')).sort((a, b) => (a.attack < b.attack) ? 1 : -1);
            attack_sort_order = 'asc';

        }
        var units = localStorage.setItem('units', JSON.stringify(new_units));
        display_table();
    }



}

function showPopUp() {
    const showPopupBtn = document.getElementById("showPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popup = document.getElementById("popup");

    showPopupBtn.addEventListener("click", () => {
        popup.style.display = "block";
    });

    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

function apply_filter() {
    const type = document.getElementById("type").value;
    const speed = document.getElementById("speed").value;
    const popup = document.getElementById("popup");

    var filtered_data = [];
    const data = JSON.parse(localStorage.getItem('all_units'));
    if (type == "none" && speed == "none") {
        localStorage.setItem('units', JSON.stringify(filtered_data));
        popup.style.display = "none";
        return;
    }
    else {
        if (type !== "none" && speed !== "none") {
            data.forEach((item) => {
                if (item.type == type && item.movementSpeedType == speed) {
                    filtered_data.push(item);
                }
            })
        }
        else if (type == "none") {
            data.forEach((item) => {
                if (item.movementSpeedType == speed) {
                    filtered_data.push(item);
                }
            })
        }
        else {
            data.forEach((item) => {
                if (item.type == type) {
                    filtered_data.push(item);
                }
            })
        }
        localStorage.setItem('units', JSON.stringify(filtered_data));
        popup.style.display = "none";
        display_table();
    }
}

async function display_table() {
    const unitList = document.getElementById("unitList");
    var child = unitList.lastElementChild;
    while (child) {
        unitList.removeChild(child);
        child = unitList.lastElementChild;
    }
    JSON.parse(localStorage.getItem('units')).forEach(unit => {
        var id = unit.id;
        const row = document.createElement("tr");
        row.innerHTML = `
       <td> <img class="profile" src="${unit.imageUrl}"/></td>
        <td>${unit.code}</td>
        <td><div class="name-wrap" onclick="toolTip()">${unit.name}</div>
        
        </td>
        <div class="name-wrap-details">${unit.description}</div>
        <td>${unit.quality}</td>
        <td>${unit.type}</td>
        <td class="tooltip-cell">
            ${unit.ability.name}
        <div class="tooltip-text"> ${unit.ability.name}: ${unit.ability.description}</div>
      </td>
        <td>${unit.health}</td>
        <td class="tooltip-cell">
        ${unit.attack}
    <div class="tooltip-text"> <span>Attack:${unit.attack} </span>
    <span>Attack Type:${unit.attackType} </span>
     <span>Attack Range Type:${unit.attackRangeType} </span>
      <span>Attack Target Type:${unit.attackTargetType} </span>
       <span>Max Target Type:${unit.maxTargetCount} </span>
     </div>
  </td>

        <td> ${unit.movementType} <br> Speed: ${unit.movementSpeedType}</td>
        <td>${unit.spawnCost}</td>
        <td>${unit.spawnCooldownInSeconds} sec</td>
        <td  onclick="edit_unit('${id}')"><i class="edit-icons bi bi-pencil-square"></i></td>
    `;
        unitList.appendChild(row);
    });

}
function edit_unit(id) {
    localStorage.setItem('edit_id', JSON.stringify(id));
    window.location.href = "../views/edit-unit.html";
}

function showChart() {
    window.location.href = "../views/chart.html";
}
window.onload = function () {
    fetchUnit();
};
