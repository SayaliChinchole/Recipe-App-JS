const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
    //Lookup a single random meal - api frpm TheMealDB
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const responseData = await resp.json();
    const randomMeal = responseData.meals[0];

    console.log(randomMeal);

    addMeal(randomMeal, true);
    //loadRandomMeal();
}

async function getMealById(id) {
    //Lookup full meal details by id - api frpm TheMealDB
    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
}

async function getMealsBySearch(term) {
    //Search meal by name - api frpm TheMealDB
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
        ${random ? `
            <span class="random">Random Recipes</span>` : ''}
            <img src="${mealData.strMealThumb}" 
                alt="${mealData.strMeal}">
        </div>
        <div class="meal-body ">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"> 
                <i class="fas fa-heart"></i>
            </button>
        </div> `;

    const btn = meal.querySelector('.meal-body .fav-btn');
   // console.log("classlist before:", btn.classList);
   
    const mealIds = getMealsFromLS();
    console.log("mealIds",mealIds);

    console.log("mealId:",mealData.idMeal );
    if(mealIds.includes(mealData.idMeal)){
        btn.classList.add("active");
        console.log("Already in favs:",mealData.idMeal );
    }


    // if (btn.classList.contains("active")) {
    //     removeMealFromLS(mealData.idMeal);
    //     btn.classList.remove("active");
    // } else {
    //     addMealToLS(mealData.idMeal);
    //     btn.classList.add("active");

    // }
    btn.addEventListener("click", () => {
        
        console.log("classlist before:", btn.classList);

    if (btn.classList.contains("active")) {
        removeMealFromLS(mealData.idMeal);
        //btn.classList.remove("active");
        console.log("mealIds",mealIds);
    } else {
        addMealToLS(mealData.idMeal);
       // btn.classList.add("active");

     }

        btn.classList.toggle("active");
        console.log("classlist after:", btn.classList);
        
    });

    meals.appendChild(meal);
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds',
        JSON.stringify([...mealIds, mealId]));

}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();

    var index = mealIds.indexOf(mealId);
    if (index > -1) {
        mealIds.splice(index, 1);
    }

    // localStorage.setItem('mealIds',
    //     JSON.stringify(mealIds.filter(x => x.id !== mealId)));
    
    localStorage.setItem('mealIds',
         JSON.stringify(mealIds));

    const mealIdsr = getMealsFromLS();
    console.log("mealIdsr in remove f:",mealIdsr)
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.
        getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}