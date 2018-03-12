
var human = document.getElementsByClassName("humanScore");
var computer = document.getElementsByClassName("computerScore");
var playRock = document.getElementsByClassName("rock");
var playPaper = document.getElementsByClassName("paper");
var playScissors = document.getElementsByClassName("scissors");
var playLizard = document.getElementsByClassName("Spock");
var playSpock = document.getElementsByClassName("lizard");


Array.from(human).forEach(function(element) {
      element.addEventListener('click', function(){
        const humanScore = this.parentNode.parentNode.childNodes[1].innerText
        fetch('scores', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'humanScore': 0,
            'computerScore': 0,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
    });
});


// ------------------------------------


var botScore=0,
	playerScore=0;
document.getElementById("rock").onclick=playerThrowsRock;
document.getElementById("scissors").onclick=playerThrowsScissors;
document.getElementById("paper").onclick=playerThrowsPaper;
document.getElementById("Spock").onclick=playerThrowsSpock;
document.getElementById("lizard").onclick=playerThrowsLizard;

function playerThrowsRock(){
	var botsWeapon= getRandomWeapon();
	checkWhoWon(botsWeapon,"rock");
	displayPlayedMessage("You played Rock. Computer played "+botsWeapon+".")
}
function playerThrowsScissors(){
	var botsWeapon= getRandomWeapon();
	checkWhoWon(botsWeapon,"scissors");
	displayPlayedMessage("You played Scissors. Computer played "+botsWeapon+".")
}
function playerThrowsPaper(){
	var botsWeapon= getRandomWeapon();
	checkWhoWon(botsWeapon,"paper");
	displayPlayedMessage("You played Paper. Computer played "+botsWeapon+".")
}
function playerThrowsSpock(){
	var botsWeapon= getRandomWeapon();
	checkWhoWon(botsWeapon,"scissors");
	displayPlayedMessage("You played Spock. Computer played "+botsWeapon+".")
}
function playerThrowsLizard(){
	var botsWeapon= getRandomWeapon();
	checkWhoWon(botsWeapon,"paper");
	displayPlayedMessage("You played Lizard. Computer played "+botsWeapon+".")
}
function getRandomWeapon(){
	var randomNumber=Math.random();
	var botsWeapon="rock";
	if(randomNumber<.20){
		botsWeapon="scissors";
	}
	else if(randomNumber<.40){
		botsWeapon="paper";
	}
	else if(randomNumber<.60){
		botsWeapon="lizard";
	}
		else if(randomNumber<.80){
		botsWeapon="Spock";
	}

	return botsWeapon;
}
function checkWhoWon(botsWeapon,playersWeapon){
	if(botsWeapon==playersWeapon){
		displayCompleteMessage("DRAW! I will let you live this time, PUNY MORTAL!");
	}
	else if(
		(botsWeapon=="scissors" && playersWeapon=="paper") ||
		(botsWeapon=="scissors" && playersWeapon=="lizard") ||
		(botsWeapon=="paper" && playersWeapon=="rock") ||
		(botsWeapon=="paper" && playersWeapon=="Spock") ||
		(botsWeapon=="rock" && playersWeapon=="scissors")||
		(botsWeapon=="rock" && playersWeapon=="lizard")||
		(botsWeapon=="Spock" && playersWeapon=="scissors") ||
		(botsWeapon=="Spock" && playersWeapon=="rock") ||
		(botsWeapon=="lizard" && playersWeapon=="paper")||
		(botsWeapon=="lizard" && playersWeapon=="Spock")
		){
		increaseBotScore();
	}
	else{
		increasePlayerScore();
	}
}
function increaseBotScore(){
	botScore+=1;
	document.getElementById("computerScore").innerHTML=botScore;
	displayCompleteMessage("VICTORY! I BANISH THEE TO HADES MWAHAHAHAHAAAA");
}



function increasePlayerScore(){
	playerScore+=1;
	document.getElementById("humanScore").innerHTML=playerScore;
	displayCompleteMessage("I lost?!! NOT POSSIBLE!!!! *cries in Spanish*");
}
function displayCompleteMessage(msg){
	document.getElementById("status").innerHTML=msg;
}
