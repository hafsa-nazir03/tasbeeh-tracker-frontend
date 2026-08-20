const token = localStorage.getItem("token");
if(!token){
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);
    fetch(`${API_URL}/tasbeeh/${id}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    .then(function(response){
        return response.json();
    })

    .then(function(data){
     const name = data.name;
     const target = data.target;
     const nameLoc = document.getElementById("tasbeehName");
     nameLoc.innerHTML = `<h3>${name}</h3>`;
     const targetLoc = document.getElementById("target");
     targetLoc.innerHTML = `<p>Target : ${target}</p>`;

     const incButton = document.getElementById("inc-btn");
    const countText = document.getElementById("count");
     let count = 0;
    incButton.addEventListener("click",function(){
            if(count<target){
                count++;
                countText.innerHTML = `<h3>${count}/${target}</h3>`;
            }if(count == target){
                 countText.innerHTML = `<p>🌸May Allah accept your remembrance🤲</p>`;
            }

    });

    const resetText = document.getElementById("reset-btn");
    resetText.addEventListener("click",function(){
        count = 0;
        countText.innerHTML = count;
    })
    });

    