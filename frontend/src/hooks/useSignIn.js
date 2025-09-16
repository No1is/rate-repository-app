import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [authenticate] = useMutation(AUTHENTICATE, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        }
    });

    const signIn = async ({ username, password }) => {
        const response = await authenticate({ variables: { username, password } })
        return response
    };

    return [signIn, authStorage];
};

export default useSignIn;