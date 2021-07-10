window.onload = function () {
    var number = 1;

    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");


    var btnAddNewUser = document.getElementById("btnAddNewUser");
    var btnAddUserSave = document.getElementById("btnAddUserSave");
    
    //var f = '<input type="checkbox" id="complete" value="no">';

    var tbodyUsers = document.getElementById("tbodyUsers");


    btnAddNewUser.onclick = function (e) {
        $("#myModal").modal("show");
    };

    

    btnAddUserSave.onclick = function (e) {
        var lastName = txtLastName.value;
        var name = txtName.value;
        var phone = txtPhone.value;
        //console.log("txtLastName", lastName);
        //console.log("txtName", name);
        //console.log("txtPhone", phone);
        //var template= '<span class="float-left"><i class="fas fa-trash fa-1x text-info cursor-pointer delete-service" aria-hidden="true"></i></span>'
        var tr = document.createElement("tr");
        tr.innerHTML = `
                            <th scope="row">${number++}</th>
                            <td>${lastName}</td>
                            <td>${name}</td>
                            <td>${phone}</td>
                            
                            
                            <td>
                              <i class="fa fa-pencil fa-2x text-info cursor-pointer" aria-hidden="true"></i>
                              <i class="fa fa-times fa-2x text-danger cursor-pointer" aria-hidden="true" onclick="DeleteRow(this)"></i>
                            </td>

                        `;

        txtLastName.value = txtName.value = txtPhone.value = "";
        $("#myModal").modal("hide");
          // $(this).closest("tr").remove();
        tbodyUsers.appendChild(tr);

        
    };

     

    //       checkbox.addEventListener("click", function (e) {
    //       checkboxElement = e.target; // элемент который вызвал функцию
            
    //    });
    //btnDell.onclick =  function () {
           
    //       ell = checkboxElement.closest("tr"); // tr element (ваша строчка)
    //    ell.parentElement.removeChild(ell); // удаляем всю строку

    //    });



    }

function DeleteRow(e) {
    var tbodyUsers = document.getElementById('tbodyUsers');

    bootbox.confirm("Ви точно хочете видалити об'єкт?", function (result) {
        if (result) {
            tbodyUsers.removeChild(e.parentElement.parentElement);
        }
    });
}


    //btnDell.onclick = function (tbodyUsers){

    //    for (var rowi = tbodyUsers.rows.length; rowi-- > 0;) {
    //        var row = tbodyUsers.rows[rowi];
    //        var inputs = row.getElementsByTagName('input');
    //        for (var inputi = inputs.length; inputi-- > 0;) {
    //            var input = inputs[inputi];

    //            if (input.type === 'checkbox' && input.checked) {
    //                row.parentNode.removeChild(row);
    //                break;
    //            }
    //        }
    //    }
    //  };




    //<button class="btnEdit"><i class="fa fa-pencil fa-2x text-info cursor-pointer" aria-hidden="true"></i></button>
    //<button class="btnDell"><i class="fa fa-times fa-2x text-danger cursor-pointer" aria-hidden="true"></i></button>   

    
    
