
(
  function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCb1g2drlUs28XSyGW0KLFPT7MwPYWq5qI",
    authDomain: "recipeprojectauth.firebaseapp.com",
    databaseURL: "https://recipeprojectauth.firebaseio.com/",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "1045754028355",
  };
  firebase.initializeApp(config);

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
  const userInfo = document.getElementById('userInfo');

  btnLogin.addEventListener('click', e => {
      //Get email and password
      const email = txtEmail.value;
      const pass= txtPassword.value;
      const auth = firebase.auth();
      //Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  });

  //Add signup event
    btnSignUp.addEventListener('click', e => {
    //Get email and password
    //TODO: Check for real email
    const email = txtEmail.value;
    const pass= txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  //Add a realtime listener remove and add input and buttons
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('d-none');
      userInfo.classList.remove('d-none');
      txtEmail.classList.add('d-none');
      txtPassword.classList.add('d-none');
      btnLogin.classList.add('d-none');
      btnSignUp.classList.add('d-none');

      // username is first part of email split at the @ symbol
      const username = firebaseUser.email.split('@')[0];
      document.getElementById('userInfoBtn').innerHTML = username;
    } else {

      console.log('not logged in');
      btnLogout.classList.add('d-none');
      userInfo.classList.add('d-none');
      txtEmail.classList.remove('d-none');
      txtPassword.classList.remove('d-none');
      btnLogin.classList.remove('d-none');
      btnSignUp.classList.remove('d-none');
    }
  });

  /************************* Feedback firebase *************************/ 
  // Store all user feedback to database
  // to be updated
  var feedbackdb = firebase.database();
   
  // 2. Button for adding Comments
  $("#Submit-feedback-Btn").on("click", function(event) {
  
    // Grabs user Comments input
    var comments = $("#comments-input").val();
  
    // Current Time
    var currentTime = moment();
  
    // Creates local "temporary" object for holding employee data
    var feedback = {
      userComments: comments,
      submitDate: moment(currentTime).format("MM/DD/YYYY")
    };
  
    // Uploads User comments to the database
    feedbackdb.ref().push(feedback);
  
    // Logs everything to console
    console.log(feedback.userComments);
    console.log(feedback.submitDate);
   
    alert("Thank you for your comments!");
  
    // Clears all of the text-boxes
    $("#comments-input").val("");
  });
  
    // 3. Create Firebase event for adding comments in database 
    //    and display in feedback page
    feedbackdb.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var userComm = childSnapshot.val().userComments;
    var subDate = childSnapshot.val().submitDate;
  
    // Create the new row
    var newComment = $("#comment-section").append(
      $("<p>").text(userComm),
      $("</p>").text(subDate)
    )
    // Append to html
    $("#comment-section").append(newComment);
  })
  
}());

