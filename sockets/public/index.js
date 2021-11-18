const socket = io();

let delay = 1000;

const displayUser = (nickname) => {

  if (!!document.querySelector(`.${nickname}`)) {
    return;
  }

  const peopleEl = document.querySelector(".people");

  const userChatEl = `
    <div class="chat_ib ${nickname}">
      <h5>${nickname}</h5>
    </div>
  `;
  peopleEl.innerHTML += userChatEl;
};

const connect = (id) => {
  const nickname = id || `user-${Math.floor(Math.random() * 1000000)}`;
  socket.emit("user:connected", nickname);
  displayUser(nickname);
};

connect();

socket.on("connect", () => {
  console.log("connected", socket.id);
});

socket.on("disconnect", () => {
  console.log("disconnected", socket.id);
});

socket.on("connect_error", () => {
  setTimeout(() => {
    socket.connect();
    delay += 1000;
  }, delay);
});

socket.on("user:connected", (users) => {
  users.map(user => displayUser(user));
});

socket.on("user:disconnected", (user) => {
  document.querySelector(`.${user.nickname}`).remove();
});
