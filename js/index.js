const landingNameSearch = document.querySelector("#name-search")
const landingSurnameSearch = document.querySelector("#surname-search")

function changeSearchText() {

    if (landingNameSearch.value !== "" && landingSurnameSearch.value !== "") {
        window.location = 'list_page.html?name=' + landingNameSearch.value + "&surname=" + landingSurnameSearch.value;
    }
    else {
        alert('Metin Gir') //Pop-up olarak düzenle -- alert:displayı "none" olarak ayarlanmış
    }
}