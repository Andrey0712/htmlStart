window.onload = function () {
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    var number = 1;

    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var imgPhoto = document.getElementById("imgPhoto"); 
    var fileImage = document.getElementById("fileImage"); 
    var selectImageBase64 = document.getElementById("selectImageBase64");

    fileImage.onchange = function (e) {
        let files;
        if (e.dataTransfer) {//проверка для интернет експлорера
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {// проверка выбран ли фаил
            const file = files[0];
            console.log(file.type);

            if (file.type.match(/^image\//)) {//тип фаила
                const file_name = file.name;
                const reader = new FileReader();//обьект который читает фаил
                reader.onload = function () {//когда фотография загружена
                    imgPhoto.src = reader.result;
                    selectImageBase64.value = reader.result;//вносим результат в переменную для проверки и валидации
                    showSuccess(fileImage);//снимаем пометку про ошибку
                }

                reader.readAsDataURL(file);//читаем
            }
            else {
                alert("Невірний тип файлу");
            }
        }
        else {
            alert("Будь ласка виберіть файл");
        }

    };



    IMask(
        txtPhone, {
        mask: '+00(000) 000 00 00'
    });

    var btnAddNewUser = document.getElementById("btnAddNewUser");
    var btnAddUserSave = document.getElementById("btnAddUserSave");

    //btnSaveChanges.onclick = btnSaveChangesClick;
    
    //var f = '<input type="checkbox" id="complete" value="no">';

    var tbodyUsers = document.getElementById("tbodyUsers");


    btnAddNewUser.onclick = function (e) {
        $("#myModal").modal("show");
    };

    txtLastName.oninput = isValidTextInput;
    txtName.oninput = isValidTextInput;
    txtEmail.oninput = isValidEmailInput;
    txtPhone.oninput = isValidPhoneInput;

    btnAddUserSave.onclick = function (e) {
        if (isValidation()) {
            var lastName = txtLastName.value;
            var name = txtName.value;
            var phone = txtPhone.value;
            var mail = txtEmail.value;
            var foto = selectImageBase64.value;
            //console.log("txtLastName", lastName);
            //console.log("txtName", name);
            //console.log("txtPhone", phone);
            //var template= '<span class="float-left"><i class="fas fa-trash fa-1x text-info cursor-pointer delete-service" aria-hidden="true"></i></span>'
            var tr = document.createElement("tr");
            tr.innerHTML = `
                            <th scope="row">${number++}</th>
                            <td><img class="img-thumbnail " src="${foto}" width="60" height="60"/></td>
                            <td>${lastName}</td>
                            <td>${name}</td>
                            <td>${phone}</td>
                            <td>${mail}</td>
                            
                            <td>
                              <i class="fa fa-pencil fa-2x text-info cursor-pointer" aria-hidden="true" onclick="ChangeRow(this)"></i>
                              <i class="fa fa-times fa-2x text-danger cursor-pointer" aria-hidden="true" onclick="DeleteRow(this)"></i>
                            </td>

                        `;

            txtLastName.value = txtName.value = txtPhone.value = txtEmail.value ="";
            $("#myModal").modal("hide");

            tbodyUsers.appendChild(tr);
       }
        
    };

    function isValidTextInput(e) {
        if (e.target.value == "") {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidEmailInput(e) {
        if (!regex_email.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }


    function isValidPhoneInput(e) {

        if (!regex_phone.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidation() {

        var isValid = true;
        if (txtLastName.value == "") {
            showError(txtLastName);
            isValid = false;
        }
        else {
            showSuccess(txtLastName);
        }

        if (txtName.value == "") {
            showError(txtName);
            isValid = false;
        }
        else {
            showSuccess(txtName);
        }

        if (!regex_email.test(txtEmail.value)) {
            showError(txtEmail);
            isValid = false;
        }
        else {
            showSuccess(txtEmail);
        }

        if (!regex_phone.test(txtPhone.value)) {
            showError(txtPhone);
            isValid = false;
        }
        else {
            showSuccess(txtPhone);
        }

        if (selectImageBase64.value == "") {
            showError(fileImage);
            isValid = false;
        }
        else {
            showSuccess(fileImage);
        }

        return isValid;
    }

    function showError(input) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
    function showSuccess(input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }

    



    }

function DeleteRow(e) {
    var tbodyUsers = document.getElementById('tbodyUsers');

    bootbox.confirm("Ви точно хочете видалити об'єкт?", function (result) {
        if (result) {
            tbodyUsers.removeChild(e.parentElement.parentElement);
        }
    });
}

function ChangeRow(e) {
    $("#myModal").modal("show");
    var tr = e.parentElement.parentElement;
    modalHeader.innerHTML = "Редагувати користувача";

    // вытягимаем данные по рядочкам для редактирывания
  
    var valueLastName = $(tr).find('td').get(1).innerHTML;
    var valueName = $(tr).find('td').get(2).innerHTML;
    var valuePhone = $(tr).find('td').get(3).innerHTML;
    var valueMail = $(tr).find('td').get(4).innerHTML;
    var photo = $(tr).find('img').get(0).src;

    tbodyUsers.removeChild(e.parentElement.parentElement); //удаляем  рядок из старыми данными

    // Редактируем
    txtLastName.value = valueLastName;
    txtName.value = valueName;
    txtPhone.value = valuePhone;
    txtEmail.value = valueMail;
    imgPhoto.src = photo;
}





    




    //<button class="btnEdit"><i class="fa fa-pencil fa-2x text-info cursor-pointer" aria-hidden="true"></i></button>
    //<button class="btnDell"><i class="fa fa-times fa-2x text-danger cursor-pointer" aria-hidden="true"></i></button>   

    //       checkbox.addEventListener("click", function (e) {
    //       checkboxElement = e.target; // элемент который вызвал функцию
            
    //    });
    //btnDell.onclick =  function () {
           
    //       ell = checkboxElement.closest("tr"); // tr element (ваша строчка)
    //    ell.parentElement.removeChild(ell); // удаляем всю строку

    //    });
    
