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

        var formatTime = "h";
        var convertTime = moment(tFirstTime, formatTime);
        var reformatTime = convertTime.format("LT");

        var addTrain = {
            trainName: tName,
            trainDest: tDestination,
            trainFirstTime: reformatTime,
            trainInt: tTrainInt
        };
        console.log(convertTime);

        database.ref().push(addTrain);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-time").val("");
        $("#train-int").val("");
    }); // first function ends =================================================================

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var newTrainName = childSnapshot.val().trainName;
        var newDest = childSnapshot.val().trainDest;
        var newFirstTime = childSnapshot.val().trainFirstTime;
        var newTrainInt = childSnapshot.val().trainInt;

        console.log(newFirstTime);

        // train schedule calculations ===========================================
          // needs to calculate next arrival based on the input interval value
          // also needs to show this calculation in minutes
        var firstTimeReset = moment(newFirstTime, "hh:mm").subtract(10, "days");
        console.log(firstTimeReset);

        var now = moment();
        console.log(moment(now).format("hh:mm:ss"));

        var timeDiff = moment().diff(moment(firstTimeReset), "minutes");
        console.log(timeDiff);

        var remainingT = timeDiff % newTrainInt;
        console.log(remainingT);

        var minutesUntilTrain = newTrainInt - remainingT;
        console.log("Minutes until train: " + minutesUntilTrain);

        var nextTrainTime = moment().add(minutesUntilTrain, "minutes");
        console.log("Next train arrives at " + moment(nextTrainTime).format("hh:mm"));

        var nextTrainTimeConverted = moment(nextTrainTime).format("LT");
        var nextTrainInMins = newTrainInt - remainingT;

        // end calculations ====================================================


        // append table with input data to #train-schedule div // ======================= this works, but want to redo so input shows up in separate columns
        var newRow = $("<tr>").append(
            $("<td>").text("Train " +
                newTrainName + " leaves for " +
                newDest + " at " +
                newFirstTime + " every " +
                newTrainInt + " minutes" + " (next train arrives in " + nextTrainInMins + " minutes" + " at " + nextTrainTimeConverted + ").")
        );

        $("#train-schedule").append(newRow);

        // redoing appendings of train input ==============================================
        // creating table row
        // var $trainList = $("<tr>");
        // $trainList.addClass("list-group");

        // // append to html
        // $("#train-schedule").append($trainList);

        // // append train name to tr
        // var trainData = addTrain;

        // var $trainListItem = $("<td>");

        // $trainListItem.append(
        //     "<tr class='row'>" + trainData + "</tr>"
        // );
        // console.log($trainListItem + newTrainName);

        
    });

}) // end