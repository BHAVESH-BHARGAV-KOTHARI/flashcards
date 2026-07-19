//Cards Data Start

const defaultCards = 
[
    {
        id:1,
        topic:"Graphs",
        q:"BFS",
        ans: "Breadth First Search (BFS) is a graph traversal algorithm that starts from a source node and explores the graph level by level. First, it visits all nodes directly adjacent to the source. Then, it moves on to visit the adjacent nodes of those nodes, and this process continues until all reachable nodes are visited.",
        difficulty:"Easy"
    },
    {
        id:2,
        topic:"Graphs",
        q: "DFS",
        ans: "In Depth First Search (or DFS) for a graph, we traverse all adjacent vertices one by one. When we traverse an adjacent vertex, we completely finish the traversal of all vertices reachable through that adjacent vertex. To avoid processing a node multiple times, we use a boolean visited array.",
        difficulty:"Medium"
    }
];

//Cards Data End


//Save Cards Start

const cardsData = JSON.parse(localStorage.getItem("cards")) || defaultCards;
let shownCards = cardsData;

function saveCards()
{
    localStorage.setItem("cards",JSON.stringify(cardsData));
}

//Save Cards End


//Render Cards Start

const hero = document.getElementById("hero");

function render(card)
{
    hero.innerHTML += `
    <div class="card" data-id="${card.id}">
      <button class="delete-btn">🗑️</button>
      <div class="card-inner">
        <div class="card-front">
          <h1>${card.q}</h1>
        </div>
        <div class="card-back">
          <p>${card.ans}</p>
        </div>
      </div>
    </div>
    `;
}

function renderCards()
{
    hero.innerHTML="";
    shownCards.forEach(card => render(card));
}

renderCards();

//Render Cards End


// Flip Logic Start


const deck = document.getElementById("hero");
deck.addEventListener("click",(e)=>{
    const card = e.target.closest(".card");

    if(!card) return;
    
    card.classList.toggle("flipped");
})

//Flip Logic End


//Theme Logic Start
const root = document.documentElement;
const theme = document.getElementById("theme-btn");
const savedTheme = localStorage.getItem("theme");
if(savedTheme==="dark")
{
    root.classList.add("dark");
    updateThemeButton();
};

function updateThemeButton()
{
    if(root.classList.contains("dark"))
    {
        theme.textContent="🌙";
    }
    else
    {
        theme.textContent="☀️";
    }
}

theme.addEventListener("click",()=>{
    root.classList.toggle("dark");

    if(root.classList.contains("dark"))
        localStorage.setItem("theme","dark")
    else 
        localStorage.setItem("theme","light");

    updateThemeButton();
});

//Theme Logic End


//Form Logic Start

const addCard = document.getElementById("add-card-btn");
const formContainer = document.getElementById("form-container");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("add-card-form");

addCard.addEventListener("click",()=>{
    formContainer.classList.remove("hidden");
});

cancelBtn.addEventListener("click",()=>{
    formContainer.classList.add("hidden");
})

form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload
    const formData = new FormData(form);
    const newCard = {
        id: Date.now(),
        topic: formData.get("topic"),
        q: formData.get("question"),
        ans: formData.get("answer"),
        difficulty: formData.get("difficulty")
    };
    cardsData.push(newCard);
    loadTopics();

    saveCards();
    render(newCard);

    form.reset();
    formContainer.classList.add("hidden");
});

//Form Logic End


//Delete Card Start

//deck is already defined in flip logic
deck.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete-btn"))
    {

        const card = e.target.closest(".card");
        const id = Number(card.dataset.id);

        const index = cardsData.findIndex(c=>c.id===id)

        cardsData.splice(index,1);
        saveCards();

        card.remove(); //DOM Method
    }
})

//Delete Card End


//Filter State Start

let currentDiff = "All";
let currentTopic = "All";

function applyFilters()
{
    shownCards = cardsData.filter(card =>
        (currentDiff === "All" || card.difficulty === currentDiff) &&
        (currentTopic === "All" || card.topic === currentTopic)
    );
    renderCards();
}

//Filter State End


//Difficulty Filter Start

const diff = document.getElementById("fetch-diff");

diff.addEventListener("change",()=>{
    currentDiff = diff.value;
    applyFilters();
});

//Difficulty Filter End


//Topic Filter Start

const topicSelect = document.getElementById("fetch-topic");

function loadTopics()
{
    topicSelect.innerHTML = `<option value="All">All Topics</option>`

    const topics = [...new Set(cardsData.map(card => card.topic))];

    topics.forEach(topic => {
        topicSelect.innerHTML += `
        <option value="${topic}">${topic}</option>`;
    });
}

loadTopics();

topicSelect.addEventListener("change", () => {
    currentTopic = topicSelect.value;
    applyFilters();
});

//Topic Filter End