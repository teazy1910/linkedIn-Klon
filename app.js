let personState = [];

let numberOfInvitations = 0;

// Fetch Api URL -> same as: .then().. .then
renderPendingInvitations(numberOfInvitations);

async function loadContacts() {
  try {
    const response = await fetch(
      "https://dummy-apis.netlify.app/api/contact-suggestions?count=8"
    );
    const jsonData = await response.json();
    personState = jsonData;
  } catch (error) {}
}

function createContactHtmlNode(userData) {
  const listElement = document.createElement("li");
  listElement.classList.add("contact");

  let backgroundImg = document.createElement("img");
  backgroundImg.classList.add("background-img");
  listElement.style.backgroundImage = `url("${userData.backgroundImage}"), url(".images/image_default.png")`;

  const userImgElement = document.createElement("img");
  userImgElement.classList.add("userImg");
  userImgElement.src = userData.picture;

  const fullNameElement = document.createElement("h2");
  fullNameElement.classList.add("contact-name");
  fullNameElement.innerText = userData.name.first + " " + userData.name.last;

  const personTitle = document.createElement("h4");
  personTitle.innerText = userData.title;
  personTitle.classList.add("contact-title");

  const connectBtn = document.createElement("button");
  connectBtn.classList.add("connect-btn");
  connectBtn.innerText = "Connect";
  connectBtn.addEventListener("click", connect);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.innerText = "";
  removeBtn.addEventListener("click", remove);

  const mutualConnectionsElement = document.createElement("p");
  mutualConnectionsElement.innerText =
    userData.mutualConnections + " mutual connections";

  listElement.append(
    userImgElement,
    fullNameElement,
    personTitle,
    mutualConnectionsElement,
    connectBtn,
    removeBtn
  );
  return listElement;
}

function render() {
  for (userData of personState) {
    const li = createContactHtmlNode(userData);
    document.querySelector(".contact-list").appendChild(li);
  }
}

function connect(event) {
  const button = event.target;
  if (button.innerText === "Connect") {
    button.innerText = "Pending";
    numberOfInvitations++;
    renderPendingInvitations(numberOfInvitations);
  } else if (button.innerText === "Pending") {
    button.innerText = "Connect";
    numberOfInvitations--;
    renderPendingInvitations(numberOfInvitations);
  }
  renderPendingInvitations(numberOfInvitations);
}

function remove(event) {
  document
    .querySelector(".contact-list")
    .removeChild(event.target.parentElement);
  render();
}

function setlocalStorageNumofInv(numberOfInvitations) {
  localStorage.setItem(
    "numberOfInvitations",
    JSON.stringify(numberOfInvitations)
  );
}

function getlocalStorageNumberInv() {
  const invitationsNum = JSON.parse(
    localStorage.getItem("numberOfInvitations")
  );
  if (invitationsNum === null) {
    numberOfInvitations = 0;
  } else {
    numberOfInvitations = invitationsNum;
  }
}

function renderPendingInvitations(numberOfInvitations) {
  const pendingText = document.querySelector(".pending-inv");
  if (numberOfInvitations === 0) {
    pendingText.innerText = "No Pending Invitations";
  } else if (numberOfInvitations > 0) {
    pendingText.innerText = `${numberOfInvitations} pending Invitations`;
  }
  setlocalStorageNumofInv(numberOfInvitations);
}

function invitationText() {
  if (numberOfInvitations === 0) {
    numberOfInvitations = 0;
  } else {
    numberOfInvitations = invitationsNum;
  }
}

async function init() {
  await loadContacts();
  render();
}

init();
