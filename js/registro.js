//Inicializar o Firestore
var db = firebase.firestore();

function cadastroFirebase(event) {
    event.preventDefault();
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

    //Validações
    db.collection("users").where("cpf", "==", document.getElementById('cadCPF').value)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length != 0) {
                window.alert("CPF já cadastrado!")
            } else {
                db.collection("users").where("pis", "==", document.getElementById('cadPIS').value)
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot.docs.length != 0) {
                            window.alert("PIS já cadastrado!")
                        } else {
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
                    })
                    .catch((error) => {
                        console.log("Erro ao solicitar dados ao validar PIS: ", error);
                    });;
            }
        })
        .catch((error) => {
            console.log("Erro ao solicitar dados ao validar CPF: ", error);
        });
}

function voltar() {
    //Voltar à pagina anterior
    window.location.replace('index.html');
}

//Button Listeners
document.getElementById('btnVoltar').addEventListener('click', voltar);
