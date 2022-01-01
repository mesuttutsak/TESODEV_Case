const params = new URLSearchParams(window.location.search);
const listPageNameSearch = document.querySelector("#list-page-name-search");
const listPageSurnameSearch = document.querySelector("#list-page-surname-search");

const itemListListPage = document.querySelector(".item-list-list-page");

const searchNameData = sessionStorage.getItem('searchNameData');
const searchSurnameData = sessionStorage.getItem('searchSurnameData');



window.onload = (e) => {
  if (params.get("name") || params.get("surname")) {
    listPageNameSearch.value =  params.get("name")
    listPageSurnameSearch.value =  params.get("surname")
  }
  getLocaleArray()
};

function addItemListPage(item) {

  const listItem = document.createElement("li");
  listItem.className = "list-group-item";

  const infoItem = document.createElement('div');
  infoItem.className = "info-item d-flex flex-row justify-content-between";
  listItem.appendChild(infoItem);

  const leftOfFrame = document.createElement('div')
  leftOfFrame.className = "left-of-frame d-flex flex-column justify-content-between align-self-start";
  infoItem.appendChild(leftOfFrame);

  const fullname = document.createElement('span');
  fullname.className = "fullname"
  fullname.innerText = item.nameSurname
  leftOfFrame.appendChild(fullname);

  const company = document.createElement('span');
  company.className = "company"
  company.innerText = item.company
  leftOfFrame.appendChild(company);

  const date = document.createElement('span');
  date.className = "date"
  date.innerText = item.date
  leftOfFrame.appendChild(date);

  const rightOfFrame = document.createElement('div')
  rightOfFrame.className = "right-of-frame d-flex flex-column justify-content-end align-items-end";
  infoItem.appendChild(rightOfFrame);

  const email = document.createElement('span');
  email.className = "email"
  email.innerText = item.email
  rightOfFrame.appendChild(email)

  const cityCountry = document.createElement('span');
  cityCountry.className = "city-country"
  rightOfFrame.appendChild(cityCountry)

  const country = document.createElement('span');
  country.className = "country"
  country.innerText = item.country
  cityCountry.appendChild(country)

  const city = document.createElement('span');
  city.className = "city"
  city.innerText = " " + "/" + " " + item.city
  cityCountry.appendChild(city)

  const hr = document.createElement('hr')
  listItem.appendChild(hr);

  itemListListPage.appendChild(listItem);
}

function getLocaleArray(filteredListForListPage) {
  var filteredListForListPage = getFromLocaleStorage("searchResult");
  filteredListForListPage.forEach(element => {
    fillTableForListPage(element)
  });
}

function fillTableForListPage(item){
  addItemListPage(item)   
}