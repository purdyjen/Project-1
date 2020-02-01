$(document).ready(function () {
  // Initialize firebase
  const config = {
    apiKey: "AIzaSyDgVXzyxHgZtoc_mcbqu-qRr_bdPNFJx3I",
    authDomain: "group-b-project-one.firebaseapp.com",
    databaseURL: "https://group-b-project-one.firebaseio.com",
    projectId: "group-b-project-one",
    storageBucket: "group-b-project-one.appspot.com",
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var userRef = dataRef.ref("users");


  //add image

  $('input[type="file"]').change(function () {

    for (var i = 0; i < this.files.length; i++) {

      var img = document.querySelector('img');
      img.src = URL.createObjectURL(this.files[i]);

      var newImg = $("<img>");
      newImg.attr("src", img.src);
      newImg.addClass("myImg");
      $("#imgBox").append(newImg);
      console.log(this.files[i]);
    }
  });

  // set initial values
  var place = "";
  var dest = "";
  var date = "";
  var comment = "";
  var entryNum = 0;

  // capture button click
  $("#addMe").on("click", function (event) {
      event.preventDefault();


      place = $("#place-input").val().trim();
      dest = $("#dest-input").val().trim();
      date = $("#date-input").val().trim();
      comment = $("#comments-input").val().trim();
      console.log(place);

      var newDiary = {
        place: place,
        dest: dest,
        date: date,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
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


      // Prettify the employee start
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

  // log-in

  var uiConfig = {
    signInSuccessUrl: "https://yenseydm.github.io/Project-1/diary.html",
    signInOptions: [
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

  var providersMap = {
    google: new firebase.auth.GoogleAuthProvider(),
  }

  function signInWithRedirect(providerName) {
    var provider = providersMap(providerName);
    return auth.signInWithRedirect(provider);
  }

  function onAuthStateChanged() {
    return auth.onAuthStateChanged();
  }
  // setup materialize components
  // document.addEventListener("DOMContentLoaded", function() {
  //   var modals = document.querySelectorAll(".modal");
  //   M.Modal.init(modals);
  // });


  //logout
  $("#logout").on("click", function () {
    event.preventDefault();
    firebase.auth().signOut();
    $("#my-journal").show();
    $("#logout").hide();
    $("#login").show();
    console.log("user signed out");
  });



  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      // User is signed in.
      var currentUser = firebase.auth().currentUser;
      var userRef = dataRef.ref("/users");
      if (currentUser === null) {
        // $("#my-journal").hide();
        // $("#logout").hide();
        // $("#login").show();
        console.log("Not logged in.");
      } else {
        // $("#my-journal").show();
        // $("#logout").show();
        // $("#login").hide();
        console.log("Logged in.");
        // userRef.push(currentUser);
      }
    }
  });

}); //doc ready closing tag