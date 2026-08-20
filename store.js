export const store = {
    user : null,
    token : localStorage.getItem("token") || null,
    loading : false
};

//export means ky yai file baki files use kren gi, aur yai aik object hai, aur yai aik global state hai