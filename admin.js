//token check
const token = localStorage.getItem("token");
if(!token){
    window.location.href = "login.html";
}

async function loadAdminDashboard() {
    try{
        const response = await fetch(`${API_URL}/admin/dashboard`,{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        });
        const data = await response.json();
        if(!response.ok){
            alert(data.message || "Access Denied");
            window.location.href = "login.html";
            return;
        }
        // Statistics
        document.getElementById("totalUsers").textContent = data.totalUsers;
        document.getElementById("totalTasbeehs").textContent = data.totalTasbeehs;
        document.getElementById("totalDuas").textContent = data.totalDuas;

        //RecentUsers:
        const recentUsersBody = document.getElementById("recentUsersBody");
        recentUsersBody.innerHTML = "";
        
        data.recentUsers.forEach(function(user){
        const row = document.createElement("tr");

        row.innerHTML = `<td>${user.name}</td>
        <td>${user.email}</td> <td>${user.role}</td>`
        recentUsersBody.appendChild(row);
        });

    }catch(error){
        console.log(error);
        alert("Failed to fetch admin's dashboard");
    }
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

loadAdminDashboard();