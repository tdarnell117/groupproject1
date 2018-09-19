

var url = "https://www.food2fork.com/api/search?key=a1d99e1e0791dbbde08d37d85656f5f0&q="
$(".searchbutton").on("click", function()
{
  event.preventDefault();
  url = url + $(".search").val();
  console.log(url) 
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

