$(document).ready(function () {

  var trainData = new Firebase("https://firstproject-2b0e9.firebaseio.com/");

  $("button").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var lineNumber = $("#line-number").val().trim();
    var destination = $("#destination").val().trim();
    var FirstTrainTimeInput = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequencyInput = $("#frequency").val().trim(); //anything needs to be parsed?

    console.log(trainName)
    console.log(lineNumber)
    console.log(destination)
    console.log(FirstTrainTimeInput)
    console.log(frequencyInput)

    var newTrain = {
      name: trainName,
      line: lineNumber,
      destination: destination,
      time: FirstTrainTimeInput,
      frequency: frequencyInput
    }
    //uploads input data to the database
    trainData.push(newTrain)

    //cleartext boxes
    $("#train-name").val("");
    $("#line-number").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("")

    return false;

  })

  //create firebase event for adding emplyee to database
  trainData.on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //store the added stuff into a var
    var firebaseName = childSnapshot.val().name;
    var firebaseLine = childSnapshot.val().line;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTime = childSnapshot.val().time;
    var firebaseFrequency = childSnapshot.val().frequency;

    //train info
    //time the frequency
    var diffTime = moment().diff(moment.unix(firebaseTime), "minutes");
    var remainder = moment().diff(moment.unix(firebaseTime), "minutes") % firebaseFrequency;
    var minutes = firebaseFrequency - remainder;
   

    var nextArrival = moment().add(minutes, "m").format("hh:mm A")
    console.log(minutes)
    console.log(nextArrival)
    //append result to table on page
    $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");
  })
  

});