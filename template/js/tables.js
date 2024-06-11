(function () {
  // Function to format Firestore timestamp

  // Function to retrieve data from the server and populate the table
  async function fetchDataAndPopulateTable() {
    try {
      // Check if data is already available in local storage
      const localData = localStorage.getItem("usersdata");
      let users;
      if (localData) {
        users = JSON.parse(localData).users;
      } else {
        // Fetch data from the server
        const url = "https://atman.onrender.com/admin/users";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if data retrieval was successful
        if (response.ok) {
          const responseData = await response.json();
          localStorage.setItem("usersdata", JSON.stringify(responseData));
          users = responseData.users;
        } else {
          console.error("Failed to fetch data:", response.statusText);
          return;
        }
      }

      // Get reference to the table body
      const tableBody = document.getElementById("users-data");
      const tableBodyu = document.getElementById("users-data-u");

      // Clear existing table rows
      tableBody.innerHTML = "";
      tableBodyu.innerHTML = "";

      // Iterate over the users data and populate the table
      users.forEach((user) => {
        // Create table row for the first table
        const row = document.createElement("tr");

        const profileCell = document.createElement("td");
        profileCell.textContent = user?.nickname;
        row.appendChild(profileCell);

        const mobileCell = document.createElement("td");
        mobileCell.textContent = `${user?.college || ""} ${user?.dept || ""}`;
        row.appendChild(mobileCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user?.email;
        row.appendChild(emailCell);

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("label");
        statusBadge.classList.add(
          "badge",
          user?.token ? "badge-success" : "badge-danger"
        );
        statusBadge.textContent = user?.token ? "Active" : "Inactive";
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        const lastLoginCell = document.createElement("td");
        lastLoginCell.textContent = formatFirestoreTimestamp(user);
        row.appendChild(lastLoginCell);

        tableBody.appendChild(row);

        // Create table row for the second table
        const rowu = document.createElement("tr");

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = user?.nickname;
        rowu.appendChild(firstNameCell);

        const nicknameCell = document.createElement("td");
        nicknameCell.textContent = user?.name;
        rowu.appendChild(nicknameCell);

        const yearCell = document.createElement("td");
        yearCell.textContent = user?.year;
        rowu.appendChild(yearCell);

        const collegeCell = document.createElement("td");
        collegeCell.textContent = `${user?.college || ""} ${user?.dept || ""}`;
        rowu.appendChild(collegeCell);

        const genderCell = document.createElement("td");
        genderCell.textContent = user?.gender;
        rowu.appendChild(genderCell);

        const ageCell = document.createElement("td");
        ageCell.textContent = user?.age;
        rowu.appendChild(ageCell);

        const occupationCell = document.createElement("td");
        occupationCell.textContent = user?.occupation;
        rowu.appendChild(occupationCell);

        const relationshipCell = document.createElement("td");
        relationshipCell.textContent = user?.relationshipstatus;
        rowu.appendChild(relationshipCell);

        const languagesCell = document.createElement("td");
        languagesCell.textContent = user?.language;
        rowu.appendChild(languagesCell);

        tableBodyu.appendChild(rowu);
      });

      // Initialize DataTables
      new DataTable("#users-table");
      new DataTable("#users-table-u");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the function to fetch data and populate the table
  fetchDataAndPopulateTable();
})();

var colleges;
//  pyscholigist table
(function () {
  // Function to retrieve data from the server and populate the table
  async function fetchDataAndPopulateTable() {
    let users;
    // Check if data is available in localStorage
    const storedData = localStorage.getItem("doctorData");
    if (storedData) {
      users = JSON.parse(storedData);
      populateTable(users);
    } else {
      try {
        // Fetch data from the server
        const url = "https://atman.onrender.com/admin/doctors";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          users = responseData.users;

          // Store fetched data into localStorage
          localStorage.setItem("doctorData", JSON.stringify(users));

          // Populate the table with fetched data
          populateTable(users);

          // Initialize DataTable
          new DataTable("#psy-table-u");
          new DataTable("#psy-table");
        } else {
          console.error("Failed to fetch data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  function populateTable(users) {
    // Get reference to the table body
    const tableBody = document.getElementById(`doctor-data`);
    const tableBodyd = document.getElementById(`doctor-data-d`);

    // Clear existing table rows

    // Iterate over the posts data and populate the table
    users.forEach((user) => {
      // Create table row
      const row = document.createElement("tr");
      const rowd = document.createElement("tr");

      // Create table data cells and populate them with post data
      const profileCell = document.createElement("td");
      profileCell.textContent = user?.name; // Assuming 'title' is the profile information
      row.appendChild(profileCell);

      const mobileCell = document.createElement("td");
      mobileCell.textContent = user?.phonenumber; // Assuming 'mobile' is the mobile number information
      row.appendChild(mobileCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = user?.email; // Assuming 'email' is the email information
      row.appendChild(emailCell);

      const statusCell = document.createElement("td");
      const statusBadge = document.createElement("label");
      statusBadge.classList.add(
        "badge",
        user?.token ? "badge-success" : "badge-danger"
      );
      statusBadge.textContent = user?.token ? "Active" : "Inactive"; // Assuming 'approved' indicates status
      statusCell.appendChild(statusBadge);
      row.appendChild(statusCell);
      const collegeCell = document.createElement("td");

      if (user?.college) {
        collegeCell.textContent = user.college;
      } else {
        // If user doesn't have a college, create a select element with college options
        const collegeSelect = document.createElement("select");
        collegeSelect.classList.add("form-control"); // Optional: Add Bootstrap form-control class for styling

        // Populate select element with colleges
        populateCollegeSelect(collegeSelect);
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.classList.add("btn", "btn-success", "d-none");

        var selectedcollege;
        collegeSelect.addEventListener("change", function () {
          user.college = this.value;
          selectedcollege = this.value;
          updateBtn.classList.remove("d-none"); // Show the update button
        });

        updateBtn.addEventListener("click", function () {
          assignCollege(user.uid, selectedcollege);
          updateBtn.classList.add("d-none"); // Hide the update button after updating the user's college
        });
        collegeCell.appendChild(collegeSelect);
        collegeCell.appendChild(updateBtn);
      }

      row.appendChild(collegeCell);
      // Append the row to the table body
      tableBody.appendChild(row);

      const fristname = document.createElement("td");
      fristname.textContent = user?.name; // Assuming 'title' is the profile information
      rowd.appendChild(fristname);
      const emailCelld = document.createElement("td");
      emailCelld.textContent = user?.email; // Assuming 'email' is the email information
      rowd.appendChild(emailCelld);
      const phoned = document.createElement("td");
      phoned.textContent = user?.phonenumber; // Assuming 'email' is the email information
      rowd.appendChild(phoned);
      const bio = document.createElement("td");
      bio.textContent = user?.gender; // Assuming 'email' is the email information
      rowd.appendChild(bio);
      const aoe = document.createElement("td");
      aoe.textContent = user?.area_of_expertise; // Assuming 'email' is the email information
      rowd.appendChild(aoe);
      const college = document.createElement("td");
      college.textContent = user?.college; // Assuming 'email' is the email information
      rowd.appendChild(college);
      const register = document.createElement("td");
      register.textContent = "click to show"; // Assuming 'email' is the email information
      register.addEventListener("click", () => showPsyRegister(user.uid));
      rowd.appendChild(register);

      tableBodyd.appendChild(rowd);
    });

    new DataTable("#psy-table-u");
    new DataTable("#psy-table");
  }

  // Call the function to fetch data and populate the table
  fetchDataAndPopulateTable();
})();
function populateCollegeSelect(collegeSelect) {
  colleges?.list?.forEach((college) => {
    const option = document.createElement("option");
    option.value = college.collegecode;
    option.textContent = college.collegecode;
    collegeSelect.appendChild(option);
  });
}

var page = 1;
async function fetchDataAndPopulateTable(page = 1) {
  try {
    // Fetch data from the server
    const url = `https://atman.onrender.com/get-newsfeed?page=${page}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if data retrieval was successful
    if (response.ok) {
      const responseData = await response.json();
      const posts = responseData.posts;

      // Get reference to the table body
      const tableBody = document.getElementById(`posts-data`);

      tableBody.innerHTML = "";

      // Iterate over the posts data and populate the table
      posts.forEach((post) => {
        // Create table row
        const row = document.createElement("tr");

        // Create table data cells and populate them with post data
        const profileCell = document.createElement("td");
        profileCell.textContent = post?.title; // Assuming 'title' is the profile information
        row.appendChild(profileCell);

        const mobileCell = document.createElement("td");
        mobileCell.style.textWrap = "wrap";
        mobileCell.textContent = post?.description; // Assuming 'mobile' is the mobile number information
        row.appendChild(mobileCell);

        const emailCell = document.createElement("img");
        emailCell.src = post.imageUrl;
        emailCell.style.height = "90px";
        emailCell.style.width = "90px";
        emailCell.style.padding = "3px";
        emailCell.style.objectFit = "contain";
        emailCell.textContent = "photo"; // Assuming 'email' is the email information
        row.appendChild(emailCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = `${post.userDetails.email} `;
        row.appendChild(statusCell);

        const deleteCell = document.createElement("td");

        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          deletePost(post.postId);
        });
        deleteCell.appendChild(removeButton);
        row.appendChild(deleteCell);

        // Append the row to the table body
        tableBody.appendChild(row);
        // new DataTable("#posts-list");
      });
    } else {
      console.log("Failed to fetch data:", response.error);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to fetch data and populate the table
fetchDataAndPopulateTable();

document.getElementById("nextlist").addEventListener("click", () => {
  page = page + 1;
  fetchDataAndPopulateTable(page);
});

document.getElementById("prevlist").addEventListener("click", () => {
  if (page > 0) {
    page = page - 1;
    fetchDataAndPopulateTable(page);
  }
});

function formatFirestoreTimestamp(firestoreTimestamp) {
  if (!firestoreTimestamp.lastLogin) {
    return "not loggedin";
  }
  const { _seconds, _nanoseconds } = firestoreTimestamp?.lastLogin;

  // Create a JavaScript Date object from the seconds and nanoseconds
  const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
  const dateObject = new Date(milliseconds);

  // Get the current time
  const currentTime = new Date();

  // Calculate the difference in milliseconds between the current time and the Firestore timestamp
  const difference = currentTime - dateObject;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  // Calculate the time difference in minutes, hours, and days
  const minutesAgo = Math.floor(difference / minute);
  const hoursAgo = Math.floor(difference / hour);
  const daysAgo = Math.floor(difference / day);

  // Determine the appropriate time ago message
  let timeAgoMessage;
  if (daysAgo > 0) {
    timeAgoMessage = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo > 0) {
    timeAgoMessage = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (minutesAgo > 0) {
    timeAgoMessage = `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else {
    timeAgoMessage = "no";
  }

  return timeAgoMessage;
}

async function deletePost(id) {
  const response = await fetch("https://atman.onrender.com/deletePost", {
    method: "POST",
    body: JSON.stringify({ postId: id }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);

  if ((response.status = 200)) {
    alert(response.body.message);
  }
}

async function fetchAndStoreColleges() {
  try {
    const response = await fetch("https://atman.onrender.com/listcolleges");
    if (!response.ok) {
      throw new Error("Failed to fetch colleges");
    }
    const colleges = await response.json();

    sessionStorage.setItem("colleges", JSON.stringify(colleges));

    return colleges;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    throw error; // Propagate the error for handling
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    colleges = JSON.parse(sessionStorage.getItem("colleges"));

    if (!colleges) {
      // If colleges data is not available in session storage, fetch and store it
      colleges = await fetchAndStoreColleges();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function assignCollege(uid, college) {
  try {
    const response = await fetch(
      "https://atman.onrender.com/admin/assigncollegetodoctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          college: college,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to assign college to doctor");
    }

    const data = await response.json();
    console.log(data); // Logging the response data

    // You can handle the response data as needed
  } catch (error) {
    console.error("Error assigning college to doctor:", error);
    // You can handle the error as needed, e.g., show an error message to the user
  }
}

async function showPsyRegister(uid) {
  try {
    // Fetch data from the server
    const response = await fetch("http://localhost:3002/get-records-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });

    const result = await response.json();

    if (response.ok) {
      // Create and show the modal with the fetched data
      createAndShowModal(result.tasks);
    } else {
      console.error("Failed to fetch records:", result.message);
    }
  } catch (error) {
    console.error("Error fetching records:", error);
  }
}

function createAndShowModal(tasks) {
  // Group the tasks by date
  const groupedTasks = groupTasksByDate(tasks);

  // Create the modal HTML structure using Bootstrap classes
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "recordsModal";
  modal.tabIndex = "-1";
  modal.setAttribute("aria-labelledby", "recordsModalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h5");
  modalTitle.className = "modal-title";
  modalTitle.id = "recordsModalLabel";
  modalTitle.innerText = "Psychologist Records";

  modalHeader.appendChild(modalTitle);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  // Create the select dropdown
  const dateSelect = document.createElement("select");
  dateSelect.className = "form-select mb-3";
  dateSelect.setAttribute("aria-label", "Select Date");

  const defaultOption = document.createElement("option");
  defaultOption.selected = true;
  defaultOption.disabled = true;
  defaultOption.innerText = "Select a date";
  dateSelect.appendChild(defaultOption);

  for (const date in groupedTasks) {
    const option = document.createElement("option");
    option.value = date;
    option.innerText = date;
    dateSelect.appendChild(option);
  }

  modalBody.appendChild(dateSelect);

  const tasksContainer = document.createElement("div");
  tasksContainer.id = "tasksContainer";

  modalBody.appendChild(tasksContainer);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const closeFooterButton = document.createElement("button");
  closeFooterButton.type = "button";
  closeFooterButton.className = "btn btn-secondary";
  closeFooterButton.setAttribute("data-bs-dismiss", "modal");
  closeFooterButton.innerText = "Close";

  modalFooter.appendChild(closeFooterButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  // Show the modal using Bootstrap's modal function
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();

  // Add event listener to update tasks when a date is selected
  dateSelect.addEventListener("change", () => {
    const selectedDate = dateSelect.value;
    displayTasksForDate(groupedTasks[selectedDate], tasksContainer);
  });
}

function displayTasksForDate(tasks, container) {
  container.innerHTML = ""; // Clear previous tasks
  container.style.overflowX = "scroll";
  container.style.height = "50vh";
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task border rounded p-2 mb-2";

    const time = document.createElement("p");
    time.innerHTML = `<strong>Time:</strong> From ${task.time.from} to ${task.time.to}`;
    taskDiv.appendChild(time);

    const plan = document.createElement("p");
    plan.innerHTML = `<strong>Plan:</strong> ${task.plan}`;
    taskDiv.appendChild(plan);

    container.appendChild(taskDiv);
  });
}

function groupTasksByDate(tasks) {
  const groupedTasks = {};

  tasks.forEach((task) => {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }
    groupedTasks[task.date].push(task);
  });

  return groupedTasks;
}
