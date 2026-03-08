let map = L.map('map').setView([-22.017,-47.890],12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'© OpenStreetMap'
}).addTo(map)

let origemCoord
let destinoCoord
let distanciaKm
let valor

async function geocode(endereco){

let url="https://nominatim.openstreetmap.org/search?format=json&q="+endereco

let res=await fetch(url)

let data=await res.json()

return [parseFloat(data[0].lat),parseFloat(data[0].lon)]

}

function distancia(lat1,lon1,lat2,lon2){

let R=6371

let dLat=(lat2-lat1)*Math.PI/180
let dLon=(lon2-lon1)*Math.PI/180

let a=
Math.sin(dLat/2)**2+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)**2

let c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))

return R*c

}

async function calcularFrete(){

let origem=document.getElementById("origem").value
let destino=document.getElementById("destino").value
let retorno=document.getElementById("retorno").checked

origemCoord=await geocode(origem)
destinoCoord=await geocode(destino)

let km1=distancia(origemCoord[0],origemCoord[1],destinoCoord[0],destinoCoord[1])

if(retorno){

distanciaKm=km1*2

}else{

distanciaKm=km1

}

valor=distanciaKm*2.2

document.getElementById("resultado").innerHTML=
`
Distância total: ${distanciaKm.toFixed(1)} km <br>
Valor estimado: R$ ${valor.toFixed(2)}
`

map.eachLayer(function(layer){
if(layer instanceof L.Marker) map.removeLayer(layer)
})

L.marker(origemCoord).addTo(map)
L.marker(destinoCoord).addTo(map)

map.fitBounds([origemCoord,destinoCoord])

document.getElementById("pedidoBtn").style.display="block"

}

function enviarPedido(){

let cliente=document.getElementById("cliente").value
let telefone=document.getElementById("telefone").value
let origem=document.getElementById("origem").value
let destino=document.getElementById("destino").value

let texto=

`Pedido Nathan Moto Express

Cliente: ${cliente}
Telefone: ${telefone}

Coleta: ${origem}
Entrega: ${destino}

Distância: ${distanciaKm.toFixed(1)} km
Valor estimado: R$ ${valor.toFixed(2)}`

let url="https://wa.me/5516SEUNUMERO?text="+encodeURIComponent(texto)

window.open(url)

}