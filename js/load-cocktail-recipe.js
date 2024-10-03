import cocktails from "../cocktails.json" with { type: 'json' };


const loadCocktailRecipe = function(liquor, cocktail) {
    const cocktailRecipeSection = document.querySelector(".cocktail-recipe");
    const cocktailRecipeInfo = cocktails[liquor][cocktail]

    cocktailRecipeSection.innerHTML = "<span id='btn-close'>&times;</span>"    // Button to close the window
    document.querySelector("#btn-close").addEventListener("click", closeRecipe)
    document.querySelector(".overlay").addEventListener("click", closeRecipe)      // Close the window if key pressing on background overlay as well

    let recipeContentDiv = document.createElement("div")
    recipeContentDiv.setAttribute("id", "recipe-content")

    let cocktailTitle = document.createElement("h2")
    cocktailTitle.textContent = cocktail

    let ingredientTitle = document.createElement("h5")
    ingredientTitle.textContent = "Ingredients:"

    let ingredientsList = document.createElement("ul")
    cocktailRecipeInfo.ingredients.forEach((ingredient) => {
        let ingredientItem = document.createElement("li")
        ingredientItem.textContent = ingredient
        ingredientsList.appendChild(ingredientItem)
    })

    let directionsTitle = document.createElement("h5")
    directionsTitle.textContent = "Directions:"

    let directionsList = document.createElement("ol")
    cocktailRecipeInfo.directions.forEach((step) => {
        let stepItem = document.createElement("li")
        stepItem.textContent = step
        directionsList.appendChild(stepItem)
    })

    recipeContentDiv.append(ingredientTitle, ingredientsList, directionsTitle, directionsList)
    cocktailRecipeSection.append(cocktailTitle, recipeContentDiv)
}

const closeRecipe = function() {
    document.querySelector(".cocktail-recipe").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector("body").classList.remove("scroll-stop")     // Allow scrolling again when cocktail recipe modal closes
}

export const openRecipe = function(liquor, cocktail) {
    document.querySelector(".cocktail-recipe").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector("body").classList.add("scroll-stop")   // Prevent scrolling when cocktail recipe modal opens
    loadCocktailRecipe(liquor, cocktail)
}