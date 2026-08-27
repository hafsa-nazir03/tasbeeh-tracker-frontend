import { store } from "./store.js";


const loginForm = document.querySelector(".login-form");
const loginBtn = document.querySelector(".login-button");
loginForm.addEventListener("submit" ,function(event){
 event.preventDefault();//on submit, the page will not refresh(it prevents it)
 loginBtn.disabled = true;
 loginBtn.textContent = "logging in...";
 const email = document.getElementById("email").value;//form main added info li ham ny
 const password = document.getElementById("password").value;
 console.log("Login form submitted successfully");
 const frontendInput = {//us info ka object banaya
    email : email,
    password : password
 };

 fetch(`${API_URL}/login`, {//phir ham ny fetch kia backend say
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(frontendInput)
})
.then(function(response) {//response ko js main convert kia
    return response.json();
})

.then(function(data){//response ka data receive kiahai aur console par print kia hai
    console.log(data);
    if(data.token){//agar login successful hua hai to local storage main save hoga
        //yahan say ham global state ko use kren gy.
        store.token = data.token;
   localStorage.setItem("token",data.token);//ab ham save kr rhy hen token ko local storage main 

   const payload = JSON.parse(atob(data.token.split(".")[1]));
   if(payload.role === "admin"){
    window.location.href = "admin.html";

   }else{
    window.location.href = "home.html";
   }

  // window.location.href = "index.html";//page dobara refresh ho rha hai, aur js dobara load ho rha hai, isi liye loclstorage bhi use kr rhy hen

   //alert("Login Successful");
    }else{
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
        alert(data.message);//agar login successful nhi hua to us ko message mil jaye ga
    }
})

.catch(function(error){//if server gives error
    console.log(error);
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
});
  
});
