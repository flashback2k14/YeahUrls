const Util = (() => {

  let instance;

  const _setup = () => {

    const createListItem = (text) => {
      const li = document.createElement("li");
      const content = document.createTextNode(text);
      li.appendChild(content);
      return li;
    }

    const createOptionItem = (text) => {
      const option = document.createElement("option");
      option.text = text;
      option.value = text;
      return option;
    }

    const createRequest = (url, data, token = "") => {

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

    const createGetRequest = (url, token) => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("x-access-token", token);

      const request = new Request(url, {
        method: "GET",
        headers: headers
      });

      return request;
    }

    const getKeywords = (txtKeywords) => {
      return (txtKeywords.value) 
        ? txtKeywords.value.split(" - ").map(keyword => keyword.trim()) 
        : [];
    }

    const getTagsAndFillSelect = (selectElement, infoTextElement, url) => {
      
      const token = localStorage.getItem("YEAH#URLS#EXTENSION#TOKEN")
      if (!token) {
        showInfoText(infoTextElement, "Not authenticated. Please go to the settings.", false, 3000);
        return;
      }

      window.fetch(createGetRequest(url, token))
        .then(response => {
          if (!response.ok) { throw new Error(response.statusText); }
          return response.json();
        })
        .then(data => {
          const sortedTags = sortTags(data);
          sortedTags.forEach(tag => {
            const option = createOptionItem(tag.name);
            selectElement.add(option);
          });
        })
        .catch(error => {
          showInfoText(infoTextElement, error, false, 3000);
        });
    }

    const getUrls = (urlList) => {
      return (urlList.childElementCount > 0) 
        ? [...urlList.children].map(item => item.innerHTML) 
        : [];
    }

    const setExtensionIcon = (slctIcon) => {
      const icon = localStorage.getItem("YEAH#URLS#EXTENSION#ICON");
      if (!icon) { 
        return;
      }

      switch (icon) {
        case "light":
          browser.browserAction.setIcon({path: "icons/link-white-48.png"});
          if (slctIcon) {
            slctIcon.selectedIndex = "0";
          }
          break;
        case "dark":
          browser.browserAction.setIcon({path: "icons/link-black-48.png"});
          if (slctIcon) {
            slctIcon.selectedIndex = "1";
          }
          break;
        default:
          break;
      }
    }

    const showInfoText = (el, text, isSuccess, duration = 2000) => {
      const content = document.createTextNode(text);
      el.appendChild(content);
      el.classList.add(isSuccess ? "yeah-info_success" : "yeah-info_error");
      setTimeout(() => {
        el.classList.remove("yeah-info_success", "yeah-info_error");
        el.innerHTML = "";
      }, duration);
    }

    const sortTags = (data) => {
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
      getTagsAndFillSelect,
      getUrls,
      setExtensionIcon,
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
