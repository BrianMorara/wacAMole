alert("Click/tap the mole before it dissappears. PRESS START TO PLAY.You have 25 seconds");
const container=document.querySelector(".container");
const progress=document.querySelector(".progress");
const timer=document.getElementById('timer');
const h3=document.getElementsByTagName('h3');
const remarks=document.querySelector(".remarks");
const start=document.querySelector(".start").addEventListener("mousedown",startGame);

createGrid();
//get  all boxes.
const allBoxes=document.querySelectorAll(".box");

let moveId=null;
let timerId=null;
let scores=0;
let duration=25;

//creation of the grid.
function createGrid(){
    for(let i=0;i<16;i++){
        const box=document.createElement('div');
        box.classList.add('box');
        box.setAttribute("id",i);
        container.appendChild(box);
    }
};
   
   //display mole randomly
   function displayMole(){
        let random=Math.floor(Math.random()*allBoxes.length);
        for(let i=0;i<allBoxes.length;i++){
            let box=allBoxes[random].classList.add('mole');
        }
    };


//!star game
function startGame(){
    //move mole randomly
moveId=setInterval(()=> {
    allBoxes.forEach(box=>{
        if(box.classList.contains('mole')){
            box.classList.remove('mole');
        }
    })
    displayMole();
},850);
timerId=setInterval(timeOut,800);
}

//player action + scores

allBoxes.forEach(box=>{
    box.addEventListener("mousedown",(e)=>{
        let hitBox=e.target;
        if(hitBox.classList.contains('mole')){
            scores++;
            console.log(scores);
        }else{
            scores=scores;
        }
        progress.innerHTML=scores;
    })
})

//timer
function timeOut(){
    duration--;
    timer.innerHTML=duration;
    if(duration===0 && scores<21){
        container.innerHTML=`GAME OVER <em> You were almost there. <br> Tip: Try double clicking/tapping</em>😉 `;
        h3.innerHTML=" ";
        remarks.innerHTML=" ";
        endGame();
    }else if(duration===0 && scores>=21){
        remarks.innerHTML=" ";
        container.innerHTML="Congatulations🎉㊗";
        endGame();
    }
};

//end game
function endGame(){
    duration=25;
    clearInterval(moveId);
    clearInterval(timerId);
    scores=0;
    alert(`Your score is ${progress.innerHTML}`);
    setTimeout(()=>{
        window.location.reload();
    },4000);
}