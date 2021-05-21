var db = firebase.firestore();

//Logged Check
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    loggedDiv.classList.remove('hide');
    loginDiv.classList.add('hide');

    var currentUserData = db.collection("users").doc(user.email);
    currentUserData.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("userSpan").innerHTML = doc.data().nome;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

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

  db.collection("users").doc(user.email).delete().then(() => {
    console.log("Document successfully deleted!");
    user.delete().then(function () {
      //User deleted
    }).catch(function (error) {
      window.alert(error)
    });
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

function editar() {
  var user = firebase.auth().currentUser;
  loggedDiv.classList.add('hide');
  loginDiv.classList.add('hide');
  editDiv.classList.remove('hide');

  var currentUserData = db.collection("users").doc(user.email);
  currentUserData.get().then((doc) => {
    if (doc.exists) {
      document.getElementById('editNome').value = doc.data().nome;
      document.getElementById('editEmail').value = doc.data().email;
      document.getElementById('editCPF').value = doc.data().cpf;
      document.getElementById('editPIS').value = doc.data().pis;
      document.getElementById('editSenha').value = doc.data().senha;
      document.getElementById('editEndCEP').value = doc.data().cep;
      document.getElementById('editEndRua').value = doc.data().rua;
      document.getElementById('editEndNumero').value = doc.data().numero;
      document.getElementById('editEndComplemento').value = doc.data().complemento;
      document.getElementById('editEndMunicipio').value = doc.data().municipio;
      document.getElementById('editEndEstado').value = doc.data().estado;
      document.getElementById('editEndPais').value = doc.data().pais;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

function confirmEdit() {
  var user = firebase.auth().currentUser;
  loggedDiv.classList.remove('hide');
  editDiv.classList.add('hide');

  var currentUserData = db.collection("users").doc(user.email);
  currentUserData.get().then((doc) => {
    if (doc.exists) {
      return currentUserData.update({
        nome: document.getElementById("editNome").value,
        email: document.getElementById("editEmail").value,
        cpf: document.getElementById("editCPF").value,
        pis: document.getElementById("editPIS").value,
        senha: document.getElementById("editSenha").value,
        cep: document.getElementById("editEndCEP").value,
        rua: document.getElementById("editEndRua").value,
        numero: document.getElementById("editEndNumero").value,
        complemento: document.getElementById("editEndComplemento").value,
        municipio: document.getElementById("editEndMunicipio").value,
        estado: document.getElementById("editEndEstado").value,
        pais: document.getElementById("editEndPais").value
      })
        .then(() => {
          console.log("Document successfully updated!");
          window.location.reload();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

//Button Listeners
document.getElementById('btnLogin').addEventListener('click', logar);
document.getElementById('btnLogout').addEventListener('click', deslogar);
document.getElementById('btnDeleteUser').addEventListener('click', deletar);
document.getElementById('btnEdit').addEventListener('click', editar);
document.getElementById('btnConfirmEdit').addEventListener('click', confirmEdit);