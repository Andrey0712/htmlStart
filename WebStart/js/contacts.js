window.onload = function () {
    //var t = 2;
    //alert("Hello");
    var txtName = document.getElementById("txtName");
    var txtLastName = document.getElementById("txtLastName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var modalFullName = document.getElementById("modalFullName");
    var modalPhone = document.getElementById("modalPhone");
    var modalEmail = document.getElementById("modalEmail");
    var btnOk = document.getElementById("btnOk");
    var maskOption = {
        mask: '+{38}(000)000-00-00',
        lazy: false
    }
    var mask = new IMask(txtPhone, maskOption)
    btnOk.onclick = function (e) {
        //console.log(tt);
        //console.log(txtName.value);
        var name = txtName.value;
        var lastName = txtLastName.value;
        var Phone = txtPhone.value;
        var Email = txtEmail.value;
        var isValid = true;
        if (name == "") {
            txtName.classList.add("is-invalid");
            isValid = false;
        }
        else {
            txtName.classList.remove("is-invalid");
        }

        if (lastName == "") {
            txtLastName.classList.add("is-invalid");
            isValid = false;
        }
        else {
            txtLastName.classList.remove("is-invalid");
        }

        if (Phone == "") {
            txtPhone.classList.add("is-invalid");
            isValid = false;
        }
        else {
            txtPhone.classList.remove("is-invalid");
        }
        if (Email == "") {
            txtEmail.classList.add("is-invalid");
            isValid = false;
        }
        else {
            txtEmail.classList.remove("is-invalid");
        }
        if (isValid) {
            $("#modalInfo").modal("show");
            modalFullName.innerHTML = lastName + " " + name;
            modalPhone.innerHTML = Phone;
            modalEmail.innerHTML = Email;
$("#myModal").modal("show");
        }
        
        e.preventDefault(); //Заборонити стандартну поведінку
    }



}