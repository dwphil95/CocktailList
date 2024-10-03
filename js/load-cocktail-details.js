import cocktails from "../cocktails.json" with { type: 'json' };


const loadCocktailDetails = function(liquor, cocktail) {
    const cocktailDetailsSection = document.querySelector(".cocktail-details");
    const cocktailDetailsInfo = cocktails[liquor][cocktail]

    cocktailDetailsSection.innerHTML = "<span id='btn-close'>&times;</span>"    // Button to close the window
    document.querySelector("#btn-close").addEventListener("click", closeDetails)
    document.querySelector(".overlay").addEventListener("click", closeDetails)      // Close the window if key pressing on background overlay as well

    let detailContentDiv = document.createElement("div")
    detailContentDiv.setAttribute("id", "detail-content")

    let cocktailTitle = document.createElement("h2")
    cocktailTitle.textContent = cocktail

    let ingredientTitle = document.createElement("h5")
    ingredientTitle.textContent = "Ingredients:"

    let ingredientsList = document.createElement("ul")
    cocktailDetailsInfo.ingredients.forEach((ingredient) => {
        let ingredientItem = document.createElement("li")
        ingredientItem.textContent = ingredient
        ingredientsList.appendChild(ingredientItem)
    })

    let directionsTitle = document.createElement("h5")
    directionsTitle.textContent = "Directions:"

    let directionsList = document.createElement("ol")
    cocktailDetailsInfo.directions.forEach((step) => {
        let stepItem = document.createElement("li")
        stepItem.textContent = step
        directionsList.appendChild(stepItem)
    })

    detailContentDiv.append(ingredientTitle, ingredientsList, directionsTitle, directionsList)
    cocktailDetailsSection.append(cocktailTitle, detailContentDiv)
}

const closeDetails = function() {
    document.querySelector(".cocktail-details").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector("body").classList.remove("scroll-stop")     // Allow scrolling again when cocktail details modal closes
}

export const openDetails = function(liquor, cocktail) {
    document.querySelector(".cocktail-details").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector("body").classList.add("scroll-stop")   // Prevent scrolling when cocktail details modal opens
    loadCocktailDetails(liquor, cocktail)
}