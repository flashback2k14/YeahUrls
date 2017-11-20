const Util = (() => {

  let instance;

  _setup = () => {

    createListItem = (text) => {
      const li = document.createElement("li");
      li.innerHTML = text;
      return li;
    }

    createOptionItem = (text) => {
      const option = document.createElement("option");
      option.text = text;
      option.value = text;
      return option;
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

    createGetRequest = (url, token) => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("x-access-token", token);

      const request = new Request(url, {
        method: "GET",
        headers: headers
      });

      return request;
    }

    getKeywords = (txtKeywords) => {
      return (txtKeywords.value) 
        ? txtKeywords.value.split(" - ").map(keyword => keyword.trim()) 
        : [];
    }
    
    getUrls = (urlList) => {
      return (urlList.childElementCount > 0) 
        ? [...urlList.children].map(item => item.innerHTML) 
        : [];
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
        el.classList.remove("yeah-info_success", "yeah-info_error");
        el.classList.add("yeah-info_success");
      } else {
        el.classList.remove("yeah-info_success", "yeah-info_error");
        el.classList.add("yeah-info_error");
      }
      setTimeout(() => { el.innerHTML = "" }, duration);
    }

    sortTags = (data) => {
      const unsortedTags = [...data];
      return [...unsortedTags.sort((a, b) => {
        return a.name.toUpperCase().localeCompare(b.name.toLocaleUpperCase());
      })];
    }

    return {
      createListItem,
      createOptionItem,
      createRequest,
      createGetRequest,
      getKeywords,
      getUrls,
      setIcon,
      showInfoText,
      sortTags
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
