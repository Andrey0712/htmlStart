$(function () {
    //console.log("begin on load");
    //# - getElementById, . - пошук по класу, [] - по атребуту
    var $myModal = $("#myModal"); //модалка
    var $txtName = $("#txtName");
    var $txtDescription = $("#txtDescription");
    var $txtPrice = $("#txtPrice");
    var $productsBlock = $("#productsBlock");
    var $imgPhotoBlock = $("#imgPhotoBlock");
    var uploader;
    var cropper = null;//обявили кропера
    var $cropperModal = $("#cropperModal");

    $("#btnAddProduct").on("click", function () {
        //alert("Ви нажали кнопку");
        $myModal.modal("show");
    });

    $imgPhotoBlock.on("click", function () {
        if (uploader)//проверяем существует ли
            uploader.remove();
        uploader = $(`<input type="file" class="d-none" accept=".jpg, .jpeg, .png" />`);//формирует масив

        uploader.click();

        uploader.on("change", function (e) {
            SaveImage(uploader[0]);//сохраняем первій обьект ДОМ дерева
        });

    });

    $("#btnAddProductSave").on("click", function () {

        $productsBlock.prepend(`
            <div class="row p-2 bg-white border rounded mt-2">
                    <div class="col-md-3 mt-1">
                        <img class="img-fluid
                            img-responsive rounded product-image"
                            src="${$imgPhotoBlock.attr("src")}">
                    </div>
                    <div class="col-md-6 mt-1">
                        <h5>${$txtName.val()}</h5>
                        <div class="d-flex flex-row">
                            <div class="ratings mr-2">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <span>310</span>
                        </div>
                        <div class="mt-1 mb-1 spec-1"><span>100% cotton</span><span class="dot"></span><span>Light weight</span><span class="dot"></span><span>Best finish<br></span></div>
                        <div class="mt-1 mb-1 spec-1"><span>Unique design</span><span class="dot"></span><span>For men</span><span class="dot"></span><span>Casual<br></span></div>
                        <p class="text-justify text-truncate para mb-0">
                            ${$txtDescription.val()}
                            <br><br>
                        </p>
                    </div>
                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                        <div class="d-flex flex-row align-items-center">
                            <h4 class="mr-1">${$txtPrice.val()}</h4><span class="strike-text">$20.99</span>
                        </div>
                        <h6 class="text-success">Free shipping</h6>
                        <div class="d-flex flex-column mt-4"><button class="btn btn-primary btn-sm" type="button">Details</button><button class="btn btn-outline-primary btn-sm mt-2" type="button">Add to wishlist</button></div>
                    </div>
                </div>
        `);
        closeDialog();

    });

    function closeDialog() {//закрывае модалку и очищаем строки
        $txtName.val("");
        $txtDescription.val("");
        $txtPrice.val("");
        $myModal.modal("hide");
    }

    //DragAndDrop

    var draganddrop = document.getElementById('draganddrop');
    draganddrop.addEventListener('dragenter', DragIn, false);
    draganddrop.addEventListener('dragover', DragIn, false);

    draganddrop.addEventListener('dragleave', DragOut, false);
    draganddrop.addEventListener('drop', DragOut, false);


    draganddrop.addEventListener('dragenter', PreventDefaults, false);
    draganddrop.addEventListener('dragover', PreventDefaults, false);

    draganddrop.addEventListener('dragleave', PreventDefaults, false);
    draganddrop.addEventListener('drop', PreventDefaults, false);

    draganddrop.addEventListener('drop', SaveImage, false);

    function DragIn(e) {
        draganddrop.classList.add('dragIn');
    }

    function DragOut(e) {
        draganddrop.classList.remove('dragIn');
    }

    function PreventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function SaveImage(e) {//сохраняем фотку
        initCropper();//вызываем кропера
        var files;
        if (e.files) {
            files = e.files;
        } else if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }

        if (files && files[0]) {
            var file = files[0];
            if (file.type.match(/^image\//)) {

                const reader = new FileReader();
                reader.onload = function () {
                    $imgPhotoBlock.attr("src", reader.result);//Меняется атребут с src на reader.result
                    $cropperModal.show();

                    cropper.replace(reader.result);//загружаем рисунок
                    //showSuccess(fileImage);
                }

                reader.readAsDataURL(file);
            }
        }
    }

    $("#btnCropImg").on("click", function () {//обрезаем фотку
        $imgPhotoBlock.attr("src", cropper.getCroppedCanvas().toDataURL());//кропер получил Base64 обрезал и выдал его же
        $cropperModal.hide();
    });

    $("#cropperModal").on("click", "[data-closeCustomDialog]", function () {//в модалке если клацаем по атрибуту data-closeCustomDialog то закрівается модалка
        $cropperModal.hide();
    });

    function initCropper() {//инициализация кропера
        if (cropper == null) {// если его нет то рисуем
            const imageCropper = document.getElementById('imageCropper');
            cropper = new Cropper(imageCropper, {
                aspectRatio: 1 / 1,//соотношение сторон
                viewMode: 1,// не выходит за область рисунка
                autoCropArea: 0.5 //размер выделяемой области
            });
        }
    }

});