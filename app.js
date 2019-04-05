$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCSTHNtm98ZRLa40KpPuis0SaU321FjLl4",
        authDomain: "train-time-07-87ea4.firebaseapp.com",
        databaseURL: "https://train-time-07-87ea4.firebaseio.com",
        projectId: "train-time-07-87ea4",
        storageBucket: "train-time-07-87ea4.appspot.com",
        messagingSenderId: "445622087151"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // change what is stored in FB
      // needs to also clear the input data after submit
      // .push method
    $("#submit").on("click", function (event) {
        event.preventDefault();

        var tName = $("#train-name").val().trim();
        var tDestination = $("#destination").val().trim();
        var tFirstTime = $("#first-time").val().trim();
        var tTrainInt = $("#train-int").val().trim();

        var addTrain = {
            trainName: tName,
            trainDest: tDestination,
            trainFirstTime: tFirstTime,
            trainInt: tTrainInt
        };

        database.ref().push(addTrain);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-time").val("");
        $("#train-int").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var newTrainName = childSnapshot.val().trainName;
        var newDest = childSnapshot.val().trainDest;
        var newFirstTime = childSnapshot.val().trainFirstTime;
        var newTrainInt = childSnapshot.val().trainInt;

        console.log(newTrainName);

        // append table with input data to #train-schedule div
        var newRow = $("<tr>").append(
            $("<td>").text(newTrainName),
            $("<td>").text(newDest),
            $("<td>").text(newFirstTime),
            $("<td>").text(minutesAway) // ++++++ needs to be defined
        );

        // interval function ===============================================================
          // needs to calculate next arrival based on the input interval value
          // also needs to show this calculation in minutes
          var minutesAway = moment().add(newTrainInt, "m");

    });

}) // end