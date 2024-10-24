'use client';

import React, { useEffect, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import Link from 'next/link';
import { LOGIN_MUTATION, LOGIN_QUERY } from '../../queries';
import { redirect } from 'next/navigation';

const Login: React.FC = () => {
    // const router = useRouter();
    const client = useApolloClient();

    const cached = client.readQuery({ query: LOGIN_QUERY  });

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
        update(cache, { data: { login } }) {
            console.log('update', login);
            cache.writeQuery({
                query: LOGIN_QUERY,
                data: { login },
            });
        }
    });

    useEffect(() => {
        if (cached?.login) {
            redirect('/dashboard');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ variables: { input } });
        console.log({ data, loading, error });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.type]: e.target.value,
        });
    };

    return (
        <div>
            <Link href="/example">Example</Link>
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