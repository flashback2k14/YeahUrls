window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

window.addEventListener("DOMContentLoaded", () => {

  const SIGNINURL = "https://yeah-urls.herokuapp.com/api/v1/signin";
  const txtUsername = document.querySelector("#txtUsername");
  const txtPassword = document.querySelector("#txtPassword");
  const btnReset = document.querySelector("#btnReset");
  const btnClear = document.querySelector("#btnClear");
  const btnSend = document.querySelector("#btnSend");
  const slctIcon = document.querySelector("#slctIcon");
  const btnChange = document.querySelector("#btnChange");
  const infoText = document.querySelector("#infoText");

  btnReset.addEventListener("click", () => {
    localStorage.removeItem("YEAH#URLS#EXTENSION#TOKEN");
    localStorage.removeItem("YEAH#URLS#EXTENSION#USERID");
    Util.get().showInfoText(infoText, "Successfully resetted!", true);
  });

  btnClear.addEventListener("click", () => {
    txtUsername.value = "";
    txtPassword.value = "";
  });

  btnSend.addEventListener("click", () => {
    const username = txtUsername.value;
    const password = txtPassword.value;

    if (!username && !password) {
      const msg = "Username and / or password must be entered before authentication.";
      Util.get().showInfoText(infoText, msg, false, 3000);
      return;
    }

    window.fetch(Util.get().createRequest(SIGNINURL, { username, password }))
      .then(response => {
        if (!response.ok) { throw new Error(response.statusText); }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("YEAH#URLS#EXTENSION#TOKEN", data.token);
        localStorage.setItem("YEAH#URLS#EXTENSION#USERID", data.user.id);
        txtUsername.value = "";
        txtPassword.value = "";
        Util.get().showInfoText(infoText, `User ${data.user.name} is successfully authenticated!`, true);
      })
      .catch(error => {
        Util.get().showInfoText(infoText, error, false, 3000);
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

  Util.get().setIcon(slctIcon);  
});
