function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (username && email && password) {
            const user = { username, email, password, profilePicture: "", courses: [] };
            saveUser(user);
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("All fields are required!");
        }
    });
}

if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const user = getUser();

        if (user && user.email === email && user.password === password) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}

if (document.getElementById("logout")) {
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.setItem("isLoggedIn", "false");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    });
}

if (window.location.pathname.includes("dashboard.html")) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = getUser();

    if (!isLoggedIn || !user) {
        alert("You must log in first!");
        window.location.href = "login.html";
    } else {
        document.getElementById("usernameDisplay").textContent = user.username;
    }
}


if (window.location.pathname.includes("profile.html")) {
    const user = getUser();

    if (user) {
        document.getElementById("profileUsername").value = user.username;
        document.getElementById("profileEmail").value = user.email;

        if (user.profilePicture) {
            document.getElementById("profilePicturePreview").src = user.profilePicture;
        }

        document.getElementById("profileForm").addEventListener("submit", function (event) {
            event.preventDefault();

            user.username = document.getElementById("profileUsername").value;
            user.email = document.getElementById("profileEmail").value;

            const profilePictureInput = document.getElementById("profilePicture");
            if (profilePictureInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    user.profilePicture = e.target.result;
                    saveUser(user);
                    alert("Profile updated successfully!");
                };
                reader.readAsDataURL(profilePictureInput.files[0]);
            } else {
                saveUser(user);
                alert("Profile updated successfully!");
            }
        });
    }
}
if (window.location.pathname.includes("my-courses.html")) {
    const user = getUser();
    const coursesContainer = document.getElementById("coursesContainer");

    if (user && user.courses.length > 0) {
        user.courses.forEach((course, index) => {
            const courseItem = document.createElement("div");
            courseItem.className = "card mb-3";
            courseItem.innerHTML = 
                <div class="card-body">
                    <h5 class="card-title">${course}</h5>
                    <p class="card-text">Course description goes here.</p>
                    <a href="#" class="btn btn-primary">Go to Course</a>
                </div>
            ;
            coursesContainer.appendChild(courseItem);
        });
    } else {
        coursesContainer.innerHTML = "<p>No courses enrolled yet.</p>";
    }
}