//状态数据是统一保管在棋盘组件 Board 当中的。你应该注意到了，当事件处理函数触发棋盘父组件的状态数据改变时，格子子组件会自动重新渲染。
//现在格子组件 Square 不再拥有自身的状态数据了。它从棋盘父组件 Board 接收数据，并且当自己被点击时通知触发父组件改变状态数据，我们称这类的组件为 受控组件。
// class Square extends React.Component {
//   //删掉 Square 组件中的 构造函数 constructor ，因为它现在已经不需要保存 state 了
//   //constructor() {
//   //   super();
//   //   //为该组件设置自身的状态数据。
//   //   this.state = {
//   //     value: null,
//   //   };
//   // } 
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}  
//       </button> 
//       // 通过点击事件触发 state 的改变来更新(this.setState)棋盘格子显示的内容
//       // 接受父组件的参数
//     );
//   }
// }

//函数定义组件 。只需要简单写一个以 props 为参数的 function 返回 JSX 元素就搞定了。
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
  
class Board extends React.Component {

//Board 现在通过 props 获取从 Game 传递下来的数据和事件处理函数。
//删除 Board 的构造方法 constructor 。
// constructor(pros) {
//   super(pros);
//   //在父组件中保存子组件的状态：squares数组
//   this.state = {
//     squares: Array(9).fill(null),
//     xIsNext: true, //将 X 默认设置为先手棋
//   };
// }



    renderSquare(i) {    
        // return <Square />;
        return (<Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                />); 
        //传递一个事件处理函数到 Square 
        //传递对应 state 数组元素的值。
        //传递一个名为 value 的 prop 到 Square 当中
    }

    render() {
        //来检查是否有人获胜并根据判断显示出 “Winner: [X/O]” 来表示获胜方。
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        // status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    //把 Board 中的状态数据再提升到 Game 组件中来。

    //首先在 Game 组件的构造函数中初始化我们需要的状态数据：
    constructor(props) {
        super(props);
        this.state = {
            //历史状态
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    //当 Square 中的事件处理函数触发时，其实就是触发的 Board 当中的 this.handleClick(i) 方法
    //修改自己的状态数组squares[i]；
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1]; //取上一次的状态
        const squares = current.squares.slice();
        //当前方格内已经落子/有一方获胜就就无法继续
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X':'O'; //每走一步棋，都需要切换 xIsNext 的值以此来实现轮流落子的功能
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext:!this.state.xIsNext, //每走一步棋，都需要切换 xIsNext 的值以此来实现轮流落子的功能
        });
    }

    render() {
        //要负责获取最近一步的历史记录（当前棋局状态），以及计算出游戏进行的状态（是否有人获胜）。
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div className="game">
                <div className="game-board">
                <Board
                    squares={current.squares} //当前格子的状态
                    onClick={(i) => this.handleClick(i)} //点击触发函数
                />
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//判断赢家
function calculateWinner(squares) {
    //预定义胜利的几种情况
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    //对于每种情况，判断对应位置是否为同一个状态
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  