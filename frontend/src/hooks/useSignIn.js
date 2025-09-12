import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [authenticate, result] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        }
    });

    const signIn = async ({ username, password }) => {
        const response = await authenticate({ variables: { username, password } })
        return response
    };

    return [signIn, result, authStorage];
};

export default useSignIn;