import axios from 'axios';

//ACTION TYPES:
const USERS_REQUEST = 'USERS_REQUEST';

//action creator
const setUsers = (users) => ({
	type: USERS_REQUEST,
	users,
});

//thunk creator
export const fetchUsers = () => async (dispatch) => {
	const TOKEN = 'token';
	const token = window.localStorage.getItem(TOKEN);
	try {
		if (token) {
			const {data} = await axios.get("/api/users", {
				headers: {
					authorization: token,
				},
			});
			dispatch(setUsers(data));
		}
	} catch (err) {
		console.log('error in get users thunk');
	}
};



//reducer
export function usersReducer (state = [], action) {
	switch (action.type) {
		case USERS_REQUEST:
			return action.users;
		default:
			return state;
	}
}

