import { useMutation } from '@apollo/client';
import { SIGN_UP, SIGN_IN } from '../graphql/mutations';
import { useEffect, useState } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

const useSignUp = () => {
	const navigate = useNavigate();
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();
	const [mutate, result] = useMutation(SIGN_UP);
	const [mutateSignIn, signInRes] = useMutation(SIGN_IN);
	const signUp = async ({ username, password }) => {
		const { data } = await mutate({ variables: { user: { username: username, password: password } } });
		if(data?.createUser?.id) {
			const res = await mutateSignIn({ variables: { credentials: { username: data.createUser.username, password: password } } });
			await authStorage.setAccessToken(res.data.authenticate.accessToken);
			apolloClient.resetStore();
			navigate('/repositories');
		}
	};

	return [signUp, result];
};

export default useSignUp;