
    document.addEventListener("DOMContentLoaded", function () {
        // Highlight active card when clicked
        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
            card.addEventListener("click", () => {
                // Remove 'active' class from all cards
                cards.forEach((c) => c.classList.remove("active"));
                // Add 'active' class to the clicked card
                card.classList.add("active");
            });
        });

        // Show a preview when hovering over a video card
        const videoLinks = document.querySelectorAll(".card-btn");
        videoLinks.forEach((link) => {
            link.addEventListener("mouseenter", (event) => {
                // Display a tooltip or a short description for the video
                const tooltip = document.createElement("div");
                tooltip.className = "tooltip";
                tooltip.textContent = "Watch this video to learn more!";
                document.body.appendChild(tooltip);

                // Position tooltip near the cursor
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            });

            link.addEventListener("mouseleave", () => {
                const tooltip = document.querySelector(".tooltip");
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    });
