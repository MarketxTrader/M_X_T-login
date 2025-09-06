const formBox = document.getElementById("formBox");
const toSignup = document.getElementById("toSignup");
const toLogin = document.getElementById("toLogin");
const API_URL = "https://script.google.com/macros/s/AKfycbzPCY4KLpF97wF-DvpLOJK1GRWsuzMe3r1yRYoPEjTDZLiPZuQYG_dFkh8e4sS7DdyD/exec";

// ================== Switch Login/Signup ==================
toSignup.addEventListener("click", e => { 
  e.preventDefault(); 
  formBox.classList.remove("login-active"); 
  formBox.classList.add("signup-active"); 
});
toLogin.addEventListener("click", e => { 
  e.preventDefault(); 
  formBox.classList.remove("signup-active"); 
  formBox.classList.add("login-active"); 
});

// ================== Blur control ==================
function enableBlur() { formBox.classList.add("blurred"); }
function disableBlur() { formBox.classList.remove("blurred"); }

// ================== Loader control ==================
function showLoader() {
  enableBlur();
  document.getElementById("loader").style.display = "block";
}
function hideLoader() {
  disableBlur();
  document.getElementById("loader").style.display = "none";
}

// ================== Custom alert ==================
function customAlert(msg, callback){
  const modal = document.getElementById("customAlert");
  const msgBox = document.getElementById("alertMessage");
  const closeBtn = document.getElementById("alertClose");
  msgBox.innerText = msg;
  closeBtn.style.display = "block";
  modal.classList.remove("hidden");
  closeBtn.onclick = () => { 
    modal.classList.add("hidden"); 
    if(callback) callback(); 
  };
}

// ================== Show/Hide Password ==================
function togglePassword(inputId, icon){
  const input = document.getElementById(inputId);
  if(input.type==="password"){ 
    input.type="text"; 
    icon.src="https://img.icons8.com/3d-fluency/94/unlock--v2.png"; 
  } else { 
    input.type="password"; 
    icon.src="https://img.icons8.com/3d-fluency/94/lock--v2.png"; 
  }
}

// ================== Handle typing icon ==================
function handlePasswordTyping(inputId, iconId){
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  input.addEventListener("input",()=>{
    if(input.value.length>0 && input.type==="password") 
      icon.src="https://img.icons8.com/3d-fluency/94/unlock--v2.png";
    else if(input.value.length===0) 
      icon.src="https://img.icons8.com/3d-fluency/94/lock--v2.png";
  });
}
handlePasswordTyping("loginPassword","loginPasswordIcon");
handlePasswordTyping("signupPassword","signupPasswordIcon");

// ================== Validation ==================
function validateEmail(inputId,errorId){
  const input=document.getElementById(inputId);
  const error=document.getElementById(errorId);
  input.addEventListener("input",()=>{
    const value=input.value.trim();
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    error.innerText = value===""?"Email ត្រូវបំពេញ":(!emailRegex.test(value)?"Email មិនត្រឹមត្រូវ":"");
  });
}
function validatePassword(inputId,errorId){
  const input=document.getElementById(inputId);
  const error=document.getElementById(errorId);
  input.addEventListener("input",()=>{
    const value=input.value.trim();
    error.innerText = value===""?"Password ត្រូវបំពេញ":(value.length<6?"Password ត្រូវមានយ៉ាងតិច 6 អក្សរ":"");
  });
}
validateEmail("loginEmail","loginEmailError");
validatePassword("loginPassword","loginPasswordError");
validateEmail("signupEmail","signupEmailError");
validatePassword("signupPassword","signupPasswordError");

// // ================== LOGIN ==================
// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   showLoader();
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   document.getElementById("loginEmailError").innerText = "";
//   document.getElementById("loginPasswordError").innerText = "";

//   try {
//     const res = await fetch(API_URL, {
//       method: "POST",
//       body: JSON.stringify({ action: "login", username: email, password: password }),
//     });
//     const text = await res.text();

//     if (text.includes("success")) {
//       // Save session (only valid until browser closed)
//       sessionStorage.setItem("isLoggedIn", "true");
//       setTimeout(() => { 
//         hideLoader(); 
//         window.location.href = "home.html"; 
//       }, 1000);
//     } else {
//       hideLoader();
//       if (text.toLowerCase().includes("gmail")) document.getElementById("loginEmailError").innerText = "Gmail មិនត្រឹមត្រូវ";
//       else if (text.toLowerCase().includes("password")) document.getElementById("loginPasswordError").innerText = "Password មិនត្រឹមត្រូវ";
//       else customAlert("Login failed! " + text);
//     }
//   } catch (err) {
//     hideLoader();
//     console.error(err);
//     customAlert("Login error! Check console for details.");
//   }
// });

// // ================== SIGNUP ==================
// document.getElementById("signupForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   showLoader();
//   const name = document.getElementById("signupName").value.trim();
//   const email = document.getElementById("signupEmail").value.trim();
//   const password = document.getElementById("signupPassword").value.trim();
//   document.getElementById("signupEmailError").innerText = "";
//   document.getElementById("signupPasswordError").innerText = "";

//   try {
//     const res = await fetch(API_URL, {
//       method: "POST",
//       body: JSON.stringify({ action: "signup", username: email, password: password, name: name }),
//     });
//     const text = await res.text();

//     if (text.includes("success")) {
//       setTimeout(() => {
//         hideLoader();
//         customAlert("Signup success! Click OK to login.", () => {
//           e.target.reset();
//           formBox.classList.remove("signup-active");
//           formBox.classList.add("login-active");
//         });
//       }, 2000);
//     } else {
//       hideLoader();
//       if (text.toLowerCase().includes("gmail")) document.getElementById("signupEmailError").innerText = "Gmail មិនត្រឹមត្រូវ";
//       else if (text.toLowerCase().includes("password")) document.getElementById("signupPasswordError").innerText = "Password មិនត្រឹមត្រូវ";
//       else customAlert("Signup failed! " + text);
//     }
//   } catch (err) {
//     hideLoader();
//     console.error(err);
//     customAlert("Signup error! Check console for details.");
//   }
// });
// ================== LOGIN ==================
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    document.getElementById("loginEmailError").innerText = "";
    document.getElementById("loginPasswordError").innerText = "";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "login", username: email, password: password }),
      });
      const text = await res.text();

      if (text.includes("success")) {
        sessionStorage.setItem("loggedIn", "true"); // save session
        setTimeout(() => { 
        hideLoader(); 
        window.location.href = "home.html"; 
      }, 1000);
      } else {
        hideLoader();
        if (text.toLowerCase().includes("gmail")) document.getElementById("loginEmailError").innerText = "Gmail មិនត្រឹមត្រូវ";
        else if (text.toLowerCase().includes("password")) document.getElementById("loginPasswordError").innerText = "Password មិនត្រឹមត្រូវ";
        else customAlert("Login failed! " + text);
      }
    } catch (err) {
    hideLoader();
    console.error(err);
    customAlert("Login error! Check console for details.");
    }
  });

// ================== SIGNUP ==================
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    document.getElementById("signupEmailError").innerText = "";
    document.getElementById("signupPasswordError").innerText = "";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "signup", username: email, password: password, name: name }),
      });
      const text = await res.text();

    if (text.includes("success")) {
      setTimeout(() => {
        hideLoader();
        customAlert("Signup success! Click OK to login.", () => {
          e.target.reset();
          formBox.classList.remove("signup-active");
          formBox.classList.add("login-active");
        });
      }, 2000);
      } else {
        hideLoader();
        if (text.toLowerCase().includes("gmail")) document.getElementById("signupEmailError").innerText = "Gmail មិនត្រឹមត្រូវ";
        else if (text.toLowerCase().includes("password")) document.getElementById("signupPasswordError").innerText = "Password មិនត្រឹមត្រូវ";
        else customAlert("Signup failed! " + text);
      }
    } catch (err) {
      hideLoader();
      console.error(err);
      customAlert("Signup error! Check console for details.");
    }
  });

  // --- SESSION CHECK ---
  window.onload = function(){
    if(sessionStorage.getItem("loggedIn") === "true"){
      // Already logged in → go to home directly
      window.location.href = "home.html";
    }
  };

  // --- BLOCK BACK BUTTON ---
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
    window.location.href = "index.html";
  };