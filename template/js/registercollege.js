document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    console.log("called registration")
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};

    formData.forEach((value, key) => {
        requestData[key] = value.trim();
    });


    requestData["collegename"] = requestData["collegename"].toUpperCase();
    requestData["collegecode"] = requestData["collegecode"].toUpperCase();
    requestData["email"] = requestData["email"].toLowerCase();




    try {


        const response = await fetch('https://atman.onrender.com/createcollege', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })

       
            alert("done added login")
    } catch (e) {
        console.log(e.message)
    }

});