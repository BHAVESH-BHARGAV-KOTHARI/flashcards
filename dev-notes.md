## commit 2
getElementsByClassName() returns an HTMLCollection.
An HTMLCollection doesn't support forEach() in many environments.
So, I need to switch to querySelectorAll for flip logic.

We CAN flip the card directly, but card is to define layout,size,hover,padding etc. And we use inner to flip, so that we dont have to mix different responsibilites together.

preserve-3d : "Keep my children in 3D space instead of flattening them onto me"
-need to study this a bit.

inset 0 : Will try to stretch this absolutely positioned element so it touches all four edges of its parent.
We can also use height and width 100%.


## commit 4
First version of cards are hardcoded in html, but if we want to add new cards, this isnt the correct way. So, we remove all cards from html and then create a data array containing id, question, answer for each card.
Now, render the cards dynamically from data array to display the cards.

Now we can just add an object in list to add a new card instead of writing a repetitive chunk of html code.