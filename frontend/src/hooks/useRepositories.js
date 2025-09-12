import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
    const [repositories, setRepositories] = useState();

    const { data, loading, error, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    useEffect(() => {
        if (!loading && data) {
            setRepositories(data.repositories)
        }
    }, [data, loading]);

    return { 
        repositories,
        loading, 
        error, 
        refetch,
        fetchMore: handleFetchMore, 
    };
};

export default useRepositories;