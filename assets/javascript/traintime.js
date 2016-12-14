 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDDzBgqEhedaIDHvz7QiSQBONBIV3hf_jI",
     authDomain: "train-time-abdd7.firebaseapp.com",
     databaseURL: "https://train-time-abdd7.firebaseio.com",
     storageBucket: "train-time-abdd7.appspot.com",
     messagingSenderId: "206044668223"
 };
 firebase.initializeApp(config);

 // Create a variable to reference the database.
 var database = firebase.database();
 var trainName;
 var destination;
 var startTime;
 var frequency;


 //on click statement to send data from form to database.

 $("#submit").on("click", function(event) {
     trainName = $("#trainName").val().trim();
     destination = $("#destination").val().trim();
     startTime = $("#startTime").val().trim();
     frequency = $("#frequency").val().trim();

     console.log(train);
     console.log(place);
     console.log(startTime);
     console.log(frequency)

     //storing all info within the firebase

     database.ref().push({
         trainName: trainName,
         destination: destination,
         startTime: startTime,
         frequency: frequency
      });
     // Don't refresh the page!
     return false;
 });

 //grab the data and post it into our data using a firebase listener

 database.ref().on("child_added", function(snapshot) {
     var startTime = snapshot.val().startTime;
     var convertedTime = moment(startTime, "HH:mm");
     convertedTime.format("HHmm")
     console.log("user entered: " + convertedTime.format("HHmm"));
    
    var timeFromStart = moment().add(convertedTime, "minutes")
      console.log("Time from Train Start: " + timeFromStart);
//================================================================================
     // Minutes Away is next arrival minus current time

     // var nextArrival = frequency - tRemainder;
     // console.log("Next Arrival time is: " + nextArrival);
//
     var minutesAway = (timeFromStart % snapshot.val().frequency);
     console.log("Next train arriving in " + minutesAway.toString() + " minutes");
//====================================================================================
 //   ====================================================================================
     // Next Arrival
     var nextArrival= moment().add(minutesAway, 'minutes').format("HH:mm");
     console.log("Next train arrival time is: " + nextArrival);
//===================================================================================

    var newRow = $("<tr>");
      newRow.append($("<td>" + snapshot.val().trainName + "</td>"));
      newRow.append($("<td>" + snapshot.val().destination + "</td>"));
      newRow.append($("<td>" + snapshot.val().frequency + "</td>"));
      newRow.append($("<td>" + nextArrival + "</td>"));
      newRow.append($("<td>" + minutesAway + "</td>"));
      $("tbody").append(newRow);
   });

     //$("#tableBody").append("<tr><td class='train-input'>" + snapshot.val().train + "</td><td class='destination-input'>" + snapshot.val().place + "</td><td class='frequency-input'>" + snapshot.val().frequency + "</td><td class='startTime-input'>"
     // + startTime + "</td><td class='minutesAway'>" + minutesAway + "</td></tr>");
 // }, function(errorObject) {

 //     // If any errors are experienced, log them to console.
 //     console.log("The read failed: " + errorObject.code);
 // });
 // start Time (pushed back 1 year to make sure it comes before current time)


     //Current Time
     // var currentTime = moment();
     // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

     // Difference between now and time the train starts
 // function addZero(i) {
 //     if (i < 10) {
 //         i = "0" + i;
 //     }
 //     return i;
 // }

 // //today's date, time in hour and minutes
 // function getToday(importcurrentTime) {
 //     var d = new Date();
 //     var h = addZero(d.getHours());
 //     var m = addZero(d.getMinutes());
 //     var currentTime = h + ":" + m;
 //     console.log(currentTime);

 // };
 // //convert current time into moment
 // var startTimeConverted = moment(startTime, "HH:mm");
 // console.log(startTimeConverted);
 // // Start Time (pushed back 1 year to make sure it comes before current time)


 // //Current Time
 // var currentTime = moment();
 // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


 // var numMinutes = getMinutes(snapshot.val().st);
 // var minutes = numMinutes;
 // var frequency = parseInt(snapshot.val().frequency);
 // var st = parseInt(snapshot.val().st);
 // var nextArrival=st
 //var minutesAway=
 //If the next arrival time is = to the st (start train time input value) then it = the nextArrivalTime.
 // Else if next arrival time (NA) is < than real time (RT) then + the frequency value.
 //Else if next arrival time is > than real time then subtract NA-RT to get the minutes away.

 // function getNextArrival(importnextArrival){
 //     for (var i=0; i<)
 //     if (time===st) {
 // clean up data:  $(‘#dmfcampsTrainDiv’).html(‘');

 // //     }
 // // }
