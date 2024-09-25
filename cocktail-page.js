import cocktails from "./cocktails.json" with { type: 'json' };

var currentLiquorSelected = null
const liquors = document.querySelectorAll(".liquor")

liquors.forEach((liquor) => {
    liquor.addEventListener("click", () => {listDrinks(liquor.value)}, false)
    liquor.addEventListener("mouseenter", function( event ) {}, false);
    liquor.addEventListener("mouseleave", function( event ) {}, false);
})

function listDrinks(liquor) {
    if (currentLiquorSelected !== liquor){
        currentLiquorSelected = liquor

        document.getElementById("cocktail-details").remove()
        var details = document.createElement("section")
        details.setAttribute("id", "cocktail-details")

        var liquorDrinks = cocktails[liquor]
        for (var cocktail in liquorDrinks){
            var card = createCocktailCard(liquor, cocktail)
            details.appendChild(card)
        }

        document.getElementById("main-column").appendChild(details)
    }
}

function createCocktailCard(liquor, cocktail) {
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card")

    var img = document.createElement("img")
    Object.assign(img, {className: "card-img-top", src: cocktails[liquor][cocktail].img, alt: "Cocktail Image"})

    var cardBodyDiv = document.createElement("div")
    cardBodyDiv.setAttribute("class", "card-body")

    var cardTitle = document.createElement("h5")
    cardTitle.innerHTML = cocktail

    var description = document.createElement("p")
    description.innerHTML = cocktails[liquor][cocktail].description

    var drinkDetailsButton = document.createElement("a")
    Object.assign(drinkDetailsButton, {href: "#", className: "btn btn-primary"})
    drinkDetailsButton.innerHTML = "Drink Details"

    cardBodyDiv.innerHTML += cardTitle.outerHTML + description.outerHTML + drinkDetailsButton.outerHTML
    cardDiv.innerHTML += img.outerHTML + cardBodyDiv.outerHTML

    return cardDiv
}
