var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CityComponent = function (_React$Component) {
  _inherits(CityComponent, _React$Component);

  function CityComponent(props) {
    _classCallCheck(this, CityComponent);

    var _this = _possibleConstructorReturn(this, (CityComponent.__proto__ || Object.getPrototypeOf(CityComponent)).call(this, props));

    _this.state = {
      cityShow: {}, // cityBox中展示的待选择城市
      curSelectLevel: -1, // 已选城市的级别
      cityShowLevel: -1, // 当前展示城市的级别
      cityShowStack: [], // 已选城市的cityShow历史记录
      citySelected: [], // 已选城市
      showTable: true,
      searchVal: '',
      lastLevel: false
    };
    _this.handleShow = _this.handleShow.bind(_this);
    _this.handleData = _this.handleData.bind(_this);
    _this.handleCityClick = _this.handleCityClick.bind(_this);
    _this.handleSelectClick = _this.handleSelectClick.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    return _this;
  }

  _createClass(CityComponent, [{
    key: 'handleSearch',
    value: function handleSearch(val) {
      this.setState({
        searchVal: val
      });
    }
  }, {
    key: 'handleSelectClick',
    value: function handleSelectClick(curCityLevel) {
      console.log(curCityLevel);
      // 更新cityShow
      var cityShowStack = this.state.cityShowStack;
      var cityShow = cityShowStack[curCityLevel];
      this.setState({
        cityShow: cityShow,
        cityShowLevel: curCityLevel,
        curSelectLevel: curCityLevel
      });
    }
  }, {
    key: 'handleCityClick',
    value: function handleCityClick(nextCityCode) {
      // 选择一个城市后
      // citySelected：已选城市push或者清除
      // cityShow：更新展示城市
      // citySelectedStack：并把展示城市入栈
      var cityShow = this.state.cityShow;
      var cityShowLevel = this.state.cityShowLevel;
      var citySelected = this.state.citySelected;
      var cityShowStack = this.state.cityShowStack;

      var nextCityObj = cityShow.children.filter(function (ele) {
        return ele.code.indexOf(nextCityCode) === 0;
      })[0];

      // 首次选择：push；非首次选择：删除当前以及后面的，再更新当前
      if (cityShowLevel !== cityShowStack.length - 1) {
        citySelected = citySelected.slice(0, cityShowLevel);
        cityShowStack = cityShowStack.slice(0, cityShowLevel + 1);
      }
      citySelected[cityShowLevel] = nextCityObj.name;

      if (nextCityObj.children !== undefined) {
        cityShow = nextCityObj;
        cityShowStack.push(cityShow);
        this.setState({
          citySelected: citySelected,
          cityShow: nextCityObj,
          cityShowLevel: cityShowStack.length - 1,
          cityShowStack: cityShowStack,
          searchVal: '',
          lastLevel: false,
          curSelectLevel: -1
        });
      } else {
        // 如果是最后一级城市，选择完后不再更新cityShow，直接关闭table
        this.setState({
          citySelected: citySelected,
          searchVal: '',
          lastLevel: true,
          curSelectLevel: -1
        });
        this.handleShow();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json', { cache: 'force-cache' }).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this2.handleData(res);
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }, {
    key: 'handleData',
    value: function handleData(res) {
      var cityShowStack = this.state.cityShowStack;
      var cityShow = {
        name: '中国',
        children: res
      };
      cityShowStack.push(cityShow);
      this.setState({
        cityShow: cityShow,
        cityShowLevel: cityShowStack.length - 1,
        cityShowStack: cityShowStack
      });
    }
  }, {
    key: 'handleShow',
    value: function handleShow() {
      this.setState({
        showTable: !this.state.showTable
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var curSelectLevel = this.state.curSelectLevel;
      var cityShowLevel = this.state.cityShowLevel;
      var lastLevel = this.state.lastLevel;
      var citySelected = this.state.citySelected;
      var cityShow = this.state.cityShow;
      // console.log('cityShow')
      // console.log(cityShow)
      var showTable = this.state.showTable;
      var searchVal = this.state.searchVal;
      var element = [];
      element.push(React.createElement(CityInput, {
        key: 'cityInput',
        showTable: showTable,
        handleShow: this.handleShow,
        citySelected: citySelected
      }));
      if (showTable) {
        element.push(React.createElement(CityTable, {
          key: 'cityTable',
          curSelectLevel: curSelectLevel,
          cityShowLevel: cityShowLevel,
          lastLevel: lastLevel,
          searchVal: searchVal,
          cityShow: cityShow,
          citySelected: citySelected,
          handleCityClick: this.handleCityClick,
          handleSelectClick: this.handleSelectClick,
          handleSearch: this.handleSearch
        }));
      }
      return React.createElement(
        'div',
        null,
        element
      );
    }
  }]);

  return CityComponent;
}(React.Component);

var CityInput = function (_React$Component2) {
  _inherits(CityInput, _React$Component2);

  function CityInput(props) {
    _classCallCheck(this, CityInput);

    var _this3 = _possibleConstructorReturn(this, (CityInput.__proto__ || Object.getPrototypeOf(CityInput)).call(this, props));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  _createClass(CityInput, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.handleShow();
    }
  }, {
    key: 'render',
    value: function render() {
      var citySelected = this.props.citySelected;
      var citySelectedElement = void 0;
      if (citySelected.length > 0) {
        citySelectedElement = citySelected.map(function (ele) {
          return React.createElement(
            'span',
            { key: ele, className: 'cityItem' },
            ele
          );
        });
      } else {
        citySelectedElement = React.createElement(
          'span',
          null,
          '\u8BF7\u9009\u62E9\u884C\u653F\u533A\u57DF'
        );
      }
      if (this.props.showTable) {
        var triangle = React.createElement('span', { className: 'triangle Up' });
      } else {
        var triangle = React.createElement('span', { className: 'triangle Down' });
      }

      return React.createElement(
        'div',
        {
          className: 'cityInput',
          onClick: this.handleClick
        },
        React.createElement(
          'span',
          { className: 'cityArea' },
          citySelectedElement
        ),
        triangle
      );
    }
  }]);

  return CityInput;
}(React.Component);

var CityTable = function (_React$Component3) {
  _inherits(CityTable, _React$Component3);

  function CityTable() {
    _classCallCheck(this, CityTable);

    return _possibleConstructorReturn(this, (CityTable.__proto__ || Object.getPrototypeOf(CityTable)).apply(this, arguments));
  }

  _createClass(CityTable, [{
    key: 'render',
    value: function render() {
      var deepClone = function deepClone(obj) {
        var objClone = Array.isArray(obj) ? [] : {};
        if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object") {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] && _typeof(obj[key]) === "object") {
                objClone[key] = deepClone(obj[key]);
              } else {
                objClone[key] = obj[key];
              }
            }
          }
        }
        return objClone;
      };
      var curSelectLevel = this.props.curSelectLevel;
      var cityShowLevel = this.props.cityShowLevel;
      var lastLevel = this.props.lastLevel;
      var citySelected = this.props.citySelected;
      var searchVal = this.props.searchVal;
      var cityFilter = deepClone(this.props.cityShow); // 需要深拷贝

      if (searchVal.length != 0) {
        var origion = cityFilter.children;
        cityFilter.children = origion.filter(function (ele) {
          return ele.name.indexOf(searchVal) >= 0;
        });
        console.log(cityFilter);
      }

      return React.createElement(
        'div',
        { className: 'cityTable' },
        React.createElement(Search, {
          searchVal: this.props.searchVal,
          handleSearch: this.props.handleSearch
        }),
        React.createElement(CitySelected, {
          curSelectLevel: curSelectLevel,
          cityShowLevel: cityShowLevel,
          lastLevel: lastLevel,
          cityFilter: cityFilter,
          citySelected: citySelected,
          handleSelectClick: this.props.handleSelectClick
        }),
        React.createElement(CityBox, {
          cityFilter: cityFilter,
          handleCityClick: this.props.handleCityClick
        })
      );
    }
  }]);

  return CityTable;
}(React.Component);

var Search = function (_React$Component4) {
  _inherits(Search, _React$Component4);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this5 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this5.handleChange = _this5.handleChange.bind(_this5);
    return _this5;
  }

  _createClass(Search, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.handleSearch(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var searchVal = this.props.searchVal;
      return React.createElement(
        'div',
        { className: 'Search' },
        React.createElement('input', {
          type: 'text',
          placeholder: '\uD83D\uDD0D  \u641C\u7D22\u884C\u653F\u533A\u57DF',
          onChange: function onChange(e) {
            return _this6.handleChange(e);
          },
          value: searchVal
        })
      );
    }
  }]);

  return Search;
}(React.Component);

var CitySelected = function (_React$Component5) {
  _inherits(CitySelected, _React$Component5);

  function CitySelected(props) {
    _classCallCheck(this, CitySelected);

    var _this7 = _possibleConstructorReturn(this, (CitySelected.__proto__ || Object.getPrototypeOf(CitySelected)).call(this, props));

    _this7.handleClick = _this7.handleClick.bind(_this7);
    return _this7;
  }

  _createClass(CitySelected, [{
    key: 'handleClick',
    value: function handleClick(level, e) {
      this.props.handleSelectClick(level);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var curSelectLevel = this.props.curSelectLevel;
      console.log('render===curSelectLevel===' + curSelectLevel);

      var citySelected = this.props.citySelected;
      var citySelectedElement = [];
      citySelectedElement = citySelected.map(function (city, level) {
        return React.createElement(
          'span',
          {
            className: curSelectLevel === level ? "blue" : null,
            key: city,
            onClick: function onClick(e) {
              return _this8.handleClick(level, e);
            }
          },
          city
        );
      });

      // 怎样判断是最后一个: 多加一个参数判断
      var lastLevel = this.props.lastLevel;
      if (lastLevel === false) {
        citySelectedElement.push(React.createElement(
          'span',
          {
            key: 'choose',
            className: curSelectLevel === -1 ? "blue" : null
          },
          '\u8BF7\u9009\u62E9'
        ));
      }

      return React.createElement(
        'div',
        { className: 'citySelected' },
        citySelectedElement
      );
    }
  }]);

  return CitySelected;
}(React.Component);

var CityBox = function (_React$Component6) {
  _inherits(CityBox, _React$Component6);

  function CityBox(props) {
    _classCallCheck(this, CityBox);

    var _this9 = _possibleConstructorReturn(this, (CityBox.__proto__ || Object.getPrototypeOf(CityBox)).call(this, props));

    _this9.handleClick = _this9.handleClick.bind(_this9);
    return _this9;
  }

  _createClass(CityBox, [{
    key: 'handleClick',
    value: function handleClick(cityCode) {
      this.props.handleCityClick(cityCode);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var cityFilter = this.props.cityFilter;
      var citiesElement = [];
      if (cityFilter.children) {
        citiesElement = cityFilter.children.map(function (city) {
          return React.createElement(
            'div',
            {
              className: 'cityBoxItem',
              key: city.name,
              onClick: function onClick(e) {
                return _this10.handleClick(city.code, e);
              }
            },
            city.name
          );
        });
      }
      return React.createElement(
        'div',
        { className: 'cityBox' },
        citiesElement
      );
    }
  }]);

  return CityBox;
}(React.Component);

ReactDOM.render(React.createElement(CityComponent, null), document.getElementById('root'));