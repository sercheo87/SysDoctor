
/* Validations Input */
/* *************************************************************************************** */

/* Functions */
function trim(value) {
	return value.replace(/^\s+|\s+$/g, '');
}

function isControlKey(e) {
	//Control keys for FireFox
	if (e.which == 0) {
		return true;
	}
	//Key validations for Firefox or IE -- BackSPace(8), Return(13), Esc(27)
	if (e.which == e.keyCode && (e.keyCode == 8 || e.keyCode == 13 || e.keyCode == 27)) {
		return true;
	}
	//Everything else is rejected
	return false;
}

function isExpressionKey(e, reggex, allowSpacebar) {
	//IE: which and keyCode are equal - FireFox: keyCode is zero
	if (e.which == e.keyCode || e.keyCode == 0) {
		if (e.which == 32 && allowSpacebar) {
			return true;
		}
		return reggex.test(String.fromCharCode(e.which));
	}
	return false;
}

function validateKeyPress(e, reggex, allowSpacebar) {
	//All control keys are allowed
	if (isControlKey(e)) {
		return true;
	} else {
		return isExpressionKey(e, reggex, allowSpacebar);
	}
}

function parseNumeric(value, decimalSeparator) {
	var numericValue = undefined;
	if (value != undefined && value.length > 0) {
		if (decimalSeparator == undefined || decimalSeparator.length == 0) {
			numericValue = parseFloat(value);
		} else {
			//Before to convert, replaces custom decimal separator for user process decimal separator
			numericValue = parseFloat(value.replace(decimalSeparator[0], (1.1).toLocaleString().substring(1, 2)));
		}
	}
	return numericValue;
}


/* *************************************************************************************** */
/* Alphabetic */
$.fn.validateAlphabetic = function (allowSpacebar) {
	$(this).keypress(function (e) {
		var reggex = /[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]/;
		return validateKeyPress(e, reggex, allowSpacebar);
	});
	$(this).blur(function (e) {
		e.target.value = trim(e.target.value);
	});
}

$.fn.validateAlphanumeric = function (allowSpacebar) {
	$(this).keypress(function (e) {
		var reggex = /[0-9a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]/;
		return validateKeyPress(e, reggex, allowSpacebar);
	});
	$(this).blur(function (e) {
		e.target.value = trim(e.target.value);
	});
}

$.fn.validateEmailValue = function () {
	var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if ($(this).val() == '' || filter.test($(this).val())) {
		$(this).removeClass('invalid-field');
	} else {
		$(this).addClass('invalid-field');
	}
}

$.fn.validateEmail = function () {
	$(this).keypress(function (e) {
		var reggex = /[0-9a-zA-Z\_\-\.\@]/;
		return validateKeyPress(e, reggex, false);
	});
	$(this).validateEmailValue();
	$(this).bind('keyup change', function () {
		$(this).validateEmailValue();
	});
}


$.fn.validateCurrencyValue = function (decimalSeparator) {
	var values = [];
	var valid = true;
	var min = parseNumeric($(this).attr('min'), decimalSeparator);
	var max = parseNumeric($(this).attr('max'), decimalSeparator);
	var num = 0;
	if ($(this).val() != undefined) {
		if (decimalSeparator == undefined || decimalSeparator.length == 0) {
			values = $(this).val().split(' ');
		} else {
			values = $(this).val().replace(decimalSeparator[0], '#').split(' ');
		}
	}
	if (values.length > 0) {
		$.each(values, function (key, value) {
			num = parseNumeric(value, '#');
			if (num != undefined) {
				if (isNaN(num)) {	
					valid = false;
					return false; //means break;
				} else if (!isNaN(min) && num < min) {
					valid = false;
					return false; //means break
				} else if (!isNaN(max) && num > max) {
					valid = false;
					return false; //means break
				}
			}
		});
	}
	if (valid) {
		$(this).removeClass('invalid-field');
	} else {
		$(this).addClass('invalid-field');
	}
}

$.fn.validateCurrency = function (signed, decimalSeparator, decimalDigits, allowSpacebar) {
	$(this).keypress(function (e) {
		var isDecimal = decimalDigits > 0 && decimalSeparator.length > 0
		var baseExpression = '0-9' + (!isDecimal ? '' : '\\' + decimalSeparator[0]);
		var signedReggex = new RegExp('[\\-' + baseExpression + ']');
		var unsignedReggex = new RegExp('[' + baseExpression + ']');
		var result = false;
		if (isControlKey(e)) {
			result = true;
		} else if (isExpressionKey(e, (signed ? signedReggex : unsignedReggex), allowSpacebar)) {
			var key = e.which;
			var value = e.target.value;
			var start = e.target.selectionStart;
			var end = e.target.selectionEnd;
			var previous = (start == 0) ? '' : value.substring(0, start);
			var next = (end == value.length) ? '' : value.substring(end);
			var index = 0;
			if ((index = previous.lastIndexOf(' ')) != -1)
				previous = previous.substring(index + 1);
			if ((index = next.indexOf(' ')) != -1)
				next = next.substring(0, index);
			if (isDecimal && String.fromCharCode(key) == decimalSeparator[0]) {
				result = (previous.indexOf(decimalSeparator[0]) == -1 && next.indexOf(decimalSeparator[0]) == -1 && next.indexOf('-') == -1 && next.length <= decimalDigits);
			} else if (String.fromCharCode(key) == '-') {
				result = (previous.length == 0 && next.indexOf('-') == -1);
			} else if (String.fromCharCode(key) == ' ') {
				result = (previous.length == 0 || previous.length > 0 && previous[previous.length - 1] != '-');
			} else {
				index = (!isDecimal ? -1 : previous.indexOf(decimalSeparator[0]));
				result = (next.indexOf('-') == -1 && (index == -1 || index != -1 && previous.length - index - 1 + next.length < decimalDigits))
			}
		}
		return result;
	});
	$(this).blur(function (e) {
		var value = e.target.value;
		var index = value.length - 1;
		var isDecimal = (decimalDigits > 0 && decimalSeparator.length > 0);
		while (index >= 0) {
			var char = value.substring(index, index + 1);
			var previous = (index == 0) ? '' : value.substring(0, index);
			var next = value.substring(index + 1)
			if (char == ' ' && (previous.length == 0 || previous[previous.length - 1] == ' ' || next.length == 0 || next[0] == ' '))
				value = previous + next;
			else if (char == '-' && (previous.length == 0 || previous[previous.length - 1] == ' ') && (next.length == 0 || next[0] == ' '))
				value = previous + next;
			else if (isDecimal && char == decimalSeparator[0]) {
				if ((next.length == 0 || next[0] == ' '))
					value = previous + next;
				else if (previous.length == 0 || previous[previous.length - 1] == ' ' || previous[previous.length - 1] == '-')
					value = previous + '0' + char + next;
			}
			index--;
		}
		e.target.value = trim(value);
	});

	$(this).validateCurrencyValue(decimalSeparator);
	$(this).bind('keyup change blur', function () {
		$(this).validateCurrencyValue(decimalSeparator);
	});
};



$('.alphabetic').validateAlphabetic(false);
$('.spaced-alphabetic').validateAlphabetic(true);
$('.integer').validateCurrency(true, '', 0, false);
$('.spaced-integer').validateCurrency(true, '', 0, true);
$('.unsigned-integer').validateCurrency(false, '', 0, false);
$('.spaced-unsigned-integer').validateCurrency(false, '', 0, true);
$('.alphanumeric').validateAlphanumeric(false);
$('.spaced-alphanumeric').validateAlphanumeric(true);
$('.email').validateEmail();
/* *************************************************************************************** */
