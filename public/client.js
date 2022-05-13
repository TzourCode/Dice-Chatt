const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const messages = document.querySelector("#messages");
const formMessage = document.querySelector("#formMessage");
const inputMessage = document.querySelector("#inputMessage");
const userContianer = document.querySelector("#userContainer");

let myUser;

formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
  document.getElementById("message").style.display = "block";
});

formMessage.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log();
  if (inputMessage.value) {
    socket.emit("chatMessage", { user: myUser, message: inputMessage.value });
    inputMessage.value = "";
  }
});

rollDice.addEventListener("click", function (e) {
  e.preventDefault();
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const diceTotal = d1 + d2;
  die1.innerHTML = d1;
  die2.innerHTML = d2;
  const status = document.getElementById("status");
  status.innerHTML = inputUser.value + " slog " + diceTotal + ".";

  if (d1 == d2) {
    status.innerHTML += " - Du fick DUBLETTER! Du får en extra chans!!";
  }
  socket.emit("rollDice", { user: myUser, status: diceTotal });
});

socket.on("newRollDice", function (data) {
  let item = document.createElement("li");
  item.textContent = data;
  messages.appendChild(item);
});

socket.on("newChatMessage", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});
