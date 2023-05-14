import logo from './logo.svg';
import './App.css';

import {useState} from 'react';

// 컴포넌트 - 사용자정의함수
function Header(props){
  // console.log('props', props, props.title);
  return <header>
    <h1><a href="/" onClick={(event) => {
      event.preventDefault();
      props.onChangeMode();
    }}>{ props.title }</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>);
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function Update(props){
  /* props.title과 props.body를 반영할 경우 수정이 되지 않음! state로 변환하며 활용 필요 */
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      {/* props.title과 props.body를 반영할 경우 수정이 되지 않음! state로 변환하며 활용 필요 */}
      {/* react에서는 onChange가 수정 시마다 호출되므로 아래와 같이 값을 갱신(setTitle, setBody)해줘야 함 */}
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event => {
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update" /></p>
    </form>
  </article>
}


function App() {
  // let _mode = useState('WELCOME');
  // let mode = _mode[0];
  // let setMode = _mode[1];
  let [mode, setMode] = useState('WELCOME');
  let [id, setId] = useState(null);

  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);

  let content = null;
  let contextControl = null;

  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    // 복수 태그 그룹핑! <> 태그들 </>
    contextControl = <>
      <li><a href={'/update/' + id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
        const newTopics = []
        for(let i=0; i<topics.length; i++) {
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
        setNextId(nextId-1);
      }}/></li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body) =>{
      const newTopic = {id:nextId, title:_title, body:_body}

      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE') {

    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}

      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
      // setId(id);

    }}></Update>
  }

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

      <Header title="REACT" onChangeMode={() =>{
        setMode("WELCOME");
      }}></Header>

      <Nav topics={topics} onChangeMode={(id) => {
        setMode("READ");
        setId(id);
      }}></Nav>

      { content }
      <ul>
        <li><a href="/create" onClick={event => {
              event.preventDefault();
              setMode('CREATE');
            }}>Create</a></li>
            {contextControl}

        {/* <li><a href="/update">Update</a></li> */}
        {/* <Article title="Welcome" body="Hello, REACT"></Article> */}
      </ul>
    </div>
  );
}

export default App;
