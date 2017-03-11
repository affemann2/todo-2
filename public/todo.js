window.onload = function(){

	//Add new to do task by entering text and clicking submit
	var submit = document.getElementById('submit');
	submit.onclick = function(){
		var task = document.getElementById('todo').value;
		console.log(task);
		var ol = document.getElementById("list")
		var entry = document.createElement('li');
		entry.id = 'id'
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.className = "checkbox"
		entry.appendChild(checkbox)
		entry.appendChild(document.createTextNode(task));
		ol.appendChild(entry);
		};

	//Strike through task if click on text
	$(document).on('click', 'li', function(){
		$(this).css("text-decoration", "line-through");
	});

	//Remove task when click checkbox
	$(document).on('change', '.checkbox', function(){
		$(this).parent().hide();
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

	//Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log("firebaseUser");
		} else {
			console.log('not logged in');
		}
	});

};


