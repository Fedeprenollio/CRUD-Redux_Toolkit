import { addNewUser, deleteUserById, updateUser } from "../stores/users/slice";
import { useAppDispatch } from "./store";

export function useUsersActions() {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};
	const handleRemoveUser = (id) => {
		dispatch(deleteUserById(id));
	};
	const handleUpdateUser = ({ id, name, email, github }) => {
		dispatch(updateUser({ id, name, email, github }));
	};

	return { handleRemoveUser, addUser, handleUpdateUser };
}
