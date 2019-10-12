function CheckGroup(renderTo, options, isMultiple) {
  var that = this;
  that.renderTo = renderTo;
  that.options = options;
  that.isMultiple = !!isMultiple;
  that.initHtml();
  that.initEvent();
}
// CheckGroup.prototype.initHtml = fInitHtml;
// CheckGroup.prototype.initEvent = fInitEvent;
// CheckGroup.prototype.toggleEl = fToggleEl;
// CheckGroup.prototype.isSelected = fIsSelected;
// CheckGroup.prototype.val = fVal;

function initHtml() {
  var that = this;
  // 请补全代码，拼接html字符串
  var sHtml = `<div class="checkgroup radius">
  <div data-val="a" class="item selected">选项a</div>
  <div data-val="b" class="item">选项b</div>
  <div data-val="c" class="item">选项c</div>
  <div data-val="d" class="item">选项d</div>
</div>`;
  that.renderTo.innerHTML = sHtml;
  // 请补全代码，获取checkgroup的dom元素引用
  that.el = document.getElementsByClassName('checkgroup');
}

function initEvent() {
  var that = this;
  that.el && that.el.addEventListener('click', function (event) {
      var item = event.target;
      item.classList.contains('item') && that.toggleEl(item);
  });
}

function toggleEl(item) {
  // 根据当前是单选还是多选，以及当前元素是否选中，高亮/取消���亮指定的选项dom元素
  var that = this;
  if (that.isSelected(item)) {
      // 请补全代码
      item.classList.remove('selected');
  } else if (that.isMultiple) {
      // 请补全代码
      item.classList.add('selected');
  } else {
      // 请补全代码
      // 找到是否有其他元素被选中，如有取消那个，选中当前
      if(otheritem ){
        otheritem.classList.remove('selected');
      }
      item.classList.add('selected');
  }
}

function isSelected(item) {
  // 请补全代码，判断item是否选中
  return item.classList.contains('selected');
}

function val(values) {
  var that = this;
  if (arguments.length === 0) {
      // 请补全代码，获取高亮的选项元素
      var items = null;
      // 请补全代码，获取高亮的选项元素的data-val
      var result = [];
      return result;
  }
  !that.isMultiple && values.length > 1 && (values.length = 1);
  // 请补全代码，获取所有的选项元素
  var items = null;
  // 请补全代码，在指定元素上加上高亮的class
}

var options = [
  {text: 'a', value: 'a'},
  {text: 'b', value: 'b'},
  {text: 'c', value: 'c'}
]
var item = CheckGroup(document.getElementById('jsCheckGroup'), options);


{/* <html>
    <head>
        <style>
            .checkgroup .item{
                height: 42px;
                line-height: 42px;
                padding: 0 10px;
                margin: 10px 0;
                border: 1px solid #c7c7c7;
                border-radius: 6px;
            }
            .checkgroup.radius .item{
                border-radius: 21px;
            }
            .checkgroup .item.selected{
                border: 1px solid #08b292;
                background: #08b292;
                color: #ffffff;
            }
        </style>
    </head>
    <body>
        <div id="jsCheckGroup">
            <div class="checkgroup radius">
                <div data-val="a" class="item selected">选项a</div>
                <div data-val="b" class="item">选项b</div>
                <div data-val="c" class="item">选项c</div>
                <div data-val="d" class="item">选项d</div>
            </div>
        </div>

        <script src="./promiseTest.js"></script>

    </body>
</html> */}