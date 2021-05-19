$("#cadEndCEP").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#cadEndRua").val(resposta.logradouro);
            $("#cadEndComplemento").val(resposta.complemento);
            $("#cadEndMunicipio").val(resposta.localidade);
            $("#cadEndEstado").val(resposta.uf);
            $("#cadEndPais").val("Brasil");
            $("#cadEndNumero").focus();
        },
    });		
});