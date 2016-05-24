$(function() {
  var lastEl;
  $('#cardNumber').validateCreditCard(function(result) {
    if (result.card_type == null ) {
      if (lastEl == null) {}
      else {document.getElementById(lastEl).style.opacity = '0.4';}
    } else {
        document.getElementById(result.card_type.name).style.opacity = '1';
        lastEl = result.card_type.name;
      }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });
});
