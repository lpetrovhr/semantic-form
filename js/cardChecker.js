$(function() {
  var lastEl;
  $('#cardNumber').validateCreditCard(function(result) {
    if (result.card_type == null ) {
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
