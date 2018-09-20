

var url = "";
$(".searchbutton").on("click", function()
{
  event.preventDefault();
  $(".RecipePicture").empty();
  url = "https://api.yummly.com/v1/api/recipes?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c" + "&q=" + $(".search").val() +"&requirePictures=true" + "&maxResult=10&start=10";
  getAPI();
})

$(document).on("click", "img", function() {  
  

})


function getAPI()
{
  fetch(url)     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      for(i = 0; i<10; i++)
      {
        var imgDiv = $("<li>");
        var imgURL = data.matches[i].imageUrlsBySize["90"]; 
        var rate = $("<p>").text("Rating: " + data.matches[i].rating);  
        var time = $("<p>").text("Time: " +data.matches[i].totalTimeInSeconds);  
        console.log(data)
        var image = $("<img>");
        image.attr("src", imgURL);
        image.attr("class", "icon");
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

