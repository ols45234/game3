var canvas = document.getElementById("canvas");
var canvaswidth = 1024;
var canvasheight = 512;

canvas.width = canvaswidth;
canvas.height = canvasheight;
var canvasContext = canvas.getContext("2d");

class hero {
    constructor() {
        this.rPosX = 128;
        this.rPosY = 128;
        this.offsetX = 0;
        this.offsetY = 0;
        this.PosX = 128;
        this.PosY = 128;
        this.animationFrame = 0;
        this.animation = "Down";
        this.animType = "stand"
        this.animationSkip = 0;
    }
    redraw() {
        if (this.animType == "walk" && this.animationFrame >= 8)
            this.animationFrame = 1;
        if (this.animType == "attack" && this.animationFrame >= 10)
            this.animationFrame = 1;
        if (this.animType == "stand" && this.animationFrame > 0)
            this.animationFrame = 0;

        if (this.rPosX > canvaswidth / 2 + 64) {
            this.offsetX -= this.rPosX - (canvaswidth / 2 + 64);
            this.rPosX = canvaswidth / 2 + 64;
        }
        if (this.rPosX < canvaswidth / 2 - 64) {
            this.offsetX -= this.rPosX - (canvaswidth / 2 - 64);
            this.rPosX = canvaswidth / 2 - 64;
        }
        if (this.rPosY > canvasheight / 2 + 64) {
            this.offsetY -= this.rPosY - (canvasheight / 2 + 64);
            this.rPosY = canvasheight / 2 + 64;
        }
        if (this.rPosY < canvasheight / 2 - 64) {
            this.offsetY -= this.rPosY - (canvasheight / 2 - 64);
            this.rPosY = canvasheight / 2 - 64;
        }

        switch (this.animation) {
            case "Up": canvasContext.drawImage(heroTextures.walk, (64 * this.animationFrame), 64 * 0, 64, 64, this.rPosX, this.rPosY, 64, 64); break;
            case "Down": canvasContext.drawImage(heroTextures.walk, (64 * this.animationFrame), 64 * 2, 64, 64, this.rPosX, this.rPosY, 64, 64); break;
            case "Left": canvasContext.drawImage(heroTextures.walk, (64 * this.animationFrame), 64 * 1, 64, 64, this.rPosX, this.rPosY, 64, 64); break;
            case "Right": canvasContext.drawImage(heroTextures.walk, (64 * this.animationFrame), 64 * 3, 64, 64, this.rPosX, this.rPosY, 64, 64); break;
        }

        environment.offsetX = this.offsetX;
        environment.offsetY = this.offsetY;
    }
    playAnimation(anim, animType) {
        if (debug == "animation")
            console.log("animation: " + anim);


        if (this.animationSkip >= 2) {
            this.animationFrame += 1;
            this.animationSkip = 0;
        }
        else
            this.animationSkip += 0.75;
        if (anim != "last")
            this.animation = anim;
        this.animType = animType;
    }

}

class environments {
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
    }
    redraw() {
        for (var x = 0; x < 34; x++) {
            for (var y = 0; y < 34; y++) {
                canvasContext.drawImage(textures[properties[map[y][x]].texture],    //тут берём текстуру из массива по адресу который берём из массива по адресу из двухмерного массива. да, сложно.
                    ((x * 64) + this.offsetX),
                    ((y * 64) + this.offsetY)
                );
            }
        }
    }

}
let textures = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
textures[0].src = "img/grass.png";
textures[1].src = "img/stone.png";
textures[2].src = "img/water.png";
textures[3].src = "img/bridge.png";
textures[4].src = "img/path.png";
textures[5].src = "img/tree.png";
textures[6].src = "img/flower.png";
textures[7].src = "img/mushrum.png";
heroTextures = {
    walk: new Image(),
    attack: new Image(),
}
heroTextures.walk.src = "img/hero.animations.walk.png";
heroTextures.attack.src = "img/hero.animations.attack.png";

map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 2, 2, 2, 0, 0, 0, 0, 0, 5, 5, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 7, 0, 5, 5, 2, 2, 2, 0, 0, 0, 5, 5, 7, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 7, 7, 0, 5, 4, 4, 2, 2, 0, 0, 0, 7, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 5, 0, 4, 4, 2, 2, 2, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 7, 7, 5, 4, 5, 5, 2, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 4, 5, 5, 2, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 4, 4, 4, 4, 2, 2, 2, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 5, 4, 5, 5, 3, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 4, 4, 4, 3, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 2, 2, 2, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 0, 0, 0, 0, 0, 5, 7, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [2, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 0, 2, 2, 2, 2, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1,],
    [1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 7, 0, 1,],
    [1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6, 7, 0, 1,],
    [1, 5, 5, 7, 7, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 5, 7, 1,],
    [1, 5, 5, 7, 7, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 6, 0, 6, 0, 7, 1,],
    [1, 5, 7, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1,],
    [1, 5, 7, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 5, 4, 3, 2, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
];

properties = [
    { walk: true, speed: 1, texture: 0, block: "grass" },
    { walk: false, speed: 0, texture: 1, block: "stone" },
    { walk: false, speed: 0, texture: 2, block: "water" },
    { walk: true, speed: 1, texture: 3, block: "bridge" },
    { walk: true, speed: 1.1, texture: 4, block: "path" },
    { walk: true, speed: 0.3, texture: 5, block: "tree" },
    { walk: true, speed: 0.5, texture: 6, block: "flower" },
    { walk: true, speed: 0.9, texture: 7, block: "mushrum" },
];

player = new hero();
environment = new environments();
var debug = "none";
var score = 0;
play();

window.addEventListener("keydown", onCanvasKeyDown);
function onCanvasKeyDown(event) {
    if (event.key == "w" || event.key == "ArrowUp") {
        if (properties[map[Math.round((player.PosY - 4) / 64)][Math.round((player.PosX) / 64)]].walk == true || debug === "noclip") {
            player.rPosY -= (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
            player.PosY -= (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
        }
        player.playAnimation("Up", "walk")
    }
    if (event.key == "s" || event.key == "ArrowDown") {
        if (properties[map[Math.round((player.PosY - -28) / 64)][Math.round((player.PosX) / 64)]].walk == true || debug === "noclip") {
            player.rPosY += (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
            player.PosY += (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
        }
        player.playAnimation("Down", "walk")
    }
    if (event.key == "a" || event.key == "ArrowLeft") {
        if (properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX - 4) / 64)]].walk == true || debug === "noclip") {
            player.rPosX -= (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
            player.PosX -= (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
        }
        player.playAnimation("Left", "walk")
    }
    if (event.key == "d" || event.key == "ArrowRight") {
        if (properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX + 4) / 64)]].walk == true || debug === "noclip") {
            player.rPosX += (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
            player.PosX += (4 * properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].speed)
        }
        player.playAnimation("Right", "walk")
    }
    if (debug == "keyCode")
        console.log("key: " + event.key);

    if (properties[map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)]].block == "mushrum") {
        score++;
        map[Math.round((player.PosY) / 64)][Math.round((player.PosX) / 64)] = 0;
    }
}
window.addEventListener("keyup", onCanvasKeyUp);
function onCanvasKeyUp(event) {
    player.playAnimation("last", "stand")
    if (debug == "keyCode")
        console.log("key released");
}

function play() {
    canvasContext.clearRect(0, 0, canvaswidth, canvasheight);
    environment.redraw();
    player.redraw();
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("mushrooms:" + String(score), canvaswidth/2, 50);
    requestAnimationFrame(play);
}