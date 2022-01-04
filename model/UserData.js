class UserData {
    constructor(nameSurname, company, email, date, country, city) {
        
        this.surname = ""

        var splittedNameSurName = nameSurname.split(" ")
        splittedNameSurName.forEach((element, index) => {
            if (index == (splittedNameSurName.length - 1)) {
                this.surname = element
            } else {
                if (index == 0) {
                    this.name = element
                } else {
                    this.name = " " + element
                }
            }
        });

        this.nameSurname = nameSurname
        this.company = company
        this.email = email
        this.date = date
        this.country = country
        this.city = city
    }

    getName() {
        var name = ""
        var splittedNameSurName = this.nameSurname.split(" ")
        splittedNameSurName.forEach((element, index) => {
            if (index != (splittedNameSurName.length - 1)) {
                if (index == 0) {
                    name = element
                } else {
                    name = " " + element
                }
            }
        });
        return name
    }

    getSurname() {
        var splittedNameSurName =  this.nameSurname.split(" ")
        return splittedNameSurName[splittedNameSurName.length -1]
    }
}

