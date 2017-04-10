'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NameGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nouns = require('./nouns');

var _nouns2 = _interopRequireDefault(_nouns);

var _adjectives = require('./adjectives');

var _adjectives2 = _interopRequireDefault(_adjectives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NameGenerator = function () {
  function NameGenerator() {
    _classCallCheck(this, NameGenerator);

    this.nounCount = _nouns2.default.length;
    this.adjCount = _adjectives2.default.length;
    this.names = [];
  }

  // Private method


  _createClass(NameGenerator, [{
    key: 'getRandomNumberWithinLimit',
    value: function getRandomNumberWithinLimit(maxLimit) {
      return Math.floor(Math.random() * (maxLimit - 0) + 0);
    }

    // Private method

  }, {
    key: 'getRandomNoun',
    value: function getRandomNoun() {
      var ranIndex = this.getRandomNumberWithinLimit(this.nounCount);
      var ranNoun = _nouns2.default[ranIndex];
      return ranNoun;
    }

    // Private method

  }, {
    key: 'getRandomAdj',
    value: function getRandomAdj() {
      var ranIndex = this.getRandomNumberWithinLimit(this.adjCount);
      var ranAdj = _adjectives2.default[ranIndex];
      return ranAdj;
    }
  }, {
    key: 'constructNames',
    value: function constructNames() {
      var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var numbered = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.names = [];
      for (var i = 0; i < (words < 10 ? words : 10); i++) {
        if (i === words - 1) {
          var ranNoun = this.getRandomNoun();
          this.names.push(ranNoun);
          if (numbered) {
            var largeRanNum = this.getRandomNumberWithinLimit(+new Date());
            var ranNum = largeRanNum.toString().split('').reverse().join('').slice(0, 5);
            this.names.push(ranNum);
          }
        } else {
          var ranAdj = this.getRandomAdj();
          this.names.push(ranAdj);
        }
      }
      return this;
    }
  }, {
    key: 'joinNames',
    value: function joinNames() {
      var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';

      var names = this.names || [];
      return names.join(separator);
    }
  }, {
    key: 'nameList',
    value: function nameList(limit) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var words = options.words,
          numbered = options.numbered,
          separator = options.separator;

      var list = [];
      for (var i = 0; i < limit; i++) {
        list.push(this.constructNames(words, numbered).joinNames(separator));
      }
      return list;
    }
  }, {
    key: 'nameListRaw',
    value: function nameListRaw(limit) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var words = options.words,
          numbered = options.numbered,
          separator = options.separator;

      var list = [];
      for (var i = 0; i < limit; i++) {
        list.push(this.constructNames(words, numbered).rawNames());
      }
      return list;
    }
  }, {
    key: 'rawNames',
    value: function rawNames() {
      return this.names;
    }
  }]);

  return NameGenerator;
}();

exports.NameGenerator = NameGenerator;
exports.default = new NameGenerator();