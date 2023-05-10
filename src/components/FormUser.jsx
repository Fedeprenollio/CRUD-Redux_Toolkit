import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/store";
import { useUsersActions } from "../hooks/useUserAction";

export const FormUser = ({ idUserToUpdate, isUpdating, setIsUpdating }) => {
	const { addUser, handleUpdateUser } = useUsersActions();
	const [result, setResult] = useState(null);
	const [userToUpdate, setUserToUpdate] = useState({});
	const users = useAppSelector((state) => state.users);

	useEffect(() => {
		if (idUserToUpdate && isUpdating) {
			const user = users.find((user) => user.id === idUserToUpdate);
			setUserToUpdate(user);
			setIsUpdating(true);
		}
		return () => {
			setUserToUpdate(null);
			// setIsUpdating(false);
		};
	}, [idUserToUpdate, isUpdating]);

	function finishTimeBadge(time) {
		setTimeout(() => {
			setResult(false);
		}, time);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const name = formData.get("name");
		const email = formData.get("email");
		const github = formData.get("github");

		if (!name || !email || !github) {
			setResult("ko");
			finishTimeBadge(2500);
			return;
		} else {
			if (idUserToUpdate) {
				const updatedUser = { id: idUserToUpdate, name, email, github };
				handleUpdateUser(updatedUser);
				setIsUpdating(false);
				setResult("updateOk");

				finishTimeBadge(1500);
			} else {
				addUser({ name, email, github });
				setResult("ok");
				finishTimeBadge(1500);
			}
			form.reset();
		}

		// const form = event.target;
		// const formData = new FormData(form);

		// const name = formData.get("name");
		// const email = formData.get("email");
		// const github = formData.get("github");
		// addUser({ name, email, github });
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>{isUpdating ? "Editar" : "Crear"} usuario</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput
					defaultValue={isUpdating ? userToUpdate?.name : ""}
					name="name"
					placeholder="Aquí el nombre"
				/>
				<TextInput
					defaultValue={isUpdating ? userToUpdate?.email : ""}
					name="email"
					placeholder="Aquí el email"
				/>
				<TextInput
					defaultValue={isUpdating ? userToUpdate?.github : ""}
					name="github"
					placeholder="Aquí el usuario de GitHub"
				/>

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						{isUpdating ? "Actualizar usuario " : "Crear usuario"}
					</Button>
					{isUpdating ? (
						<Button
							color="red"
							style={{ marginLeft: "16px" }}
							onClick={() => {
								setUserToUpdate(null);
								setIsUpdating(false);
							}}
						>
							Cancelar
						</Button>
					) : null}
					<span>
						{result === "updateOk" && (
							<Badge color="green">Actualizado correctamente</Badge>
						)}
						{result === "ok" && (
							<Badge color="green">Guardado correctamente</Badge>
						)}
						{result === "ko" && (
							<Badge color="red">
								Algun campo incompleto. Todos son obligatorios.
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
};
