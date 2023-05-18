import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="App" class='container'>
      <h1>Class vs Function</h1>
      <input class="main_btn" type="button" value="remove func" onClick={function() {
        setFuncShow(false);
      }} />
      <input class="main_btn" type="button" value="remove class" onClick={function() {
        setClassShow(false);
      }} />
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
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
    // document.title = num + ' : ' + date;
    document.title = num;
    // clean up : useEffect가 다시 실행되기 전에 실행
    return function() {
      console.log('%cfunc => useEffect return'+(++funcId), funcStyle)
    }
  }, [num])  // 배열 안에 담긴 변수 값이 변경될 때만 호출!

  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount, componentDidUpdate와 유사) B '+(++funcId), funcStyle);
    // document.title = num + ' : ' + date;
    document.title = date;
  }, [date])

  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount Only)', funcStyle);
    // document.title = num + ' : ' + date;
    document.title = num;
    // clean up : useEffect가 다시 실행되기 전에 실행
    return function() {
      console.log('%cfunc => componentWillUnMount return'+(++funcId), funcStyle);
    }
  }, []);  // 빈 배열을 담을 경우 1회만 실행되고 이후에는 실행되지 않음!


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

  componentWillUnmount() {
    console.log('%cclass => componentWillUnmount', classStyle);
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
