import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    const [CreateUser, result] = useMutation(CREATE_USER, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        },
    });
    
    const create = async ({ username, password }) => {
        const result = await CreateUser({ variables: { username, password }})
        return result
    };

    return [create, result]
};

export default useSignUp;