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
  var shity = false;
  $('#cardNumber').validateCreditCard(function(result) {
    if(!result.length_valid) {
      document.getElementById('creditCardNumberError').style.display = 'inline-block';
      document.getElementById('cardNumber').setAttribute('aria-describedby', 'creditCardNumberError');
      shity = true;
    }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });

  if(shity) {
    e.preventDefault();
    document.getElementById('cardNumber').focus();
  }
});
