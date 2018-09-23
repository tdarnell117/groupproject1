//Click button function
var url = ""
var urlDrink = ""
var ingredients = new Array()
var Dish = ""
var imgURL = ""

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
  Dish = ($(this).attr("data-nameofDish"));
  imgURL = ($(this).attr("data-ImageofDish"));
  console.log($(this).attr("data-ingre"));
  chosenRecipe();
  for(i = 0; i <10; i++)
  {
    for(j = 0; j <10; j++)
    {
      if(ingredients[i][j] != null)
      {
        //console.log(ingredients[i][j])
      }
    }
  } 
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
        var rate = $("<p>").text("Rating: " + data.matches[i].rating);  
        var time = $("<p>").text("Cook Time: " +data.matches[i].totalTimeInSeconds);  
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
      var imgDiv = $("<li>");
      var imgURL = data.drinks[i].strDrinkThumb; 
      // ingredients[i] = data.matches[i].ingredients;
      var category = $("<p>").text(data.drinks[i].strCategory);  
      // var time = $("<p>").text("Time: " +data.matches[i].totalTimeInSeconds);  
      var image = $("<img>");
      image.attr("src", imgURL);
      image.attr("class", "icon");
      image.attr("data-ingre", i);
      // imgDiv.append(rate);
      imgDiv.append(category);
      imgDiv.append(image);
      $(".DrinkPicture").prepend(imgDiv);
      }
    })
    .catch(function(err) {
        console.error('Fetch Error :-S', err);
      });
  }

  function chosenRecipe() {
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
            liDiv.append(ingredients);
            $(".specificRecipe").prepend(nameofFoodDiv);
            $(".foodPic").prepend(foodPic)
            $(".ingredientList").prepend(liDiv)
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
}



