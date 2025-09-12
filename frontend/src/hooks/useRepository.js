import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const [repository, setRepository] = useState();
    const { data, loading, error, fetchMore, refetch } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: "cache-and-network",
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    useEffect(() => {
        if (!loading && data) {
            setRepository(data.repository)
        }
    }, [data, loading]);


    return {
        repository,
        loading,
        error,
        refetch,
        fetchMore: handleFetchMore,
    };
};

export default useRepository;