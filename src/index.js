import 'bootstrap';
import $ from 'jquery';

$(document).ready(function() {

  //quantity increment
  $(".guest-detail").click(function() {
    $(this).toggleClass('active');
    $("#guest-form").toggleClass("d-block");
  });
});
