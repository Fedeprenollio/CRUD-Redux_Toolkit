import { useState } from "react";
import { Toaster } from "sonner";
import "./App.css";
import { FormUser } from "./components/FormUser";
import ListOfUsers from "./components/ListOfUsers";
function App() {
	const [idUserToUpdate, setIdUserToUpdate] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	const handleClickToUpdate = (e) => {
		setIdUserToUpdate(e);
		setIsUpdating(true);
	};

	return (
		<>
			<ListOfUsers
				handleClickToUpdate={handleClickToUpdate}
				isUpdating={isUpdating}
			/>
			<FormUser
				idUserToUpdate={idUserToUpdate}
				isUpdating={isUpdating}
				setIsUpdating={setIsUpdating}
			/>
			<Toaster richColors />
		</>
	);
}

export default App;
