import React from 'react';
import ReactDOM from 'react-dom';
import './main_styles/index.sass';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { UserProvider } from './context/userContext';
import { ThemeProvider } from './context/CalendaryContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <ThemeProvider>
            <Route path="/adm" exact component={Admin} />
            <Route path="/" exact component={Home} />
          </ThemeProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
