const params = new URLSearchParams(window.location.search);
var listPageNameSearch = document.querySelector("#list-page-name-search");
var listPageSurnameSearch = document.querySelector("#list-page-surname-search");

const itemListListPage = document.querySelector(".item-list-list-page");

const searchNameData = sessionStorage.getItem('searchNameData');
const searchSurnameData = sessionStorage.getItem('searchSurnameData');



var a = new Array();



window.onload = (e) => {
  if (params.get("name") || params.get("surname")) {
    listPageNameSearch.value = params.get("name")
    listPageSurnameSearch.value = params.get("surname")
  }
  listPageSearchData()

};

function listPageSearchData() {
  if (listPageNameSearch.value !== "" && listPageNameSearch.value !== "") {
    getLocaleArray()
  }
  else {
    console.log('hata');
  }

}

function addItemListPage(item) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item item-list-page";

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

function getLocaleArray() {
  if (a.length <= 0) {
    var getUserDataForListPage = getFromLocaleStorage("userListData");
    getUserDataForListPage.forEach(element => {
      a.push(element);
    });
  }
  setToLocaleStorage("searchResult", filterLocalItems(a, listPageNameSearch.value));
  fillTableToSortAZForListPage()
}

function fillTableToSortAZForListPage() {
  cleanListPageTable()
  sortByNameAndSurname(getFromLocaleStorage("searchResult"), true).forEach(element => {
    addItemListPage(element)
  });
}

function fillTableToSortZAForListPage() {
  cleanListPageTable()
  sortByNameAndSurname(getFromLocaleStorage("searchResult"), false).forEach(element => {
    addItemListPage(element)
  });
}

function fillTableStartFirstDateForListPage() {
  cleanListPageTable()
  sortByDate(getFromLocaleStorage("searchResult"), true).forEach(element => {
    addItemListPage(element)
  });
}

function fillTableStartLastDateForListPage() {
  cleanListPageTable()
  sortByDate(getFromLocaleStorage("searchResult"), false).forEach(element => {
    addItemListPage(element)
  });
}




function filterLocalItems(arr, query) {
  return arr.filter((el) => el.nameSurname.toLowerCase().includes(query.toLowerCase()))
}


function cleanListPageTable() {
  document.querySelectorAll(".item-list-page").forEach(element => {
    element.remove()
  });
}

function sortByNameAndSurname(list, isAscending) {
  var sortedList = list.sort((first, second) => {
    var firstLowerCase = first.nameSurname.toLowerCase()
    var secondLowerCase = second.nameSurname.toLowerCase()
    if (firstLowerCase < secondLowerCase) { return -1; }
    if (firstLowerCase > secondLowerCase) { return 1; }
    return 0;
  })

  if (isAscending) {
    return sortedList
  } else {
    return sortedList.reverse()
  }
}

function sortByDate(list, isAscending) {
  var sortedList = list.sort((first, second) => {
    var firstDate = moment(first.date,"DD/MM/YYYY").toDate().getTime();
    var secondDate = moment(second.date,"DD/MM/YYYY").toDate().getTime();
    return firstDate < secondDate ? -1 : firstDate > secondDate ? 1 : 0
  })

  if (isAscending) {
    return sortedList
  } else {
    return sortedList.reverse()
  }
}