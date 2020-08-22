
const add_list_entry = ({ text, type }) => {
  const regex = document.createElement("li")
  regex.innerHTML =
    `<span>${text}</span> <span>${type}</span> <button onclick="edit(this)">edit</button> <button onclick="remove(this)">remove</button>`
  regex.regex_obj = { text, type }
  regex_list.appendChild(regex)
}
const title_button = document.getElementById("title-button")
const channel_button = document.getElementById("channel-button")
const add_button = document.getElementById("add-button")
const save_button = document.getElementById("save-button")
const text_box = document.getElementById("text-box")
const regex_list = document.getElementById("regex-list")
let regex_obj_list = []
const tmp = localStorage.getItem("youtube-regex-match")
if (tmp != null) {
  regex_obj_list = JSON.parse(tmp)
  regex_obj_list.forEach(add_list_entry)
}

title_button.onclick = () => {
  title_button.classList.add("selected")
  channel_button.classList.remove("selected")
}
channel_button.onclick = () => {
  channel_button.classList.add("selected")
  title_button.classList.remove("selected")
}

add_button.onclick = () => {
  const regex_obj = { text: text_box.value, type: title_button.classList.contains("selected") ? "Title" : "Channel" }
  regex_obj_list.push(regex_obj)
  add_list_entry(regex_obj)
}
text_box.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
    add_button.onclick()
  }
});
const edit = ({ parentElement }) => {
  text_box.value = parentElement.childNodes[0].innerHTML
  if (parentElement.childNodes[1].innerText == "Title") title_button.onclick()
  else channel_button.onclick()
  parentElement.remove();
}

const remove = ({ parentElement }) => {
  regex_obj_list = regex_obj_list.filter(e => e.text != parentElement.regex_obj.text || e.type != parentElement.regex_obj.type)
  parentElement.remove()
}

save_button.onclick = () => {
  localStorage.setItem("youtube-regex-match", JSON.stringify(regex_obj_list))
}
