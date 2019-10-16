class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
      ],
      hide: false,
      inputValue: '',
      displayData: [],
    }
    this.handleHide = this.handleHide.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleHide(checked) {
    this.setState({
      hide: checked
    })
  }

  handleSearch(val) {
    this.setState({
      inputValue: val
    })
    val = val.toLowerCase();
    const filterData = this.state.data.filter((ele) => (
      ele.name.toLowerCase().indexOf(val) >= 0
    ))
    this.setState({
      displayData: filterData
    })
  }

  render() {
    console.log(this.state.inputValue)
    const data = this.state.inputValue === "" ? this.state.data : this.state.displayData;
    console.log(data);
    return (
      <div>
        <SearchBar 
          handleSearch={this.handleSearch}
          handleHide={this.handleHide}
        />
        <ProductTable 
          data={data}
          hide={this.state.hide}
        />
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBoxChange = this.handleBoxChange.bind(this);
  }

  handleTextChange(e) {
    this.props.handleSearch(e.target.value)
  }

  handleBoxChange(e) {
    this.props.handleHide(e.target.checked);
  }

  render() {
    return (
      <div>
        <input
          className="inputText"
          type="text"
          placeholder="Search..."
          onChange={this.handleTextChange}
        />
        <div className="inputBox">
          <input 
            className="box"
            type="checkbox"
            onChange={this.handleBoxChange}
          />
          <span className="desc">Only show products in stock</span>
        </div>
      </div>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const data = this.props.data
    const categoryList = [];
    let last = null;
    data.forEach((ele) => {
      if (last !== ele.category) {
        categoryList.push (
          <ProductCategoryRow 
            category={ele.category}/>
        )
      }
      categoryList.push (
        <ProductRow 
            hide={this.props.hide} 
            name={ele.name} 
            price={ele.price} 
            stocked={ele.stocked}/>
      )
      last = ele.category;
    });
    return (
      <div>
        <h2 className="head">
          <span className="name">Name</span>
          <span className="price">Price</span>
        </h2>
        {categoryList}
      </div>
    )
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <h3>{this.props.category}</h3>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    let color = this.props.stocked ? "black" : "red";
    if (this.props.hide && !this.props.stocked) {
      color = "hidden";
    }
    return (
      <div className={color}>
        <span className="productName">{this.props.name}</span>
        <span className="productPrice">{this.props.price}</span>
      </div>
    )
  }
}

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
)

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];