//comando para establecer la conexion
const socket = io();

//recibimos parametros que vienen por url
let searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw  new Error('El escritorio es necesario')
}


let escritorio = searchParams.get('escritorio');
let label = $('small');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio: escritorio}, function (resp) {

        if (resp == 'No hay mas tickets') {
            label.text(resp)
            alert(resp);
            return;
        }
        label.text(`Ticket ${resp.numero}`)
    })
});
