const landingNameSearch = document.querySelector("#name-search")
const landingSurnameSearch = document.querySelector("#surname-search")
const itemListLandingPage = document.querySelector(".item-list-landing-page")

var userList = new Array();



function searchData() {
    if (landingNameSearch.value !== "" && landingSurnameSearch.value !== "") {
        fetchData()
    }
    else {
        document.getElementById('pop-up').style.display = "inline-block"
        setTimeout(() => {
            document.getElementById('pop-up').style.display = "none"
        }, 1500);
    }
}

function fetchData() {
    if (userList.length <= 0) {
        fetch("../mockData.json")
            .then(response => response.json())
            .then(json => {
                json.data.forEach(element => {
                    var item = new UserData(element[0], element[1], element[2], element[3], element[4], element[5]);
                    userList.push(item);
                   setToLocaleStorage('userListData', userList);
                });
                setToLocaleStorage('searchResult', filterItems(userList, landingNameSearch.value));
                fillTable()
            })
            .catch((err) => console.log(err))
    } else {
        setToLocaleStorage('searchResult', filterItems(userList, landingNameSearch.value));
        fillTable()
    }
}

function addItem(item) {
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

    itemListLandingPage.appendChild(listItem);
}

function showMore() {
    window.location = 'list_page.html?name=' + landingNameSearch.value + "&surname=" + landingSurnameSearch.value;
}

function fillTable() {
    let filteredList = getFromLocaleStorage('searchResult')
    cleanTable()
    let loopCount = 3
    if (filteredList.length < loopCount) {
        loopCount = filteredList.length
    }
    for (let index = 0; index < loopCount; index++) {
        const element = filteredList[index];

        if (element) {
            addItem(element);
        }

        if (filteredList.length > 3) {
            document.getElementById("show-more").style.display = "block"
        }
    }
}

function cleanTable() {
    document.querySelectorAll(".list-group-item").forEach(element => {
        element.remove()
    });
}

function filterItems(arr, query) {
    return arr.filter((el) => el.nameSurname.toLowerCase().includes(query.toLowerCase()))
}