class User {

    constructor(name, gender, email, birth, country, password, photo, admin, register){
        
        this._name = name;
        this._email = email;
        this._birth = birth;
        this._country = country;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._gender = gender;
        this._register = new Date();
    }

    get register (){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get password(){
        return this._password;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    get gender(){
        return this._gender;
    }

    set name (value){

        this._name = value;
    }

    set register (value){

        this._register = value;
    }

    set email (value){

        this._email = value;
    }

    set birth (value){

        this._birth = value;
    }

    set country (value){

        this._country = value;
    }

    set password (value){

        this._password = value;
    }

    set photo (value){

        this._photo = value;
    }

    set admin (value){

        this._admin = value;
    }

    set gender (value){

        this._gender = value;
    }
}