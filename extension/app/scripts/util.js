const Util = (() => {

  let instance;

  _setup = () => {

    createListItem = (text) => {
      const li = document.createElement("li");
      li.innerHTML = text;
      return li;
    }

    createRequest = (url, data, token = "") => {

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      if (token !== "") {
        headers.set("x-access-token", token);
      }

      const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers
      });

      return request;
    }

    getKeywords = (txtKeywords) => {
      return (txtKeywords.value) ? txtKeywords.value.split(" - ").map(keyword => keyword.trim()) : [];
    }
    
    getUrls = (urlList) => {
      return (urlList.childElementCount > 0) ? [...urlList.children].map(item => item.innerHTML) : [];
    }

    setIcon = (slctIcon) => {
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

    showInfoText = (el, text, isSuccess, duration = 2000) => {
      el.innerHTML = text;
      if (isSuccess) {
        el.classList.remove("info-success", "info-error");
        el.classList.add("info-success");
      } else {
        el.classList.remove("info-success", "info-error");
        el.classList.add("info-error");
      }
      setTimeout(() => { el.innerHTML = "" }, duration);
    }

    return {
      createListItem,
      createRequest,
      getKeywords,
      getUrls,
      setIcon,
      showInfoText
    }
  }

  return {
    get () {
      if (!instance) {
        instance = _setup();
      }
      return instance;
    }
  }
})();
