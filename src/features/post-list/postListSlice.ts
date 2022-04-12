import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPostList } from './postListAPI';

export type Post = {
	id: string
	from_name: string
	from_id: string
	message: string
	type: string
	created_time: string
}

type User = {
	id: string
	name: string
	postIds: string[]
}

export interface PostListState {
	postList: {
		[key: string]: Post
	};
	userList: {
		[key: string]: User
	};
	visibleUserIds: string[] | null,
	visiblePostIds: string[] | null,
	activeUserId: string;
	sortByDateOrder: 'asc' | 'desc';
	status: 'idle' | 'loading' | 'failed';
}

const initialState: PostListState = {
	postList: {},
	userList: {},
	visibleUserIds: null,
	visiblePostIds: null,
	activeUserId: '',
	sortByDateOrder: 'asc',
	status: 'idle',
};

export const getPostListThunk = createAsyncThunk(
	'posts/getList',
	async (params: {
		slToken: string,
		page: number
	}) => {
		const { data } = await getPostList({
			slToken: params.slToken,
			page: params.page,
		});

		return data.posts;
	}
);

export const postListSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setActiveUser: (state, action: PayloadAction<string>) => {
			state.activeUserId = action.payload;
		},
		setSortByDate: (state, action: PayloadAction<'asc' | 'desc'>) => {
			state.sortByDateOrder = action.payload;
		},
		filterUsers: (state, action: PayloadAction<string>) => {
			const result = Object.values(state.userList).reduce<string[]>((acc, user) => {
				if (user.name.toLowerCase().includes(action.payload.toLocaleLowerCase())) {
					acc.push(user.id)
				}

				return acc
			}, []);

			state.visibleUserIds = result
		},
		filterPosts: (state, action: PayloadAction<string>) => {
			const result = Object.values(state.postList).reduce<string[]>((acc, post) => {
				if (post.message.toLowerCase().includes(action.payload.toLocaleLowerCase())) {
					acc.push(post.id)
				}

				return acc
			}, []);

			state.visiblePostIds = result
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPostListThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getPostListThunk.fulfilled, (state, action) => {
				state.status = 'idle';

				const postList = action.payload.reduce<{
					[key: string]: Post
				}>((acc, post) => {
					acc[post.id] = post

					return acc;
				}, {})

				const userList = action.payload.reduce<{
					[key: string]: {
						id: string,
						name: string,
						postIds: string[]
					}
				}>((acc, post) => {
					const userId = post.from_id;

					if (!acc[userId]) {
						acc[userId] = {
							id: userId,
							name: post.from_name,
							postIds: [],
						}
					}

					acc[userId].postIds.push(post.id)

					return acc;
				}, {})

				state.postList = postList;
				state.userList = userList;
			});
	},
});

export const selectUsers = (state: RootState) => {
	const userList = Object.values(state.posts.userList);
	const visibleUserIds = state.posts.visibleUserIds;

	if (!visibleUserIds) {
		return userList;
	}

	return userList.filter(user => visibleUserIds.includes(user.id));
}

export const selectStatus = (state: RootState) => state.posts.status

export const selectActiveUserId = (state: RootState) => state.posts.activeUserId

export const selectSortByDate = (state: RootState) => state.posts.sortByDateOrder

const sortPosts = (userPosts: Post[], direction: 'asc' | 'desc') => {
	return userPosts.sort((postA: Post, postB: Post) => {
		if (new Date(postA.created_time) > new Date(postB.created_time)) {
			return direction === 'asc' ? -1 : 1;
		}

		if (new Date(postA.created_time) < new Date(postB.created_time)) {
			return direction === 'asc' ? 1 : -1;
		}

		return 0;
	})
}

export const selectUserPosts = (state: RootState) => {
	const visiblePostIds = state.posts.visiblePostIds
	const activeUser = state.posts.userList[state.posts.activeUserId]
	const postIds = activeUser ? activeUser.postIds : []
	const activeUserPostIds = postIds.map(id => state.posts.postList[id])
	const userPosts = visiblePostIds ? activeUserPostIds.filter(post => visiblePostIds?.includes(post.id)) : activeUserPostIds

	return sortPosts(userPosts, state.posts.sortByDateOrder);
}

export const { filterUsers, filterPosts, setActiveUser, setSortByDate } = postListSlice.actions;

export default postListSlice.reducer;
