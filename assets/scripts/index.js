// When on click "let's cook" button, clear intro section, update search result section 
$('#searchrecipe').on("click", function(){
    $('#intro-section').empty();
    $('#search-result-section').html(`<div class="card">  
                                            <h3>Here are the list of recipe for you!</h3>
                                      </div>`
                                    )
})


// When on click search recipe button, clear intro seciotn, update search result section
$('#search-recipe-btn').on("click", function(){
    event.preventDefault()

     // Grabs user input
     var searchfood = $("#food-input").val().trim();

    $('#intro-section').empty();
    $('#search-result-section').html(`<div class="card">  
                                            <h3>Here are the list of recipe on ${searchfood}!</h3>
                                      </div>`
                                    )
})