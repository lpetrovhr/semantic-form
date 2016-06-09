elementsChange();

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

var checked = false;

/* Changes checkbox if revealPassword container is clicked */
$('#revealPassword').click(function() {
  changeCheckboxState();
});

/* Changes checkbox if space key is pressed while on revealPasswordImage el. */
$('#revealPasswordImage').keydown(function(event) {
  if(event.keyCode == 32) {
    changeCheckboxState();
  }
});

/* Validates card type & changes opacity if valid card number is entered */
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

/* Checks if card number is valid lenght if not focus on that field and reveal
   message for screen readers so they know that invalid number is entered */
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

/* Check browser version and call validation script for below specified */
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

/* Function for changing the state of checkbox, this function changes
   image if checkbox is selected or unselected and change type of the
   input field so that we can reveal or hide password */
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

/* Function for checking IE version */
function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var explorerVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));

  return explorerVersion;
}

//change elements behavior on load
function elementsChange() {
  /* Hides checkbox if js is enabled */
  document.getElementById('reveal_password_container').style.display = 'none';
  /* Reveals reveals checkbox image if js is enabled */
  document.getElementById('revealPasswordImage').style.display = 'inline-block';
  /* Hides radio buttons for cards if js is enabled */
  document.getElementsByClassName('form--section_card-image-radio')[0].style.display = 'none';
  /* Gets all cards and changes it's opacity */
  var cardPictures = document.getElementsByClassName('card--inactive');
  for(var i = 0; i < cardPictures.length; i++) {
    cardPictures[i].style.opacity = '0.3'
  }

  /* Checkes if version of browser is IE and if it is lower than v9 and hides reveal password because lower
     versions have their own reveal password in input field functionality */
  if(msieversion() < 9) { document.getElementById('revealPassword').style.display = 'none'; }
}
