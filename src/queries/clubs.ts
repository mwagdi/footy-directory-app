import { gql } from '@apollo/client';

export const CREATE_CLUB_MUTATION = gql`
    mutation CreateClubMutation($input: CreateClubInput!) {
        createClub(input: $input) {
            id
            name
        }
    }
`;