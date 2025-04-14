import React from 'react';
import { Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import { UserRoundPlus, ChevronRight, ChevronLeft, Pencil, Trash2 } from 'lucide-react'
import { getAllUsers, createUser, getNowUser, editUser, deleteUser } from 'controllers/userController';
import Error from 'components/Error';
import Modal from '../../components/Modal'
import { debounce } from "lodash";
import ModalContent from 'components/ModalContent';

const EMAIL_REGEX = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const NAME_REGEX = /^(?:[A-Za-z]+(?:[ \'-][A-Za-z]+)*)+(?: [A-Za-z]+(?:[ \'-][A-Za-z]+)*)*$/

function Index() {
	const [users, setUsers] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [isDisable, setIsDisable] = useState(false)
	const [showModal, setShowModal] = useState(false);
	const [currModal, setCurrModal] = useState("")
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [userID, setUserID] = useState();
	const [avatar, setAvatar] = useState("");
	const [error, setError] = useState("")
	const [fatalError, setFatalError] = useState("")
	const [success, setSuccess] = useState("")

	const rowsPerPage = 10;

	const handleModalDisplay = (curr) => {
		setShowModal(prevShow => !prevShow);
		setCurrModal(curr)
		setFirstName("");
		setLastName("");
		setEmail("");
		setError("")
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

		const nFirstName = NAME_REGEX.test(firstName)
		const nLastName = NAME_REGEX.test(lastName);
		const nEmail = EMAIL_REGEX.test(email);

		if (!firstName || !lastName || !email) return setError("Missing Details")

		if (!nEmail) return setError("Invalid Email");
		if (!nFirstName) return setError("Invalid First name");
		if (!nLastName) return setError("Invalid Last name");

		setIsDisable(true)

		const userData = {
			id: Math.max(...arrayIds) + 1,
			first_name: firstName,
			last_name: lastName,
			email: email,
			avatar: "https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Portfolio/OIP.jpg"
		};

		try {
			const addedUser = await createUser(userData);

			setUsers((prevUsers) => [...prevUsers, addedUser]);

			setSuccess("User created successfully.")
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

		if (!firstName || !lastName || !email) return setError("Missing Details")

		if (!nEmail) return setError("Invalid Email")

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

			setSuccess("User edited successfully.")
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

			setSuccess("User deleted successfully.")
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
			setFatalError(`Opps! Cannot found User ID. ${id}`)
			handleModalDisplay()
		}
	}

	const viewProfile = (id, fn, ln, email, av) => {
		setFirstName(fn)
		setLastName(ln)
		setEmail(email)
		setUserID(id)
		setAvatar(av)
	}

	if (success) {
		setTimeout(() => {
			setSuccess("")
		}, 5000)
	}

	return (
		<>
			<Modal title={currModal} show={showModal} onClose={() => handleModalDisplay()}>
				<ModalContent current={currModal} uID={userID} fName={firstName} lName={lastName} uEmail={email} disable={isDisable} onClick={currModal === "ADD USER" ? () => addUser() : currModal === "EDIT USER" ? () => editCurUser() : () => deleteCurUser()} fnChange={(e) => setFirstName(e.target.value)} lnChange={(e) => setLastName(e.target.value)} eChange={(e) => setEmail(e.target.value)} modalDisplay={handleModalDisplay} uAvatar={avatar} />
			</Modal>

			<Error state={error} onClick={() => setError()} top={"top-[55%]"} />

			<Error state={fatalError} onClick={() => setFatalError()} top={"top-4"} />

			<Container className='max-h-[100vh] absolute left-[15%] top-[10%] mx-10'>
				<div className='bg-[#E5E5E5] rounded-t-[13px]'>
					<div className='py-3 ml-5 flex justify-between items-center w-full'>
						<button className='px-3 py-2 bg-[#FCA311] font-regular rounded-md flex justify-between align-center' onClick={() => handleModalDisplay("ADD USER")} color='primary'>
							<UserRoundPlus className='mr-3' />Add User
						</button>
						<div className={success ? 'mr-5 opacity-100 duration-150' : 'mr-5 opacity-0 duration-300'}>
							<p className={success ? 'font-medium text-green-500 text-2xl' : 'opacity-0 scale-0 duration-300'}>{success}</p>
						</div>
					</div>
				</div>

				<table className="w-full min-w-max table-auto text-left">
					<thead className='bg-[#FCA311]'>
						<tr>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">ID</th>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">Avatar</th>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">Email</th>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">First Name</th>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">Last Name</th>
							<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">Action</th>
						</tr>
					</thead>

					<tbody>
						{
							paginatedUsers?.map(user => {
								return (
									<tr className='hover:bg-stone-900/50 duration-150' key={user.id}>
										<th className="p-2 border-b border-blue-gray-50 text-stone-100 text-center">{user.id}</th>
										<td className="p-2 border-b border-blue-gray-50 text-stone-100">
											<img src={user.avatar} alt='user-avatar' className="inline-block relative object-center rounded-full w-12 h-12 border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1 left-1/2 -translate-x-1/2" />
										</td>
										<td onClick={() => {
											handleModalDisplay("USER PROFILE")
											viewProfile(user.id, user.first_name, user.last_name, user.email, user.avatar)
										}} className="p-2 border-b border-blue-gray-50 text-stone-100 text-center cursor-pointer">{user.email}</td>
										<td className="p-2 border-b border-blue-gray-50 text-stone-100 text-center">{user.first_name}</td>
										<td className="p-2 border-b border-blue-gray-50 text-stone-100 text-center">{user.last_name}</td>
										<td className="p-2 border-b border-blue-gray-50 text-stone-100 flex justify-center gap-4 relative top-[11.5px]">
											<Pencil size={25} className='mb-[12px] hover:bg-stone-500/75 duration-150 rounded cursor-pointer' color='#FCA311' onClick={
												() => {
													handleModalDisplay("EDIT USER")
													getUserId(user.id, user.first_name, user.last_name, user.email, user.avatar)
												}
											}>
												Edit
											</Pencil>
											<Trash2 size={25} className='mb-[12px] hover:bg-stone-500/75 duration-150 rounded cursor-pointer' onClick={
												() => {
													handleModalDisplay()
													getUserId(user.id, user.first_name, user.last_name, user.email, user.avatar)
												}
											}>
												Delete
											</Trash2>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>

				<div className="flex justify-center absolute p-1 left-1/2 -translate-x-1/2 -bottom-10">
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
			</Container>
		</>
	);
}

export default Index;
