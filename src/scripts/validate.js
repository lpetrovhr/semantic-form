$('#paymentValidation').validate({
  rules: {
    webAddress: {
      required: true
    },
    fullName: 'required',
    emailAdd: {
      required: true,
      email: true
    },
    passwrd: {
      required: true
    },
    cardNumber: {required:true},
    secCode: {required:true}
    },
    messages: {
    webAddress: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter website name.</i>',
    fullName: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter your full name.</i>',
    emailAdd: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter correct email.</i>',
    passwrd: '<i class="errorMessageBefore">!</i><i class="errorMessage">Password is required.</i>',
    cardNumber: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter credit card number.</i>',
    secCode: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter security code.</i>',
    expirationYear: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter expiration year.</i>',
    expMonth: '<i class="errorMessageBefore">!</i><i class="errorMessage">Enter expiration month.</i>'
    },
    errorPlacement: function (error, element) {
    error.addClass('error--message_style');
    if(element.attr('name') == 'expMonth') {
        error.insertAfter('#expirationYear');
    } else {
        error.insertAfter(element);
    }
    },
    errorElement: 'p'
});

$(function() {
  var lastEl;
  $('#cardNumber').validateCreditCard(function(result) {
    if (result.card_type == null ) {
      if (lastEl == null) {}
      else {document.getElementById(lastEl).style.opacity = '0.4';}
    } else if(result.length_valid){
        document.getElementById(result.card_type.name).style.opacity = '1';
        lastEl = result.card_type.name;
    }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });
});
