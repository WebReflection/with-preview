(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  /**
   * Create, append, and return, a style node with the passed CSS content.
   * @param {string|string[]} template the CSS text or a template literal array.
   * @param {...any} values the template literal interpolations.
   * @return {HTMLStyleElement} the node appended as head last child.
   */
  function ustyler(template) {
    var text = typeof template == 'string' ? [template] : [template[0]];

    for (var i = 1, length = arguments.length; i < length; i++) {
      text.push(arguments[i], template[i]);
    }

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(text.join('')));
    return document.head.appendChild(style);
  }

  var _window = window,
      customElements = _window.customElements,
      IntersectionObserver = _window.IntersectionObserver;
  var className = 'with-preview';

  if (!customElements.get(className)) {
    var onConnected = function onConnected(target) {
      updateSrc(target);
    };

    var updateSrc = function updateSrc(target) {
      target.src = target.src.replace(/\.preview(\.jpe?g(?:\?.*)?)$/, '$1');
    };

    if (IntersectionObserver) {
      var once = {
        once: true
      };

      var gCS = function gCS(target) {
        return getComputedStyle(target, null);
      };

      var onload = function onload(_ref) {
        var target = _ref.target;
        target.addEventListener('transitionend', onTransitionEnd, once);
        target.style.opacity = 1;
      };

      var onHeight = function onHeight(_ref2) {
        var target = _ref2.target;
        var parentElement = target.parentElement;

        if (parentElement.tagName.toLowerCase() === className) {
          var _gCS = gCS(target),
              width = _gCS.width,
              height = _gCS.height;

          parentElement.style.cssText += ';width:' + width + ';height:' + height;
          observer.observe(target.nextSibling);
        }
      };

      var onTransitionEnd = function onTransitionEnd(_ref3) {
        var target = _ref3.target;
        var parentElement = target.parentElement;
        parentElement.parentElement.replaceChild(target, parentElement);
      };

      var observer = new IntersectionObserver(function (entries) {
        for (var i = 0, length = entries.length; i < length; i++) {
          var _entries$i = entries[i],
              isIntersecting = _entries$i.isIntersecting,
              target = _entries$i.target;

          if (isIntersecting) {
            observer.unobserve(target);
            target.addEventListener('load', onload, once);
            updateSrc(target);
          }
        }
      }, {
        threshold: .2
      });

      onConnected = function onConnected(target) {
        if (!target.dataset.preview) {
          target.dataset.preview = 1;
          var height = target.height,
              parentElement = target.parentElement;

          var _gCS2 = gCS(target),
              marginTop = _gCS2.marginTop,
              marginRight = _gCS2.marginRight,
              marginBottom = _gCS2.marginBottom,
              marginLeft = _gCS2.marginLeft;

          var container = document.createElement(className);
          var clone = target.cloneNode(true);
          container.style.cssText = ';margin-top:' + marginTop + ';margin-right:' + marginRight + ';margin-bottom:' + marginBottom + ';margin-left:' + marginLeft;
          parentElement.replaceChild(container, target);
          container.appendChild(target);
          container.appendChild(clone);
          if (height) onHeight({
            target: target
          });else target.addEventListener('load', onHeight, once);
        }
      };

      ustyler(className + '{position:relative;display:inline-block;padding:0;}' + className + '>img{position:absolute;top:0;left:0;margin:0;}' + className + '>img:last-child{opacity:0;transition:opacity 1s ease-in;will-change:opacity;}');
    }

    customElements.define(className, /*#__PURE__*/function (_HTMLImageElement) {
      _inherits(_class, _HTMLImageElement);

      var _super = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super.apply(this, arguments);
      }

      _createClass(_class, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          onConnected(this);
        }
      }]);

      return _class;
    }( /*#__PURE__*/_wrapNativeSuper(HTMLImageElement)), {
      "extends": 'img'
    });
  }

}());
