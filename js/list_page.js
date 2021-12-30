const params = new URLSearchParams(window.location.search);
const listPageNameSearch = document.querySelector("#list-page-name-search");
const listPageSurnameSearch = document.querySelector("#list-page-surname-search");

const searchNameData = sessionStorage.getItem('searchNameData')
const searchSurnameData = sessionStorage.getItem('searchSurnameData')


window.onload = (e) => {
  if (params.get("name") || params.get("surname")) {
    listPageNameSearch.value =  params.get("name")
    listPageSurnameSearch.value =  params.get("surname")
  }
};

