import { useQuery, gql } from '@apollo/client';
import React from 'react'
const HELLO = gql`
  query {
    hello(name:"Jesse")
  }
`
const App: React.FC = () => {
  const { data, loading, error } = useQuery(HELLO)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App" >
      {data.hello}
    </div>
  );
}

export default App;
