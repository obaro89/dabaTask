export const typeDefs = `
type User {
    id: ID!
    username: String
    name: String
    email: String!
    phone: Int
    photo: String
    bio: String
    lastlogin: String
  }
  
  type Query {
    profile(id: ID!): User!
    login(email: String!, password: String!): AuthPayLoad!
  }
  
  type Mutation {
    register(
      email: String!
      password: String!
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
