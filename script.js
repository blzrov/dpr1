const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "ca03dc8b4amsh8fe919ef52202dbp1412f2jsn8b0561de19b7",
  },
};
function getApi(q) {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?" + q, options)
    .then((response) => response.json())
    .then((response) => displayData(response))
    .catch(() => getApi(q));
}

function displayData(data) {
  console.log(data);
  if (data) {
    createItems(data.data);
  }
  if (data.next) {
    getApi(data.next.split("?")[1]);
  } else if (true) {
    items.innerHTML = "";
    audio.src = "";
    items.appendChild(track_items);
    items.appendChild(artist_items);
  }
}
function createItems(datas) {
  for (let i = 0; i < datas.length; i++) {
    let item = createItem(datas[i].album.cover_medium);
    let name = document.createElement("div");
    let title = document.createElement("div");
    name.textContent = datas[i].artist.name;
    name.addEventListener("mouseenter", function () {
      name.style.color = "rgb(43, 115, 209)";
    });
    name.addEventListener("mouseleave", function () {
      name.style.color = "white";
    });
    name.addEventListener("click", function () {
      input_value = datas[i].artist.name;
      input.value = input_value;
      items.innerHTML = "Подождите...";
      track_items.innerHTML = "";
      artist_items.innerHTML = "";
      list_artists = [];
      getApi("q=" + datas[i].artist.name);
    });
    title.textContent = datas[i].title;
    item.appendChild(name);
    item.appendChild(title);
    item.addEventListener("mouseenter", function () {
      audio.src = datas[i].preview;
    });
    item.addEventListener("mouseleave", function () {
      audio.src = "";
    });
    track_items.appendChild(item);

    if (!list_artists.includes(datas[i].artist.id)) {
      list_artists.push(datas[i].artist.id);
      let artist_item = createItem(datas[i].artist.picture_medium);
      let name = document.createElement("div");
      let title = document.createElement("span");
      title.textContent = datas[i].artist.name;
      name.appendChild(title);
      artist_item.appendChild(name);
      artist_item.addEventListener("mouseenter", function () {
        name.style.backgroundColor = "rgb(0, 0, 0, 60%)";
        title.style.display = "inline";
        artist_item.style.borderColor = "red";
        audio.src = datas[i].preview;
        input.value = datas[i].artist.name + " " + datas[i].title;
      });
      artist_item.addEventListener("mouseleave", function () {
        title.style.display = "none";
        name.style.backgroundColor = "rgb(0, 0, 0, 0%)";
        artist_item.style.borderColor = "gray";
        audio.src = "";
        input.value = input_value;
      });
      artist_item.addEventListener("click", function () {
        input_value = datas[i].artist.name;
        input.value = input_value;
        items.innerHTML = "Подождите...";
        track_items.innerHTML = "";
        artist_items.innerHTML = "";
        list_artists = [];
        getApi("q=" + datas[i].artist.name);
      });
      artist_items.appendChild(artist_item);
    }
  }
  return;
}

function createItem(image) {
  let item = document.createElement("div");
  item.style.backgroundImage = "url('" + image + "')";
  item.style.backgroundRepeat = "no-repeat";
  item.style.backgroundSize = "cover";
  item.classList.add("item");
  return item;
}

let list_artists = [];
let input = document.querySelector("input");
let button = document.querySelector("button");
let audio = document.querySelector("audio");
audio.volume = 0.25;
let items = document.querySelector(".items");
let track_items = document.createElement("div");
track_items.classList.add("track_items");
let artist_items = document.createElement("div");
artist_items.classList.add("artist_items");
let input_value;
button.addEventListener("click", function () {
  items.innerHTML = "Подождите...";
  input_value = input.value;
  track_items.innerHTML = "";
  artist_items.innerHTML = "";
  list_artists = [];
  getApi("q=" + input_value);
});
