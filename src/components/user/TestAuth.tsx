import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
const TEST_ACCESS = gql`
  query TestAccess{
      testAccess
  }
`;

export const TestAuth: React.FC<RouteComponentProps> = () => {
    const { loading, error, data } = useQuery(TEST_ACCESS);

    if (loading) {
        return (<div>Loading...</div>)
    }
    if (error) {
        console.log(error)
        return (<div>
            error
        </div>
        )
    }

    return (
        <div>
            done
        </div>

    )
}
