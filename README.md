## Rock Paper Scissors
I turned my simple rps application into a full-stack application using node.js, mongo.db, and express. The scores are now stored in a database when a user plays and when the "submit" button is pressed after play, the user can see their data printed to the console.

![alt tag](https://github.com/lpercivalDEV/rock-paper-scissors/blob/master/rpsPreview.png)

## Live Demo:
https://full-stack-rock-paper-scissors.herokuapp.com/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, jQuery

I used JavaScript to enable gameplay functionality for this app with some basic HTML and CSS thrown in to make it look pretty. In layman terms, this is an app where a user can play Rock, Paper, Scissors against "Zeus."

I created a set of buttons and attached event listeners to them via JavaScript. When a button is clicked it triggers one of the play functions depending on which button is selected. For example, if a user clicked on "Rock", the "playerThrowsRock()" JavaScript function would run which registers the player's choice of rock. Within that function the computer's choice is also determined by calling the "getRandomWeapon();" function.

I made the "getRandomWeapon();" function randomly choose a weapon for the computer to play. I assigned a decimal value to each choice the computer could make "Rock", "Paper", "Scissors", etc.  I then generated a random decimal number with the Math.random() method and whichever choice was closest to the generated number is the choice the computer would play. For example, if I assigned "Rock" to be less than or equal to 0.35, and the Math.random() method generated 0.27, then the computer would "decide" to play "Rock."

The next step is to decide who wins!
I set up a function that had conditionals to determine whether the computer or the user won the game. The first "if" conditional simply set up what should happen if there is a draw. The "else if" conditional in the function contained all the possible scenarios where the computer could have won (for example, if the computer chose paper and the user chose rock). If this condition was met, then the status would be populated to the DOM and the counter would be updated. If neither of the above conditions are met, then by default that means that the player must have won. The final "else" condition fires a function to increase the user's score and populates the DOM with the win status.

The final touch is to have an epic score to listen to while you battle against Zeus. I added an mp3 of "O Fortuna" to start playing once the DOM is fully loaded.


## Optimizations
I want to transfer the data that is being pulled from the database and print it to the DOM. Currently it is just being logged to the console, but I would prefer if it was printed as a table so that the user can more easily view the data.

This was supposed to be a pretty straightforward and simple application, so I'm pretty satisfied with how it turned out functionality wise.

But if I had more time, I would definitely like to work more on the CSS and make the UI/UX much smoother. I'd also like to add a status to let you know what you played and what the computer played so it's much more clear why you won, lost, or had a draw.

Also, because I added functionality for the "Lizard, Spock" variation of RPS, I feel that I should have a better explanation of the rules. Not all users will know which options will win against others - so an easy set of directions or even a diagram would be a nice improvement.


## Lessons Learned:

This project was a lesson in patience. Since I was still new to JavaScript, it took me quite a bit of time to figure out how to set up the variables and functions to make the app run properly. There was a lot of trial and error, hair pulling, and face-palming. But I'm really glad that I finished the project because now I am able to create games where users can play against a computer, I know how to increase or decrease the odds by messing with the assigned decimal values of play choices, and I now am able to keep scores and reveal statuses by updating the DOM via JavaScript.


## Examples:
Take a look at some of the other similar games and apps I have created in my own portfolio:

**Card Matching Game:** https://github.com/lpercivalDEV/matching-card-game

**Photography Carousel:** https://github.com/lpercivalDEV/photography-carousel

**Noname-Telefone Lyric Ranker:** https://github.com/lpercivalDEV/noname-telefone-lyric-ranker
# full-stack-rock-paper-scissors-WIP
