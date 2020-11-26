$(document).ready(function () {

    //function to add new rows, iterate its serial number and disables
    $('.btn-plus').click(function () {

        if ($('tr:last').find('.item,.prize,.quantity').val() == '') {

            $('tr:last').find('.item,.prize,.quantity').effect('shake');

        } else {
            $(`<tr class="tr1"><td class="numb"></td><td><input autofocus type="text" class="form-control item"></td><td><input type="number" class="form-control prize"></td><td><input type="number" class="form-control quantity"></td><td><input type="text" class="form-control total" disabled></td><td class="div2 border p-1 bg-white"><button class="btn btn-del far fa-trash-alt"></button><button class="btn btn-edit far fa-edit"></button><button class="btn btn-edit d-none fr fa-save"></button></td></tr>`).appendTo('tbody')
            $('tr:not(:last)').find('.item,.prize,.quantity').prop('disabled', true);
        }
        addSerialNumber();

    })

    //function that iterates serial number of each row
    var addSerialNumber = function () {
        $('table tr').each(function (index) {
            $(this).find('.numb').html(index - 1 + 1);
        });
    };

    //function that reduces serial number of each row
    var minusSerialNumber = function () {
        $('table tr').each(function (index) {
            $(this).find('.numb').html(index + 1 - 1);
        });
    };



    //function that deletes rows with minus btn
    $('.btn-minus').click(function () {
        $('.tr1:not(:first)').remove()
        $('.tr1:first').find('input').val('');
        $('.tr1:first').find('.item,.prize,.quantity').prop('disabled', false);
        $('.grtotal').text('')
    })


    //function to calculate values of price and quantity.
    $(document).on('keyup', '.prize, .quantity', function () {
        calc($(this));
    })
    function calc(action) {
        prc = action.closest('tr').find('.prize').val();
        qty = action.closest('tr').find('.quantity').val();
        tot = qty * prc;
        action.closest('tr').find('.total').val(tot);
        action.closest('.div1').find('.grtotal').html(tot);

        cerl();
    }

    //function that adds values of all total inputs 
    function cerl() {
        var sum = 0;
        $('.total').each(function () {
            if ($('.total:last').val() == '') {
                $('.total:last').val(0);
                sum += parseFloat($(this).val());
            }
            else {
                sum += parseFloat($(this).val());
            }
        });
        $('.grtotal').text(sum);
    }


    //function to delete a particular row
    $(document).on('click', '.btn-del', function () {
        $(this).closest('tr').remove();

        minusSerialNumber();
    })


    //function that toggles disable rows and edit with btn-edit
    $(document).on('click', '.btn-edit', function () {

        if ($(this).hasClass('far fa-edit')) {
            $(this).removeClass('.far fa-edit');
            $(this).addClass('.far fa-save').attr('.fa-save')
            $(this).closest('tr').find('.item,.prize,.quantity').prop('disabled', false);
        } else {
            $(this).removeClass('.far fa-save');
            $(this).addClass('.far fa-edit')
            $(this).closest('tr').find('.item,.prize,.quantity').prop('disabled', true);
        }

    })

})
