import 'bootstrap';
import $ from 'jquery';

$(document).ready(function() {

  //quantity increment
  $(".guest-detail").click(function() {
    $(this).toggleClass('active');
    $("#guest-form").toggleClass("d-block");
  });

  $(document).on("click", "#guests-wrap .q-btn", function() {
    var button = $(this),
      input = button.parent().find("input"),
      guests_count_label  = $('body').find('#g-no'),
      newVal = parseInt(input.val());

    if (button.text() == "+") {
      if((button.attr('data-age') == 'adults' || button.attr('data-age') == 'children')  && (adults_pas_count + children_pas_count + infants_pas_count ) < 19) {
        newVal++;
      }

      if(button.attr('data-age') == 'adults-g' && newVal < 9) {
        newVal++;
      }
      if(button.attr('data-age') == 'children-g' && newVal < 9) {
        newVal++;
        $('body').find('#guest-form .passenger-form-wrapper .pas-class').css("display", "table"),
          $('body').find('#guest-form .passenger-form-wrapper .pas-class ul').append(
            '<li>' +
            '<div class="g-cell age-name">' + 'Возраст' + '</div>' +
            '<div class="g-cell age-select">' +
            '<span class="g-dec q-btn q-custom" data-age="one-child">-</span><span class="g-num"><input type="text" name="children['+newVal+']" value="2"></span><span class="g-inc q-btn q-custom" data-age="one-child">+</span>' +
            '</div>' +
            '</li>'
          );
        $('body').find('#guest-form .pas-class').show();
      }
      if(button.attr('data-age') == 'one-child' && newVal < 12) {
        newVal++;
      }

    } else {

      if (input.val() > 0) {

        if((button.attr('data-age') == 'adults' || button.attr('data-age') == 'adults-g') && input.val() == 1) {
          return false;
        }
        newVal--;
        if(button.attr('data-age') == 'adults' && infants_pas_count > newVal ) {
          infants_pas_input.val(newVal);
        }
        /*if(button.attr('data-age') == 'one-child' && newVal > 0) {
                    newVal--;
                }*/
        if(button.attr('data-age') == 'children-g') {
          $('body').find('#guest-form .pas-class li:last-child').remove();
          if(newVal == 0) {
            $('body').find('#guest-form .pas-class').hide();
          }
        }
      } else {
        newVal = 0;
      }
    }

    input.val(newVal);
    guests_count_label.html(0);
    $('body').find('#guest-form input[name="adults"], #guest-form input[name="children_sum"]').trigger('change');
  });

  //calculate guests count
  $('body').find('#guest-form input[name="adults"], #guest-form input[name="children_sum"]').on('change', function() {
    var guests_count_label  = $('body').find('#g-no'),
      current_count = parseInt(guests_count_label.html()),
      input_count = parseInt($(this).val());
    guests_count_label.html(current_count+input_count);

    var $countform = parseInt(guests_count_label.html());
    $("body").data("init", $countform);

    if($countform > 1) {
      console.log($countform);
      localStorage.setItem('countform', $countform);
      return false;
    }
  });
});
