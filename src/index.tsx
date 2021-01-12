import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';
import jwt_decode, { JwtDecodeOptions } from "jwt-decode";
import { rmdirSync } from 'fs';

interface JWTDecode {
  exp: number,
  iat: number,
  userId: String
}

function isTokenValid(token: string): boolean {

  try {
    const { exp }: JWTDecode = jwt_decode(token)
    if (Date.now() >= exp * 1000) {
      return false
    }
  } catch {
    return false
  }

  return true
}

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them

  // try refresh token if no access token
  if (token) {
    if (!isTokenValid(token)) {
      console.log('token is expired')
      //try the refresh token
      // const res = await fetch('http://localhost:4000/refresh_token', { method: 'POST', credentials: 'include' })
      // const result = await res.json()
      // console.log(result)
    }


  } else {

  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include'
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
