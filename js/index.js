//Logged Check
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    loggedDiv.classList.remove('hide');
    loginDiv.classList.add('hide');
    document.getElementById("userSpan").innerHTML = user.email;
  } else {
    // No user is signed in.
    loggedDiv.classList.add('hide');
    loginDiv.classList.remove('hide');
  }
});

function logar(ev) {
  ev.preventDefault();
  var name = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPass").value;

  firebase.auth().signInWithEmailAndPassword(name, pass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert(errorCode + "\n" + errorMessage);
    });
}

function deslogar() {
  firebase.auth().signOut();
}

function deletar() {
  var user = firebase.auth().currentUser;
  user.delete().then(function () {
    //User deleted
  }).catch(function (error) {
    window.alert(error)
  });
}

//Button Listeners
document.getElementById('btnLogin').addEventListener('click', logar);
document.getElementById('btnLogout').addEventListener('click', deslogar);
document.getElementById('btnDeleteUser').addEventListener('click', deletar);