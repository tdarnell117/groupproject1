// When on click search recipe button, go to Recipe Page
$('#search-recipe-btn').on("click", function(event){
  event.preventDefault()
  // Grabs user input
  var searchfood = $("#food-input").val().trim();

  // Clear input box
  document.getElementById("food-input").value = "";
  
  var url = $(this).data('target');
  location.replace(url);                             
})


// Initialize Firebase for feedback section
var config = {
  apiKey: "AIzaSyDn_Bmwkve87XJmvSRGErlcXcwGWA8lJQM",
  authDomain: "project1feedback.firebaseapp.com",
  databaseURL: "https://project1feedback.firebaseio.com",
  projectId: "project1feedback",
  storageBucket: "",
  messagingSenderId: "452695397144"
};
firebase.initializeApp(config);


// Store all user feedback to database
// to be updated


// Display all user feedback on feedback page
// to be updated




