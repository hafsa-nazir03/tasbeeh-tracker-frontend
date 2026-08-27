const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll",function(){ //Jab bhi user page scroll kare, ye function chalao.
    if(window.scrollY>100){//ye batata hai user ne page ko kitne pixels neeche scroll kiya hai
        scrollTopBtn.style.display = "block";
    }else{
         scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click",function(){ //Jab button pe click ho, ye function chalta hai
    window.scrollTo({//page ko position 0 (yani sabse upar) pe le jane ko kehta hai
        top : 0,
        behavior : "smooth"//is wajah se scroll turant jump nahi karta, balke animated/smoothly upar chalta hai
    });
});