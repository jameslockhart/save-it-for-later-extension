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

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(user) {
				$("#successBox").html("Login successful!");
			    $("#successBox").show();
			    setTimeout(function() {
					window.close();
			    }, 2000);	
			})
			.catch(function(error) {
			  if (error.message) {
				  $("#errorBox").html(error.message);
				  $("#errorBox").show();
				  setTimeout(function() {
					$("#errorBox").fadeOut();
				  }, 2000);	
				}
			});
	});

	// if we are logged in then send the page link to firebase
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// hide the login peices
			$('#email').hide();
			$('#password').hide();
			$('#login').hide();

			function saveToDb(tab) {
				var image = tab.favIconUrl
				var postData = {
				    image: image,
				    read: false,
				    title: tab.title,
				    savedAt: new Date().toDateString(),
				    url: tab.url
				};

				// Get a key for a new Post.
				var newPostKey = firebase.database().ref().child('saves').child(user.uid).push().key;

				// Write the new post's data simultaneously in the posts list and the user's post list.
				var updates = {};
				updates['/saves/' + user.uid + '/' + newPostKey] = postData;

				firebase.database().ref().update(updates);

				$("#successBox").html("Save successful!");
			    $("#successBox").show();
			    setTimeout(function() {
					window.close();
			    }, 1500);
			}

		    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			    saveToDb(tabs[0]);
			});
		}
	});
});