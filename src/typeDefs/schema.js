import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String
    name: String
    email: String!
    phone: String
    photo: String
    bio: String
    lastlogin: String
    isUpdated: Boolean
  }

  type Query {
    profile: User!
    login(email: String!, password: String!): AuthPayLoad!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayLoad!

    updateProfile(data: UpdateUserInput): User!

    updateLastLogin: User!
  }

  input UpdateUserInput {
    name: String
    bio: String
    email: String
    phone: String
    password: String
    photo: String
    username: String
    isUpdated: Boolean
  }

  type AuthPayLoad {
    user: User
    token: String
  }
`;
