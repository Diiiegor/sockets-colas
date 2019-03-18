//establecemos conexion con el socket del servidor

const socket = io();
const label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor')
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});


socket.on('estadoActual', (ticket) => {
    label.text(ticket.actual)
});


$('button').on('click', function () {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket)
    });
});
