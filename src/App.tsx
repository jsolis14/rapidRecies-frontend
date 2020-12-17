import { useQuery, gql } from '@apollo/client';
import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';

const HELLO = gql`
  query {
    hello(name:"Jesse")
  }
`
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
