export const url = "http://localhost:4000/";

export const loginQuery = (email, password) => `
query{
    login(email:"${email}", password:"${password}"){
        token,
        user{
            id,
            email
        }
      
    }
}
`;

export const profileQuery = () => `
query{
    profile{
        name,
        username,
        email,
        lastlogin,
        bio,
        phone
    }
  }
`;

export const registerQuery = (email, password) => `
mutation{
    register(email:"${email}", password:"${password}"){
        token,
        user{
            id,
            email
        }
      
    }
}
`;

export const updateProfileQuery = ({
  name,
  email,
  bio,
  phone,
  photo,
  password,
}) => {
  return `
    mutation {
        updateProfile(name: "${name}", email:"${email}", bio:"${bio}", phone:${phone}, photo:"${photo}", password:"${password}"){
           email,id,name,phone,bio,photo
          }
    }
    `;
};
