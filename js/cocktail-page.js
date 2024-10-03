import cocktails from "../cocktails.json" with { type: 'json' };
import { openDetails } from "./load-cocktail-details.js";


var currentLiquorSelected = null

const createCocktailCard = function(liquor, cocktail) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card")

    var img = document.createElement("img")
    Object.assign(img, {className: "card-img-top", src: cocktails[liquor][cocktail].img, alt: `Image of ${cocktail} cocktail`})

    var cardBodyDiv = document.createElement("div")
    cardBodyDiv.classList.add("card-body")

    var cardTitle = document.createElement("h5")
    cardTitle.innerHTML = cocktail

    var description = document.createElement("p")
    description.innerHTML = cocktails[liquor][cocktail].description

    var drinkDetailsButton = document.createElement("a")
    Object.assign(drinkDetailsButton, {
        href: "javascript:void(0);",    // Prevent default scroll to the top behavior when cocktail details window is opened
        className: "btn btn-primary", 
        onclick: () => openDetails(liquor, cocktail)
    })
    drinkDetailsButton.innerHTML = "Drink Details"

    cardBodyDiv.append(cardTitle, description, drinkDetailsButton)
    cardDiv.append(img, cardBodyDiv)

    return cardDiv
}

const listDrinks = function(liquor) {
    if (currentLiquorSelected !== liquor){
        currentLiquorSelected = liquor

        var list = document.querySelector("#cocktail-list")
        list.innerHTML = ""

        var liquorDrinks = cocktails[liquor]
        for (var cocktail in liquorDrinks){
            var card = createCocktailCard(liquor, cocktail)
            list.appendChild(card)
        }

        document.querySelector("main").appendChild(list)
    }
}

const addButtonImage = function(liquor) {
    let img = document.createElement("img");
    img.classList.add("button-img")
    img.src = `./imgs/button-imgs/${liquor}.png`
    return img
}

const loadLiquorButtons = function() {
    const liquors = Object.keys(cocktails)
    const liquorButtonSection = document.querySelector("#liquor-buttons")
    liquors.forEach((liquor) => {
        let button = document.createElement("button")
        button.classList.add("liquor", "btn", "btn-info")
        Object.assign(button, {
            id: liquor,
            value: liquor,
            textContent: liquor,
            onclick: () => listDrinks(liquor)
        })
        button.appendChild(addButtonImage(liquor))
        liquorButtonSection.appendChild(button)
    })
}

loadLiquorButtons();