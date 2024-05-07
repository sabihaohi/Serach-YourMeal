
const allitem = ()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res=>res.json())
    .then(data => allitemshow(data.categories))
}

 const allitemshow = (categories) =>{
    const allfoods = document.getElementById('allFoods');
    categories.forEach(categorie => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
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
 

const searchfood = () =>{
    const searchfield = document.getElementById('seachField');
    const seachFieldvalue = searchfield.value;

    console.log(seachFieldvalue);
    //clear data
    searchfield.value='';


    if(seachFieldvalue==''){
       alert('write something to display')
    }
    else{

          //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seachFieldvalue}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))

    }
  

    
}

const displaySearchResult = meals =>{
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
    const mealdetails = document.getElementById('meal-details');
    mealdetails.innerHTML ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5>${meal.strMeal}</h5>
            <p>${meal.strInstructions}.</p>
        </div>
    `;
    mealdetails.appendChild(div);
}