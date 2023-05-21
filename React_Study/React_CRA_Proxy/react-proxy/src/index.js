import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
  render() {
    return (
      <div>
        <input type="button" value="get data" onClick={
          function(){
            fetch('/data.json')
              .then(function(result){return result.json()})
              .then(function(json){console.log(json)})
          }
        } />
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
