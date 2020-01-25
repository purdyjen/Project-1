
var config = {

};

firebase.initializeApp(config);

var database = firebase.database();

$("#addMe").on("click", function(event) {
    event.preventDefault();
  
    var empName = $("#place-input").val().trim();
    var empDest = $("#dest-input").val().trim();
    var empDate = moment($("#date-input").val().trim(), "MM/DD/YYYY").format("X");
    var empCom = $("#comments-input").val().trim();
  
    var newEmp = {
      Train: empName,
      Destination: empDest,
      start: empDate,
      rate: empCom
    };
  
    database.ref().push(newEmp);

    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empDest = childSnapshot.val().role;
    var empDate = childSnapshot.val().start;
    var empCom = childSnapshot.val().rate;
  
    // Prettify the employee start
    var empDatePretty = moment.unix(empDate).format("MM/DD/YYYY");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("#place").text(empName),
      $("#destination").text(empDest),
      $("#date").text(empDatePretty),
      $("#comments").text(empComm),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });