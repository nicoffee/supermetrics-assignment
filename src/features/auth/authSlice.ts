import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { auth } from './authAPI';

export interface AuthState {
	slToken: string;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
	slToken: '',
	status: 'idle',
};

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (authParams: {
		email: string,
		name: string,
	}) => {
		const { data: authResponseData } = await auth(authParams);
		return authResponseData.data.sl_token;
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getSlToken: (state) => {
			const token = localStorage.getItem('slToken')

			if (token) {
				state.slToken = token;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.status = 'idle';
				state.slToken = action.payload;
				localStorage.setItem('slToken', action.payload)
			});
	},
});

export const { getSlToken } = authSlice.actions;

export const selectSlToken = (state: RootState) => state.auth.slToken;

export default authSlice.reducer;
