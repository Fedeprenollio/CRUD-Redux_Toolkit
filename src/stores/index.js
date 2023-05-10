import { configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUserDelete } from "./users/slice";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const asynWhitDataBaseMiddleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const prevState = store.getState();
	if (type === "users/deleteUserById") {
		const userToRemove = prevState.users.find((user) => user.id === payload);
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success("Usuario eliminado correctamente");
				}
				// toast.error("Error al eliminar2");
				// throw new Error("Error al eliminar al usuario...");
			})
			.catch((err) => {
				if (userToRemove) {
					toast.error("Error al eliminar al usuario");

					store.dispatch(rollbackUserDelete(userToRemove));
				}
				console.log(err);
			});
	}
	next(action);
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, asynWhitDataBaseMiddleware],
});
