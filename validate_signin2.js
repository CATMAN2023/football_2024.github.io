const emailInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const loginButton = document.getElementById("loginButton");

loginButton.disabled = true;

function validateEmail(inputEmail) {
    const errores = [];
    const email = inputEmail.value.trim(); 
  
    if (email === "") {
      errores.push("El correo electrónico es requerido");
    }
  
    let atCount = 0;
    for (let i = 0; i < email.length; i++) {
      const caracter = email[i];
  
      if (caracter === "@") {
        atCount++;
      }
  
      if (!/^[a-zA-Z0-9@._]+$/.test(caracter)) {
        errores.push(`El caracter "${caracter}" no es valido`);
      }
  
      if (atCount > 1) {
        errores.push("No se permiten más de un @");
       
      }
      
      if (caracter === "." && email[i - 1] === ".") {
        errores.push("No se permiten puntos consecutivos");
      }
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      errores.push("El formato de email no es valido");
    }
  
    if (errores.length > 0) {
      const errorMessage = errores.join("<br>");
      mostrarError(inputEmail, errorMessage, document.getElementById("emailError"));
      return false;
    }
  
    return true;
  }
  
  function mostrarError(inputElement, errorMessage, errorElement) {
    console.log(`Showing error: ${errorMessage}`);
    if (errorElement) {
      errorElement.innerHTML = errorMessage;
      inputElement.classList.add("error");
      setTimeout(() => {
        inputElement.classList.remove("error");
        errorElement.innerHTML = "";
      }, 3000); // Ocultar el mensaje de error después de 3 segundos
    }
  }
  
  function checkFormValidity() {
    if (validateEmail(emailInput) && validatePassword(passwordInput.value)) 
      if (emailValid && passwordValid) {loginButton.disabled = false;}
    else 
      loginButton.disabled = true;
    
  }
  let emailValid = false;
  let passwordValid = false;
  emailInput.addEventListener("input", () => {
    if (validateEmail(emailInput)) {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
      mostrarError(emailInput, "", document.getElementById("emailError"));
      emailValid = true;
    } else {
      emailInput.classList.remove("valid");
      emailInput.classList.add("invalid");
      mostrarError(emailInput, "Error en el correo electrónico", document.getElementById("emailError"));
      emailValid = false;
    }
    checkFormValidity();
    loginButton.disabled = true;
  });
  
  //function validatePassword(passwordInput) {
   // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
   // console.log(`Password validation result: ${passwordRegex.test(passwordInput.value)}`);
   // return passwordRegex.test(passwordInput.value);
 // }
//

function validatePassword(passwordInput) {
    const passwordValue = passwordInput.value;
    let isValid = true;
    let errorMessage = "";
  
    if (passwordValue?.length < 8) {
        isValid = false;
        errorMessage += "minimo 8 caracteres.<br>";
      }
  
    if (!/[A-Z]/.test(passwordValue)) {
      isValid = false;
      errorMessage += "minimo una letra mayúscula.<br>";
    }
  
    if (!/[a-z]/.test(passwordValue)) {
      isValid = false;
      errorMessage += "minimo una letra minúscula.<br>";
    }
  
    if (!/\d/.test(passwordValue)) {
      isValid = false;
      errorMessage += "minimo un número.<br>";
    }
  
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue)) {
      isValid = false;
      errorMessage += "minimo un carácter especial.<br>";
    }
  
    console.log(`Password validation result: ${isValid}`);
    return { isValid, errorMessage };
  }

  passwordInput.addEventListener("input", () => {
    const { isValid, errorMessage } = validatePassword(passwordInput);
    if (isValid) {
      passwordInput.classList.remove("invalid");
      passwordInput.classList.add("valid");
      mostrarError(passwordInput, "", document.getElementById("passwordError"));
      passwordValid = true;
    } else {
      passwordInput.classList.remove("valid");
      passwordInput.classList.add("invalid");
      mostrarError(passwordInput, errorMessage, document.getElementById("passwordError"));
      passwordValid = false;
    }
    checkFormValidity();
  });
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Redireccionar a la página web
  window.location.href = "LIGA.html";
});