import postListSliceReducer, { filterUsers, filterPosts, setActiveUser, PostListState } from './postListSlice';

const USER_LIST_MOCK = {
	"user_1": {
		"id": "user_1",
		"name": "Filomena Cort",
		"postIds": [
			"post62541ea48ff30_07e10b41",
			"post62541ea48ff5e_b7e0c988",
			"post62541ea49005c_ebe36fc7",
			"post62541ea490065_21f5d0a8",
			"post62541ea490087_7649c907",
			"post62541ea490097_d17d2322"
		]
	},
	"user_6": {
		"id": "user_6",
		"name": "Carly Alvarez",
		"postIds": [
			"post62541ea48ff49_3fa855bf",
			"post62541ea48ffa5_1337ae19",
			"post62541ea48ffea_1e12e832",
			"post62541ea490030_ab705b76",
			"post62541ea4900ab_2c3773f6",
			"post62541ea4900cd_cce551d5",
			"post62541ea49011c_265463f2"
		]
	},
}

const POST_LIST_MOCK = {
	"post62541ea48ff5e_b7e0c988": {
		"id": "post62541ea48ff5e_b7e0c988",
		"from_name": "Filomena Cort",
		"from_id": "user_1",
		"message": "interest grudge underline arch gutter passage addition mile extend element abridge flourish orchestra scandal dead hiccup duty deserve cruelty bury short circuit trail situation gutter snack relation broken gallon protection nest suggest key chief railroad critic condition say diplomat penny kitchen district jurisdiction draw kitchen withdrawal conflict lamb corruption pavement flat bottom systematic spend factor bury broadcast crossing biology flourish victory syndrome marsh lodge merchant",
		"type": "status",
		"created_time": "2022-04-10T19:46:11+00:00"
	},
	"post62541ea490132_fc33a6b7": {
		"id": "post62541ea490132_fc33a6b7",
		"from_name": "Ethelene Maggi",
		"from_id": "user_1",
		"message": "pick integration complex addition dismissal lie district pursuit trend route nest visible return establish detective climb Europe friend climb virtue sacrifice basket house pest nuclear disability cave key galaxy contract cord role realize sympathetic key design facility egg white address deserve output trait castle fireplace advance bed serve title population stress undertake dorm gutter dignity correspond scratch sight essay positive inn producer prevent audience trend teacher retirement rally expose pavement describe bat prize reputation solo mother poor systematic brave field trace mean reinforce monkey trick facility follow feminine jewel straw rescue wall integration relevance good night",
		"type": "status",
		"created_time": "2022-03-24T14:21:29+00:00"
	},
	"post62541ea490139_432c47ec": {
		"id": "post62541ea490139_432c47ec",
		"from_name": "Ethelene Maggi",
		"from_id": "user_1",
		"message": "twist siege quote snack fan point forward morsel brick embryo timber interest ban symbol risk district recovery spot anger huge stain safety talkative building mail thoughtful food chord pawn kill traction brick closed thought extension tell cover boy ballet pool conductor rain condition noble sword useful salesperson write abundant permission outfit attention",
		"type": "status",
		"created_time": "2022-03-24T10:19:21+00:00"
	},
	"post62541ea49013d_e835efa0": {
		"id": "post62541ea49013d_e835efa0",
		"from_name": "Lael Vassel",
		"from_id": "user_1",
		"message": "decorative rehabilitation manage hour kit estimate indoor glove platform rally draw level reward stress cherry plant dignity reserve carbon introduction queen hand button kick fashionable romantic sip chest electron era dawn network skin hike convention sigh effort tribe bat mine litigation possibility fund forest concept estimate norm series manage galaxy complication victory crossing aluminium due drum force definition withdrawal occasion birthday integration raid folklore witness button survey",
		"type": "status",
		"created_time": "2022-03-24T05:38:24+00:00"
	}
}

describe('postsSlice reducer', () => {
	const initialState: PostListState = {
		postList: {},
		userList: {},
		visibleUserIds: null,
		visiblePostIds: null,
		activeUserId: '',
		sortByDateOrder: 'asc',
		status: 'idle',
	};

	it('should handle initial state', () => {
		expect(postListSliceReducer(undefined, { type: 'unknown' })).toEqual({
			postList: {},
			userList: {},
			visibleUserIds: null,
			visiblePostIds: null,
			activeUserId: '',
			sortByDateOrder: 'asc',
			status: 'idle',
		});
	});

	it('should handle increment', () => {
		const actual = postListSliceReducer(initialState, setActiveUser('1'));
		expect(actual.activeUserId).toEqual('1');
	});

	it('should handle filterUsers', () => {
		const actual = postListSliceReducer({
			...initialState,
			userList: USER_LIST_MOCK
		}, filterUsers('Carly'));
		expect(actual.visibleUserIds).toEqual(['user_6']);
	});

	it('should handle filterPosts', () => {
		const actual = postListSliceReducer({
			...initialState,
			activeUserId: 'user_1',
			postList: POST_LIST_MOCK
		}, filterPosts('decorative rehabilitation'));
		expect(actual.visiblePostIds).toEqual(['post62541ea49013d_e835efa0']);
	});
});
