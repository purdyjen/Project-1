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


});