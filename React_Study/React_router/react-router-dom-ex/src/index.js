import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, NavLink, Outlet, useParams} from 'react-router-dom';
import './index.css'

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home ...
    </div>
  )
}


var contents = [
  {id:1, title:'HTML', description:'HTML is ...'},
  {id:2, title:'CSS', description:'CSS is ...'},
  {id:3, title:'JavaScript', description:'JavaScript is ...'},
]

function Topic() {
  var params = useParams();
  // console.log(params.topic_id);
  var topic_id = params.topic_id;
  var selected_topic = {
    title:'Sorry',
    description:'Not Found'
  }
  for(var i=0; i<contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i]
      break;
    }
  }
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      <h3>{selected_topic.description}</h3>
    </div>
  )
}


function TestPage() {
  return (
    <div>
      <h2> Test </h2>
    </div>
  )
}

function Topics() {
  var lis = [];
  for(var i=0;i<contents.length;i++){
    lis.push(<li key={contents[i].id}><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>)
  }
  return (
    <div>
      <h2>Topics</h2>
      Topics ...
      <ul>
        {lis}
        <li><NavLink to={'/topics/test'}>TEST</NavLink></li>
        {/* <li><NavLink to="/topics/1">HTML</NavLink></li>
        <li><NavLink to="/topics/2">CSS</NavLink></li>
        <li><NavLink to="/topics/3">JavaScript</NavLink></li> */}
      </ul>
      <Routes>
        <Route path="/:topic_id" element={<Topic />} />
        <Route path="test" element={<TestPage />} />
      </Routes>

    </div>
  )
}


function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact ...
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>React-Router-Dom</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />}>
          <Route path=":id" element={<Topics />}></Route>
          <Route path="test" element={<Topics />}></Route>
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
