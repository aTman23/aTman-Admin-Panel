(function(){
    // Function to retrieve data from the server and populate the table
    async function fetchDataAndPopulateTable() {
      try {
        // Fetch data from the server
        const url = 'https://atman.onrender.com/admin/users';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        // Check if data retrieval was successful
        if (response.ok) {
          const responseData = await response.json();
          const users = responseData.users;
  
          // Get reference to the table body
          const tableBody = document.getElementById(`users-data`);
          const tableBodyu = document.getElementById(`users-data-u`);



  
          // Clear existing table rows
         
  
          // Iterate over the posts data and populate the table
          users.forEach(user => {
            // Create table row
            const row = document.createElement('tr');
           
            
            // Create table data cells and populate them with post data
            const profileCell = document.createElement('td');
            profileCell.textContent = user?.name; // Assuming 'title' is the profile information
            row.appendChild(profileCell);
  
            const mobileCell = document.createElement('td');
            mobileCell.textContent = user?.mobile; // Assuming 'mobile' is the mobile number information
            row.appendChild(mobileCell);
  
            const emailCell = document.createElement('td');
            emailCell.textContent = user?.email; // Assuming 'email' is the email information
            row.appendChild(emailCell);
  
            const statusCell = document.createElement('td');
            const statusBadge = document.createElement('label');
            statusBadge.classList.add('badge', user?.approved ? 'badge-success' : 'badge-danger');
            statusBadge.textContent = 'Active' ;// Assuming 'approved' indicates status
            statusCell.appendChild(statusBadge);
            row.appendChild(statusCell);
  
            // Append the row to the table body
            tableBody.appendChild(row);
            const rowu = document.createElement('tr');
            const fristname = document.createElement('td');
            fristname.textContent = user?.name; // Assuming 'title' is the profile information
            rowu.appendChild(fristname);
  
            const gender = document.createElement('td');
            gender.textContent = user?.gender; // Assuming 'mobile' is the mobile number information
            rowu.appendChild(gender);
  
            const age = document.createElement('td');
            age.textContent = user?.age; // Assuming 'email' is the email information
            rowu.appendChild(age);
            const ocupation = document.createElement('td');
            ocupation.textContent = user?.occupation; // Assuming 'title' is the profile information
            rowu.appendChild(ocupation);
  
            const relationship = document.createElement('td');
            relationship.textContent = user?.relationshipstatus; // Assuming 'mobile' is the mobile number information
            rowu.appendChild(relationship);
  
            const languages = document.createElement('td');
            languages.textContent = user?.language; // Assuming 'email' is the email information
            rowu.appendChild(languages);
  
            tableBodyu.appendChild(rowu);

          });
        } else {
          console.error('Failed to fetch data:', response.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Call the function to fetch data and populate the table
    fetchDataAndPopulateTable();
})();



//  pyscholigist table
(function(){
    // Function to retrieve data from the server and populate the table
    async function fetchDataAndPopulateTable() {
      try {
        // Fetch data from the server
        const url = 'https://atman.onrender.com/admin/doctors';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        // Check if data retrieval was successful
        if (response.ok) {
          const responseData = await response.json();
          const users = responseData.users;
  
          // Get reference to the table body
          const tableBody = document.getElementById(`doctor-data`);
          const tableBodyd = document.getElementById(`doctor-data-d`);



  
          // Clear existing table rows
         
  
          // Iterate over the posts data and populate the table
          users.forEach(user => {
            // Create table row
            const row = document.createElement('tr');
            const rowd = document.createElement('tr');

            
            // Create table data cells and populate them with post data
            const profileCell = document.createElement('td');
            profileCell.textContent = user?.name; // Assuming 'title' is the profile information
            row.appendChild(profileCell);
  
            const mobileCell = document.createElement('td');
            mobileCell.textContent = user?.mobile; // Assuming 'mobile' is the mobile number information
            row.appendChild(mobileCell);
  
            const emailCell = document.createElement('td');
            emailCell.textContent = user?.email; // Assuming 'email' is the email information
            row.appendChild(emailCell);
  
            const statusCell = document.createElement('td');
            const statusBadge = document.createElement('label');
            statusBadge.classList.add('badge', user?.approved ? 'badge-success' : 'badge-danger');
            statusBadge.textContent = 'Active' ;// Assuming 'approved' indicates status
            statusCell.appendChild(statusBadge);
            row.appendChild(statusCell);
  
            // Append the row to the table body
            tableBody.appendChild(row);

            const fristname = document.createElement('td');
            fristname.textContent = user?.name; // Assuming 'title' is the profile information
            rowd.appendChild(fristname);
            const emailCelld = document.createElement('td');
            emailCelld.textContent = user?.email; // Assuming 'email' is the email information
            rowd.appendChild(emailCelld);
            const phoned = document.createElement('td');
            phoned.textContent = user?.phonenumber; // Assuming 'email' is the email information
            rowd.appendChild(phoned);
            const bio = document.createElement('td');
            bio.textContent = user?.gender; // Assuming 'email' is the email information
            rowd.appendChild(bio);
            const aoe = document.createElement('td');
            aoe.textContent = user?.area_of_expertise; // Assuming 'email' is the email information
            rowd.appendChild(aoe);

            tableBodyd.appendChild(rowd);



          });
        } else {
          console.error('Failed to fetch data:', response.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Call the function to fetch data and populate the table
    fetchDataAndPopulateTable();
})();

