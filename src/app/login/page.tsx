'use client';

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation LoginMutation($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                id
                email
                first_name
                last_name
            }
        }
    }
`;

const Login: React.FC = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [login, { data,loading,error }] = useMutation(LOGIN_MUTATION);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ variables: { input } });
        console.log({ data,loading,error });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.type]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input value={input.email} type="email" placeholder="Email" onChange={handleChange} />
                <input value={input.password} type="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;