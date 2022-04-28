export const typeDefs = `
type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    phone: Int
    photo: String
    bio: String
    token: String
    lastlogin: String
  }
  
  type Query {
    profile(id: ID!): User!
    login(username: String!, password: String!): AuthPayLoad!
  }
  
  type Mutation {
    register(
      username: String!
      name: String!
      password: String!
      email: String!
      bio: String
      phone: Int
      photo: String
    ): AuthPayLoad!
  
   

    updateProfile(
      data: UpdateUserInput!
    ): User!
  }
  
  input UpdateUserInput {
    name: String
      bio: String
      email: String
      phone: Int
      password: String
      photo: String
  }

  type AuthPayLoad{
    user: User
    token: String
  }

`;
