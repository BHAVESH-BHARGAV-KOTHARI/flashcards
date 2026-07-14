// Flip Logic Start

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
});

//Flip Logic End