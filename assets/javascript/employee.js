

  // Initialize Firebase

//<script src="https://www.gstatic.com/firebasejs/3.6.3/firebase.js"></script>

  // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBOy3BXyetlNTaRWvW11CGfbblhQX0rgQI",
    authDomain: "employee-data-mgmt-e2fbc.firebaseapp.com",
    databaseURL: "https://employee-data-mgmt-e2fbc.firebaseio.com",
    storageBucket: "employee-data-mgmt-e2fbc.appspot.com",
    messagingSenderId: "343991962788"
  };
  firebase.initializeApp(config);


  // Create a variable to reference the database.
var database = firebase.database();



$("#submit").on("click", function() {
      var name = $("#employeeName").val().trim();
      var role = $("#role-input").val().trim();
      var start = $("#startYear").val().trim();
      var rate = $("#rate-input").val().trim();

      console.log(name);
      console.log(role);
      console.log(start);
      console.log(rate);


   database.ref().push({
    name: name,
    role: role,
    start: start, 
    rate: rate
  });
});


database.ref().on("child_added", function(snapshot){
	var numMonths=getMonths(snapshot.val().start);
	var month = numMonths;
    var rate=parseInt(snapshot.val().rate);
    var totalBilled = month * rate;

	$("#tableBody").append("<tr><td class='employee'>"+snapshot.val().name+"</td><td class='role'>"+snapshot.val().role+"</td><td class='startDate'>"+snapshot.val().start+"</td><td class='monthsWork'>"+numMonths+"</td><td class='rate'>"+snapshot.val().rate+"</td><td id='totalBilled'>"+totalBilled+"</td></tr>");
}, function(errorObject) {

// If any errors are experienced, log them to console.
      console.log("The read failed: " + errorObject.code);
    });


function getMonths(importStart){

	//today's date
	var d = new Date();

	var yr = d.getFullYear();
	console.log(yr);
	var month = d.getMonth()+1;
	console.log(month);

	//employee start date
	var start2 = new Date(importStart);
	console.log(start2);
	var yr1 = start2.getFullYear();
	console.log(yr1);
	var month1 = start2.getMonth() + 1;
	console.log(month1);
	calcMonths = (yr-yr1)*12 + (month - month1);
	return calcMonths;
};