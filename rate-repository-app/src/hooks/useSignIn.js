import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { useEffect, useState } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
	const navigate = useNavigate();
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();
	const [mutate, result] = useMutation(SIGN_IN);
	const signIn = async ({ username, password }) => {
		const { data } = await mutate({ variables: { credentials: { username: username, password: password } } });
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
		navigate('/repositories');
	};

	return [signIn, result];
};

export default useSignIn;
