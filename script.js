document.getElementById("formPedido").addEventListener("submit",function(e){

e.preventDefault()

let nome=document.getElementById("nome").value
let coleta=document.getElementById("coleta").value
let entrega=document.getElementById("entrega").value

let mensagem=`Olá Nathan Moto Express

Nome: ${nome}

Coleta: ${coleta}

Entrega: ${entrega}`

let url=`https://wa.me/5516993635702?text=${encodeURIComponent(mensagem)}`

window.open(url)

})