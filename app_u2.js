const messageField = document.getElementById('messageField');
const chatContainer = document.getElementById('chatContainer');
let oldDataLength = 0;

const postMessage = async () => {
    let jsReq = {
        userId: 2,
        message: messageField.value
    }
    const jsonReq = JSON.stringify(jsReq);
    try {
        const response = await fetch('http://localhost:4000/messages', {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": jsonReq
        })
        if(response.ok) {
            newMessage = true;
            messageField.value = "";
            const data = await response.json();
            let newMessageIndex = data.length - 1;
            if (data[newMessageIndex].userId === 1) {
                chatContainer.innerHTML += `<div class="chatbox-u1">${data[newMessageIndex].message}</div>`;
            } else if (data[newMessageIndex].userId === 2) {
                chatContainer.innerHTML += `<div class="chatbox-u2">${data[newMessageIndex].message}</div>`;
            }
        }
    } catch (err) {
        console.log('Wasnt able to send message' + err)
    }
}

const getMessages = async () => {
    try {
        chatContainer.innerHTML = "";
        const response = await fetch('http://localhost:4000/');
        if (response.ok) {
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                if (data[i].userId === 1) {
                    chatContainer.innerHTML += `<div class="chatbox-u1">${data[i].message}</div>`;
                } else if (data[i].userId === 2) {
                    chatContainer.innerHTML += `<div class="chatbox-u2">${data[i].message}</div>`;
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
 
}

messageField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      postMessage();
    }
});


const checkForNewMessage = async () => {
    try {
        const response = await fetch('http://localhost:4000/');
        if (response.ok) {
            const data = await response.json();
            if(oldDataLength !== data.length) {
                getMessages();
                oldDataLength = data.length;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

setInterval(checkForNewMessage, 500);
