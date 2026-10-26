
window.addEventListener("scroll", function(){
    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
    const percentage = documentHeight > 0
        ? Math.min(100, (scrollTop / documentHeight) * 100)
        : 0;
    document.getElementById("progress").style.width = percentage + "%";
});

const navigationLinks = document.querySelectorAll(".nav-links a");
navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        navigationLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

//progrss bar animation end

let titleNameIs = document.getElementById("titleName");
titleNameIs.innerHTML = titleNameIs.innerHTML.toUpperCase();
let btn = document.getElementById("readMoreInformation-edu");
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("closeBtn");
let popupContent = popup.querySelector(".popup-content");

function closePopup() {
    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");
    btn.focus();
}

btn.addEventListener("click", function () {
    popup.style.display = "flex";
    popup.setAttribute("aria-hidden", "false");
    popupContent.focus();
});

closeBtn.addEventListener("click", function () {
    closePopup();
});

window.addEventListener("click", function (e) {
    if (e.target === popup) {
        closePopup();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup.getAttribute("aria-hidden") === "false") {
        closePopup();
    }
});

// mail Send API
const form = document.getElementById("contactForm");
if (form && window.emailjs) {
    emailjs.init({
        publicKey: "0cQfgmwiknIot-AyZ"
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const button = form.querySelector(".send-btn");
        button.disabled = true;
        button.textContent = "Sending...";

        const templateParams = {
            from_name: document.getElementById("name").value.trim(),
            from_email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        try {
            await emailjs.send(
                "service_z5lxd12",
                "template_8l5p2e3",
                templateParams
            );

            alert("Message sent successfully!");
            form.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);
            alert("Email error: " + (error.text || error.message || JSON.stringify(error)));

        } finally {
            button.disabled = false;
            button.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        }
    });
} else if (form) {
    console.error("EmailJS could not be loaded; the contact form is unavailable.");
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
function setNavigationOpen(isOpen) {
    navLinks.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}
menuToggle.addEventListener("click", function () {
    setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

/* Close menu after clicking a navigation link */
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        setNavigationOpen(false);
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setNavigationOpen(false);
        menuToggle.focus();
    }
});

/* Close menu when returning to desktop width */
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        setNavigationOpen(false);
    }
});

document.addEventListener("DOMContentLoaded", function () { const ranges = document.querySelectorAll( ".allskiillin-exp input[type='range']" ); ranges.forEach(function (range) { function updateRange() { const min = Number(range.min) || 0; const max = Number(range.max) || 100; const value = Number(range.value); const percent = max > min ? ((value - min) / (max - min)) * 100 : 0; range.style.setProperty("--progress", percent + "%"); } updateRange(); range.addEventListener("input", updateRange); }); });