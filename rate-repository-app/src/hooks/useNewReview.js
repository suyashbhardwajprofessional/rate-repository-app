import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const useNewReview = () => {
	const navigate = useNavigate();
	const [mutate, result] = useMutation(CREATE_REVIEW, { fetchPolicy: 'no-cache' });
	const createNewReview = async ({ username, repositoryName, ratings, reviewText }) => {
		const { data } = await mutate({
			variables: {
				review: {
					ownerName: username,
					repositoryName: repositoryName,
					rating: ratings,
					text: reviewText,
				},
			},
		});

		navigate(`/repositories/${data.createReview.repository.id}`);
	};

	return [createNewReview, result];
};

export default useNewReview;
