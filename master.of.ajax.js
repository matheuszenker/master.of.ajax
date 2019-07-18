$(function () {
    $(document).on('click', 'a[ajax=submit-form], button[ajax=submit-form]', function (e) {
        e.preventDefault();

        var element = $(this);

        var form = $('form[ajax=form]');

        submitForm(form).done(function () {
            //Tempo para usuário ver mensagens antes de direcionar
            setTimeout(function () {
                window.location.href = element.attr('href');
            }, 2000);
        });
    });

    $(document).on('submit', 'form[ajax=form]', function (e) {
        e.preventDefault();

        submitForm($(this));
    });

    function submitForm(form) {
        var r = $.Deferred();
		    var startDate;
        var endDate;

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            dataType: 'json',
            data: params,
            beforeSend: function () {
                $('#loading').show();
                startDate = new Date();
            },
            complete: function () {
				        var delay = 0;

                endDate = new Date();
                
				        var secondsDifference = (endDate.getTime() - startDate.getTime()) / 1000;
				
                if(secondsDifference < 2) {
                  delay = 1000;
                }
				
                $('#loading').delay(delay).hide();
            },
            error: function (data, status, xhr) {
                //Alterar funcionamento assim que retorno for padronizado
                form.append(data.responseText);
            },
            success: function (data, status, xhr) {
                //TODO

				        r.resolve();
            }
        });

        return r;
    }

    function getFunction(code, argNames) {
        var fn = window, parts = (code || "").split(".");
        while (fn && parts.length) {
            fn = fn[parts.shift()];
        }
        if (typeof (fn) === "function") {
            return fn;
        }
        argNames.push(code);
        return Function.constructor.apply(null, argNames);
    }

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };
});
