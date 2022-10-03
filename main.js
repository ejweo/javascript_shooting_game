//캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width/2-24;
let spaceshipY = canvas.height-64;

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
        console.log("키다운객체에 들어간 값은?",keysdown);
    });

    document.addEventListener("keyup",function(event){
        delete keysdown[event.keyCode]
        console.log("버튼 클릭후 값은?",keysdown);
    });
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
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main(){
    update(); // 좌표값을 업데이트
    render(); // 그려줌
    console.log("animation calls main function")
    //애니메이션처럼 계속 호출을한다.
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 
// 3. 발사된 총알들은 총알 배열에 저장을 한다.
// 4. 총알들은 x,y좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다.