$(document).ready(function () {

  // Initialize firebase
  const config = {
    apiKey: "AIzaSyDgVXzyxHgZtoc_mcbqu-qRr_bdPNFJx3I",
    authDomain: "group-b-project-one.firebaseapp.com",
    databaseURL: "https://group-b-project-one.firebaseio.com",
    projectId: "group-b-project-one",
    storageBucket: "",
  };

  firebase.initializeApp(config);
  var dataRef = firebase.database();
  

  // set initial values
  var place = "";
  var dest = "";
  var date = "";
  var comment = "";
  var entryNum = 0;
  var image = "";

  // capture button click
  $("#addMe").on("click", function (event) {
    event.preventDefault();

    place = $("#place-input").val().trim();
    dest = $("#dest-input").val().trim();
    date = $("#date-input").val().trim();
    comment = $("#comments-input").val().trim();
    console.log(place)

    var newDiary = {
      place: place,
      dest: dest,
      date: date,
      comment: comment,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    }
    // push to firebase
    dataRef.ref().push(newDiary);

    // Clears all of the text-boxes
    $("#place-input").val("");
    $("#dest-input").val("");
    $("#date-input").val("");
    $("#comment-input").val("");


  }),

    // Firebase watcher
    dataRef.ref().on("child_added", function (childSnapshot) {
      // view the object
      console.log(childSnapshot.val());
      entryNum++;

      //store the Firebase data as new variables
      var diaryPlace = childSnapshot.val().place;
      var diaryDest = childSnapshot.val().dest;
      var diaryDate = childSnapshot.val().date;
      var diaryComment = childSnapshot.val().comment;




      // Prettify
      var datePretty = moment.unix(diaryDate).format("MM/DD/YYYY");

      // Create a new row for the table
      var newRow = $("<tr>").append(
        $("<td>").text(entryNum),
        $("<td>").text(diaryPlace),
        $("<td>").text(diaryDest),
        $("<td>").text(diaryDate),
        $("<td>").text(diaryComment)
      );

      // Add the row to the table
      $("#diary-table > tbody").prepend(newRow);
    });

  // upload images
  window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {

      event.preventDefault();

      for (i = 0; i < this.files.length; i++) {
        if (this.files && this.files[i]) {

          var img = document.querySelector('img');
          img.src = URL.createObjectURL(this.files[i]);


        }
      }

    });
  });

  var uiConfig = {
    signInSuccessUrl: "https://yenseydm.github.io/Project-1/diary.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // Disable auto-sign in.
ui.disableAutoSignIn();
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
  // setup materialize components
  document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
  });

  // signup
  $("#signup-form-submit").on("click", function e() {
    e.preventDefault();

    // get user info
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();

    // sign up the user
    dataRef.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);
      // close the signup modal & reset form
      var modal = $("#modal-signup");

      M.Modal.getInstance(modal).close();
      $("#signup-form").reset();
    });
  });

  // logout
  // const logout = document.querySelector("#logout");
  // logout.addEventListener("click", e => {
  //   e.preventDefault();
  //   auth.signOut().then(() => {
  //     console.log("user signed out");
  //   });
  // });
  
  //Authentication listener
  addAuthStateListener(AuthStateListener)
$("#login").hide();

mAuthListener = new FirebaseAuth.AuthStateListener() {
  
function onAuthStateChanged() {
     var currentUser = firebaseAuth.getCurrentUser();
     var currentUserData = firebase.auth().currentUser;
     var userRef = dataRef.ref("/users");
      if (currentUser != null) {
          // Sign in logic here.
      }
  }
};
});