import { gql } from '@apollo/client';

export const CREATE_PLAYER_MUTATION = gql`
    mutation CreatePlayerMutation($input: CreatePlayerInput!) {
        createPlayer(input: $input) {
            id
            name
            nation_id
            club_id
        }
    }
`;