// variables
var mealList = document.querySelector(".meals-container"),
  searchInput = document.querySelector(".search-field"),
  searchBtn = document.querySelector(".search-btn"),
  recipe = document.querySelector(".recipe"),
  recipeCloseBtn = document.querySelector(".recipe-close-btn");

// get meal list
function getMeals() {
  let searchText = searchInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then((response) => response.json())
    .then((myJson) => {
      let html = "";
      if (myJson.meals) {
        myJson.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
               <img src="${meal.strMealThumb}">
              </div>
               <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <button class="recipe-btn">
                  Get Recipe 
                </button>
              </div>
            </div>
        `;
        });
      } else {
        html = `<p class="not-found">
      Sorry, we didn't find any meal!
      </p>`;
      }
      mealList.innerHTML = html;
    });
}

getMeals();

searchBtn.addEventListener("click", getMeals);

// create a modal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
      <h2 class="recipe-title">${meal.strMeal}</h2>
      <p class="recipe-category">${meal.strCategory}</p>
      <div class="recipe-instruct">
        <h3> Instructions: </h3>
        <p> ${meal.strInstructions} </p>
      </div>
      <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}">
      </div>
      <div class="recipe-link">
      <iframe width="315" height="315" src="https://www.youtube.com/embed/nMyBC9staMU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </div>      
  `;
  recipe.innerHTML = html;
  recipe.parentElement.classList.add("show-recipe");
}

// showe and hide the recipe
mealList.addEventListener("click", getMealRecipe);

recipeCloseBtn.onclick = () => {
  recipe.parentElement.classList.remove("show-recipe");
};
