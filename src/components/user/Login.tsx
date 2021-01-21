import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { Error } from '../utils/Error';
const LOGIN = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password:$password){
      acessToken
      user{
        email
      }
      errors{
        path
        message
      }
    }
  }
`

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { error }] = useMutation(LOGIN)

    async function submitForm(e: React.FormEvent<HTMLFormElement>, mutation: any, variables: any) {
        e.preventDefault()

        try {
            const res = await mutation(variables)
            if (res && res.data.acessToken) {
                localStorage.setItem('accessToken', res.data.login.acessToken)
                history.push('/')
                console.log(res)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {error ? <Error /> : <></>}
            <form onSubmit={e => submitForm(e, login, { variables: { email, password } })}>
                <div>
                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
                </div>
                <div>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}
