// Flip Logic Start

const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
});

//Flip Logic End

//Theme Logic Start

const root = document.documentElement;
const theme = document.getElementById("theme-btn");

function updateThemeButton()
{
    if(root.classList.contains("dark"))
    {
        theme.textContent="🌑";
    }
    else
    {
        theme.textContent="☀️";
    }
}

theme.addEventListener("click",()=>{
    root.classList.toggle("dark");
    updateThemeButton();
});

//Theme Logic End