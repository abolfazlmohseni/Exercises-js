let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")

let scale = 15
let speedx = 5
let speedY = 0
let locX = 0
let locY = 0

document.body.addEventListener("keydown", (event) => { setAroowsnak(event) })


const setAroowsnak = (e) => {
    speedY = 0
    speedx = 0
    switch (e.keyCode) {
        case 37:
            speedx = -5
            speedY = 0
            break;
        case 38:
            speedY = -5

            break;
        case 39:
            speedx = 5

            break;
        case 40:
            speedY = 5
            break;
        default:
            break;
    }

}



setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(locX, locY, scale, 15)

    if (locY < 0) {
        locY = canvas.height
    } else if (locY > canvas.height) {
        locY = 0
    } else if (locX > canvas.width) {
        locX = 0
    } else if (locX < 0) {
        locX = canvas.width
    }


    scale++
    locX += speedx
    locY += speedY
}, 100);