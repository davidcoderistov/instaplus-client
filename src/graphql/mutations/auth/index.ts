import { gql } from '@apollo/client'


export const SIGN_UP = gql`
    mutation signUp($firstName: String!, $lastName: String!, $password: String!, $username: String!) {
        signUp(firstName: $firstName, lastName: $lastName, password: $password, username: $username) {
            user {
                _id
            }
        }
    }
`

export const SIGN_IN = gql`
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            user {
                _id
                firstName
                lastName
                username
                photoUrl
            }
            accessToken
            createdAt
        }
    }
`

export const REFRESH = gql`
    mutation refresh {
        refresh {
            user {
                _id
                firstName
                lastName
                username
                photoUrl
            }
            accessToken
            createdAt
        }
    }
`

export const LOGOUT = gql`
    mutation logout {
        logout {
            user {
                _id
                username
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String!, $lastName: String!, $username: String!) {
        updateUser(firstName: $firstName, lastName: $lastName, username: $username) {
            user {
                _id
                firstName
                lastName
                username
                photoUrl
            }
            accessToken
            createdAt
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!, $confirmNewPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword) {
            user {
                _id
                firstName
                lastName
                username
                photoUrl
            }
            accessToken
            createdAt
        }
    }
`

export const CHANGE_PROFILE_PHOTO = gql`
    mutation changeProfilePhoto($photo: Upload!) {
        changeProfilePhoto(photo: $photo) {
            user {
                _id
                firstName
                lastName
                username
                photoUrl
            }
            accessToken
            createdAt
        }
    }
`