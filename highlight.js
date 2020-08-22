document.addEventListener('DOMContentLoaded', () => {
  const tabs = chrome.tabs.query({ active: true, currentWindow: true })
  console.log(tabs)
  const tab = tabs[0]
  if (tab.url != null || !tab.url.contains("youtube")) return
  const elements = chrome.tabs.executeScript(tab.id, { code: `document.getElementsByClassName("ytd-grid-video-renderer")` });
  let regex_obj_list = []
  const tmp = localStorage.getItem("youtube-regex-match")
  if (tmp != null) {
    regex_obj_list = JSON.parse(tmp)
    regex_obj_list.forEach(add_list_entry)
  }
  console.log(localStorage)
  const regexs = regex_obj_list.map(e => new RegExp(e.title))
  console.log(regex_obj_list)
  console.log(regexs)
  const members = Array.from(elements).map(elem => {
    if (
      elem &&
      elem.childNodes[0] &&
      elem.childNodes[0].childNodes[0] &&
      elem.childNodes[0].childNodes[0].childNodes[1] &&
      elem.childNodes[0].childNodes[0].childNodes[1].text
    )
      return { title: elem.childNodes[0].childNodes[0].childNodes[1].text, obj: elem };
    else
      return null;
  }).filter(e => e !== null);


  members.filter(
    e => {
      for (let regex of regexs)
        if (e.title.match(regex)) return true
      return false
    }
  ).forEach(
    e => {
      e.obj.style.background = "#f1f"
      console.log(e)
    }
  )
})