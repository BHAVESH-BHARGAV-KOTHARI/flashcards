//Cards Data Start

const cardsData = 
[
    {
        id:1,
        q:"BFS",
        ans: "Breadth First Search (BFS) is a graph traversal algorithm that starts from a source node and explores the graph level by level. First, it visits all nodes directly adjacent to the source. Then, it moves on to visit the adjacent nodes of those nodes, and this process continues until all reachable nodes are visited."
    },
    {
        id:2,
        q: "DFS",
        ans: "In Depth First Search (or DFS) for a graph, we traverse all adjacent vertices one by one. When we traverse an adjacent vertex, we completely finish the traversal of all vertices reachable through that adjacent vertex. To avoid processing a node multiple times, we use a boolean visited array."
    }
];

//Cards Data End


//Render Cards Start//

const hero = document.getElementById("hero");

function helper(card)
{
    hero.innerHTML += `
    <div class="card" data-id="${card.id}">
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
    cardsData.forEach(card => helper(card));
}

renderCards();

//Render Cards End//


// Flip Logic Start

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
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