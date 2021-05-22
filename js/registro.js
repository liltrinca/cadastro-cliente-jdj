var db = firebase.firestore();

function cadastroFirebase(ev){
    ev.preventDefault();
    var email = document.getElementById("cadEmail").value;
    var pass = document.getElementById("cadSenha").value;

    db.collection("users").doc(email).set({
        nome: document.getElementById("cadNome").value,
        email: document.getElementById("cadEmail").value,
        cpf: document.getElementById("cadCPF").value,
        pis: document.getElementById("cadPIS").value,
        senha: document.getElementById("cadSenha").value,
        cep: document.getElementById("cadEndCEP").value,
        rua: document.getElementById("cadEndRua").value,
        numero: document.getElementById("cadEndNumero").value,
        complemento: document.getElementById("cadEndComplemento").value,
        municipio: document.getElementById("cadEndMunicipio").value,
        estado: document.getElementById("cadEndEstado").value,
        pais: document.getElementById("cadEndPais").value
    })
    .then(() => {
        console.log("Document written with ID: ", email);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        window.location.replace('index.html');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert(errorCode + "\n" + errorMessage);
    });
}

function voltar() {
    window.location.replace('index.html');
}

//Button Listeners
document.getElementById('btnRegistrar').addEventListener('click', cadastroFirebase);
document.getElementById('btnVoltar').addEventListener('click', voltar);
