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

## commit 6 - flip logic issue
Initially, we were adding the flip functionality by attaching an event listener to every card using `querySelectorAll()`. This works for the cards that exist when the page loads, but when a new card is added using the **Add Card** feature, that new card doesn't have the event listener attached. As a result, the flip functionality doesn't work for newly created cards.

The solution is to use **event delegation**. Instead of attaching the same event listener to every card, we attach a single event listener to the parent container (`hero`). When a card is clicked, the event bubbles up to the parent, which identifies the clicked card and performs the flip.

This approach has two major advantages:

* It works for both the existing cards and any cards added in the future without attaching new event listeners.
* It is more memory-efficient because only one event listener is created, regardless of how many cards are in the deck.

## commit 7 - cancel button issue
By default, a <button> inside a <form> has type="submit". Since the Cancel button is inside the form, clicking it also triggers the form's submit event. If the form is valid, a new card gets added even though the user intended to cancel.

Fix: Set the button type explicitly:

<button type="button" id="cancel-btn">Cancel</button>

This ensures the Cancel button only closes the form and never submits it. It also prevents unintended side effects if more logic (API calls, database updates, etc.) is added to the submit handler in the future.

## commit 8 - persisting cards with localStorage
Initially, all cards were stored only in the cardsData array. This meant that whenever the page was refreshed, the JavaScript state was reset and any cards added by the user were lost.

To solve this, we use localStorage, which allows data to persist in the browser even after a page refresh or browser restart.

Since localStorage can only store strings, the cardsData array is converted into a JSON string using JSON.stringify() before saving. When the application starts, the stored string is converted back into a JavaScript array using JSON.parse(). If no data exists in localStorage (for example, on the first visit), the application falls back to the default cards.

## commit 12 - fix the duplicate id issue
Initially, I generated each card's `id` using `cardsData.length + 1`. This worked while cards could only be added. For example, if there were 2 cards, the next card would get `id: 3`.

After adding delete functionality, this approach breaks. If card `2` is deleted, the remaining cards have IDs `1` and `3`, but `cardsData.length` is now `2`. Adding a new card assigns `id: 3` again, resulting in **duplicate IDs**.

To avoid this, use `Date.now()` to generate IDs. Since it returns the current timestamp in milliseconds, each newly created card gets a unique ID.

> **Fact:** `Date.now()` returns the number of milliseconds elapsed since the Unix epoch (**January 1, 1970, 00:00:00 UTC**).

## commit 13 - fix flex box overflow clipping
When a flex container uses align-items: center and justify-content: center, oversized content is centered by overflowing equally above and below the container. The portion that extends above the container becomes unreachable because overflow: auto can only scroll from the container's top edge (scrollTop cannot be negative). This makes the top of the content appear clipped.

Remove flexbox centering from the container and instead apply margin: auto to the child element. When the content fits, it remains centered. When it overflows, the auto margins collapse, allowing the content to start at the top so the entire element becomes scrollable without clipping.