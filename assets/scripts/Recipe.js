//Click button function
var url = ""
var urlDrink = ""
var ingredients = new Array()
var Drinkingredients = new Array()
var Dish = ""
var imgURL = ""
var Diskimg = ""
var firstarray = ""
var secondarray = ""
var Drink = ""

$(".afterClick").hide();

$(".searchfoodbutton").on("click", function(event)
{
  event.preventDefault();
  url = "https://api.yummly.com/v1/api/recipes?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c" + "&q=" + $(".searchfood").val() +"&requirePictures=true" + "&maxResult=10&start=10";
  getfoodAPI();
})

$(".searchdrinkbutton").on("click", function(event)
{
  event.preventDefault();
  urlDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $(".searchdrink").val();
  getdrinkAPI();
})

//click on pictures function
$(document).on("click", "img.icon", function() 
{  
  $('.RecipePicture').empty()
  $('.DrinkPicture').empty()
  $(".afterClick").show();
  $(".Searchcontainer").hide();
  Dish = $(this).attr("data-nameofDish");
  imgURL = $(this).attr("data-ImageofDish");
  firstarray = $(this).attr("data-ingre");
  secondarray = $(this).attr("data-ingre2");
  Drink = $(this).attr("data-nameofDrink");
  Diskimg = $(this).attr("src");
  
  FoodRecipe(); 
  CocktailRecipe();
})

//get API and add images, rating in html
function getfoodAPI()
{
  fetch(url)     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      $('.RecipePicture').empty()
      $('.DrinkPicture').empty()
      for(i = 0; i<10; i++)
      {
        Dish = data.matches[i].recipeName;
        var imgDiv = $("<li>");
        imgURL = data.matches[i].imageUrlsBySize["90"]; 
        ingredients[i] = data.matches[i].ingredients;
        var rate = $("<h4>").text("Rating: " + data.matches[i].rating);  
        var time = $("<h4>").text("Cook Time: " +data.matches[i].totalTimeInSeconds);  
        var image = $("<img>");
        image.attr("src", imgURL);
        image.attr("class", "icon");
        image.attr("data-ingre", i)
        image.attr("data-nameofDish", Dish);
        image.attr("data-ImageofDish", imgURL);
        imgDiv.append(rate);;
        imgDiv.append(time);
        imgDiv.append(image);
        $(".RecipePicture").prepend(imgDiv);
      } 
    }) 

  .catch(function(err) {
      console.error('Fetch Error :-S', err);
    });
}

function getdrinkAPI()
{
  fetch(urlDrink)     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      $('.RecipePicture').empty()
      $('.DrinkPicture').empty()
      for(i = 0; i<10; i++)
      {
        Drink = data.drinks[i].strDrink;
        var imgDiv = $("<li>");
        Diskimg = data.drinks[i].strDrinkThumb; 
        Drinkingredients[i] = [data.drinks[i].strIngredient1,data.drinks[i].strIngredient2,data.drinks[i].strIngredient3,
        data.drinks[i].strIngredient4,data.drinks[i].strIngredient5,data.drinks[i].strIngredient6,data.drinks[i].strIngredient7,
        data.drinks[i].strIngredient8,data.drinks[i].strIngredient9,data.drinks[i].strIngredient10]
        var category = $("<h4>").text(data.drinks[i].strCategory); 
        var image = $("<img>");
        image.attr("src", Diskimg);
        image.attr("class", "icon");
        image.attr("data-ingre2", i);
        image.attr("data-nameofDrink", Drink);
        imgDiv.append(category);
        imgDiv.append(image);
        $(".DrinkPicture").prepend(imgDiv);
      }
    })
    .catch(function(err) {
        console.error('Fetch Error :-S', err);
      });
}

  function FoodRecipe() {
    fetch(url)  
        .then(function (r) {
            return r.json();
        })
        .then(function (data) {           
            var nameofFoodDiv = $("<div>")
            var foodPic = $("<div>")
            var liDiv = $("<li>")
            var dish = $("<h2>").text(Dish);
            var image = $("<img>");
            image.attr("src", imgURL);
            nameofFoodDiv.append(dish);
            foodPic.append(image);
            for(i = 0; i <10; i++)
            {
              if(ingredients[firstarray][i] != null)
              {
                liDiv.append(ingredients[firstarray][i] + ", ");
              }
            }
            $(".specificRecipe").prepend(nameofFoodDiv);
            $(".foodPic").prepend(foodPic)
            $(".ingredientList").prepend(liDiv)
            })  
        .catch(function (err) {
            console.error('Fetch Error :-S', err);
        });
}
  function CocktailRecipe() 
  {
    fetch(urlDrink)  
        .then(function (r) {
            return r.json();
        })
        .then(function (data) {
            var nameofDrinkDiv = $("<div>")
            var DrinkPic = $("<div>")
            var DrinkDiv = $("<li>")
            var drink = $("<h2>").text(Drink);
            var image = $("<img>");
            image.attr("src", Diskimg);
            nameofDrinkDiv.append(drink);
            DrinkPic.append(image);

            for(i = 0; i <10; i++)
            {
              if(Drinkingredients[secondarray][i] != null && Drinkingredients[secondarray][i] != "")
              {
                DrinkDiv.append(Drinkingredients[secondarray][i] + ", "); 
              }                   
            } 

            $(".specificRecipe").prepend(nameofDrinkDiv);
            $(".foodPic").prepend(DrinkPic)
            $(".ingredientList").prepend(DrinkDiv)            
        })  
        .catch(function (err) {
            console.error('Fetch Error :-S', err);
        });
  }


$('#search-recipe-btn').on("click", function(event)
{
  event.preventDefault()
  // Grabs user input
  var searchfood = $("#food-input").val().trim()
})



