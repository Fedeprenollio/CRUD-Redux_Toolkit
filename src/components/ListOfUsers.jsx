import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useAppSelector } from "../hooks/store";
import { useUsersActions } from "../hooks/useUserAction";
import { DeleteIcon, EditIcon } from "./Icons";

export default function ListOfUsers({ handleClickToUpdate, isUpdating }) {
	const users = useAppSelector((state) => state.users);
	const { handleRemoveUser } = useUsersActions();

	return (
		<Card>
			<Title>
				Usuarios
				<Badge style={{ marginLeft: "10px" }}>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell> id </TableHeaderCell>
						<TableHeaderCell> Name </TableHeaderCell>
						<TableHeaderCell> Email </TableHeaderCell>
						<TableHeaderCell> Acciones </TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((item) => (
						<TableRow key={item.name}>
							<TableCell
							// style={{ textOverflow: "ellipsis", overflow: "hidden" }}
							>
								{item.id}
							</TableCell>
							<TableCell
								style={{
									display: "flex",

									alignItems: "center",
									gap: "10px ",
								}}
							>
								<img
									style={{ height: "32px", width: "32px", borderRadius: "50%" }}
									src={`https://unavatar.io/github/${item.github}`}
									alt={`Este es el avatar de la cuenta de hithub de ${item.name}`}
								/>
								{item.name}
							</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>
								<button onClick={() => handleClickToUpdate(item.id)}>
									<EditIcon />
								</button>
								<button
									title={
										isUpdating && 'No puedes eliminar en modo "Actualizar"'
									}
									className={isUpdating && "button-disabled"}
									disabled={isUpdating}
									onClick={() => handleRemoveUser(item.id)}
								>
									<DeleteIcon />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

// handleUpdateUser({
// 	id: item.id,
// 	name: item.name,
// 	email: item.email,
// 	github: item.github,
// })
