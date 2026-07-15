getElementsByClassName() returns an HTMLCollection.
An HTMLCollection doesn't support forEach() in many environments.
So, I need to switch to querySelectorAll.

We CAN flip the card directly, but card is to define layout,size,hover,padding etc. And we use inner to flip, so that we dont have to mix different responsibilites together.

preserve-3d : "Keep my children in 3D space instead of flattening them onto me"
-need to study this a bit.

inset 0 : Will try to stretch this absolutely positioned element so it touches all four edges of its parent.
We can also use height and width 100%.