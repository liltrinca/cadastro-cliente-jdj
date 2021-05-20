const cadastrar = (ev) => {
    ev.preventDefault();
    let cadastroAtual = {
        id: regVisitante.length,
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
    }
}

function cadastroFirebase(ev){
    ev.preventDefault();
    var email = document.getElementById("cadEmail").value;
    var pass = document.getElementById("cadSenha").value;

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

//Button Listeners
document.getElementById('btnRegistrar').addEventListener('click', cadastroFirebase);
