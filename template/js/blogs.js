document.addEventListener('DOMContentLoaded', function() {
    fetch('https://atman.onrender.com/pending-blogs')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('card-container');
            data?.blogs?.forEach((blog, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.transform = `translateY(${index * 10}px)`;

                card.innerHTML = `
                    <div class="content">
                    <hr>
                    <h2 class="p-1">${blog.title}</h2>
                        <img src="${blog.bannerUrl}" alt="Banner" style="width:100%; border-radius: 10px;">
                    
                        <div class="blogger-profile card-dark">
                        <p>Nickname: ${blog.userDetails.nickname}</p>
                        <p>Email: <a href="mailto:${blog.userDetails.email}">${blog.userDetails.email}</a></p>
                        <p>phone: <a href="tel:${blog.userDetails.phoneNumber}">${blog.userDetails.phoneNumber}</a></p>
                        <p>LinkedIn: <a href="${blog.userDetails.linkedin}" target="_blank">${blog.userDetails.linkedin}</a></p>
                        <p >Time:  ${formatTimeDifferences(blog.createdAt)}</p>
                    </div>
                      
                        
                        <div class="p-4">${blog.content}</div>
                    </div>
                    <div class="buttons m-4 text-center">
                    
                        <button class="button decline btn btn-danger" data-id="${blog.id}">Decline</button>
                        <button class="button approve btn btn-success" data-id="${blog.id}">Approve</button>
                    </div>
                `;

                container.appendChild(card);
            });

            container.addEventListener('click', function(event) {
                if (event.target.classList.contains('approve')) {
                    const id = event.target.getAttribute('data-id');
                    fetch(`https://atman.onrender.com/approve-blog/${id}`, {
                        method: 'POST',
                    })
                    .then(response => {
                        if (response.ok) {
                            event.target.closest('.card').remove();
                            console.log(`Blog ${id} approved successfully.`);
                        } else {
                            console.error('Error approving blog');
                        }
                    });
                }

                if (event.target.classList.contains('decline')) {
                    const id = event.target.getAttribute('data-id');
                    fetch(`https://atman.onrender.com/decline-blog/${id}`, {
                        method: 'POST',
                    })
                    .then(response => {
                        if (response.ok) {
                            event.target.closest('.card').remove();
                            console.log(`Blog ${id} declined successfully.`);
                        } else {
                            console.error('Error declining blog');
                        }
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching blogs:', error));
});

function formatTimeDifferences(timestamp) {
    const currentTime = new Date();
    const commentTime = new Date(
        timestamp._seconds * 1000 + Math.round(timestamp._nanoseconds / 1000000)
    );

    const differenceInSeconds = Math.floor((currentTime - commentTime) / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    let timeDifference;
    if (differenceInDays > 7) {
        // If it crosses more than a week, display the date
        const options = { year: "numeric", month: "short", day: "numeric" };
        timeDifference = commentTime.toLocaleDateString("en-US", options);
    } else if (differenceInDays > 0) {
        // If it's within a week, but more than a day, display days ago
        timeDifference = differenceInDays === 1
            ? "1 day ago"
            : `${differenceInDays} days ago`;
    } else if (differenceInHours > 0) {
        // If it's within a day, but more than an hour, display hours ago
        timeDifference = differenceInHours === 1
            ? "1 hr ago"
            : `${differenceInHours} hrs ago`;
    } else {
        // If it's within an hour, display minutes ago
        timeDifference = differenceInMinutes <= 1
            ? "just now"
            : `${differenceInMinutes} mins ago`;
    }

    // Format the exact date and time
    const exactDateTime = commentTime.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
    });

    return `${timeDifference} (${exactDateTime})`;
}