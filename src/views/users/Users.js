import React from 'react';
import { Container, Table, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { getAllUsers, createUser, getNowUser, editUser, deleteUser } from 'controllers/userController';
import Modal from '../../components/Modal'

function Index() {
	const [users, setUsers] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 10;
	const [showModal, setShowModal] = useState(false);
	const [currModal, setCurrModal] = useState("")
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [userID, setUserID] = useState();
	const [avatar, setAvatar] = useState("");

	const handleModalDisplay = (curr) => {
		setShowModal(prevShow => !prevShow);
		setCurrModal(curr)
		setFirstName("");
		setLastName("");
		setEmail("");
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const fetchedUsers = await getAllUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};
		fetchUsers();
	}, []);

	const totalPages = Math.ceil(users?.length / rowsPerPage);

	const paginatedUsers = users?.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const addUser = async (e) => {
		e.preventDefault();

		const arrayIds = users.map(user => user.id)

		const userData = {
			id: Math.max(...arrayIds) + 1,
			first_name: firstName,
			last_name: lastName,
			email: email,
			avatar: ""
		};

		try {
			const addedUser = await createUser(userData);
			console.log(addedUser);

			setUsers((prevUsers) => [...prevUsers, addedUser]);

			setFirstName("");
			setLastName("");
			setEmail("");
			setUserID();
			handleModalDisplay();
		} catch (err) {
			console.error('Error adding user:', err);
		}
	}

	const editCurUser = async (e) => {
		e.preventDefault();

		const newUserData = {
			id: userID,
			first_name: firstName,
			last_name: lastName,
			email: email,
			avatar: avatar
		};

		try {
			const editedUser = await editUser(userID, newUserData);
			console.log(editedUser);	

			setUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === userID ? newUserData : user))
			);

			setFirstName("");
			setLastName("");
			setEmail("");
			handleModalDisplay();
		} catch (err) {
			console.error('Error adding user:', err);
		}
	}

	const deleteCurUser = async (e) => {
		e.preventDefault()

		try {
			const deletedUser = await deleteUser(userID);
			console.log(deletedUser)

			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));

			setFirstName("")
			setLastName("")
			setEmail("")
			setUserID("")
			setAvatar("")
			handleModalDisplay();
		} catch (err) {
			console.error('Error getting user:', err);
		}
	}

	const getUserId = async (id, fn, ln, email, av) => {
		try {
			const userId = await getNowUser(id);

			setFirstName(fn)
			setLastName(ln)
			setEmail(email)
			setUserID(userId.id)
			setAvatar(av)
		} catch (err) {
			console.error('Error getting user:', err);
		}
	}

	return (
		<Container>
			<div>
				<Button onClick={() => handleModalDisplay("add")} color='primary'>+ Add User</Button>
			</div>

			<Modal show={showModal} onClose={() => handleModalDisplay()}>
				{currModal === "add" ?
					<form onSubmit={addUser} className=''>
						<label htmlFor='first-name'>First Name:</label>
						<input id='first-name' type='text' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						<label htmlFor='last-name'>Last Name:</label>
						<input id='last-name' type='text' required value={lastName} onChange={(e) => setLastName(e.target.value)} />
						<label htmlFor='email'>Email:</label>
						<input id='email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
						<Button color='primary'>Add User</Button>
						<Button onClick={handleModalDisplay}>Cancel</Button>
					</form>
					:
					currModal === "edit" ? <form onSubmit={editCurUser} className=''>
						<label htmlFor='first-name'>First Name:</label>
						<input id='first-name' type='text' placeholder={firstName} required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						<label htmlFor='last-name'>Last Name:</label>
						<input id='last-name' type='text' placeholder={lastName} required value={lastName} onChange={(e) => setLastName(e.target.value)} />
						<label htmlFor='email'>Email:</label>
						<input id='email' type='email' placeholder={email} required value={email} onChange={(e) => setEmail(e.target.value)} />
						<Button color='primary'>Edit</Button>
						<Button onClick={handleModalDisplay}>Cancel</Button>
					</form>
						:
						<form onSubmit={deleteCurUser} className=''>
							<h2>Are you sure you want to delete this user?</h2>
							<p>ID: {userID}</p>
							<p>First Name: {firstName}</p>
							<p>Last Name: {lastName}</p>
							<p>Email: {email}</p>
							<Button color='primary'>Delete</Button>
							<Button onClick={handleModalDisplay}>Cancel</Button>
						</form>
				}
			</Modal>

			<Table className='mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Avatar</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{
						paginatedUsers?.map(user => {
							return (
								<tr key={user.email}>
									<th scope='row'>{user.id}</th>
									<td>
										<img src={user.avatar} alt='user-avatar' />
									</td>
									<td>{user.email}</td>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>
										<Button onClick={
											() => {
												handleModalDisplay("edit")
												getUserId(user.id, user.first_name, user.last_name, user.email, user.avatar)
											}
										}>
											Edit
										</Button>
										<Button onClick={
											() => {
												handleModalDisplay()
												getUserId(user.id, user.first_name, user.last_name, user.email, user.avatar)
											}
										}>Delete</Button>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>

			<div className="pagination">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</Container>
	);
}

export default Index;
