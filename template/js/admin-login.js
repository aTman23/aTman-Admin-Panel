document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    console.log(event)
    // Fetch form input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password);    
    const formData = {
        password,
        username
    }

   console.log(formData)
    fetch("http://localhost:3002/admin/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
      
        return response.json();
    })
    .then(data => {
       alert(data.error || data.message);
        if(data.message){
            sessionStorage.setItem('login', data.message);
            window.location.href = "../../../template"
        }


    })
    .catch(error => {
        // Handle error
        console.error("Error:", error.message);
        // Display error message to the user or handle it accordingly
    });
});