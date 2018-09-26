//Click button function
var url = ""
var url2 = ""
var urlDrink = ""
var ingredients = new Array()
var Drinkingredients = new Array()
var instruction = new Array()
var Dish = ""
var imgURL = ""
var Diskimg = ""
var firstarray = ""
var secondarray = ""
var Drink = ""
var foodID = ""

//hide the Recepi page 
$(".afterClick").hide();
$(".footer2").hide();

//When you click the searchFood button
$(".searchfoodbutton").on("click", function (event) {
  event.preventDefault();
  $(".footer2").show();
  $(".footer").hide();
  url = "https://api.yummly.com/v1/api/recipes?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c" + "&q=" + $(".searchfood").val() + "&requirePictures=true" + "&maxResult=10&start=10";
  getfoodAPI();
})

//When you click the searchDrink button
$(".searchdrinkbutton").on("click", function (event) {
  event.preventDefault();
  $(".footer2").hide()
  $(".footer").show();
  urlDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $(".searchdrink").val();
  getdrinkAPI();
})

//click on Images function
$(document).on("click", "img.icon", function () {
  $('.RecipePicture').empty()
  $('.DrinkPicture').empty()
  $(".afterClick").show();
  $(".Searchcontainer").hide();
  Dish = $(this).attr("data-nameofDish");
  firstarray = $(this).attr("data-ingre");
  secondarray = $(this).attr("data-ingre2");
  Drink = $(this).attr("data-nameofDrink");
  Diskimg = $(this).attr("src");
  foodID = $(this).attr("data-foodID");
  var type = $(this).attr("data-typeofImg");
  if (type === "food") {
    FoodRecipe();
    $(".footer2").show();
  }
  else {
    CocktailRecipe();
  }
})

//get food API and add images, rating in html
function getfoodAPI() {
  fetch(url)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      $('.RecipePicture').empty()
      $('.DrinkPicture').empty()
      for (i = 0; i < 10; i++) {
        foodID = data.matches[i].id;
        Dish = data.matches[i].recipeName;
        var imgDiv = $("<div class=col-md-4>");
        imgURL = data.matches[i].imageUrlsBySize["90"];
        var rate = $("<h4>").text("Rating: " + data.matches[i].rating);
        var name = $("<h4>").text(data.matches[i].recipeName);
        var image = $("<img>");
        image.attr("src", imgURL);
        image.attr("class", "icon");
        image.attr("data-ingre", i)
        image.attr("data-nameofDish", Dish);
        image.attr("data-typeofImg", "food");
        image.attr("data-foodID", foodID);
        imgDiv.append(rate);;
        imgDiv.append(name);
        imgDiv.append(image);
        $(".RecipePicture").prepend(imgDiv);
      }
    })

    .catch(function (err) {
      console.error('Fetch Error :-S', err);
    });
}

//get Drinks API and add images
function getdrinkAPI() {
  fetch(urlDrink)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      $('.RecipePicture').empty()
      $('.DrinkPicture').empty()
      console.log(data)
      for (i = 0; i < 10; i++) {
        Drink = data.drinks[i].strDrink;
        instruction[i] = data.drinks[i].strInstructions;
        var imgDiv = $("<li>");
        var category = $("<h4>").text(Drink);
        var image = $("<img>");
        Diskimg = data.drinks[i].strDrinkThumb;
        Drinkingredients[i] = [data.drinks[i].strIngredient1, data.drinks[i].strIngredient2, data.drinks[i].strIngredient3,
        data.drinks[i].strIngredient4, data.drinks[i].strIngredient5, data.drinks[i].strIngredient6, data.drinks[i].strIngredient7,
        data.drinks[i].strIngredient8, data.drinks[i].strIngredient9, data.drinks[i].strIngredient10]
        image.attr("src", Diskimg);
        image.attr("class", "icon");
        image.attr("data-ingre2", i);
        image.attr("data-nameofDrink", Drink);
        image.attr("data-typeofImg", "drink");
        imgDiv.append(category);
        imgDiv.append(image);
        $(".DrinkPicture").prepend(imgDiv);
      }
    })
    .catch(function (err) {
      console.error('Fetch Error :-S', err);
    });
}

//Get the information for the Recipe page
function FoodRecipe() {
  fetch("https://api.yummly.com/v1/api/recipe/" + foodID + "?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      imgURL = data.images[0].hostedLargeUrl;
      ingredients = data.ingredientLines;
      var sourceURL = data.source.sourceRecipeUrl;
      var cookTime = $("<div>").text("Total time to cook: " + data.totalTime);
      var numberOfSer = $("<div>").text("Number of serving: " + data.numberOfServings);
      var rate = $("<div>").text("Rate: " + data.rating);
      var nameofFoodDiv = $("<div>");
      var foodPic = $("<div>");
      var liDiv = $("<li>");
      var infoDiv = $("<div>");
      var dish = $("<h2>").text(Dish);
      var image = $("<img>");
      image.attr("src", imgURL);
      image.attr("class", "finalImg");
      $(".source").attr("href", sourceURL);
      nameofFoodDiv.append(dish);
      infoDiv.append();
      foodPic.append(image);
      infoDiv.append(cookTime);
      infoDiv.append(numberOfSer);
      infoDiv.append(rate);
      for (i = 0; i < 10; i++) {
        if (ingredients[i] != null && ingredients[i] != "") {
          liDiv.append("<div>" + ingredients[i] + "</div>");
        }

      }
      $(".specificRecipe").prepend(nameofFoodDiv);
      $(".foodPic").prepend(foodPic)
      $(".ingredientList").append(liDiv)
      $(".informationList").append(infoDiv)
    })
    .catch(function (err) {
      console.error('Fetch Error :-S', err);
    })


}

//Get the information for the Drink page
function CocktailRecipe() {
  $(".hidedrink").hide();
  var nameofDrinkDiv = $("<div>");
  var InstructionDrink = $("<div>");
  var DrinkPic = $("<div>");
  var DrinkDiv = $("<li>");
  var drink = $("<h2>").text(Drink);
  var image = $("<img>");
  image.attr("src", Diskimg);
  image.attr("class", "finalImg");
  nameofDrinkDiv.append(drink);
  DrinkPic.append(image);
  InstructionDrink.append(instruction[secondarray])

  for (i = 0; i < 10; i++) {
    if (Drinkingredients[secondarray][i] != null && Drinkingredients[secondarray][i] != "") {
      DrinkDiv.append(Drinkingredients[secondarray][i] + ", ");
    }
  }

  $(".specificRecipe").prepend(nameofDrinkDiv);
  $(".foodPic").prepend(DrinkPic)
  $(".ingredientList").prepend(DrinkDiv)
  $(".informationHead").text("Instruction")
  $(".informationList").prepend(InstructionDrink)
}


$('#search-recipe-btn').on("click", function (event) {
  event.preventDefault()
  // Grabs user input
  var searchfood = $("#food-input").val().trim()
})



