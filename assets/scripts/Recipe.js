
//Click button function
var url = "";
var urlWal = "";
var ingredients = new Array();
$(".searchbutton").on("click", function()
{
  event.preventDefault();
  $(".RecipePicture").empty();
  url = "https://api.yummly.com/v1/api/recipes?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c" + "&q=" + $(".search").val() +"&requirePictures=true" + "&maxResult=10&start=10";
  getAPI();
})

//click on pictures function
$(document).on("click", "img", function() {  
  for(i = 0; i <10; i++)
  {
    for(j = 0; j <10; j++)
    {
      if(ingredients[i][j] != null)
      {
        urlWal = "http://api.walmartlabs.com/v1/search?query=" + ingredients[i][j].split(' ').join('+')  + "&format=json&apiKey=fxakkxrnjkuqrj2wnqjyd97m"
        //console.log(urlWal)
        //getAPIWalmart();
      }
    } 
  }
})

//get API from Walmart
function getAPIWalmart()
{
  fetch(urlWal,{ mode: 'no-cors'})     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      console.log(data)
    })
  .catch(function(err) {
    console.error('Fetch Error :-S', err);
  });
}

//get API and add images, rating in html
function getAPI()
{
  fetch(url)     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      console.log(data)
      for(i = 0; i<10; i++)
      {
        var imgDiv = $("<li>");
        var imgURL = data.matches[i].imageUrlsBySize["90"]; 
        ingredients[i] = data.matches[i].ingredients;
        var rate = $("<p>").text("Rating: " + data.matches[i].rating);  
        var time = $("<p>").text("Time: " +data.matches[i].totalTimeInSeconds);  
        var image = $("<img>");
        image.attr("src", imgURL);
        image.attr("class", "icon");
        image.attr("data-ingre", i);
        imgDiv.append(rate);
        imgDiv.append(time);
        imgDiv.append(image);
        $(".RecipePicture").prepend(imgDiv);
      } 

    }) 
  .catch(function(err) {
      console.error('Fetch Error :-S', err);
    });
}

