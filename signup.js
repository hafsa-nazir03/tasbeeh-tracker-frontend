

const signupForm = document.querySelector(".signUp-form");
signupForm.addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const signupInp = {
        name : name,
        email,
        password : password
    };

    fetch(`${API_URL}/signup`, {//phir ham ny fetch kia backend say
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(signupInp)
})

.then(function(response) {
    return response.json();
})
    .then(function(data){
        console.log(data);

        if(data.message === "Signup Successful"){//yai ._id jo hai yai basically mongodb main jo enteries hen unki id hai
        alert("signup successful");
        window.location.href = "./login.html";

        }else{
            alert(data.message);
        }
    
    })

    .catch(function(error){//if server gives error
    console.log(error);
});
});