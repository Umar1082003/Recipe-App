let searchInp = document.getElementById('search-inp');
let searchBtn = document.getElementById('search-btn');
let contentArea = document.querySelector(".content-area");
let recipeDetails = document.querySelector(".recipe-details");

searchBtn.addEventListener("click", getRecipe)
contentArea.addEventListener("click", getRecipeDetails)
recipeDetails.addEventListener("click", closeRecipeDetails)

function getRecipe () {
    let inpValue = searchInp.value.trim();
    let apiurl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inpValue}`
    fetch(apiurl)
    .then((res) => {
        if(res.ok) return res.json();
        console.log(res);
    })
    .then((data) => {
        displayRecipes(data)        
    })
}

function displayRecipes(recipes) {
    contentArea.innerHTML = ''
    if (recipes.meals == null) {
        contentArea.innerHTML = 'No Data'
    }else {
        recipes.meals.forEach((recipe) => {
        contentArea.innerHTML += 
        `         
            <div class="cart">
                <div class="img">
                    <img src=${recipe.strMealThumb} alt="#">
                </div>
                <div class="cart-details">
                    <h3>${recipe.strMeal}</h3>
                    <button class="recipe-btn" data-id=${recipe.idMeal}>get recipe</button>
                </div>      
            </div>
        `
    });
    }
}

function getRecipeDetails(e) {
        if(e.target.classList.contains('recipe-btn')) {
            let id = e.target.getAttribute('data-id');
            let apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            fetch(apiURL)
            .then((res) => res.json())
            .then((data) => {
                displayRecipeDetails(data)
            })
        } 
}

function displayRecipeDetails(recipeItem) {
    let item = recipeItem.meals[0];
    
    recipeDetails.innerHTML = ''
    recipeDetails.innerHTML = `
            <i class="fas fa-times"></i>
            <h2>${item.strMeal}</h2>
            <p>Instructions:</p>
            <p>${item.strInstructions}</p>
            <a href=${item.strYoutube}>watch video</a>
    `
    if (recipeDetails.innerHTML !== '') {
        recipeDetails.classList.remove('showDetails')
    }
}
function closeRecipeDetails(e) {
    if(e.target.classList.contains('fa-times')) {
        e.target.parentElement.classList.add('showDetails')
    }
    
}