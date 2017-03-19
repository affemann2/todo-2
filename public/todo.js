window.onload = function(){

	var task; 
	var userId;

	//Add new to do task by entering text and clicking submit
	var submit = document.getElementById('submit');
	submit.onclick = function(){
		var task = document.getElementById('todo').value;
		console.log(task);
		
		var newTodoRef = todosRef.push();
		newTodoRef.set({
		    title : task,
		    done : false
		});	
	};

	//Strike through task if click on text
	$(document).on('click', 'li', function(){
		$(this).css("text-decoration", "line-through");
	});

	//Remove task when click checkbox
	$('#list').on('change', '.checkbox', function(){
		var $li = $(this).closest('li');
		var todo = $li.data('todo');
		console.log('firebase todo', todo);
		todosRef.child(todo.key).remove();
	});

	//User Authentification using firebase
	//Get elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	//Add login event
	btnLogin.addEventListener('click', e => {
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

	//Add signup event
	btnSignUp.addEventListener('click', e => {
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));		
	});

	//Add logout event
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});


	var userDataRef = null,
		todosRef = null;;

	//Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			userId = firebaseUser.uid;
			console.log(userId);
				
			// userDataRef = firebase.database().ref().child('users').child(userId);
			userDataRef = firebase.database().ref('users/' + userId);

			todosRef = userDataRef.child('todos'); // /users/[userId]/todos

			todosRef.on('value', snapshot =>{
				console.log(snapshot.val());

				$("#list").empty();

				snapshot.forEach(function(childSnapshot) {
				    var childKey = childSnapshot.key;
				    var childData = childSnapshot.val();
				  	console.log('child', childKey, childData);

				  	var $li = $("<li><input type = 'checkbox' class='checkbox' > " + childData.title + "</li>");
				  	$li.data('todo', childSnapshot);

					$("#list").append($li)
				  });
			})
		} else {
			console.log('not logged in');
		}
	});

};


