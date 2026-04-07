// INPUT AND OUTPUT CARD MODAL

const modal = document.getElementById("cardModal");
const cards = document.querySelectorAll(".input-cards, .output-cards");
const closeBtn = document.querySelector(".close-btn");

if (modal && cards.length > 0) {

    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            modalTitle.textContent = card.dataset.title || "";
            modalDescription.textContent = card.dataset.description || "";

            if (modalImage) {
                if (card.dataset.image) {
                    modalImage.src = card.dataset.image;
                    modalImage.style.display = "block";
                } else {
                    modalImage.style.display = "none";
                }
            }

            if (modalVideo) {
                if (card.dataset.video) {
                    modalVideo.src = card.dataset.video;
                    modalVideo.style.display = "block";
                } else {
                    modalVideo.style.display = "none";
                }
            }

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";

        if (modalVideo) {
            modalVideo.src = "";
        }
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

// FOR SEARCH BAR FUNCTION

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("search-bar");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { 
            event.preventDefault();
            searchItems();
        }
    });

    const reloadBtn = document.getElementById("reloadPage");
        if (reloadBtn) {
            reloadBtn.addEventListener("click", () => {
            location.reload();
        });
    }
});

function searchItems() {
    let input = document.getElementById("search-bar").value.trim().toLowerCase();
    let cards = document.querySelectorAll(".input-cards, .output-cards");
    let noResults = document.getElementById("noResults");
    let hasResults = false;

    if (input === "") {
        cards.forEach(card => card.style.display = "");
        noResults.style.display = "none";
        return;
    }
    
    cards.forEach(card => {
        let titleElement = card.querySelector("h3");
        let title = titleElement ? titleElement.textContent.toLowerCase() : "";
        if (title.includes(input)) {
            card.style.display = "";
            hasResults = true;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = hasResults ? "none" : "block";
} 

// HOMEPAGE DRAG AND DROP FEATURE

const images = document.querySelectorAll(".titlecard img");

let current = null;
let offsetX = 0;
let offsetY = 0;
let z = 1;

images.forEach(img => {

    img.addEventListener("mousedown", (e) => {
        current = img;

        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;

        z++;
        img.style.zIndex = z;

        img.style.transform += " scale(1.05)";

        e.preventDefault();
    });

});

document.addEventListener("mousemove", (e) => {
    if (!current) return;

    current.style.left = (e.clientX - offsetX) + "px";
    current.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    if (!current) return;

    localStorage.setItem(current.src, JSON.stringify({
        left: current.style.left,
        top: current.style.top
    }));

    current.style.transform = current.style.transform.replace(" scale(1.05)", "");

    current = null;
});

window.addEventListener("load", () => {
    images.forEach(img => {
        const saved = localStorage.getItem(img.src);
        if (saved) {
            const pos = JSON.parse(saved);
            img.style.left = pos.left;
            img.style.top = pos.top;
        }
    });
});