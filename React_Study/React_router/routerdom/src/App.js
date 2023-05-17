import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="App" class='container'>
      <h1>Class vs Function</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

var funcStyle = 'color:blue';
var funcId = 0;

function FuncComp(props) {
  var [num, setNum] = useState(props.initNumber);
  var [date, setDate] = useState(new Date().toString());


  //side-effect를 의미 + 여러개 생성 가능!
  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount, componentDidUpdate와 유사) A '+(++funcId), funcStyle);
    document.title = num + ' : ' + date;
  })

  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount, componentDidUpdate와 유사) B '+(++funcId), funcStyle);
    document.title = num + ' : ' + date;
  })

  console.log('%cfunc => render'+(++funcId), funcStyle);
  return (
    <div className="container">
      <h2>Function style component</h2>
      <input type="button" value="random" onClick={
        function(){
          setNum(Math.random());
        }
      }/>
      <input id='date' type="button" value="date" onClick={
        function(){
          setDate(new Date().toString());
        }
      }/>
      <p>Number : {num}</p>
      <p>Date : {date}</p>

    </div>
  );
}

var classStyle = 'color:red';

class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }

  componentWillMount() {
    console.log('%cclass => componentWillMount', classStyle);
  }

  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate', classStyle);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle);
    return true;
  }

  render() {
    console.log('%cclass => render',classStyle);
    return (
      <div className="container">
        <h2>Class style component</h2>
        <input type="button" value='random' onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }/>
        <input id='date' type="button" value='date' onClick={
          function(){
            this.setState({date:new Date().toString()})
          }.bind(this)
        }/>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>

      </div>
    )
  }
}

export default App;
