 // Initialize Firebase


 //<script src="https://www.gstatic.com/firebasejs/3.6.3/firebase.js"></script>

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

 //on click statement to send data from form to database.

 $("#submit").on("click", function() {
     var train = $("#train-input").val().trim();
     var place = $("#destination-input").val().trim();
     var ft = $("#firstTime").val().trim();
     var fq = $("#frequency-input").val().trim();

     console.log(train);
     console.log(place);
     console.log(ft);
     console.log(fq)

     //storing all info within the firebase

     database.ref().push({
         train: train,
         place: place,
         ft: ft,
         fq: fq,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
     // Don't refresh the page!
     return false;
 });

 //grab the data and post it into our data using a firebase listener

 database.ref().on("child_added", function(snapshot) {
     var numMinutes = getMinutes(snapshot.val().start);
     var minutes = numMinutes;
     var fq = parseInt(snapshot.val().fq);
     var ft = parseInt(snapshot.val().ft);
     // var nextArrival=ft
     //var minutesAway=


     $("#tableBody").append("<tr><td class='trainName'>" + snapshot.val().train + "</td><td class='destination'>" + snapshot.val().place + "</td><td class='frequency'>" + snapshot.val().fq + "</td><td class='nextArrival'>" + snapshot.val().nextArrival + "</td><td class='minutesAway'>" + snapshot.val().minutesAway + "</td></tr>");
 }, function(errorObject) {

     // If any errors are experienced, log them to console.
     console.log("The read failed: " + errorObject.code);
 });

 function addZero(i) {
     if (i < 10) {
         i = "0" + i;
     }
     return i;
 }

 //today's date, time in hour and minutes
 function getToday(importcurrentTime) {
     var d = new Date();
     var h = addZero(d.getHours());
     var m = addZero(d.getMinutes());
     var s = addZero(d.getSeconds());
     var currentTime = h + ":" + m + ":" + s;
     console.log(currentTime);

 };

 // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(ft, "hh:mm:ss");
      console.log(firstTimeConverted);

      // Current Time
      // var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:ss"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % fq;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = fq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm:ss"));


//If the next arrival time is = to the ft (first train time input value) then it = the nextArrivalTime.
// Else if next arrival time (NA) is < than real time (RT) then + the frequency value.
//Else if next arrival time is > than real time then subtract NA-RT to get the minutes away.

// function getNextArrival(importnextArrival){
//     for (var i=0; i<)
//     if (time===ft) {

//     }
// }