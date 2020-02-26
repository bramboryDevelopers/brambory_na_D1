display();
let action = 0;

let mouse = { "x": 0, "y": 0, };

let potatoes = [];

const width = parent.innerWidth / 2;
const height = parent.innerHeight / 2;
let draw = SVG().addTo('body').size(parent.innerWidth / 1.1, parent.innerHeight / 1.6459)
let road = draw.image("road.png").size(width, height).cx(parent.innerWidth / 1.1 / 2);
road.mousemove(e => {
    mouse.x = e.x;
    mouse.y = e.y;
})
road.click(e => {
    e.preventDefault();
    if (action == 0 && getSeeds() >= 1) {
        setSeeds(getSeeds() - 1)
        display()
        let potatoe = {
            "svg": draw.image("potatoe.png").size(30, 30).cx(mouse.x).cy(mouse.y - height / 1.5),
            "stage": 0,
            "ready": false,
        };
        const index = potatoes.length;
        potatoes[index] = potatoe;

        let audio = new Audio('potatoe_plant.mp3');
        audio.play();
        setTimeout(e => {
            if (potatoe != undefined) {
                potatoe = potatoes[index];
                potatoe.ready = true;
                potatoe.svg.click(e => {
                    potatoeClick(e)
                })
                potatoes[index] = potatoe;
            }
        }, 1500);
    }
});
clickedAction();
$(document).on("click", "#plant", e => {
    clickedAction(0);
    action = 0;
});
$(document).on("click", "#water", e => {
    clickedAction(1);
    action = 1;
});
$(document).on("click", "#fertilize", e => {
    clickedAction(2);
    action = 2;
});
$(document).on("click", "#reap", e => {
    clickedAction(3);
    action = 3;
});
$(document).on("click", "#explosion", e => {
    clickedAction(4);
    action = 4;
});

function clickedAction(buttonIndex = 0) {
    let buttons = [document.getElementById("plant"), document.getElementById("water"), document.getElementById("fertilize"), document.getElementById("reap"), document.getElementById("explosion")];
    let selected = buttons[buttonIndex];
    selected.style.backgroundColor = "#00ff00";
    buttons[buttonIndex] = null;
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button != null) {
            button.style.backgroundColor = ""
        }
    }
}
function potatoeClick(e) {
    const x = e.target.x.baseVal.value;
    const y = e.target.y.baseVal.value;
    let potatoe;
    let potatoeIndex;
    potatoes.forEach(function (value, index, arr) {
        const testx = value.svg.node.x.baseVal.value;
        const testy = value.svg.node.y.baseVal.value;
        if (testx == x && testy == y) {
            potatoe = value;
            potatoeIndex = index;
        }

    })
    if (potatoe.ready) {
        switch (potatoe.stage) {
            case (0): {
                if (action == 1) {
                    nexStage(potatoeIndex, potatoe);
                }
                break;
            }
            case (1): {
                if (action == 2) {
                    nexStage(potatoeIndex, potatoe);
                }
                break;
            }
            case (2): {
                if (action == 3) {
                    setPotatoes(getPotatoes() + 1);
                    potatoes.splice(potatoeIndex);
                    potatoe.svg.remove();
                    display()
                    let audio = new Audio('potatoe_plant.mp3');
                    audio.play();
                }
                break;
            }
        }
    }
};
function nexStage(index, potatoe) {
    let audio = new Audio('potatoe_plant.mp3');
    audio.play();
    potatoe.ready = false;
    potatoe.stage = potatoe.stage + 1;
    const width = potatoe.svg.node.width.baseVal.value;
    potatoe.svg.node.width.baseVal.value = width * 1.5;
    potatoe.svg.node.height.baseVal.value = width * 1.5
    potatoes[index] = potatoe;
    setTimeout(e => {
        if (potatoe != undefined) {
            potatoe.ready = true;
            potatoes[index] = potatoe;
        }
    }, potatoe.stage * 1500)
}
function display() {
    $("#potatoes").text(getPotatoes());
    $("#seeds").text(getSeeds());
}
let cars = [];

function carloadLeft() {
    const carImages = ["car_red.png", "car_blue.png", "truck.png"]
    let car = draw.image(carImages[getRandomInt(carImages.length)]).size(50, 25).cx(road.x() + width).cy(getRandomInt(height / 2))
    car.click(e => {
        if (action == 4) {
            cars.shift(car);
            car.remove()
            let audio = new Audio('explosion.mp3');
            audio.play();

        }
    });
    cars[cars.length] = car;
    carMove(0)
}
let carsRight = [];
function carloadRight() {
    const carImages = ["car_red_right.png", "car_blue_right.png", "truck_right.png"]
    let car = draw.image(carImages[getRandomInt(carImages.length)]).size(50, 25).cx(road.x()).cy(getRandomInt(height / 2) + height / 2);
    car.click(e => {
        if (action == 4) {
            carsRight.shift(car);
            car.remove()
            let audio = new Audio('explosion.mp3');
            audio.play();

        }
    });
    carsRight[carsRight.length] = car;
    carMove(0)
}
let startTime = 0;
const vx = 4;
const vy = 0;
function carMove(time) {
    let dt = (time - startTime) / 100;
    startTime = time;
    cars.forEach(function (car, index, array) {
        car.dmove(-vx * dt, vy * dt);
        overunLeft(car);
        colision(car)
    })
    carsRight.forEach(function (car, index, array) {
        car.dmove(vx * dt, vy * dt);
        overunRight(car);
        colision(car)
    })


    requestAnimationFrame(carMove);
}
carloadRight();
carloadLeft()
setTimeout(e => {
    carloadLeft()
    carloadRight()
}, 5000)
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function overunLeft(car) {
    if (car.cx() <= road.x()) {
        cars.shift(car)
        car.remove();
        setTimeout(e => {
            carloadLeft()
        }, getRandomInt(40) * 1000);
    }
}
function overunRight(car) {
    if (car.cx() >= road.x() + width) {
        carsRight.shift(car)
        car.remove();
        setTimeout(e => {
            carloadRight()
        }, getRandomInt(40) * 1000);
    }
}
function colision(car) {
    potatoes.forEach(function (potatoe, index, array) {
        const cx = potatoe.svg.cx();
        const cy = potatoe.svg.cy();
        if (cy + potatoe.svg.height() / 2 >= car.height() && cx > car.x() && cx < car.cx() + car.width()) {
            potatoes.shift(potatoe);
            potatoe.svg.remove();
            console.log("col")
        }
    })
}