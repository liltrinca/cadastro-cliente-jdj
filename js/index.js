//Inicializar o Firestore
var db = firebase.firestore();

//Checar se o usuário está conectado
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //Usuário está conectado
    loggedDiv.classList.remove('hide');
    loginDiv.classList.add('hide');
    //Coletar dados do usuário atual
    var currentUserData = db.collection("users").doc(user.uid);

    //Adicionar os dados do usuário atual à tela de edição
    currentUserData.get().then((doc) => {
      if (doc.exists) {
        document.getElementById("userSpan").innerHTML = doc.data().nome;
        document.getElementById('editNome').value = doc.data().nome;
        document.getElementById('editEmail').value = doc.data().email;
        document.getElementById('editCPF').value = doc.data().cpf;
        document.getElementById('editPIS').value = doc.data().pis;
        document.getElementById('editEndCEP').value = doc.data().cep;
        document.getElementById('editEndRua').value = doc.data().rua;
        document.getElementById('editEndNumero').value = doc.data().numero;
        document.getElementById('editEndComplemento').value = doc.data().complemento;
        document.getElementById('editEndMunicipio').value = doc.data().municipio;
        document.getElementById('editEndEstado').value = doc.data().estado;
        document.getElementById('editEndPais').value = doc.data().pais;
      } else {
        console.log("Não foram encontrados dados para passar à tela de edição");
      }
    }).catch((error) => {
      //Erros ao solicitar dados
      console.log("Erro ao solicitar dados do Firestore:", error);
    });

    function confirmEdit() {
      //Confirmação com senha
      authPass = prompt("Insira sua senha");

      //Inicializar credenciais
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        authPass
      );

      //Verificar se o usuário está credenciado
      user.reauthenticateWithCredential(credential).then(function () {
        if (document.getElementById('editSenha').value != "") {
          user.updatePassword(document.getElementById('editSenha').value).then(function () {
            window.location.reload();
            window.alert("Sua senha foi alterada com sucesso");
          }).catch(function (error) {
            //Erros ao alterar senha
            window.alert("Não foi possível alterar sua senha.\n" + error);
            console.log(error);
          });
        }
      }).catch(function (error) {
        //Erros ao verificar credenciais
        console.log(error);
      });

      user.reauthenticateWithCredential(credential).then(function () {
        if (user.email != document.getElementById('editEmail').value) {
          user.updateEmail(document.getElementById('editEmail').value).then(function () {
            window.alert("Seu email foi alterado com sucesso");
            window.location.reload();
          }).catch(function (error) {
            //Erros ao alterar email
            console.log(error);
            window.alert("Não foi possível alterar seu email.\n" + error);
          });
        }
      }).catch(function (error) {
        //Erros ao verificar credenciais
        console.log(error);
      });
      //Atualizar dados da edição no Firebase
      return currentUserData.update({
        nome: document.getElementById('editNome').value,
        email: document.getElementById('editEmail').value,
        cpf: document.getElementById('editCPF').value,
        pis: document.getElementById('editPIS').value,
        cep: document.getElementById('editEndCEP').value,
        rua: document.getElementById('editEndRua').value,
        numero: document.getElementById('editEndNumero').value,
        complemento: document.getElementById('editEndComplemento').value,
        municipio: document.getElementById('editEndMunicipio').value,
        estado: document.getElementById('editEndEstado').value,
        pais: document.getElementById('editEndPais').value
      })
        .then(() => {
          //Dados alterados no Firebase
          window.alert("Dados alterados");
          window.location.reload();
        })
        .catch((error) => {
          //Erros ao encontrar o documento (provavelmente não existe)
          console.log(error);
          window.alert("Não foi possível alterar seus dados\n" + error);
        });
    }
    //Listener botão editar
    document.getElementById('btnConfirmEdit').addEventListener('click', confirmEdit);
  } else {
    //Usuário não conectado
    loggedDiv.classList.add('hide');
    loginDiv.classList.remove('hide');
  }
});

function logar(ev) {
  ev.preventDefault();

  //Inicializar componentes digitados
  var name = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPass").value;

  //Checar se o valor digitado é um CPF
  db.collection("users").where("cpf", "==", name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          //Conectar com CPF
          var loginCredential = doc.data().email;
          firebase.auth().signInWithEmailAndPassword(loginCredential, pass)
            .then((userCredential) => {
              //Usuário conectado
              var user = userCredential.user;
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;

              window.alert(errorCode + "\n" + errorMessage);
            });
        } else {
          window.alert("Dados de login inválidos.");
        }
      });
    })
    .catch((error) => {
      console.log("Erro ao solicitar dados no login com CPF: ", error);
    });

  //Checar se o valor digitado é um PIS
  db.collection("users").where("pis", "==", name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          //Conectar com PIS
          var loginCredential = doc.data().email;
          firebase.auth().signInWithEmailAndPassword(loginCredential, pass)
            .then((userCredential) => {
              //Usuário conectado
              var user = userCredential.user;
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;

              window.alert(errorCode + "\n" + errorMessage);
            });
        } else {
          window.alert("Dados de login inválidos.");
        }
      });
    })
    .catch((error) => {
      console.log("Erro ao solicitar dados no login com PIS: ", error);
    });

  //Checar se o valor digitado é um email
  db.collection("users").where("email", "==", name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          //Conectar com email
          var loginCredential = doc.data().email;
          firebase.auth().signInWithEmailAndPassword(loginCredential, pass)
            .then((userCredential) => {
              //Usuário conectado
              var user = userCredential.user;
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;

              window.alert(errorCode + "\n" + errorMessage);
            });
        } else {
          window.alert("Dados de login inválidos.");
        }
      });
    })
    .catch((error) => {
      console.log("Erro ao solicitar dados no login com email: ", error);
    });
}

function deslogar() {
  //Desconectar
  firebase.auth().signOut();
}

function deletar() {
  var user = firebase.auth().currentUser;

  if (confirm('Tem certeza que deseja apagar este usuário?')) {
    //Apagar do Firestore
    db.collection("users").doc(user.uid).delete().then(() => {
      console.log("Dados deletados do Firestore");
      //Apagar do Authenticate
      user.delete().then(function () {
        //Usuário apagado do Auth
        console.log("Dados deletados do Auth");
      }).catch(function (error) {
        //Erros ao apagar usuário
        window.alert("Não foi possível apagar usuário\n" + error);
      });
    }).catch((error) => {
      //Erros ao apagar do Firestore
      console.error("Erro ao apagar dados do Firestore: ", error);
    });
  }
}

function editar() {
  //Mostrar página de edição
  loggedDiv.classList.add('hide');
  loginDiv.classList.add('hide');
  editDiv.classList.remove('hide');
}

function voltar() {
  //Retornar à tela de login
  loggedDiv.classList.remove('hide');
  loginDiv.classList.add('hide');
  editDiv.classList.add('hide');
}

//Button Listeners
document.getElementById('btnLogin').addEventListener('click', logar);
document.getElementById('btnLogout').addEventListener('click', deslogar);
document.getElementById('btnDeleteUser').addEventListener('click', deletar);
document.getElementById('btnEdit').addEventListener('click', editar);
document.getElementById('btnVoltar').addEventListener('click', voltar);