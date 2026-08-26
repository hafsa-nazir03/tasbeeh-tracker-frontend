import { vi } from "vitest"; //vi Vitest ka mocking/spying tool hai.
beforeEach(() => { //Har test shuru hone se pehle ye code chalega.beforeEach() har test se pehle environment reset/setup karta hai.
    document.body.innerHTML = `<div id="Loading"></div> 
    <div id="tasbeehList"></div> <form id="tasbeeh-form">
            <input id="name">
            <input id="target">
            <select id="drop-down">
                <option value="">Select Category</option>
                <option value="Daily">Daily</option>
            </select>
<button type="submit" class="button01">Add Tasbeeh</button>
        </form>
        <button id="logout-btn">Logout</button>`;//testing ke waqt hum actual index.html browser mein open nahi kar rahe.To hum fake DOM bana rahe hain.
        global.API_URL = "http://localhost:3000";
        global.fetch = vi.fn(() =>// hamari actual js main sab say pehlay loadTasbeehs() chlata hai jis main fetch() hai ham nhi chahty hen ky yai ho so we make a fake fetch.
        Promise.resolve({
            json: () => Promise.resolve([])//nakal banaai hai GET /tasbeehs ki. test mein humein actual data ki zaroorat nahi.
        })
        );
        vi.resetModules();//Vitest ke internal module cache ko clear kar deta hai. Isse agli baar jab await import("../script.js") call hoga, module naye sirey se execute hoga
});

afterEach(() => {
    vi.restoreAllMocks();//Har test khatam hone ke baad jo spies/mocks banaye thay unko clean kar do.
});

test("form should show alert when tasbeeh name is empty" , async function(){
    const alertMock = vi.spyOn(window,"alert").mockImplementation(() => {});//vi.spyOn() means Alert ko observe karo. aur .mockImplemetation() ka matlb hai Alert ko actually popup mat banane do. Bas record karo ke call hua ya nahi.
   await import("../script.js");//Script load hone ka wait karo.
    fetch.mockClear(); // pehle wali (loadTasbeehs) call ko "clear" kar deta hai
    document.getElementById("target").value = "100";
    document.getElementById("drop-down").value = "Daily";
    document.getElementById("tasbeeh-form").dispatchEvent(new Event("submit"));//"Form submit kar diya gaya.", testing main dispatchEvent use hotahai
    //Kya alert exactly expected message ke saath call hua?
    expect(alertMock).toHaveBeenCalledWith("Please enter Tasbeeh name.");//is say pehly actual script.js execute hoti hai aur jahan name empty hai wo wala code execute hota hai. 
    expect(fetch).not.toHaveBeenCalled(); //yai check kr rha hai ky Validation fail hone ke baad backend ko request nahi gayi.
});

//empty target test here:

test("form should show alert when tasbeeh target is empty", async function(){
    const alertMock = vi.spyOn(window,"alert").mockImplementation(() => {});
    await import("../script.js");
    fetch.mockClear();
    document.getElementById("name").value = "SubhanAllah";
    document.getElementById("drop-down").value = "Daily";
    document.getElementById("tasbeeh-form").dispatchEvent(new Event("submit"));
    expect(alertMock).toHaveBeenCalledWith("Please enter Tasbeeh target.");
    expect(fetch).not.toHaveBeenCalled(); 

});

//empty category test here:
test("form should show alert when tasbeeh category is not selected", async function(){
    const alertMock = vi.spyOn(window,"alert").mockImplementation(() => {});
    await import("../script.js");
    fetch.mockClear();
    document.getElementById("name").value = "SubhanAllah";
    document.getElementById("target").value = "100";
    document.getElementById("tasbeeh-form").dispatchEvent(new Event("submit"));
    expect(alertMock).toHaveBeenCalledWith("Please select a category.");
    expect(fetch).not.toHaveBeenCalled(); 

});

//Invalid target test here:
test("form should reject target less than or equal to zero", async function(){
    const alertMock = vi.spyOn(window,"alert").mockImplementation(() => {});
    await import("../script.js");
    fetch.mockClear();
    document.getElementById("name").value = "SubhanAllah";
    document.getElementById("target").value = "-90";
    document.getElementById("drop-down").value = "Daily";
    document.getElementById("tasbeeh-form").dispatchEvent(new Event("submit"));
    expect(alertMock).toHaveBeenCalledWith("Target must be greater than 0.");
    expect(fetch).not.toHaveBeenCalled(); 
});

//valid data test here:
test("form should submit successfully with valid data", async function(){
    await import("../script.js");
    fetch.mockClear();
    document.getElementById("name").value = "SubhanAllah";
    document.getElementById("target").value = "100";
    document.getElementById("drop-down").value = "Daily";
    document.getElementById("tasbeeh-form").dispatchEvent(new Event("submit"));
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/tasbeeh",expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
                "Content-Type": "application/json"
            })
    })
);

});