import { gql } from '@apollo/client';

export const NATIONS_QUERY = gql`
    query Query {
        nations {
            id
            name
        }
    }
`;

export const CREATE_NATION_MUTATION = gql`
    mutation CreateNationMutation($input: CreateNationInput!) {
        createNation(input: $input) {
            id
            name
            population
        }
    }
`;