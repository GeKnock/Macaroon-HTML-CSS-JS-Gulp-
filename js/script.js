window.onload = function () {
    document.getElementById('icon-menu').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })


    const formElement = [$("#product"), $("#name"), $("#phone")]
    const textWarnForm = ["что хотели бы заказать", "свое имя", "свой телефон"]
    let loaderShadow = $(".loader")
    let boxShadow = $(".shadow")


    let submitButtonForm = $("#submit")
    submitButtonForm.on("click", function () {
        if (checkValueEmptyForm(formElement, textWarnForm)) {
            ajaxTrueForm(formElement)
        }
    })

    function checkValueEmptyForm(mass_form_jQuery, warn_form_text) {
        $(".warn-form-pop").remove()
        let flagEmpty = true
        mass_form_jQuery.forEach((element) => {
            if (element.val() == "") {
                flagEmpty = flagEmpty & false
                element.addClass("warn-form").after("<div class='warn-form-pop'>Необходимо ввести " + warn_form_text[mass_form_jQuery.indexOf(element)] + "</div>")
            } else {
                flagEmpty = flagEmpty & true
                element.removeClass("warn-form")
            }
        })
        return flagEmpty
    }

    function ajaxTrueForm(mass_form_jQuery) {
        loaderShadow.css("display", "block")
        boxShadow.css("display", "block")
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {
                product: mass_form_jQuery[0].val(),
                name: mass_form_jQuery[1].val(),
                phone: mass_form_jQuery[2].val()
            }
        }).done(function (msg) {
            loaderShadow.css("display", "none")
            boxShadow.css("display", "none")
            if (msg.success == 1) {
                $(".form-cost .formes").children().css("visibility", "hidden")
                $(".popus").css({
                    "display": "flex",
                    "visibility": "visible",
                })
            } else if (msg.success == 0) {
                alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
            }
        });

    }

    $(".form-cost .selection").on("input", function () {
        $(this).removeClass("warn-form").next("div").remove()
    })


};