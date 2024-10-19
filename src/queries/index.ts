import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
    query Query {
        login {
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

export const LOGIN_MUTATION = gql`
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