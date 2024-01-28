///<reference types="../@types/jquery" />

let categoriesData=[];
let areaData=[];
let ingrediantsMainData=[];
let ingrediantData=[];
let clickedMainIngrediantData=[];
let clickedIngrediantData=[];

let mainIngrediantCol=``;
let mainIngrediantDetailsCol=``;
let ingrediantDetailsCol=``;
let categoryCol=``;
let areaCol=``;
let ingrediantCol=``;
let recipesDetails = ``
let mealName=''
let idMeal=0;

// هنا بجيب ال Api //
async function mainIngredientApi() {
    let categoriesResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalCategoriesResponse = await categoriesResponse.json();
    categoriesData=finalCategoriesResponse.categories;
    // console.log(categoriesData);
    
    let areaResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let finalAreaResponse = await areaResponse.json();
    areaData=finalAreaResponse.meals;
    // console.log(" areaData ",areaData);

    // let ingrediantMainResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`);
    // let finalingrediantMainResponse = await ingrediantMainResponse.json();
    // ingrediantsMainData=finalingrediantMainResponse.meals;
    // // console.log(" ingrediantsMainData ",ingrediantsMainData);

    let ingrediantResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalingrediantResponse = await ingrediantResponse.json();
    ingrediantData=finalingrediantResponse.meals;
    // console.log(" ingrediantData ",ingrediantData);
}


//  هنا انا بحضر الاي بي اي بتاع الميل الواحدة  //
async function singleItemDetails(idMeal){    
    let clickedMainIngrediantResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let finalClickedMainIngrediantResponse = await clickedMainIngrediantResponse.json();
    clickedMainIngrediantData=finalClickedMainIngrediantResponse.meals[0];
}
// هنا عشان اعرض تفاصيل المنتج //
function onItemClick() {
$('.card-info').on('click',async function(e){
    $('#ingrediantsDetails').toggleClass('d-none');
    $('#details').toggleClass('d-none');

    let currentIdMeal= $(e.currentTarget).find('.idMeal').html();
    await singleItemDetails(currentIdMeal)

    for (let i = 1; i <= 20; i++) {
        if (clickedMainIngrediantData[`strIngredient${i}`]) {
            recipesDetails += `<li class="alert alert-info m-2 p-1">${clickedMainIngrediantData[`strMeasure${i}`]} ${clickedMainIngrediantData[`strIngredient${i}`]}</li>`
        }}

    mainIngrediantDetailsCol +=`
        <div class="col-md-4">
        <div class="img">
        <img class="w-100 rounded-3" src="${clickedMainIngrediantData.strMealThumb}" alt="img">
        <h2 class="text-center my-4">${clickedMainIngrediantData.strMeal}</h2>
        </div></div>
        <div class="col-md-8">
        <div class="details">
        <h4 class="fw-bold">Instructions : </h4>
        <p class="card-text">${clickedMainIngrediantData.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${clickedMainIngrediantData.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${clickedMainIngrediantData.strCategory}</h3>
        <h4 class="fw-bold">Recipes : </h4>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${recipesDetails}</ul>
        <a target="_blank" href="${clickedMainIngrediantData.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${clickedMainIngrediantData.strYoutube}" class="btn btn-danger">Youtube</a>
        </div></div>
        `
    $('#details .row').html( mainIngrediantDetailsCol )
})
}

// هنا انا بعرض ال categories //
async function displayCategory() {
    for(let i=0;i<categoriesData.length;i++){
        categoryCol+=`        
        <div class="col-md-3 cat">
        <div class="cat-item">
        <div class="card">
        <img src="${categoriesData[i].strCategoryThumb}" class="card-img-top" alt="...">
        <div class="card-body category-info">
        <div class="inner">        
        <h4 class="card-text cat-info"> ${categoriesData[i].strCategory} </h4>
        <p class="card-text"> ${categoriesData[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
        </div></div></div></div></div>
        `
    }
    $('#categories .row').html(categoryCol);
    await onCatClick()
}

// هنا لما اضغط ع الكاتيجوري الواحدة عشان اعرض بياناتها //
async function onCatClick() {
        $('.cat').on('click',async function(e){
            let currentcatName= $(e.currentTarget).find('.cat-info').html();
            let catName = currentcatName;
            console.log(catName);
            return catName
        })
    }

//  هنا انا بحضر الاي بي اي بتاع الكاتيجوري الواحدة  //
async function singleClickedCatDetails(){
    let resultcat=catName;
    console.log(catName);
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${resultcat}`)
    let finalAreaResponse = await areaResponse.json();
    let z =await finalAreaResponse.meals;
    console.log(finalAreaResponse);
}

// هنا بعرض ال ingrediant //
async function displayIngrediant(){
    for(let i=0;i<20;i++){
        ingrediantCol+=`        
        <div class="col-md-3 ingrediant-info">
        <div class="type text-center fs-1 text-white">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h4 class="fs-1 ingrediantName">${ingrediantData[i].strIngredient}</h4>
            <p class="fs-5">${ingrediantData[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
        `
    $('#ingredients .row').html(ingrediantCol);
    }
}

let xx=``
//  هنا انا بحضر الاي بي اي بتاع الميل كلها  //
async function allItemsDetails(mealName) {
    let ingrediantMainResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`);
    let finalingrediantMainResponse = await ingrediantMainResponse.json();
    ingrediantsMainData=finalingrediantMainResponse.meals;
    // console.log(" ingrediantsMainData ",ingrediantsMainData);
    xx=await ingrediantsMainData;
}

//  هنا انا بحضر الاي بي اي بتاع الميل الواحدة  //
async function singleAreaDetails(idMeal){    
    let clickedAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let finalClickedAreaResponse = await clickedAreaResponse.json();
    clickedAreaData=finalClickedAreaResponse.meals[0];
    console.log(clickedAreaData);
}
// هنا بعرض ال area //
async function displayArea() {
    for(let i=0;i<areaData.length;i++){
        areaCol+=`        
        <div class="col-md-3 area">
        <div class="city text-center fs-1 text-white">
            <i class="fa-solid fa-flag"></i>
            <h4 class="fs-1 area-info"> ${areaData[i].strArea} </h4>
        </div>
    </div>
        `
    }
    $('#area .row').html(areaCol);
    await onAreaClick();
}

// هنا لما اضغط ع الاريا الواحدة عشان اعرض بياناتها //
function onAreaClick() {
    $('.area').on('click',async function(e){
        let currentAreaName= $(e.currentTarget).find('.area-info').html();
        let areaName = currentAreaName;
        console.log(areaName);
        return areaName
})}
//  هنا انا بحضر الاي بي اي بتاع الاريا الواحدة  //
async function singleClickedAreaDetails(){
    console.log(areaResult);
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    let finalAreaResponse = await areaResponse.json();
    let z =await finalAreaResponse.meals;
    console.log(finalAreaResponse);
    // let areasName = onAreaClick();
}

// هنا لما اضغط ع الانجرديانت الواحدة عشان اعرض بياناتها //
function onIngrediantClick() {
    $('.ingrediant-info').on('click',async function(e){
        let currentIngrediantName= $(e.currentTarget).find('.ingrediantName').html();
        mealName = currentIngrediantName;
        console.log(mealName);
        // await allItemsDetails(mealName);
        // $('#ingredients').addClass("d-none");
        // $('#ingrediantsDetails').removeClass("d-none");
})}

// هنا انا بعرض المنتجات كلها //
async function displayIngrediants(){
    await allItemsDetails(mealName);
    for(let i=0;i<28;i++){
        mainIngrediantCol+=`            
            <div class="col-md-3">
                <div class="item">
                    <div class="card">
                        <img src="${ingrediantsMainData[i].strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body card-info">
                        <p class="card-text "> ${ingrediantsMainData[i].strMeal} </p>
                        <p hidden class="idMeal">${ingrediantsMainData[i].idMeal}</p>
                        </div></div></div></div>
            `
}
$('#ingrediantsDetails .row').html(mainIngrediantCol);
}

// هنا لما الصفحة تحمل //
$(async function(){
    // await singleClickedAreaDetails()
    // await singleAreaDetails()
//  هنا بشغل الفنكشن //
// async function getData(){
    await mainIngredientApi();
    await onHomeDisplay();
// }
// getData();

// هنا لما بضغط ع ناف بار //
function onAsideIconClick(){
        $('.toggled').animate({width:'toggle'},600);
        $('.links').slideToggle(300)
        $('.toggledIcon').toggleClass('fa-bars','fa-x');
        $('.toggledIcon').toggleClass('fa-x','fa-bars');
    }
$('.closeIcon').on('click',function () {onAsideIconClick()})

// لما بضغط ع زرار السيرش //
$('#aside .search').on('click',async function(){
    $('#search').removeClass("d-none");
    $('#search').siblings().addClass('d-none');
    onAsideIconClick()
    $('.searchByNameInput').on('input',async function(){
    await searchByName()
    })
    $('.searchByFirstLetterInput').on('input',async function(){
        await searchByLetter()
        })

})

// لما بضغط ع ايقون الهوم//
$('.back-home , .close-icons img').on('click',function(){window.location.reload();})

// لما بضغط ع زرار الكاتيجوري //
$('#aside .categories').on('click',async function(){
    $('#categories').removeClass("d-none");
    $('#categories').siblings().addClass('d-none');
    onAsideIconClick()
    await displayCategory();
    // $('#categories .row').html(categoryCol);
})

// هنا لما الهوم تشتغل //
async function onHomeDisplay(){
    await displayIngrediants()
    $('#ingrediantsDetails').removeClass('d-none');
    onItemClick();
}

// هنا لم بضغط ع زرار الاريا //
$('#aside .area').on('click',async function(){
$('#area').removeClass("d-none");
$('#area').siblings().addClass('d-none');
onAsideIconClick();
await displayArea();
// $('#area .row').html(areaCol);
    // await singleClickedAreaDetails()
})

// هنا لم بضغط ع زرار الانجريديانت //
$('#aside .ingrediants').on('click',async function(){
$('#ingredients').removeClass("d-none");
$('#ingredients').siblings().addClass('d-none');
onAsideIconClick()
await displayIngrediant();
// $('#ingredients .row').html(ingrediantCol);
await onIngrediantClick();
})

// هنا لما بضغط ع زرار الكونتكت //
$('#aside .contactUs').on('click',function () {
$('#contactUs').removeClass("d-none");
$('#contactUs').siblings().addClass('d-none');
onAsideIconClick()

})

});
//   في السيرش بالاسم//

async function searchByName() {
    let name= $('.searchByNameInput').val()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    let res=await response.meals ;
    console.log(res);
    $('#ingrediantsDetails').removeClass("d-none");
    $('#ingrediantsDetails .row').html(res)
}


async function searchByLetter() {
    let letter= $('.searchByFirstLetterInput').val()
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    let letterres=await response.meals ;
    console.log(letterres);
    $('#ingrediantsDetails').removeClass("d-none");
    $('#ingrediantsDetails .row').html(res)
}