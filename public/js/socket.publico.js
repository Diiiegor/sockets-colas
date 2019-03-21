//comando para establecer la conexion
const socket = io();

//objetos de tickets
let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

//objetos de escritorio
let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

let lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
let lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];


socket.on('estadoActual', function (resp) {
    actualizaHtml(resp.ultimos4)
});


function actualizaHtml(ultimos4) {
    for (let i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket '+ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}
