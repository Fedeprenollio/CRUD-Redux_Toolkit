import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Federico Prenollio",
		email: "fede.preno@gmail.com",
		github: "fedeprenollio",
	},
	{
		id: "2",
		name: "David Dias",
		email: "David@Dias.com",
		github: "thedaviddias",
	},
	{
		id: "3",
		name: "Ant Design",
		email: "Ant@desing.com",
		github: "ant-design",
	},
	{
		id: 4,
		name: "Elon Musk",
		email: "ElonM@twitter.com",
		github: "Twitter",
	},
];

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}
	return DEFAULT_STATE;
})();

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUserById: (state, action) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		addNewUser: (state, action) => {
			const id = crypto.randomUUID();
			const { name, email, github } = action.payload;
			const newUser = { id, name, email, github };
			return [...state, newUser];
		},
		rollbackUserDelete: (state, action) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				return [...state, action.payload];
			}
		},
		updateUser: (state, action) => {
			const { id, name, email, github } = action.payload;

			const newState = state.map((user) => {
				if (user.id === id) {
					user.name = name;
					user.email = email;
					user.github = github;
				}
			});
		},
	},
});
const { actions, reducer } = usersSlice;
export default reducer;
export const { deleteUserById, addNewUser, rollbackUserDelete, updateUser } =
	actions;
