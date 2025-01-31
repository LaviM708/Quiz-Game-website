// stores users information
function storeUser(){
    var usrObject = {
        id: document.getElementById("GameID").value,
        username: document.getElementById("UserName").value,
        password: document.getElementById("Password").value,
        age: document.getElementById("Age").value,
        email: document.getElementById("Email").value,
        skillLevel: document.querySelector('input[name="skill"]:checked'),
        highestScore: 0,
    };

    // Initialize error message
    let errorMessage = '';

    // Validation check
    if (usrObject.id === '')  errorMessage += 'GameID is required.<br>';
    if (usrObject.username === '') errorMessage += 'UserName is required.<br>';
    if (usrObject.password === '' || usrObject.password.length < 6) errorMessage += 'Password must be at least 6 characters long.<br>';
    if (usrObject.age === '' || usrObject.age < 3 || usrObject.age > 99 ) errorMessage += 'write valid age.<br>';
    if (!validateEmail(usrObject.email)) errorMessage += 'Invalid email format.<br>';
    if (!usrObject.skillLevel)errorMessage += 'Please select a skill level.<br>';


    // Check if GameID already exists
    if (localStorage[usrObject.id])errorMessage += 'GameID is already registered. Please use a different one.<br>';


    // Check if email or username already exists
    for (let key in localStorage) {
        if (typeof localStorage[key] === 'string' && localStorage[key].startsWith('{')) {
            const existingUser = JSON.parse(localStorage[key]);
            if (existingUser.username === usrObject.username) {
                errorMessage += 'Username is already taken. Please choose a different one.<br>';
                break;
            }
            if (existingUser.email === usrObject.email) {
                errorMessage += 'Email is already registered. Please use a different one.<br>';
                break;
            }
        }
    }
    const errorMessages = document.querySelectorAll('#input-fields .error-message');
    errorMessages.forEach((errorMessage) => errorMessage.remove());
    // If there are any errors, display them
    if (errorMessage !== '') {  
        // Remove any existing error messages  
        const errorMessages = document.querySelectorAll('#input-fields .error-message');  
        errorMessages.forEach((errorMessage) => errorMessage.remove());  
        document.getElementById('input-fields').insertAdjacentHTML('beforeend', `<p class="error-message">${errorMessage}</p>`);

        return;
    } 
        // If no errors, log the data and display a success message
        console.log("GameID: " + usrObject.id + "; UserName: " + usrObject.username + "; Password: " + usrObject.password +";Age: " + usrObject.age + "; Email: " + usrObject.email + "; Skill Level: " + usrObject.skillLevel.value);
        document.getElementById("Result").innerHTML="Registration Successful. Go to Sign in Page.";
        localStorage[usrObject.id] = JSON.stringify(usrObject);
           
    
}


// Helper function to validate the email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


//User login Funtionc
function login(){
    let id = document.getElementById("GameID").value;
    let password = document.getElementById("Password").value;

    if (id === "" || password === ""){
        document.getElementById("loginFailure").innerHTML = "Please enter both GameID and Password." ;
        return;
    }
    if(localStorage[id] === undefined){
        document.getElementById("loginFailure").innerHTML = "GameID not recognized."
        return; //do nothing else
    }
    else {
        let usrObj = JSON.parse(localStorage[id]); //Convert to object
        if(password === usrObj.password){
            document.getElementById("input-fields").innerHTML = usrObj.id + "Logged In";
            document.getElementById("loginFailure").innerHTML = "";
            sessionStorage.loggedInUsrId = usrObj.id;
            window.location.href = "/HTML/quiz.html";
        } else {
            document.getElementById("loginFailure").innerHTML = "Password not correct. Please try again";
        }
    } 
}

// Check if a user is logged in before accessing the game
function checkLogin(event){
    if (sessionStorage.loggedInUsrId === undefined) {
        event.preventDefault(); 
        window.location.href = "/HTML/registration.html";
        alert("Please Sign In / Register to play the game.");
    } else {
        let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsrId]);
        document.getElementById("input-fields").innerHTML = usrObj.id + " logged in.";
    }
        
}

// Check if a user is logged in 
function checkLoginStatus() {
    const loggedInUserId = sessionStorage.getItem("loggedInUsrId");
} 

checkLoginStatus()







