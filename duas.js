const token = localStorage.getItem("token");//Isse koi banda direct URL se: dashboard ko open nhi kr sky ga
if(!token){
    window.location.href = "login.html";
}

function displayDua(item){
const duaList = document.getElementById("duaList");//gets the html element by id
duaList.innerHTML += `<div class="dua-card"> <h3>🌙 ${item.title}</h3><p><strong>📜 Arabic Text : </strong>${item.arabicText} <p><strong>📁Category : </strong>${item.category}</p> <button class="update-btn" onclick="updateDuas('${item._id}')">Update</button>
<button type="button" class="delete-btn" onclick="deleteDuas('${item._id}')">Delete</button></div>`;
}

function loadDuas() {//this function will be used in update and delete to get the data

    fetch(`${API_URL}/duas`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    .then(function(response){
        return response.json();
    })

    .then(function(data){//backend say frontend main bhej rhy hen ham data(array) ko

        
        
            document.getElementById("Loading").style.display = "none";//loading ko gaib kro
           
            const duaList = document.getElementById("duaList");
            duaList.innerHTML = "";

            if(data.length == 0){//backend data aaya hai, aur ham dekh rhy ky agar wo empty hai to yai message send kro
                duaList.innerHTML = `
                    <p>📿 No Duas Found. Add your first Dua and keep it close to your heart.</p>
                `;
                return;//taky foreach na chal paye.
            }

            data.forEach(function(item){//array ky andar har object par kaam kro
                displayDua(item);//function
            });


    })

    .catch(function(error){
      const message = document.getElementById("Loading");
      message.textContent = "Something went wrong! Plz try again";
    });

}
loadDuas();
const duaForm = document.getElementById("dua-form");

duaForm.addEventListener("submit",function(event){
event.preventDefault();
const title = document.getElementById("title").value.trim();//trim is used to eliminate extra spaces
const arabicText = document.getElementById("arabicText").value.trim();//same, but here the .value gives string
const category = document.getElementById("drop-down").value.trim();
if(title == ""){
    alert("Please enter dua title.");
    return;

}if(arabicText == ""){
    alert("Please enter arabic text(in english/arabic).");
    return;

}if(category == ""){
    alert("Please select a category.");
    return;
}

const newDua = {
    title : title,
    arabicText : arabicText,
    category : category
}
const addBtn = document.querySelector(".button01");
addBtn.disabled = true;
addBtn.textContent = "Adding...";

fetch(`${API_URL}/duas`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newDua)
})
.then(function(response) {
    return response.json();
})

.then(function(data) {
    const duaList = document.getElementById("duaList");
     duaList.innerHTML = ``;//agar khali nhi kro gy to existing jo not found wala message aarha hai, wo bhi sath display hoga woth card
     loadDuas();
document.getElementById("title").value = "";
document.getElementById("arabicText").value = "";//same, but here the .value gives string
document.getElementById("drop-down").value = "";
addBtn.disabled = false;
addBtn.textContent = "Add Dua";
})

.catch(function(error){
    console.log(error);
    alert("Something went wrong while adding Dua.");
    addBtn.disabled = false;
    addBtn.textContent = "Add Dua";
});
});

function updateDuas(id){
    const confirmUpdate = confirm("Are you sure you want to update this Dua?");

    if(!confirmUpdate){
        return;
    }
 const title = prompt("Enter Dua title");//these validation checks are needed when details are entered to update a tasbeeh.
const arabicText = prompt("Enter dua");
const category = prompt("Enter Category");
   if(title == "" || arabicText == "" || category == ""){
    alert("Please enter dua details.");
    return;

}
 const updatedDua = {
    title : title,
    arabicText : arabicText,
    category : category
 };
 //console.log(updatedTasbeeh);//abhi jo hamenter kren gy, wohi console main aaye ga, abhi backend update nhi hoga

 fetch(`${API_URL}/duas/${id}`, {//ab ham usay backend main update kr rhy hen
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updatedDua)
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
    const duaList = document.getElementById("duaList");
    duaList.innerHTML = ``;
    loadDuas();
})
.catch(function(error){
    console.error(error);
    alert("Failed to update tasbeeh");
});
}


function deleteDuas(id){
    const confirmDelete = confirm("Are you sure you want to delete this Dua?");

    if(!confirmDelete){
        return;
    }

    fetch(`${API_URL}/duas/${id}` , {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(function(response) {
    return response.json();
})
   .then(function(data){
    const duaList = document.getElementById("duaList");
    duaList.innerHTML = ``;
    loadDuas();
   })

   .catch(function(error){
    console.error(error);
    alert("Failed to delete this dua");
   });
}

