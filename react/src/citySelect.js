class CityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityShow: {}, // cityBox中展示的待选择城市
      curSelectLevel: -1, // 已选城市的级别
      cityShowLevel: -1, // 当前展示城市的级别
      cityShowStack: [], // 已选城市的cityShow历史记录
      citySelected: [], // 已选城市
      showTable: true,
      searchVal: '',
      lastLevel: false
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
    console.log(curCityLevel)
    // 更新cityShow
    let cityShowStack = this.state.cityShowStack;
    let cityShow = cityShowStack[curCityLevel];
    this.setState({
      cityShow: cityShow,
      cityShowLevel: curCityLevel,
      curSelectLevel: curCityLevel
    })
  }

  handleCityClick (nextCityCode) {
    // 选择一个城市后
    // citySelected：已选城市push或者清除
    // cityShow：更新展示城市
    // citySelectedStack：并把展示城市入栈
    let cityShow = this.state.cityShow;
    let cityShowLevel = this.state.cityShowLevel;
    let citySelected = this.state.citySelected;
    let cityShowStack = this.state.cityShowStack;

    let nextCityObj = cityShow.children.filter((ele)=>{
      return ele.code.indexOf(nextCityCode) === 0
    })[0];

    // 首次选择：push；非首次选择：删除当前以及后面的，再更新当前
    if (cityShowLevel !== cityShowStack.length-1) {
      citySelected = citySelected.slice(0, cityShowLevel);
      cityShowStack = cityShowStack.slice(0, cityShowLevel+1);
    }
    citySelected[cityShowLevel] = nextCityObj.name

    if (nextCityObj.children !== undefined) {
      cityShow = nextCityObj
      cityShowStack.push(cityShow)
      this.setState({
        citySelected: citySelected,
        cityShow: nextCityObj,
        cityShowLevel: cityShowStack.length-1,
        cityShowStack: cityShowStack,
        searchVal: '',
        lastLevel: false,
        curSelectLevel: -1
      })
    } else {
      // 如果是最后一级城市，选择完后不再更新cityShow，直接关闭table
      this.setState({
        citySelected: citySelected,
        searchVal: '',
        lastLevel: true,
        curSelectLevel: -1
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
    let cityShow = {
      name: '中国',
      children: res
    };
    cityShowStack.push(cityShow)
    this.setState({
      cityShow: cityShow,
      cityShowLevel: cityShowStack.length - 1,
      cityShowStack: cityShowStack
    })
  }

  handleShow () {
    this.setState({
      showTable: !this.state.showTable
    })
  }

  render() {
    const curSelectLevel = this.state.curSelectLevel;
    const cityShowLevel = this.state.cityShowLevel;
    const lastLevel=this.state.lastLevel;
    const citySelected = this.state.citySelected;
    const cityShow = this.state.cityShow;
    // console.log('cityShow')
    // console.log(cityShow)
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
          curSelectLevel={curSelectLevel}
          cityShowLevel={cityShowLevel}
          lastLevel={lastLevel}
          searchVal={searchVal}
          cityShow={cityShow}
          citySelected={citySelected}
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
    const citySelected = this.props.citySelected;
    let citySelectedElement;
    if (citySelected.length > 0 ) {
      citySelectedElement = citySelected.map((ele)=>(
        <span key={ele} className="cityItem">{ele}</span>
      ))
    } else {
      citySelectedElement = <span>请选择行政区域</span>
    }
    if (this.props.showTable) {
      var triangle = (
        <span className="triangle Up"></span>
      )
    } else {
      var triangle = (
        <span className="triangle Down"></span>
      )
    }
    
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
    const curSelectLevel = this.props.curSelectLevel;
    const cityShowLevel = this.props.cityShowLevel;
    const lastLevel=this.props.lastLevel;
    const citySelected=this.props.citySelected;
    const searchVal = this.props.searchVal;
    let cityFilter = deepClone(this.props.cityShow); // 需要深拷贝
    
    if (searchVal.length != 0) {
      let origion = cityFilter.children;
      cityFilter.children = origion.filter((ele)=>{
        return ele.name.indexOf(searchVal) >= 0
      })
      console.log(cityFilter)
    }
    
    return (
      <div className="cityTable">
        <Search 
          searchVal={this.props.searchVal}
          handleSearch={this.props.handleSearch}
        />
        <CitySelected 
          curSelectLevel={curSelectLevel}
          cityShowLevel={cityShowLevel}
          lastLevel={lastLevel}
          cityFilter={cityFilter}
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

  handleClick (level, e) {
    this.props.handleSelectClick(level);
  }
  
  render() {    
    const curSelectLevel = this.props.curSelectLevel;
    console.log('render===curSelectLevel==='+curSelectLevel);

    let citySelected = this.props.citySelected;
    let citySelectedElement = [];
    citySelectedElement = citySelected.map((city, level)=>(
      <span 
        className={curSelectLevel === level ? "blue" : null}
        key={city}
        onClick={(e) => this.handleClick(level, e)}
      >
        {city}
      </span>
    ))

    // 怎样判断是最后一个: 多加一个参数判断
    let lastLevel = this.props.lastLevel
    if (lastLevel === false) {
      citySelectedElement.push(
        <span 
          key="choose"
          className={curSelectLevel === -1 ? "blue" : null}
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
    let cityFilter = this.props.cityFilter
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