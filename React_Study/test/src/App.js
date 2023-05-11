import logo from './logo.svg';
import './App.css';

// 컴포넌트 - 사용자정의함수
function Header(){
  return <header>
    <h1><a href="/">WEB</a></h1>
  </header>
}

function Nav(){
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">js</a></li>
    </ol>
  </nav>
}

function Article(){
  return <article>
    <h2>Welcome</h2>
    Hello, WEB
  </article>
}

function App() {
  return (
    <div className="App">
      {/* <header>
        <h1><a href="/">WEB</a></h1>
      </header> */}

      {/* <nav>
        <ol>
          <li><a href="/read/1">html</a></li>
          <li><a href="/read/2">css</a></li>
          <li><a href="/read/3">js</a></li>
        </ol>
      </nav> */}
      {/* <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article> */}

      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
