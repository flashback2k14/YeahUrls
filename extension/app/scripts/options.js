window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

function _showInfoText (el, text, isSuccess) {
  el.innerHTML = text;
  if (isSuccess) {
    el.classList.remove("info-success", "info-error");
    el.classList.add("info-success");
  } else {
    el.classList.remove("info-success", "info-error");
    el.classList.add("info-error");
  }
  setTimeout(() => { el.innerHTML = "" }, 2000);
};

function _createRequest (url, username, password) {
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  return request;
};

function _setIcon (slctIcon) {
  const icon = localStorage.getItem("YEAH#URLS#EXTENSION#ICON");
  if (icon === null) { return; }
  
  switch (icon) {
    case "light":
      browser.browserAction.setIcon({path: "icons/link-white-48.png"});
      slctIcon.selectedIndex = "0";
      break;
    case "dark":
      browser.browserAction.setIcon({path: "icons/link-black-48.png"});
      slctIcon.selectedIndex = "1";
      break;
    default:
      break;
  }
}

window.addEventListener("DOMContentLoaded", () => {

  const SIGNINURL = "https://yeah-urls.herokuapp.com/api/v1/signin";
  const txtUsername = document.querySelector("#txtUsername");
  const txtPassword = document.querySelector("#txtPassword");
  const btnClear = document.querySelector("#btnClear");
  const btnSend = document.querySelector("#btnSend");
  const slctIcon = document.querySelector("#slctIcon");
  const btnChange = document.querySelector("#btnChange");
  const infoText = document.querySelector("#infoText");

  _setIcon(slctIcon);
  
  btnClear.addEventListener("click", () => {
    txtUsername.value = "";
    txtPassword.value = "";
  });

  btnSend.addEventListener("click", () => {
    const username = txtUsername.value;
    const password = txtPassword.value;

    if (!username && !password) {
      _showInfoText(infoText, "Username and / or password must be entered before authentication.", false);
      return;
    }

    window.fetch(_createRequest(SIGNINURL, username, password))
      .then(response => {
        if (!response.ok) { throw new Error(response.statusText); }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("YEAH#URLS#EXTENSION#TOKEN", data.token)
        txtUsername.value = "";
        txtPassword.value = "";
        _showInfoText(infoText, `User ${data.user.name} is successfully authenticated!`, true);
      })
      .catch(error => {
        _showInfoText(infoText, error, false);
      });
  });

  btnChange.addEventListener("click", () => {
    if (!slctIcon.value) { return; }
    switch (slctIcon.value) {
      case "light":
        browser.browserAction.setIcon({ path: "icons/link-white-48.png" });
        localStorage.setItem("YEAH#URLS#EXTENSION#ICON", "light");
        break;
      case "dark":
        browser.browserAction.setIcon({ path: "icons/link-black-48.png" });
        localStorage.setItem("YEAH#URLS#EXTENSION#ICON", "dark");
        break;
      default:
        break;
    }
  });
});
