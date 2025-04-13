import React from 'react';
import { Container, Table, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { UserRoundPlus, UserRoundX, ChevronRight, ChevronLeft } from 'lucide-react'
import { getAllUsers, createUser, getNowUser, editUser, deleteUser } from 'controllers/userController';
import Modal from '../../components/Modal'
import { debounce } from "lodash";
const EMAIL_REGEX = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

function Index() {
	const [users, setUsers] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [isDisable, setIsDisable] = useState(false)
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

	const addUser = debounce(async () => {
		const arrayIds = users.map(user => user.id)

		const nEmail = EMAIL_REGEX.test(email);

		if (!firstName || !lastName || !nEmail) return console.log("Missing Details")

		const nFirstName = firstName.trim();
		const nLastName = lastName.trim();

		setIsDisable(true)

		const userData = {
			id: Math.max(...arrayIds) + 1,
			first_name: nFirstName,
			last_name: nLastName,
			email: email,
			avatar: "https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Portfolio/OIP.jpg"
		};

		try {
			const addedUser = await createUser(userData);

			setUsers((prevUsers) => [...prevUsers, addedUser]);

			setFirstName("");
			setLastName("");
			setEmail("");
			setUserID();
			handleModalDisplay();
			setIsDisable(false)
		} catch (err) {
			console.error('Error adding user:', err);
		}
	}, 1000)

	const editCurUser = debounce(async () => {

		const nEmail = EMAIL_REGEX.test(email);

		if (!firstName || !lastName || !nEmail) return console.log("Missing Details")

		if (users[userID - 1].first_name === firstName) return console.log("Invalid First name")
		if (users[userID - 1].last_name === lastName) return console.log("Invalid Last name")
		if (users[userID - 1].email === email) return console.log("Invalid email")

		const nFirstName = firstName.trim();
		const nLastName = lastName.trim();

		setIsDisable(true)

		const newUserData = {
			id: userID,
			first_name: nFirstName,
			last_name: nLastName,
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
			setIsDisable(false)
		} catch (err) {
			console.error('Error adding user:', err);
		}
	}, 1000)

	const deleteCurUser = debounce(async () => {
		setIsDisable(true)

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
			setIsDisable(false)
		} catch (err) {
			console.error('Error getting user:', err);
		}
	}, 1000)

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
		<>
			<Modal title={currModal} show={showModal} onClose={() => handleModalDisplay()}>
				{currModal === "ADD USER" ?
					<form>
						<div className='flex gap-[40px]'>
							<div className='flex flex-col'>
								<label htmlFor='first-name' className='font-bold text-xl mb-1'>First Name:</label>
								<input id='first-name' type='text' className='px-3 py-2 rounded-lg' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
							</div>
							<div className='flex flex-col'>
								<label htmlFor='last-name' className='font-bold text-xl mb-1'>Last Name:</label>
								<input id='last-name' type='text' className='px-3 py-2 rounded-lg' required value={lastName} onChange={(e) => setLastName(e.target.value)} />
							</div>
						</div>
						<div className='flex flex-col mt-9'>
							<label htmlFor='email' className='font-bold text-xl mb-1'>Email:</label>
							<input id='email' type='email' className='px-3 py-2 rounded-lg' required value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className='flex justify-center relative top-10 gap-3'>
							<Button disabled={isDisable} onClick={() => addUser()} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Add User</Button>
							<Button className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={handleModalDisplay}>Cancel</Button>
						</div>
					</form>
					:
					currModal === "EDIT USER" ? <form className=''>
						<div className='flex gap-[40px]'>
							<div className='flex flex-col'>
								<label htmlFor='first-name' className='font-bold text-xl mb-1'>First Name:</label>
								<input id='first-name' type='text' className='px-3 py-2 rounded-lg' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
							</div>
							<div className='flex flex-col'>
								<label htmlFor='last-name' className='font-bold text-xl mb-1'>Last Name:</label>
								<input id='last-name' type='text' className='px-3 py-2 rounded-lg' value={lastName} onChange={(e) => setLastName(e.target.value)} />
							</div>
						</div>
						<div className='flex flex-col mt-9'>
							<label htmlFor='email' className='font-bold text-xl mb-1'>Email:</label>
							<input id='email' type='email' className='px-3 py-2 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className='flex justify-center relative top-10 gap-3'>
							<Button disabled={isDisable} onClick={() => editCurUser()} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Edit User</Button>
							<Button className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={handleModalDisplay}>Cancel</Button>
						</div>
					</form>
						:
						<form>
							<div className='flex justify-center relative bottom-5'>
								<UserRoundX size={100} strokeWidth={1} color='#FCA311' />
							</div>
							<h2 className='font-medium text-xl mb-3'>Are you sure you want to delete this user?</h2>
							<div className='flex gap-4'>
								<div className='flex flex-col'>
									<p>ID: <b>{userID}</b></p>
									<p>First Name: <b>{firstName}</b></p>
								</div>
								<div className='flex flex-col'>
									<p>Email: <b>{email}</b></p>
									<p>Last Name: <b>{lastName}</b></p>
								</div>
							</div>
							<div className='flex justify-center relative top-10 gap-3'>
								<Button disabled={isDisable} onClick={() => deleteCurUser()} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Delete</Button>
								<Button className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={handleModalDisplay}>Cancel</Button>
							</div>
						</form>
				}
			</Modal>
			<Container className='max-h-[100vh] absolute left-[15%] top-[10%] mx-10'>
				<div className='bg-[#E5E5E5] rounded-t-[13px]'>
					<div className='py-3 ml-5'>
						<button className='px-3 py-2 bg-[#FCA311] font-regular rounded-md flex justify-between align-center' onClick={() => handleModalDisplay("ADD USER")} color='primary'>
							<UserRoundPlus className='mr-3' />Add User
						</button>
					</div>
				</div>


				<Table className='bg-[#FCA311]' hover borderless>
					<thead>
						<tr className="table-warning">
							<th className='text-center'>ID</th>
							<th className='text-center'>Avatar</th>
							<th className='text-center'>Email</th>
							<th className='text-center'>First Name</th>
							<th className='text-center'>Last Name</th>
							<th className='text-center'>Action</th>
						</tr>
					</thead>

					<tbody>
						{
							paginatedUsers?.map(user => {
								return (
									<tr key={user.email} className='table-primary'>
										<th className='text-center' scope='row'>{user.id}</th>
										<td className='flex justify-center'>
											<img src={user.avatar} alt='user-avatar' className='rounded-full w-10 h-10' />
										</td>
										<td className='text-center'>{user.email}</td>
										<td className='text-center'>{user.first_name}</td>
										<td className='text-center'>{user.last_name}</td>
										<td className='text-center'>
											<Button onClick={
												() => {
													handleModalDisplay("EDIT USER")
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

			</Container>
			<div className="flex justify-center absolute p-1 left-1/2 -translate-x-16 bottom-24">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className='text-stone-100 hover:bg-stone-400/75 rounded-full duration-150'
				>
					<ChevronLeft />
				</button>
				<span className='text-stone-100 w-[150px] text-center'>
					Page <b className='	text-[#FCA311]'>{currentPage}</b> of {totalPages}
				</span>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className='text-stone-100 hover:bg-stone-400/75 rounded-full duration-150'
				>
					<ChevronRight />
				</button>
			</div>
		</>
	);
}

export default Index;
