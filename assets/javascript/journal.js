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

    // capture button click
    $("#addMe").on("click", function (event) {
      event.preventDefault();

      place = $("#place-input").val().trim();
      dest = $("#dest-input").val().trim();
      date = $("#date-input").val().trim();
      comment = $("#comments-input").val().trim();
      console.log(place)

      // push to firebase
      dataRef.ref().push({

        place: place,
        dest: dest,
        date: date,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // Firebase watcher
      dataRef.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val())


      });
    });

  })