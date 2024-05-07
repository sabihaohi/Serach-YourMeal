//show all category food
const allitem = ()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res=>res.json())
    .then(data => allitemshow(data.categories))
}

 const allitemshow = (categories) =>{
    //console.log(categories);
    const allfoods = document.getElementById('allFoods');
    allfoods.innerHTML ='';
    categories.forEach(categorie => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick= loadcategoryDetail('${categorie.strCategory}') class="card">
              <img src="${categorie.strCategoryThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${categorie.strCategory}</h5>
              </div>
           </div>
        `;
        allfoods.appendChild(div);
    });
 }
allitem();



//see specific category food
const loadcategoryDetail = categoryName =>{
    const url =`https://www.themealdb.com/api/json/v1/1/filter.php?c=`+categoryName
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySpecificCtageoris(data.meals));

}

const displaySpecificCtageoris= specificcategories =>{
    //clear all catagory food item
    const allfoods = document.getElementById('allFoods');
    allfoods.innerHTML ='';


    const specificcategory = document.getElementById('specificcategory');
    specificcategory.innerHTML='';
    specificcategories.forEach(specificcategoryitem =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div onclick=loadMealDetail(${specificcategoryitem.idMeal}) class="card">
              <img src="${specificcategoryitem.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${specificcategoryitem.strMeal}</h5>
              </div>
           </div>
        `;
        specificcategory.appendChild(div);
    })
        
}


//searchfood
const searchfood = () =>{
    const searchfield = document.getElementById('seachField');
    const seachFieldvalue = searchfield.value;
    searchfield.value='';
    //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seachFieldvalue}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals =>{
      //clear specific category food
    const specificcategory = document.getElementById('specificcategory');
    specificcategory.innerHTML='';
   
    //clear all category food
     const allfoods = document.getElementById('allFoods');
    allfoods.innerHTML ='';

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick=loadMealDetail(${meal.idMeal}) class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                 <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
              </div>
           </div>
        `;
        allfoods.appendChild(div);
    });
}

//single food description

const loadMealDetail =(mealId)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data =>displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal =>{
    console.log(meal);
     //clear specific category food
    const specificcategory = document.getElementById('specificcategory');
    specificcategory.innerHTML='';
   
    //clear all category food
     const allfoods = document.getElementById('allFoods');
    allfoods.innerHTML ='';


    const mealdetails = document.getElementById('meal-details');
    mealdetails.innerHTML ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5>${meal.strMeal}</h5>
            <p>${meal.strInstructions}.</p>
            <button onclick=${meal.strSource} class="bg-success p-2">Check out the video</button>
        </div>
    `;
    mealdetails.appendChild(div);
}

