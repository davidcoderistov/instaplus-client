import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../config/context'
import { useSnackbar } from 'notistack'
import InstaSignIn, { SignInProps } from '../../lib/src/components/SignIn'
import { useMutation, ApolloError } from '@apollo/client'
import { SIGN_IN } from '../../graphql/mutations/auth'
import { SignInMutationType } from '../../graphql/types/mutations/auth'
import { getValidationError } from '../../utils'


export default function SignIn() {

    const { setLoggedInUser } = useContext(AppContext)

    const navigate = useNavigate()

    const [signIn, { loading }] = useMutation<SignInMutationType>(SIGN_IN)

    const { enqueueSnackbar } = useSnackbar()

    const handleSignIn = (signInProps: SignInProps) => {
        signIn({
            variables: {
                username: signInProps.data.username,
                password: signInProps.data.password,
            },
        }).then(({ data }) => {
            if (data) {
                setLoggedInUser({
                    _id: data.signIn.user._id,
                    firstName: data.signIn.user.firstName,
                    lastName: data.signIn.user.lastName,
                    username: data.signIn.user.username,
                    photoUrl: data.signIn.user.photoUrl,
                    accessToken: data.signIn.accessToken,
                })
            } else {
                enqueueSnackbar('Could not sign in. Please try again later', { variant: 'error' })
            }
        }).catch((err: ApolloError) => {
            const validationError = getValidationError(err)
            if (validationError?.username) {
                return signInProps.setServerError('username', validationError.username)
            } else if (validationError?.password) {
                return signInProps.setServerError('password', validationError.password)
            }
            enqueueSnackbar('Could not sign in. Please try again later', { variant: 'error' })
        })
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <InstaSignIn
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            signingIn={loading} />
    )
}