document.getElementById('reveal_password_container').style.display = 'none';

if(msieversion() < 9) { document.getElementById('revealPassword').style.display = 'none'; }

var checked = false;

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

$('#revealPassword').click(function() {
  changeCheckboxState();
});

$('#revealPasswordImage').keydown(function(event) {
  if(event.keyCode == 32) {
    changeCheckboxState();
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
    } else if(result.length_valid) {
        var element = document.getElementById(result.card_type.name);
        element.style.opacity = '1';
        element.style.filter = 'alpha(opacity=100)';
        lastEl = result.card_type.name;
    }
  }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });
});

$('form').submit(function(e) {
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

function changeCheckboxState() {
  if(!checked) {
    checked=true;
    $('#revealPasswordImage').attr('src', 'img/selected.png');
    document.getElementById('passwrd').setAttribute('type', 'text');
  } else {
    checked=false;
    $('#revealPasswordImage').attr('src', 'img/unselected.png');
    document.getElementById('passwrd').setAttribute('type', 'password');
  }
};

function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var explorerVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));

  return explorerVersion;
}
