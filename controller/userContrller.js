class UserController {

    constructor(formId,formUpdateId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.formUpdateEl = document.getElementById(formUpdateId);

        this.onSubmit();
        this.onEdit();

    }

    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();
            event.preventDefault();

        });
        this.formUpdateEl.addEventListener("submit", event =>{

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector('[type=submit]');

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];
            tr.dataset.user = JSON.stringify(values);

            tr.innerHTML = `
                <tr>
                    <td><img src="${values.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${values.name}</td>
                    <td>${values.email}</td>
                    <td>${(values.admin) ? 'Sim' : 'Não'}</td>
                    <td>${Utils.dateFormat(values.register)}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>
            `;

            this.addEventsTR(tr);
            this.updateCount();

        });


    }

    onSubmit(){

        this.formEl.addEventListener("submit", event =>{

            let btn = this.formEl.querySelector('[type=submit]');

            btn.disabled = true;
    
            event.preventDefault();

            let values = this.getValues(this.formEl);

            if (!values) return false;

            this.getPhoto().then(
                
                (content) => {

                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;

                },
                (e) => {

                    console.error(e);

                }
            );
        
        });

    }


    getPhoto(){

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader()

            let elements =  [...this.formEl.elements].filter(item => {

           if (item.name ==="photo"){

            return item;

           }

        });

        let file = elements[0].files[0];

        fileReader.onload = () =>{

            resolve(fileReader.result)

        }
        fileReader.onerror = (e)=>{

            reject(e);

        };
        
        if (file){

            fileReader.readAsDataURL(file);

        }else {

            resolve('dist/img/undefined.png');

        }
        

        });

        

    }

    getValues(formEl){

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(field, index){

            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){

                field.parentElement.classList.add("has-error");

                isValid = false;

            }

            if(field.name == "gender"){
        
                if(field.checked){
        
                    user[field.name] = field.value;
                }

            }else if (field.name == 'admin'){

                user[field.name] = field.checked;

            }else {

                user[field.name] = field.value;
            }
        
            
        });

        if (!isValid){

            return false;

        }
        
        return new User(
            user.name,
            user.gender,
            user.email,
            user.birth,
            user.country,
            user.password,
            user.photo,
            user.admin,
            user.register
        );

    }

    //View do codigo, parte visual que o usuario terá acesso
    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);//dataset tranforma o objeto em string, é usado para codificar melhor, 

        tr.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
         `;

        this.addEventsTR(tr);
    
        this.tableEl.appendChild(tr);

        this.updateCount();
    }

    addEventsTR(tr){

        tr.querySelector(".btn-edit").addEventListener('click', e =>{

            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-update");

            form.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json){

               let field = form.querySelector("[name = "+ name.replace("_", "")+ "]");

               

               if (field){

                switch (field.type){
                    case 'file':
                        continue;    
                    break;
                    case 'radio':
                            field =  form.querySelector("[name = " + name.replace("_", "") + "][value = " + json[name] + "]");
                            field.checked = true;
                    break;
                    case 'checkbox':
                        field.checked = json[name]; 
                    break;

                    default:
                        field.value = json[name];
                }
               }
            }

            this.showPanelUpdate();

         });

    }

    showPanelCreate(){

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate(){

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }

    updateCount(){

        let numberUser = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr =>{

            numberUser++;

            let user = JSON.parse(tr.dataset.user);//o data set esta sendo tranformado de volta na forma anterior que era um objeto, assim dessa forma o codigo n tera tantos problemas na view

            if(user._admin) numberAdmin++;

        });
        
        document.querySelector("#number-user").innerHTML = numberUser;
        document.querySelector("#number-user-admin").innerHTML = numberAdmin;
    }
    
}