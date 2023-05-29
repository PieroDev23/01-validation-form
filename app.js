document.addEventListener("DOMContentLoaded", main);

function main() {
  //Objetos
  const DOMreferences = {
    inputFirstName: "#firstName",
    inputLastName: "#lastName",
    inputEmailDest: "#email",
    textArea: "#message",
    form: "#form",
    validationError: ".form__error",
    btnClear: "[type='reset']",
    btnSubmit: "input[type='submit']",
  };

  let formValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  //DOM referencias
  const firstName = document.querySelector(DOMreferences.inputFirstName);
  const lastName = document.querySelector(DOMreferences.inputLastName);
  const destEmail = document.querySelector(DOMreferences.inputEmailDest);
  const message = document.querySelector(DOMreferences.textArea);
  const form = document.querySelector(DOMreferences.form);
  const btnSubmit = document.querySelector(DOMreferences.btnSubmit);
  const btnClear = document.querySelector(DOMreferences.btnClear);

  //Eventos
  firstName.addEventListener("blur", validate);
  lastName.addEventListener("blur", validate);
  destEmail.addEventListener("blur", validate);
  message.addEventListener("blur", validate);
  btnClear.addEventListener("click", clear);
  form.addEventListener("submit", submit);

  //Desactivando boton enviarz
  validateMessage(formValues);

  //FUNCTIONS
  function submit(event) {
    event.preventDefault();

    if (Object.values(formValues).includes("")) {
      alert("Porfavor rellene el formulario");
      return;
    }

    console.log(formValues);
    clear();
  }

  function clear() {
    formValues = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };

    validateMessage(formValues);
  }

  function validate(event) {
    const emailRegExp = new RegExp(
      /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    );
    const emailIsValid = emailRegExp.test(event.target.value);

    if (!event.target.value) {
      createErrorMessage(`${event.target.name} is required`, event.target);
      formValues[event.target.id] = "";
      validateMessage(formValues);
      return;
    }

    if (event.target.id === "email" && !emailIsValid) {
      createErrorMessage("Email is not valid", event.target);
      formValues[event.target.id] = "";
      validateMessage(formValues);
      return;
    }

    clearErrorMessage(event.target);
    formValues[event.target.id] = event.target.value;
    validateMessage(formValues);
  }

  function createErrorMessage(msg = "", element = null) {
    //Limpiar el error
    clearErrorMessage(element);
    //Validar que el mensaje no este vacio
    if (!msg) throw new Error("Message not provided");
    if (!element) throw new Error("Message not provided");

    //crear etiqueta span de html
    const span = document.createElement("span");
    //insertar mensaje en el span
    span.innerText = msg;
    //colocar clase de css al span
    span.classList.add("form__error");
    //insertar span al html
    element.parentElement.appendChild(span);
  }

  function clearErrorMessage(element = null) {
    if (!element) throw new Error("Element not provided");

    const validationError = element.parentElement.querySelector(
      DOMreferences.validationError
    );

    if (validationError) validationError.remove();
  }

  function validateMessage(formValues = {}) {
    //validar que el objeto exista
    if (!formValues) throw new Error("Object not provided");
    //Extraer los valores del objeto
    const values = Object.values(formValues);

    console.log(formValues);

    if (values.includes("")) {
      //remover clase con estilos bonitos
      btnSubmit.classList.remove("form__btn");
      btnSubmit.classList.add("form__btn--disabled");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("form__btn--disabled");
      btnSubmit.classList.add("form__btn");
      btnSubmit.disabled = false;
    }
  }
}
