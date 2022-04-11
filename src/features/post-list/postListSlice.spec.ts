import postListSliceReducer, { filterUsers, filterPosts, setActiveUser, setSortByDate, PostListState } from './postListSlice';

describe('postsSlice reducer', () => {
	const initialState: PostListState = {
		postList: {},
		userList: {},
		visibleUserIds: null,
		visiblePostIds: null,
		activeUserId: '',
		sortByDate: 'asc',
		status: 'idle',
	};

	it('should handle initial state', () => {
		expect(postListSliceReducer(undefined, { type: 'unknown' })).toEqual({
			postList: {},
			userList: {},
			visibleUserIds: null,
			visiblePostIds: null,
			activeUserId: '',
			sortByDate: 'asc',
			status: 'idle',
		});
	});

	it('should handle increment', () => {
		const actual = postListSliceReducer(initialState, setActiveUser('1'));
		expect(actual.activeUserId).toEqual('1');
	});
});
