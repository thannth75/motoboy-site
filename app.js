let map = L.map('map').setView([-22.017, -47.890], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'© OpenStreetMap'
}).addTo(map);

let origemCoord;
let destinoCoord;
let distanciaKm;
let valor;

async function geocode(endereco){

let url="https://nominatim.openstreetmap.org/search?format=json&q="+endereco;

let res=await fetch(url);

let data=await res.json();

return [data[0].lat,data[0].lon];

}

function calcularDistancia(lat1,lon1,lat2,lon2){

let R=6371;

let dLat=(lat2-lat1)*Math.PI/180;

let dLon=(lon2-lon1)*Math.PI/180;

let a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)*Math.sin(dLon/2);

let c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

}

async function calcularFrete(){

let origem=document.getElementById("origem").value;
let destino=document.getElementById("destino").value;

origemCoord=await geocode(origem);
destinoCoord=await geocode(destino);

distanciaKm=calcularDistancia(
origemCoord[0],origemCoord[1],
destinoCoord[0],destinoCoord[1]
);

valor=distanciaKm*2.2;

document.getElementById("resultado").innerHTML=
`Distância: ${distanciaKm.toFixed(1)} km <br>
Valor estimado: R$ ${valor.toFixed(2)}`;

L.marker(origemCoord).addTo(map);
L.marker(destinoCoord).addTo(map);

map.fitBounds([origemCoord,destinoCoord]);

document.getElementById("pedidoBtn").style.display="block";

}

function enviarPedido(){

let origem=document.getElementById("origem").value;
let destino=document.getElementById("destino").value;

let texto=`Pedido Nathan Moto Express
Origem: ${origem}
Destino: ${destino}
Distância: ${distanciaKm.toFixed(1)} km
Valor estimado: R$ ${valor.toFixed(2)}`;

let url="https://wa.me/5516993635702?text="+encodeURIComponent(texto);

window.open(url);

}