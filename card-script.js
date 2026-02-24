//INPUT AND OUTPUT CARD JAVASCRIPT

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
            modalVideo.pause();
            modalVideo.src = "";
        }
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}