document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DOM INTERACTION: Dark Mode Toggle & Button Creation
  // ==========================================
  const nav = document.querySelector("#main-nav");

  if (nav) {
    // Dynamically create and style the Dark Mode button
    const themeBtn = document.createElement("button");
    themeBtn.id = "theme-toggle";
    themeBtn.textContent = "Toggle Dark Mode";
    themeBtn.classList.add("btn", "btn-secondary");
    themeBtn.style.marginLeft = "auto";

    nav.appendChild(themeBtn);

    // Toggle class and update button label on click
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      themeBtn.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
    });
  }

  // ==========================================
  // 2. FORM VALIDATION (about_me.html)
  // ==========================================
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll("[required]");

      requiredInputs.forEach((input) => {
        const errorElement = document.querySelector(`#${input.getAttribute("aria-describedby")}`);

        // Check for empty or whitespace-only inputs
        if (!input.value.trim()) {
          event.preventDefault(); // Stop form submission
          isValid = false;
          input.setAttribute("aria-invalid", "true");
          if (errorElement) {
            errorElement.style.display = "block";
          }
        } else {
          input.removeAttribute("aria-invalid");
          if (errorElement) {
            errorElement.style.display = "none";
          }
        }
      });
    });

    // Dynamic error removal as the user types
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const errorElement = document.querySelector(`#${input.getAttribute("aria-describedby")}`);
        input.removeAttribute("aria-invalid");
        if (errorElement) {
          errorElement.style.display = "none";
        }
      });
    });
  }

  // ==========================================
  // 3. API FETCH (GitHub Live Stats on index.html)
  // ==========================================
  const apiCard = document.querySelector("#api-card");

  if (apiCard) {
    fetch("https://api.github.com/users/afiggers-bit")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        apiCard.innerHTML = `
          <h2>Live Developer Stats</h2>
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="${data.avatar_url}" alt="${data.login}'s profile picture" style="width: 60px; height: 60px; border-radius: 50%;">
            <div>
              <p style="margin: 0;"><strong>GitHub User:</strong> ${data.login}</p>
              <p style="margin: 0;"><strong>Public Repositories:</strong> ${data.public_repos}</p>
            </div>
          </div>
        `;
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        apiCard.innerHTML = `
          <h2>Live Developer Stats</h2>
          <p class="error-message" style="display: block;">Unable to retrieve GitHub data at this time.</p>
        `;
      });
  }
});