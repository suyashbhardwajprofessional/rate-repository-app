import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const useNewReview = () => {
	const navigate = useNavigate();
	const [mutate, result] = useMutation(CREATE_REVIEW);
	const createNewReview = async ({ username, repositoryName, ratings, reviewtext }) => {
		const { data } = await mutate({ variables: 
			{ review: { 
				ownerName: username, 
				repositoryName: repositoryName, 
				rating: ratings, 
				text: reviewtext 
				} 
			} 
		});

		navigate(`/repositories/${data.createReview.id}`);
	};

	return [createNewReview, result];
};

export default useNewReview;