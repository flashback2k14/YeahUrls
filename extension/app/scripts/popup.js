window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

window.addEventListener("DOMContentLoaded", () => {

  const URL = "https://yeah-urls.herokuapp.com/api/v1/url";
  const TAG = "https://yeah-urls.herokuapp.com/api/v1/tag";

  const urlList = document.querySelector("#urlList");
  const txtKeywords = document.querySelector("#txtKeywords");
  const slctKeywords = document.querySelector("#slctKeywords");

  const btnCurrentUrl = document.querySelector("#btnCurrentUrl");
  const btnAllUrl = document.querySelector("#btnAllUrl");
  const btnClear = document.querySelector("#btnClear");
  const btnSave = document.querySelector("#btnSave");

  const infoText = document.querySelector("#infoText");

  urlList.addEventListener("dblclick", (e) => {
    const urls = [...urlList.childNodes];
    urls.forEach(url => {
      if (url === e.target) {
        urlList.removeChild(e.target);
      }
    });
  });

  slctKeywords.addEventListener("change", (e) => {
    if (txtKeywords.value) {
      txtKeywords.value += " - " + e.target.selectedOptions[0].value;
    } else {
      txtKeywords.value = e.target.selectedOptions[0].value;
    }
  });
  
  slctKeywords.addEventListener("blur", () => {
    slctKeywords.selectedIndex = 0;
  });

  btnCurrentUrl.addEventListener("click", () => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const item = Util.get().createListItem(currentTab.url);
      urlList.appendChild(item);
    });
  });

  btnAllUrl.addEventListener("click", () => {
    browser.tabs.query({ lastFocusedWindow: true }, (tabs) => {
      tabs.forEach(tab => {
        const item = Util.get().createListItem(tab.url);
        urlList.appendChild(item);
      });
    });
  });

  btnClear.addEventListener("click", () => {
    urlList.innerHTML = "";
    txtKeywords.value = "";
  });

  btnSave.addEventListener("click", () => {
    const userToken = localStorage.getItem("YEAH#URLS#EXTENSION#TOKEN");
    const userId = localStorage.getItem("YEAH#URLS#EXTENSION#USERID");

    if (!userToken && !userId) {
      Util.get().showInfoText(infoText, "Not authenticated. Please go to the settings.", false, 3000);
      return;
    }

    const keywords = Util.get().getKeywords(txtKeywords);
    const urls = Util.get().getUrls(urlList);

    if (keywords.length <= 0 && urls.length <= 0) {
      Util.get().showInfoText(infoText, "Urls and / or keywords are empty", false, 3000);
      return;
    }

    const urlSaveRequests = [];

    urls.forEach(url => {
      const data = { url: url, tags: keywords };
      const request = window.fetch(Util.get().createRequest(`${URL}/${userId}`, data, userToken));
      urlSaveRequests.push(request);
    });

    Promise.all(urlSaveRequests)
      .then(result => {
        Util.get().showInfoText(infoText, `Successfully added ${result.length} URLs.`, true);
        urlList.innerHTML = "";
        txtKeywords.value = "";
      })
      .catch(error => {
        console.error(error);
        Util.get().showInfoText(infoText, `Save request failed. Please open the console for more details.`, false, 3000);
      });
  });

  Util.get().setExtensionIcon();
  Util.get(),automaticSignIn(infoText);
  Util.get().getTagsAndFillSelect(slctKeywords, infoText, TAG);  
});
