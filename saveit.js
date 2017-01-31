// Initialize Firebase
firebase.initializeApp({
	apiKey: API_KEY,
	authDomain: PROJECT_ID+".firebaseapp.com",
	databaseURL: "https://"+DATABASE_NAME+".firebaseio.com",
	storageBucket: BUCKET+".appspot.com",
	messagingSenderId: SENDER_ID,
});

// Add event listeners for handling the api calls
$(document).ready(function() {
	$('#login').click(function() {
		var email = $('#email').val();
		var password = $('#password').val();

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  if (error.message) {
			  $("#errorBox").html(error.message);
			  $("#errorBox").show();
			  setTimeout(function() {
				$("#errorBox").fadeOut();
			  }, 2000);	
			} else {
			  $("#successBox").html("Login successful!");
			  $("#successBox").show();
			  setTimeout(function() {
				window.close();
			  }, 2000);	
			}
		});
	});
	
});