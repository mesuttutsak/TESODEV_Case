function setToLocaleStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function getFromLocaleStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

