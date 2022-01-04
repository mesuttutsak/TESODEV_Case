const params = new URLSearchParams(window.location.search);
var listPageNameSearch = document.querySelector("#list-page-name-search");
var listPageSurnameSearch = document.querySelector("#list-page-surname-search");

const itemListListPage = document.querySelector(".item-list-list-page");
const paginationList = document.querySelector(".pagination");

const searchNameData = sessionStorage.getItem('searchNameData');
const searchSurnameData = sessionStorage.getItem('searchSurnameData');

var sortedList = new Array();
var currentpaginationIndex = 0;

window.onload = (e) => {
  if (params.get("name") || params.get("surname")) {
    listPageNameSearch.value = params.get("name")
    listPageSurnameSearch.value = params.get("surname")
  }
  searchData()
};

function searchData() {
  if (listPageNameSearch.value !== "" || listPageSurnameSearch.value != "") {
    setSearchResult(filterLocalItems(getFromLocaleStorage("userListData"), listPageNameSearch.value, listPageSurnameSearch.value))
  } else {
    listPageNameSearch.classList.add('error-input');
    listPageSurnameSearch.classList.add('error-input');
    setTimeout(() => {
      listPageNameSearch.classList.remove('error-input');
      listPageSurnameSearch.classList.remove('error-input');
    }, 2000);
  }

  currentpaginationIndex = 0;
  sortedList = sortByNameAndSurname(true)

  fillTable()
  fillPagination()
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

function onClickOrderBy(event) {
  if (event.target.id === "name-surname-asc") {
    sortedList = sortByNameAndSurname(true)
  } else if (event.target.id == "name-surname-desc") {
    sortedList = sortByNameAndSurname(false)
  } else if (event.target.id == "date-asc") {
    sortedList = sortByDate(true)
  } else if (event.target.id == "date-desc") {
    sortedList = sortByDate(false)
  }
  currentpaginationIndex = 0
  fillTable()
  fillPagination()
}

function fillTable() {
  //Clean Table
  document.querySelectorAll(".item-list-page").forEach(element => {
    element.remove()
  });

  //Fill Table
  getPageData().forEach(element => {
    addItemListPage(element)
  });
}

function fillPagination() {
  //Clean Pagination
  document.querySelectorAll(".page-item").forEach(element => {
    element.remove()
  });

  //Fill Pagination
  if (getSearchResult().length > 6) {
    addPages()
  }
}

function addPages() {
  const paginationItemPrev = document.createElement("li");
  paginationItemPrev.className = "page-item page-link prev-next";
  paginationItemPrev.id = "pagination-prev";
  paginationItemPrev.innerText = "Previous";
  paginationItemPrev.onclick = function () {
    if (currentpaginationIndex > 0) {
      currentpaginationIndex--;
      fillTable()
      fillPagination()
    }
  };
  paginationList.appendChild(paginationItemPrev)

  var startIndex = 0
  var endIndex = getPageCount() - 1

  if (currentpaginationIndex < 2) {
    endIndex = startIndex + 4
  } else if (currentpaginationIndex > getPageCount() - 3) {
    startIndex = endIndex - 4
  } else {
    var startIndex = parseInt(currentpaginationIndex) - 2
    var endIndex = parseInt(currentpaginationIndex) + 2
  }

  for (let index = startIndex; index <= endIndex; index++) {
    const paginationItemNumber = document.createElement("li");
    paginationItemNumber.className = "page-item page-link";
    if (index == currentpaginationIndex) {
      paginationItemNumber.className += " page-item-active"
    }
    paginationItemNumber.id = "pagination-" + index;
    paginationItemNumber.innerText = index + 1;
    paginationItemNumber.onclick = function () {
      currentpaginationIndex = paginationItemNumber.id.split("-")[1]
      fillTable()
      fillPagination()
    };
    paginationList.appendChild(paginationItemNumber)
  }

  const paginationItemNext = document.createElement("li");
  paginationItemNext.className = "page-item page-link prev-next";
  paginationItemNext.id = "pagination-next";
  paginationItemNext.innerText = "Next";
  paginationItemNext.onclick = function () {
    if (currentpaginationIndex < getPageCount() - 1) {
      currentpaginationIndex++;
      fillTable()
      fillPagination()
    }
  };
  paginationList.appendChild(paginationItemNext)
}

function filterLocalItems(arr, queryName, querySurname) {
  return arr.filter((el) => {
    var userDataElement = new UserData(el.nameSurname, el.company, el.email, el.date, el.country, el.city)
    var isIncludeName = (queryName === "") ? true : userDataElement.getName().toLowerCase().includes(queryName.toLowerCase())
    var isIncludeSurname = (querySurname === "") ? true : userDataElement.getSurname().toLowerCase().includes(querySurname.toLowerCase())
    return isIncludeName && isIncludeSurname
  })
}

function sortByNameAndSurname(isAscending) {
  var sortedList = getSearchResult().sort((first, second) => {
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

function sortByDate(isAscending) {
  var sortedList = getSearchResult().sort((first, second) => {
    var firstDate = moment(first.date, "DD/MM/YYYY").toDate().getTime();
    var secondDate = moment(second.date, "DD/MM/YYYY").toDate().getTime();
    return firstDate < secondDate ? -1 : firstDate > secondDate ? 1 : 0
  })

  if (isAscending) {
    return sortedList
  } else {
    return sortedList.reverse()
  }
}

function getSearchResult() {
  return getFromLocaleStorage("searchResult");
}

function setSearchResult(searchedList) {
  return setToLocaleStorage("searchResult", searchedList);
}

function getPageData() {
  var pageList = new Array();
  var limit = 6
  var startIndex = currentpaginationIndex * limit;
  var endIndex = startIndex + limit;

  if (endIndex > (sortedList.length - 1)) {
    endIndex = sortedList.length - 1
  }

  for (let index = startIndex; index <= endIndex; index++) {
    const element = sortedList[index];
    pageList.push(element);
  }
  return pageList;
}

function getPageCount() {
  return Math.ceil(sortedList.length / 6)
}
