if(getPotatoes() == 0 && getFrites() == 0 && getSoup() == 0 && getSeeds() == 0 && getMoney()<4){
    setElements();
}

function setElements(potatoes = 0, frites = 0, soup = 0, seeds = 20, money = 0) {
    setPotatoes(potatoes);
    setFrites(frites);
    setSoup(soup);
    setSeeds(seeds);
    setMoney(money);
}
function setPotatoes(potatoes = 0) {
    if (potatoes >= 0) {
        localStorage.setItem("potatoes", potatoes);
    }
}
function setFrites(frites) {
    if (frites >= 0) {
        localStorage.setItem("frites", frites);
    }
}
function setSoup(soup) {
    if (soup >= 0) {
        localStorage.setItem("soup", soup);
    }
}
function setSeeds(seeds = 0) {
    if (seeds >= 0) {
        localStorage.setItem("seeds", seeds);
    }
}
function setMoney(money) {
    if (money >= 0) {
        localStorage.setItem("money", money);
    }
}

function getPotatoes() {
    return parseInt(localStorage.getItem("potatoes"));
}
function getFrites() {
    return parseInt(localStorage.getItem("frites"));
}
function getSoup() {
    return parseInt(localStorage.getItem("soup"));
}
function getSeeds() {
    return parseInt(localStorage.getItem("seeds"));
}
function getMoney() {
    return parseInt(localStorage.getItem("money"));
}