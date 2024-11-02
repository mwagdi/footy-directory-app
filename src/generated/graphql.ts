import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Club = {
  __typename?: 'Club';
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nation: Nation;
  nation_id: Scalars['Int']['output'];
  players: Array<Maybe<Player>>;
};

export type CreateClubInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nation_id: Scalars['Int']['input'];
};

export type CreateNationInput = {
  flag?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  population: Scalars['Int']['input'];
};

export type CreatePlayerInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['String']['input'];
  club_id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  nationality_ids: Array<InputMaybe<Scalars['Int']['input']>>;
  position: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClub?: Maybe<Club>;
  createNation?: Maybe<Nation>;
  createPlayer?: Maybe<Player>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};


export type MutationCreateClubArgs = {
  input: CreateClubInput;
};


export type MutationCreateNationArgs = {
  input: CreateNationInput;
};


export type MutationCreatePlayerArgs = {
  input?: InputMaybe<CreatePlayerInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Nation = {
  __typename?: 'Nation';
  clubs: Array<Maybe<Club>>;
  flag?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  players: Array<Maybe<Player>>;
  population: Scalars['Int']['output'];
};

export type Player = {
  __typename?: 'Player';
  avatar?: Maybe<Scalars['String']['output']>;
  birthdate: Scalars['String']['output'];
  club?: Maybe<Club>;
  club_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nationalities: Array<Maybe<Nation>>;
  position: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  clubs: Array<Maybe<Club>>;
  nations: Array<Maybe<Nation>>;
  players: Array<Maybe<Player>>;
  search: Search;
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};

export type Search = {
  __typename?: 'Search';
  clubs: Array<Maybe<Club>>;
  nations: Array<Maybe<Nation>>;
  players: Array<Maybe<Player>>;
};

export type SignupInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};
