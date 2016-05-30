document.getElementById('reveal_password_container').style.display = 'none';


$('#passwrd').blur(function(){
  $('#passwrd_hide').val($(this).val());
});

$('#passwrd_hide').blur(function(){
  $('#passwrd').val($(this).val());
});

var checked = false;
$('#revealPassword').click(function(){
  if(!checked) {
    checked=true;
    $('#revealPasswordImage').attr('src', 'img/selected.png');
    $('#passwrd').hide();
    $('#passwrd_hide').show();
  }
  else {
    checked=false;
    $('#revealPasswordImage').attr('src', 'img/unselected.png');
    $('#passwrd').show();
    $('#passwrd_hide').hide();
  }
});

$(function() {
  var lastEl;
  $('#cardNumber').validateCreditCard(function(result) {
    if (result.card_type == null || !result.length_valid) {
      if (lastEl == null) {}
      else {
        var lastElement = document.getElementById(lastEl);
        lastElement.style.opacity = '0.4';
        lastElement.style.filter = 'alpha(opacity=30)';
      }
    } else if(result.length_valid){
        var element = document.getElementById(result.card_type.name);
        element.style.opacity = '1';
        element.style.filter = 'alpha(opacity=100)';
        lastEl = result.card_type.name;
    }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });
});

$('form').submit(function(e){
  var cardNumberError = false;
  $('#cardNumber').validateCreditCard(function(result) {
    if(!result.length_valid) {
      document.getElementById('cardNumber').setAttribute('aria-describedby', 'creditCardNumberError');
      cardNumberError = true;
    }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });

  if(cardNumberError) {
    e.preventDefault();
    document.getElementById('cardNumber').focus();
  }
});
