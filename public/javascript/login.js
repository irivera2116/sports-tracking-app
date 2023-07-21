const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#user-log").value.trim();
  const password = document.querySelector("#password-log").value.trim();

  if (email && password) {
    // might be the wrong path to get the login information
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, passsword }),
    });

    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Incorrect login!");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
