//FRONT
const socket = io();
let correoDelUsuario = '';

async function pedirEmail() {
  const { value: nombre } = await Swal.fire({
    title: 'Enter your mail',
    input: 'text',
    inputLabel: 'Your mail',
    inputValue: '',
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write your mail!';
      }
    },
  });

  correoDelUsuario = nombre;
}

pedirEmail();

//FRONT EMITE

const chatBox = document.getElementById('chat-box');

chatBox.addEventListener('keyup', ({ key }) => {
  if (key == 'Enter') {
    socket.emit('msg_front_to_back', {
      user: correoDelUsuario,
      message: chatBox.value,
    });
    chatBox.value = '';
  }
});

//FRONT RECIBE
socket.on('msg_back_to_front', (msgs) => {

  console.log(msgs);
  let formattedMessages = '';
  msgs.forEach((msg) => {
    formattedMessages += "<div style='border: 1px solid red;'>";
    formattedMessages += '<p>' + msg.user + '</p>';
    formattedMessages += '<p>' + msg.message + '</p>';
    formattedMessages += '</div>';
  });

  const divMsgs = document.getElementById('div');
  divMsgs.innerHTML = formattedMessages;
});