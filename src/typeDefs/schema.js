const typeDefs = `
type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    phone: Int
    photo: String
    bio: String
    password: String
    token: String
    lastlogin: String
  }
  
  type Query {
    profile(id: ID!): User!
  }
  
  type Mutation {
    register(
      username: String!
      name: String!
      password: String!
      email: String!
      bio: String
      phone: Int
    ): User!
  
    login(username: String!, password: String!): String!
    editprofile(
      name: String
      bio: String
      email: String
      phone: String
      password: String
      photo: String
    ): User!
  }
  

`;

export { typeDefs as default };
