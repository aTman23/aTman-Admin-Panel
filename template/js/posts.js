async function retrievePostStatus() {
    console.log('Retrieving post status');
    try {
        const url = 'https://atman.onrender.com/admin/postsStatus';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to retrieve post status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        updateTable(data.pendingPosts);
        initializeDataTable(); // Initialize DataTable after updating the table content
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function updateTable(posts) {
    const tbody = document.getElementById('postTableBody');
    tbody.innerHTML = ''; // Clear existing content in tbody

    posts.forEach(post => {
        const row = document.createElement('tr');
        const milliseconds = post.date._seconds * 1000 + post.date._nanoseconds / 1e6;
        const date = new Date(milliseconds);
        const thumbnailImage = createThumbnailImage(post.imageUrl, post.description);
        console.log(" uids ",post);

        row.innerHTML = `
            <td>${date}</td>
            <td>${post.description}${thumbnailImage.outerHTML}</td>
            <td>
                <div class="declare">
                <input type="button" value="APPROVE" onclick="approvePost('${post.docId}')" class="anonymous-post-head" id="approve">
                <input type="button" value="DELETE" onclick="deletePost('${post.docId}')" class="anonymous-post-head" id="delete">
                
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function createThumbnailImage(src, alt) {
    const thumbnailImage = document.createElement('img');
    thumbnailImage.src = src;
    thumbnailImage.alt = alt;
    thumbnailImage.className = 'thumbnail';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.appendChild(thumbnailImage);

    imageContainer.addEventListener('mouseover', () => {
        thumbnailImage.classList.add('hovered');
    });

    imageContainer.addEventListener('mouseout', () => {
        thumbnailImage.classList.remove('hovered');
    });

    return imageContainer;
}

function initializeDataTable() {
    $('#posts').DataTable({
        "aLengthMenu": [
            [5, 10, 15, -1],
            [5, 10, 15, "All"]
        ],
        "iDisplayLength": 10,
        "language": {
            search: ""
        }
    });
}




// Call the function to retrieve post status
async function approvePost(encodedPostJson) {
    try {
        // Assuming you have the server URL where your Express app is running
        const serverUrl = 'https://atman.onrender.com'; // Change this to your server URL

        const response = await fetch(`${serverUrl}/admin/approvepost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId:encodedPostJson}),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Post approved and added to the collection');
            window.location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error:', response.status, errorData.error);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage:



// Function to delete a post
async function deletePost(postId) {
    try {
        const serverUrl = 'https://atman.onrender.com'; // Change this to your server URL

        const response = await fetch(`${serverUrl}/admin/deletePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId })
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        window.location.reload();
        // Handle success response
      } else {
        console.error('Failed to delete post:', responseData.message);
        // Handle error response
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle network or server errors
    }
  }
  

  
retrievePostStatus();