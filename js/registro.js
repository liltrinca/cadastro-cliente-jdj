//Inicializar o Firestore
var db = firebase.firestore();

function cadastroFirebase(ev) {
    ev.preventDefault();
    //Construir cadastro
    var userEmail = document.getElementById("cadEmail").value;
    var userPassword = document.getElementById("cadSenha").value;
    var userData = {
        nome: document.getElementById("cadNome").value,
        email: userEmail,
        cpf: document.getElementById("cadCPF").value,
        pis: document.getElementById("cadPIS").value,
        cep: document.getElementById("cadEndCEP").value,
        rua: document.getElementById("cadEndRua").value,
        numero: document.getElementById("cadEndNumero").value,
        complemento: document.getElementById("cadEndComplemento").value,
        municipio: document.getElementById("cadEndMunicipio").value,
        estado: document.getElementById("cadEndEstado").value,
        pais: document.getElementById("cadEndPais").value
    };

    //Cadastrar usuário
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            //Usuário cadastrado
            var user = userCredential.user;
            //Adicionar usuário ao Firestore
            db.collection("users").doc(user.uid).set(userData)
                .then(() => {
                    //Usuário adicionado ao Firestore
                    window.alert("Cadastrado com sucesso\nRedirecionando...");
                    window.location.replace('index.html');
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        })
        .catch((error) => {
            //Erros ao cadastrar
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode + "\n" + errorMessage);
        });
}

function voltar() {
    //Voltar à pagina anterior
    window.location.replace('index.html');
}

//Button Listeners
document.getElementById('btnRegistrar').addEventListener('click', cadastroFirebase);
document.getElementById('btnVoltar').addEventListener('click', voltar);
