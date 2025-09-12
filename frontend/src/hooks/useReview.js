import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [CreateReview, result] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        },
    });

    const create = async ({ repositoryName, ownerName, rating, text }) => {
        const result = await CreateReview({ variables: { repositoryName, ownerName, rating, text }})
        return result
    };

    return [create, result];
};

export default useReview;
