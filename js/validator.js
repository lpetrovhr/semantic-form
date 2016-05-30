
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

if(isSafari || msieversion() < 10) {
  $('#paymentValidation').validate({
    rules: {
      webAddress: { required: true },
      fullName: { required: true },
      emailAdd: {
        required: true,
        email: true
      },
      passwrd: { required: true },
      cardNumber: { required:true },
      secCode: { required:true }
      },
      messages: {
      webAddress: '<img src="img/mark.png"/><i class="errorMessage">Enter website name.</i>',
      fullName: '<img src="img/mark.png"/><i class="errorMessage">Enter your full name.</i>',
      emailAdd: '<img src="img/mark.png"/><i class="errorMessage">Enter correct email.</i>',
      passwrd: '<img src="img/mark.png"/><i class="errorMessage">Password is required.</i>',
      cardNumber: '<img src="img/mark.png"/><i class="errorMessage">Enter credit card number.</i>',
      secCode: '<img src="img/mark.png"/><i class="errorMessage">Enter security code.</i>',
      expirationYear: '<img src="img/mark.png"/><i class="errorMessage">Enter expiration year.</i>',
      expMonth: '<img src="img/mark.png"/><i class="errorMessage">Enter expiration month.</i>'
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
}
