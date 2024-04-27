"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslationDictionary": function() { return /* binding */ createTranslationDictionary; }
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GiftCertificate; }
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    var createFrame = function createFrame(container, html) {
      var frame = $('<iframe />').width('100%').attr('frameBorder', '0').appendTo(container)[0];

      // Grab the frame's document object
      var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      // Calculate max height for the iframe
      var maxheight = Math.max($(window).height() - 300, 300);

      // Auto adjust the iframe's height once its document is ready
      $(frameDoc).ready(function () {
        var height = Math.min(frameDoc.body.scrollHeight + 20, maxheight);
        $(frame).height(height);
      });
    };
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent();
        var container = $('#modal-content');
        createFrame(container, content);
      });
    });
    return _this;
  }
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZSxvQ0FBVUEsSUFBSSxFQUFFO0VBQzNCLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsSUFBSUEsSUFBSSxDQUFDQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9DLE9BQU8sS0FBSztFQUNoQjs7RUFFQTtFQUNBLE9BQU8sSUFBSTtBQUNmOzs7Ozs7Ozs7Ozs7OztBQ1BBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0JBLENBQUlDLFVBQVU7RUFBQSxPQUFLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLENBQUNGLFVBQVUsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQ0QsTUFBTTtBQUFBO0FBQ3RHLElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQUEsQ0FBbUJSLE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBb0JILENBQUMsUUFBQUMsU0FBQSxDQUFBUixNQUFBLElBQURPLENBQUMsR0FBQUksU0FBQSxHQUFBSCxTQUFBLENBQURELENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1TLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlDLE9BQU8sRUFBSztFQUFBLElBQzVDQyx3QkFBd0IsR0FBd0VELE9BQU8sQ0FBdkdDLHdCQUF3QjtJQUFF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QUU7UUFDZHdDLEVBQUUsQ0FBQ3ZELDhFQUFvQixDQUFDZSxHQUFHLENBQUMsQ0FBQztNQUNqQyxDQUFDO01BQ0QyQyxZQUFZLEVBQUUsSUFBSSxDQUFDaEQsb0JBQW9CLENBQUNzRztJQUM1QyxDQUFDLENBQUM7SUFFRixPQUFPRCxnQkFBZ0I7RUFDM0IsQ0FBQztFQUFBLE9BQUExRyxlQUFBO0FBQUEsRUFsT3dDUCxxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2dpZnQtY2VydGlmaWNhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIiwiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgZm9ybU1vZGVsIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaWZ0Q2VydGlmaWNhdGUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkY2VydEJhbGFuY2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtYmFsYW5jZScpO1xuXG4gICAgICAgIGNvbnN0IHB1cmNoYXNlTW9kZWwgPSB7XG4gICAgICAgICAgICByZWNpcGllbnROYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlck5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyRW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VzdG9tQW1vdW50KHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEFtb3VudCh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCAkcHVyY2hhc2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY3VzdG9tQW1vdW50cyA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICBjb25zdCBwdXJjaGFzZVZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCRjdXN0b21BbW91bnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9ICRlbGVtZW50LmRhdGEoJ21pbicpO1xuICAgICAgICAgICAgY29uc3QgbWluRm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWluRm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBtYXggPSAkZWxlbWVudC5kYXRhKCdtYXgnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21heEZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UgPSAobWVzc2FnZSwgLi4uYW1vdW50UmFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnRQbGFjZWhvbGRlcnMgPSBbJ1tNSU5dJywgJ1tNQVhdJ107XG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWRFcnJvclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICAgIGFtb3VudFBsYWNlaG9sZGVycy5mb3JFYWNoKChwbGFjZWhvbGRlciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0ID0gdXBkYXRlZEVycm9yVGV4dC5pbmNsdWRlcyhwbGFjZWhvbGRlcikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dC5yZXBsYWNlKHBsYWNlaG9sZGVyLCBhbW91bnRSYW5nZVtpXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZEVycm9yVGV4dDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bWJlclZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UodGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5jZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UsIG1pbkZvcm1hdHRlZCwgbWF4Rm9ybWF0dGVkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudE5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnRFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b0VtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyTmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Zmlyc3Qtb2YtdHlwZScsXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodHlwZW9mICh2YWwpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWVcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZTJcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCRjZXJ0QmFsYW5jZUZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gdGhpcy5jaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRjZXJ0QmFsYW5jZUZvcm0pO1xuXG4gICAgICAgICAgICAkY2VydEJhbGFuY2VGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsYW5jZVZhbC5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIGlmICghYmFsYW5jZVZhbC5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHB1cmNoYXNlRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUZyYW1lID0gKGNvbnRhaW5lciwgaHRtbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJhbWUgPSAkKCc8aWZyYW1lIC8+Jykud2lkdGgoJzEwMCUnKS5hdHRyKCdmcmFtZUJvcmRlcicsICcwJykuYXBwZW5kVG8oY29udGFpbmVyKVswXTtcblxuICAgICAgICAgICAgLy8gR3JhYiB0aGUgZnJhbWUncyBkb2N1bWVudCBvYmplY3RcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lRG9jID0gZnJhbWUuY29udGVudFdpbmRvdyA/IGZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOiBmcmFtZS5jb250ZW50RG9jdW1lbnQ7XG5cbiAgICAgICAgICAgIGZyYW1lRG9jLm9wZW4oKTtcbiAgICAgICAgICAgIGZyYW1lRG9jLndyaXRlKGh0bWwpO1xuICAgICAgICAgICAgZnJhbWVEb2MuY2xvc2UoKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG1heCBoZWlnaHQgZm9yIHRoZSBpZnJhbWVcbiAgICAgICAgICAgIGNvbnN0IG1heGhlaWdodCA9IE1hdGgubWF4KCgkKHdpbmRvdykuaGVpZ2h0KCkgLSAzMDApLCAzMDApO1xuXG4gICAgICAgICAgICAvLyBBdXRvIGFkanVzdCB0aGUgaWZyYW1lJ3MgaGVpZ2h0IG9uY2UgaXRzIGRvY3VtZW50IGlzIHJlYWR5XG4gICAgICAgICAgICAkKGZyYW1lRG9jKS5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5taW4oZnJhbWVEb2MuYm9keS5zY3JvbGxIZWlnaHQgKyAyMCwgbWF4aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAkKGZyYW1lKS5oZWlnaHQoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICQoJyNnaWZ0LWNlcnRpZmljYXRlLXByZXZpZXcnKS5jbGljayhldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gYCR7JChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcmV2aWV3VXJsJyl9JiR7JHB1cmNoYXNlRm9ybS5zZXJpYWxpemUoKX1gO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKHByZXZpZXdVcmwsIHt9LCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWwudXBkYXRlQ29udGVudCh0aGlzLmNvbnRleHQucHJldmlld0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSAkKCcjbW9kYWwtY29udGVudCcpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUZyYW1lKGNvbnRhaW5lciwgY29udGVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkYmFsYW5jZUZvcm0pIHtcbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJhbGFuY2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImdpZnRjZXJ0aWZpY2F0ZWNvZGVcIl0nKSxcbiAgICAgICAgICAgIHZhbGlkYXRlKGNiLCB2YWwpIHtcbiAgICAgICAgICAgICAgICBjYihjaGVja0lzR2lmdENlcnRWYWxpZCh2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYmFsYW5jZVZhbGlkYXRvcjtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiY2VydCIsImxlbmd0aCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJQYWdlTWFuYWdlciIsIm5vZCIsImNoZWNrSXNHaWZ0Q2VydFZhbGlkIiwiZm9ybU1vZGVsIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFwaSIsImRlZmF1bHRNb2RhbCIsIkdpZnRDZXJ0aWZpY2F0ZSIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCIkY2VydEJhbGFuY2VGb3JtIiwiJCIsInB1cmNoYXNlTW9kZWwiLCJyZWNpcGllbnROYW1lIiwidmFsIiwicmVjaXBpZW50RW1haWwiLCJlbWFpbCIsImFwcGx5Iiwic2VuZGVyTmFtZSIsInNlbmRlckVtYWlsIiwiY3VzdG9tQW1vdW50IiwidmFsdWUiLCJtaW4iLCJtYXgiLCJzZXRBbW91bnQiLCJvcHRpb25zIiwiZm91bmQiLCJmb3JFYWNoIiwib3B0aW9uIiwiJHB1cmNoYXNlRm9ybSIsIiRjdXN0b21BbW91bnRzIiwiZmluZCIsInB1cmNoYXNlVmFsaWRhdG9yIiwic3VibWl0IiwiZGVsYXkiLCJ0YXAiLCIkZWxlbWVudCIsImRhdGEiLCJtaW5Gb3JtYXR0ZWQiLCJtYXhGb3JtYXR0ZWQiLCJpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJfbGVuIiwiYW1vdW50UmFuZ2UiLCJBcnJheSIsIl9rZXkiLCJhbW91bnRQbGFjZWhvbGRlcnMiLCJ1cGRhdGVkRXJyb3JUZXh0IiwicGxhY2Vob2xkZXIiLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJudW1iZXJWYWwiLCJOdW1iZXIiLCJlcnJvck1lc3NhZ2UiLCJjZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UiLCJyZXN1bHQiLCJ0b05hbWUiLCJ0b0VtYWlsIiwiZnJvbU5hbWUiLCJmcm9tRW1haWwiLCJ0cmlnZ2VyZWRCeSIsImNlcnRUaGVtZSIsImdldCIsImNoZWNrZWQiLCJhZ3JlZVRvVGVybXMiLCJiYWxhbmNlVmFsIiwiY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvciIsIm9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUZyYW1lIiwiY29udGFpbmVyIiwiaHRtbCIsImZyYW1lIiwid2lkdGgiLCJhdHRyIiwiYXBwZW5kVG8iLCJmcmFtZURvYyIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImNvbnRlbnREb2N1bWVudCIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwibWF4aGVpZ2h0IiwiTWF0aCIsIndpbmRvdyIsImhlaWdodCIsInJlYWR5IiwiYm9keSIsInNjcm9sbEhlaWdodCIsImNsaWNrIiwibW9kYWwiLCJwcmV2aWV3VXJsIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIl9wcm90byIsInByb3RvdHlwZSIsIiRiYWxhbmNlRm9ybSIsImJhbGFuY2VWYWxpZGF0b3IiLCJpbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==
