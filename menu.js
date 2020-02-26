display();
$(document).on("submit", "#make", e => {
    e.preventDefault();
    const option = document.getElementById("make_option").selectedIndex;
    const many = parseInt($("#make_input").val());
    const potatoes = getPotatoes();
    switch (option) {
        case (0): {
            if (many <= potatoes / 5) {
                const frites = getFrites();
                setPotatoes(potatoes - 5 * many);
                setFrites(frites + many);
            }
            else {
                alert("Máte málo brambor");
            }
            break;
        }
        case (1): {
            if (many <= potatoes / 3) {
                const soup = getSoup();
                setPotatoes(potatoes - 3 * many);
                setSoup(soup + many);
            }
            else {
                alert("Máte málo brambor");
            }
            break;
        }
    }
    display();
});
$(document).on("submit", "#sell", e => {
    e.preventDefault();
    const option = document.getElementById("sell_option").selectedIndex;
    const many = parseInt($("#sell_input").val());
    const money = getMoney();
    switch (option) {
        case (0): {
            const frites = getFrites();
            if (many <= frites) {
                setFrites(frites - many);
                setMoney(money + 60 * many);
            }
            else {
                alert("Máte málo hranolek");
            }
            break;
        }
        case (1): {
            const soup = getSoup();
            if (many <= soup) {
                setSoup(soup - many);
                setMoney(money + 35 * many);
            }
            else {
                alert("Máte málo bramboračky");
            }
            break;
        }
        case(2):{
            const potatoes = getPotatoes();
            if(many <= potatoes){
                setPotatoes(potatoes - many);
                setMoney(money + 10 * many);
            }
            else{
                alert("Máte málo brambor")
            }
        }
    }
    display();
})
$(document).on("submit", "#buy", e => {
    e.preventDefault();
    const option = document.getElementById("buy_option").selectedIndex;
    const money = getMoney();
    const many = parseInt($("#buy_input").val());
    switch(option){
        case(0):{
            if (many <= money/4){
                const seeds = getSeeds();
                setMoney(money - 4*many);
                setSeeds(seeds + many);
            }
            else{
                alert("Máte málo peněz")
            }
            break;
        }
        
    }
    display();
})
function display() {
    $("#potatoes").text(getPotatoes);
    $("#frites").text(getFrites);
    $("#soup").text(getSoup);
    $("#seeds").text(getSeeds);
    $("#money").text(getMoney);
}