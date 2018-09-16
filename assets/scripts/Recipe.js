

var url = "https://api.yummly.com/v1/api/recipes?_app_id=fc9ece1f&_app_key=235229a497e877c3ca37916f4cdd111c"
$(".searchbutton").on("click", function()
{
  event.preventDefault();
  url = url + "&q=" + $(".search").val(); 
  getAPI();
})

function getAPI()
{
  fetch(url)     
  .then(function(r) {
      return r.json();
        })  
  .then(function(data)
    {
      console.log(data);
    }) 
  .catch(function(err) {
      console.error('Fetch Error :-S', err);
    });
}

