let regVisitante = [];
const cadastrar = (ev)=>{
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
    regVisitante.push(cadastroAtual);

    console.warn('added', {regVisitante});
    console.log(regVisitante);
}
document.getElementById('btnRegistrar').addEventListener('click', cadastrar);
    