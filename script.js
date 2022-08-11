//Constants and Variables
let gameSound = new Audio("assets/music.mp3");
gameSound.volume=.25;
let moveSound = new Audio("assets/move.mp3");
let foodSound = new Audio("assets/food.mp3");
let gameoverSound = new Audio("assets/gameover.mp3");
let snakeArr = [
    {x:13, y:15}
];
let food = {x:5, y:7};
let speed = 10;
let lasttime=0;
let inputDir = {x:0, y:0};
let score=0;
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lasttime)/1000 < 1/speed) return;
    lasttime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    //if you collide with yourself
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y) return true;
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=1 || snakeArr[0].y>=18 || snakeArr[0].y<=1) return true;
    return false;
}

function gameEngine(){

    if(isCollide(snakeArr)){
        gameSound.pause();
        gameoverSound.play();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        score=0;
        scorebox.innerHTML = "Score: " +score;
        snakeArr = [
            {x:13, y:15}
        ];
        gameSound.play();
       
    }

    // When food is eaten
    if(snakeArr[0].x===food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score+=1;
        scorebox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        var a=2;
        var b=16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //Moving the Snake

for (let i = snakeArr.length-2; i >=0; i--){
     snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
    // Part 2: Display the snake and Food
    //Display snake array
    board.innerHTML= "";
    snakeArr.forEach((e, ind) => {
        var snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       if(ind===0) snakeElement.classList.add("head");
       else snakeElement.classList.add("snake");
       board.appendChild(snakeElement);
    });

   

    // Display food
    var foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

//Main Logic
 gameSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
    inputDir = {x:0, y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

            case "ArrowDown":
                inputDir.x=0;
                inputDir.y=1;
                break;  
            case "ArrowLeft":
                inputDir.x=-1;
                inputDir.y=0;
               break;
            case "ArrowRight":
                inputDir.x=1;
                inputDir.y=0;
                break;          
    
        default:
            break;
    }
});