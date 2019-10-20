class CityComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cityShowStack: [], // 已选城市的cityShow历史记录
        cityShowLevel: 0, // 当前展示城市的级别
        citySelected: [], // 已选城市名称
        showTable: true,
        searchVal: '',
      };
      this.handleShow = this.handleShow.bind(this)
      this.handleData = this.handleData.bind(this)
      this.handleCityClick = this.handleCityClick.bind(this)
      this.handleSelectClick = this.handleSelectClick.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
    }
  
    handleSearch (val) {
      this.setState({
        searchVal: val
      })
    }
  
    handleSelectClick (curCityLevel) {
      this.setState({
        cityShowLevel: curCityLevel,
      })
    }
  
    handleCityClick (nextCityCode) {
      let cityShowStack = this.state.cityShowStack;
      let cityShowLevel = this.state.cityShowLevel;
      let citySelected = this.state.citySelected;
      let nextCityObj = cityShowStack[cityShowLevel].children.filter((ele)=>{
        return ele.code.indexOf(nextCityCode) === 0
      })[0];
  
      // 首次/非首次选择
      if (cityShowLevel !== cityShowStack.length-1) {
        citySelected = citySelected.slice(0, cityShowLevel);
        cityShowStack = cityShowStack.slice(0, cityShowLevel+1);
      }
  
      citySelected[cityShowLevel] = nextCityObj.name
      if (nextCityObj.children !== undefined) {
        cityShowStack.push(nextCityObj)
        this.setState({
          cityShowLevel: cityShowStack.length-1,
          cityShowStack: cityShowStack,
          citySelected: citySelected,
          searchVal: '',
        })
      } else {
        this.setState({
          citySelected: citySelected,
          searchVal: '',
        })
        this.handleShow()
      }
    }
  
    componentDidMount() {
      fetch('https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json', {cache: 'force-cache'})
        .then(res => {
          return res.json()
        })
        .then(res => {
          this.handleData(res)
        })
        .catch(err => console.log(err))
    }
  
    handleData (res) {
      let cityShowStack = this.state.cityShowStack;
      let resObj = {
        name: '中国',
        children: res
      };
      cityShowStack.push(resObj)
      this.setState({
        cityShowStack: cityShowStack
      })
    }
  
    handleShow () {
      this.setState({
        showTable: !this.state.showTable
      })
    }
  
    render() {
      const cityShowLevel = this.state.cityShowLevel;
      const cityShowStack = this.state.cityShowStack;
      const citySelected = this.state.citySelected;
      const showTable = this.state.showTable;
      const searchVal = this.state.searchVal;
  
      const element = [];
      element.push(
        <CityInput 
          key="cityInput"
          showTable={showTable}
          handleShow={this.handleShow}
          citySelected={citySelected}
        />
      );
      if (showTable) {
        element.push(
          <CityTable 
            key="cityTable"
            cityShowStack={cityShowStack}
            cityShowLevel={cityShowLevel}
            citySelected={citySelected}
            searchVal={searchVal}
            handleCityClick={this.handleCityClick}
            handleSelectClick={this.handleSelectClick}
            handleSearch={this.handleSearch}
          />
        );
      }
      return (
        <div>
          {element}
        </div>
      )
    }
  }
  
  class CityInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
      this.props.handleShow();
    }
    render () {
      const showTable = this.props.showTable;
      const citySelected = this.props.citySelected;
  
      let citySelectedElement;
      if (citySelected.length > 0 ) {
        citySelectedElement = citySelected.map((ele)=>(
          <span key={ele} className="cityItem">{ele}</span>
        ))
      } else {
        citySelectedElement = <span>请选择行政区域</span>
      }
      var triangle = (
        <span className={`triangle ${showTable ? "Down" : "Up"}`}></span>
      )
      
      return (
        <div 
          className="cityInput" 
          onClick={this.handleClick}
        >
          <span className="cityArea">
            {citySelectedElement}
          </span>
          {triangle}
        </div>
      )
    }
  }
  
  class CityTable extends React.Component {
    render() {
      const cityShowStack = this.props.cityShowStack;
      const cityShowLevel = this.props.cityShowLevel;
      const citySelected=this.props.citySelected;
      const searchVal = this.props.searchVal;
  
      let deepClone = function(obj) {
        let objClone = Array.isArray(obj)?[]:{};
        if(obj && typeof obj==="object"){
            for(key in obj){
                if(obj.hasOwnProperty(key)){ 
                    if(obj[key] && typeof obj[key] ==="object"){
                        objClone[key] = deepClone(obj[key]);
                    }else{
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
      };
      let cityFilter = deepClone(cityShowStack[cityShowLevel]); // 需要深拷贝  
      if (searchVal.length != 0) {
        let origion = cityFilter.children;
        cityFilter.children = origion.filter((ele)=>{
          return ele.name.indexOf(searchVal) >= 0
        })
      }
      
      return (
        <div className="cityTable">
          <Search 
            searchVal={this.props.searchVal}
            handleSearch={this.props.handleSearch}
          />
          <CitySelected 
            cityShowStack={cityShowStack}
            cityShowLevel={cityShowLevel}
            citySelected={citySelected}
            handleSelectClick={this.props.handleSelectClick}
          />
          <CityBox 
            cityFilter={cityFilter}
            handleCityClick={this.props.handleCityClick}
          />
        </div>
      )
    }
  }
  
  class Search extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange (e) {
      this.props.handleSearch(e.target.value);
    }
    
    render() {
      const searchVal = this.props.searchVal;
      return (
        <div className="Search">
          <input 
            type="text"
            placeholder="🔍  搜索行政区域"
            onChange={(e) => this.handleChange(e)}
            value={searchVal}
          />
        </div>
      )
    }
  }
  
  class CitySelected extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick (level) {
      this.props.handleSelectClick(level);
    }
    
    render() {  
      const cityShowStack = this.props.cityShowStack;
      const cityShowLevel = this.props.cityShowLevel;
      const citySelected = this.props.citySelected;
  
      let citySelectedElement = [];
      citySelectedElement = citySelected.map((city, level)=>(
        <span 
          className={cityShowLevel === level ? "blue" : null}
          key={city}
          onClick={(e) => this.handleClick(level, e)}
        >
          {city}
        </span>
      ))
      if (cityShowStack.length > citySelected.length) {
        citySelectedElement.push(
          <span 
            key="choose"
            className={cityShowLevel === citySelected.length ? "blue" : null}
            onClick={(e) => this.handleClick(citySelected.length, e)}
          >
            请选择
          </span>
        )
      }
  
      return (
        <div className="citySelected">
          {citySelectedElement}
        </div>
      )
    }
  }
  
  class CityBox extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick (cityCode) {
      this.props.handleCityClick(cityCode);
    }
    render() {
      const cityFilter = this.props.cityFilter
  
      let citiesElement = [];
      if (cityFilter.children) {
        citiesElement = cityFilter.children.map((city)=>(
          <div 
            className="cityBoxItem"
            key={city.name}
            onClick={(e) => this.handleClick(city.code, e)}
          >
            {city.name}
          </div>
        ))
      }
      return (
        <div className="cityBox">
          {citiesElement}
        </div>
      )
    }
  }
  
  ReactDOM.render(
      <CityComponent />,
      document.getElementById('root')
  )