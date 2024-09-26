import cocktails from "./cocktails.json" with { type: 'json' };

var currentLiquorSelected = null

function createCocktailCard(liquor, cocktail) {
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
    Object.assign(drinkDetailsButton, {href: "#", className: "btn btn-primary"})
    drinkDetailsButton.innerHTML = "Drink Details"

    cardBodyDiv.append(cardTitle, description, drinkDetailsButton)
    cardDiv.append(img, cardBodyDiv)

    return cardDiv
}

function listDrinks(liquor) {
    if (currentLiquorSelected !== liquor){
        currentLiquorSelected = liquor

        document.querySelector("#cocktail-list").remove()
        var list = document.createElement("section")
        list.setAttribute("id", "cocktail-list")

        var liquorDrinks = cocktails[liquor]
        for (var cocktail in liquorDrinks){
            var card = createCocktailCard(liquor, cocktail)
            list.appendChild(card)
        }

        document.querySelector("main").appendChild(list)
    }
}

function loadLiquorButtons() {
    const liquors = Object.keys(cocktails)
    const liquorButtonSection = document.querySelector("#liquor-buttons")
    liquors.forEach((liquor) => {
        let button = document.createElement("button")
        button.classList.add("liquor", "btn", "btn-info")
        Object.assign(button, {
            id: liquor,
            value: liquor,
            textContent: liquor, 
            onclick: () => listDrinks(liquor),
            onmouseenter: (event) => {},
            onmouseleave: (event) => {}
        })
        liquorButtonSection.appendChild(button)
    })
}

loadLiquorButtons()
