
var human = document.getElementById("humanScore");
var computer = document.getElementById("computerScore");
var userChoice = document.getElementsByClassName("userChoice");
var name = document.getElementById("name").value;
var submit = document.getElementById("submit");
var log = document.getElementsByClassName("log");

Array.from(userChoice).forEach(function(element) {
      element.addEventListener('click', playerThrows)
});


// ------------------------------------

submit.addEventListener('click',function(){
	name = document.getElementById("name").value
    if(!name.valueOf()){
        alert("Enter your name.")
        return
    }
    fetch('/scores?name='+name.valueOf(), {
      method: 'get',
	  headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if (response.ok) {
           // document.human.innerText(response.json().humanScore);
           // document.computer.innerText(response.json().computerScore);
       }
    })
    .then(data => {
      // console.log(data.value)
	})
})

var botScore=0,
	playerScore=0;

function playerThrows(){
    if(!name.valueOf()){
        alert("Enter your name.")
        return
    }
	var botsWeapon= getRandomWeapon();
    var humanPlay = this.attributes.id.nodeValue
    checkWhoWon(botsWeapon,humanPlay);
	displayPlayedMessage("You played"+humanPlay+". Computer played "+botsWeapon+".")
}

function displayPlayedMessage(){
    document.getElementsByClassName("log")

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
    // console.log(this);
    const humanScore = human.innerText
    const computerScore = computer.innerText
    fetch('/scores', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name.valueOf(),
        'humanScore': humanScore,
        'computerScore': computerScore,
        'botsWeapon': botsWeapon,
        'humanPlay': playersWeapon
        ,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data.value);
       document.getElementsByClassName("log").innerHTML= data.name;
	}
)}
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
