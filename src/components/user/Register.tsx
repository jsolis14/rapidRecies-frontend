import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';

interface Props {

}

const REGISTER = gql`
mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!){
	register(email: $email, password: $password, firstName: $firstName, lastName: $lastName){
    user{
      id
      email
    }
  }
}
`
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [register, { data }] = useMutation(REGISTER)

    async function submitForm(e: React.FormEvent<HTMLFormElement>, mutation: any, variables: any) {
        e.preventDefault()
        const res = await mutation(variables)

        console.log(res)
    }

    return (
        <div>
            <form onSubmit={e => submitForm(e, register, { variables: { email, password, firstName, lastName } })}>
                <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <input value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {data ? data.register.user.email : 'mutation not made yet'}
            </div>
        </div>


    )
}
