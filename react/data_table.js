var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterableProductTable = function (_React$Component) {
  _inherits(FilterableProductTable, _React$Component);

  function FilterableProductTable(props) {
    _classCallCheck(this, FilterableProductTable);

    var _this = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

    _this.state = {
      data: [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }],
      hide: false,
      inputValue: '',
      displayData: []
    };
    _this.handleHide = _this.handleHide.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    return _this;
  }

  _createClass(FilterableProductTable, [{
    key: "handleHide",
    value: function handleHide(checked) {
      this.setState({
        hide: checked
      });
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(val) {
      this.setState({
        inputValue: val
      });
      val = val.toLowerCase();
      var filterData = this.state.data.filter(function (ele) {
        return ele.name.toLowerCase().indexOf(val) >= 0;
      });
      this.setState({
        displayData: filterData
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.state.inputValue);
      var data = this.state.inputValue === "" ? this.state.data : this.state.displayData;
      console.log(data);
      return React.createElement(
        "div",
        null,
        React.createElement(SearchBar, {
          handleSearch: this.handleSearch,
          handleHide: this.handleHide
        }),
        React.createElement(ProductTable, {
          data: data,
          hide: this.state.hide
        })
      );
    }
  }]);

  return FilterableProductTable;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this2 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this2.handleTextChange = _this2.handleTextChange.bind(_this2);
    _this2.handleBoxChange = _this2.handleBoxChange.bind(_this2);
    return _this2;
  }

  _createClass(SearchBar, [{
    key: "handleTextChange",
    value: function handleTextChange(e) {
      this.props.handleSearch(e.target.value);
    }
  }, {
    key: "handleBoxChange",
    value: function handleBoxChange(e) {
      this.props.handleHide(e.target.checked);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement("input", {
          className: "inputText",
          type: "text",
          placeholder: "Search...",
          onChange: this.handleTextChange
        }),
        React.createElement(
          "div",
          { className: "inputBox" },
          React.createElement("input", {
            className: "box",
            type: "checkbox",
            onChange: this.handleBoxChange
          }),
          React.createElement(
            "span",
            { className: "desc" },
            "Only show products in stock"
          )
        )
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ProductTable = function (_React$Component3) {
  _inherits(ProductTable, _React$Component3);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, (ProductTable.__proto__ || Object.getPrototypeOf(ProductTable)).apply(this, arguments));
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var data = this.props.data;
      var categoryList = [];
      var last = null;
      data.forEach(function (ele) {
        if (last !== ele.category) {
          categoryList.push(React.createElement(ProductCategoryRow, {
            category: ele.category }));
        }
        categoryList.push(React.createElement(ProductRow, {
          hide: _this4.props.hide,
          name: ele.name,
          price: ele.price,
          stocked: ele.stocked }));
        last = ele.category;
      });
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "head" },
          React.createElement(
            "span",
            { className: "name" },
            "Name"
          ),
          React.createElement(
            "span",
            { className: "price" },
            "Price"
          )
        ),
        categoryList
      );
    }
  }]);

  return ProductTable;
}(React.Component);

var ProductCategoryRow = function (_React$Component4) {
  _inherits(ProductCategoryRow, _React$Component4);

  function ProductCategoryRow() {
    _classCallCheck(this, ProductCategoryRow);

    return _possibleConstructorReturn(this, (ProductCategoryRow.__proto__ || Object.getPrototypeOf(ProductCategoryRow)).apply(this, arguments));
  }

  _createClass(ProductCategoryRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "h3",
        null,
        this.props.category
      );
    }
  }]);

  return ProductCategoryRow;
}(React.Component);

var ProductRow = function (_React$Component5) {
  _inherits(ProductRow, _React$Component5);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, (ProductRow.__proto__ || Object.getPrototypeOf(ProductRow)).apply(this, arguments));
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      var color = this.props.stocked ? "black" : "red";
      if (this.props.hide && !this.props.stocked) {
        color = "hidden";
      }
      return React.createElement(
        "div",
        { className: color },
        React.createElement(
          "span",
          { className: "productName" },
          this.props.name
        ),
        React.createElement(
          "span",
          { className: "productPrice" },
          this.props.price
        )
      );
    }
  }]);

  return ProductRow;
}(React.Component);

ReactDOM.render(React.createElement(FilterableProductTable, null), document.getElementById('root'));

var data = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }];