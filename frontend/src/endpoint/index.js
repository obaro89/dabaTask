import gql from "graphql-tag";
import axios from "axios";

export const endpoint = "https://daba-graphql-api.herokuapp.com";

export const loginQuery = async (email, password) => {
  const query = gql`
    query ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          id
          name
          username
          email
          bio
          phone
          photo
          isUpdated
          lastlogin
        }
        token
      }
    }
  `;
  return await axios.post(endpoint, {
    query: query,
    variables: { email, password },
  });
};

export const profileQuery = async () => {
  const query = gql`
    query {
      profile {
        name
        username
        email
        bio
        phone
        photo
        isUpdated
        lastlogin
      }
    }
  `;
  return await axios.post(endpoint, {
    query: query,
  });
};

export const registerQuery = async (email, password) => {
  const query = gql`
    mutation ($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `;
  return await axios.post(endpoint, {
    query,
    variables: { email, password },
  });
};

export const updateProfileQuery = async (variables) => {
  const query = gql`
    mutation ($data: UpdateUserInput) {
      updateProfile(data: $data) {
        email
        id
        name
        phone
        bio
        username
      }
    }
  `;
  return await axios.post(endpoint, {
    query: query,
    variables: variables,
  });
};

export const updateLastLogin = async () => {
  const query = gql`
    mutation {
      updateLastLogin {
        lastlogin
      }
    }
  `;
  return await axios.post(endpoint, { query });
};
