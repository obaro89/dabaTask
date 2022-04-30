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
  }

  type Query {
    profile: User!
    login(email: String!, password: String!): AuthPayLoad!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayLoad!

    updateProfile(
      username: String
      name: String
      email: String!
      phone: String
      photo: String
      bio: String
      password: String
    ): User!
  }

  input UpdateUserInput {
    name: String
    bio: String
    email: String
    phone: String
    password: String
    photo: String
  }

  type AuthPayLoad {
    user: User
    token: String
  }
`;
