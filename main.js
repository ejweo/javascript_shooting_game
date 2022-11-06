//캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver=false; // true이면 게임이 끝남
let score=0;

//우주선 좌표
let spaceshipX = canvas.width/2-24;
let spaceshipY = canvas.height-64;

let bulletList = [];

function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x = spaceshipX+12;
        this.y = spaceshipY;
        this.alive=true // true면 살아있는 총알 false면 죽은 총알
        bulletList.push(this);
    };

    this.update = function(){
        this.y -= 7;
    }

    this.checkHit = function(){

        for(let i = 0 ; i < enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+40){
                //총알이 죽게됨 적군의 우주선이 없어짐, 점수획득
                score++;
                this.alive = false;
                enemyList.splice(i,1);
            }
        }
        
    }
};

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum
}

let enemyList=[];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init=function(){
        this.y=0;
        this.x=generateRandomValue(0,canvas.width-66);
        enemyList.push(this);
    };
    this.update=function(){
        this.y +=3;

        if(this.y >= canvas.height-66){
            gameOver=true;
        }
    };
};

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="images/background.png";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png"

    bulletImage = new Image();
    bulletImage.src="images/bullet.png"
    
    enemyImage = new Image();
    enemyImage.src="images/enemy.png"

    gameOverImage = new Image();
    gameOverImage.src="images/gameover.png"
}

// 방향키를 누르면
let keysdown={};
function setupKeyboardListener(){
    //이벤트 가져옴
    document.addEventListener("keydown",function(event){
        keysdown[event.keyCode] = true
    });

    document.addEventListener("keyup",function(event){
        delete keysdown[event.keyCode]
        
        if(event.keyCode == 32){
            creareBullet(); //총알 생성
        }
    });
}

function creareBullet(){
    console.log("총알 생성!");
    let b = new Bullet();
    b.init();
    console.log("새로운 총알 리스트", bulletList)
}

function creareEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
}

function update(){
    //오른쪽 버튼
    if(39 in keysdown){
        spaceshipX += 5;
    //왼쪽 버튼
    }else if(37 in keysdown){
        spaceshipX -= 5;
    }

    if(spaceshipX <= 0){
        spaceshipX = 0;
    }else if(spaceshipX >= canvas.width-45){
        spaceshipX = canvas.width-45;
    }

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    for(let i=0; i<enemyList.length;i++){
        enemyList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 20);
    ctx.fillStyle="white";
    ctx.font="20px Arial";
    for(let i=0; i < bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for(let i=0; i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
    if(!gameOver){
        update(); // 좌표값을 업데이트
        render(); // 그려줌
        //애니메이션처럼 계속 호출을한다.
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameOverImage,10,100,380,380);
    }
}

loadImage();
setupKeyboardListener();
creareEnemy();
main();

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 
// 3. 발사된 총알들은 총알 배열에 저장을 한다.
// 4. 총알들은 x,y좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다.