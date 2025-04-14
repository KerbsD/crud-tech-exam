import { Button } from 'reactstrap';
import { UserRoundX } from 'lucide-react'

const ModalContent = ({ current, uID, fName, uAvatar, lName, uEmail, disable, onClick, fnChange, lnChange, eChange, modalDisplay }) => {

    return (current === "ADD USER" ?
        <form>
            <div className='flex gap-[40px]'>
                <div className='flex flex-col'>
                    <label htmlFor='first-name' className='font-bold text-xl mb-1'>First Name:</label>
                    <input id='first-name' type='text' className='px-3 py-2 rounded-lg' value={fName} onChange={fnChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='last-name' className='font-bold text-xl mb-1'>Last Name:</label>
                    <input id='last-name' type='text' className='px-3 py-2 rounded-lg' value={lName} onChange={lnChange} />
                </div>
            </div>
            <div className='flex flex-col mt-9'>
                <label htmlFor='email' className='font-bold text-xl mb-1'>Email:</label>
                <input id='email' type='email' className='px-3 py-2 rounded-lg' value={uEmail} onChange={eChange} />
            </div>
            <div className='flex justify-center relative top-10 gap-3'>
                <Button disabled={disable} onClick={onClick} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Add User</Button>
                <Button disabled={disable} className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={modalDisplay}>Cancel</Button>
            </div>
        </form>
        :
        current === "EDIT USER" ?
            <form className=''>
                <div className='flex gap-[40px]'>
                    <div className='flex flex-col'>
                        <label htmlFor='first-name' className='font-bold text-xl mb-1'>First Name:</label>
                        <input id='first-name' type='text' className='px-3 py-2 rounded-lg' value={fName} onChange={fnChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='last-name' className='font-bold text-xl mb-1'>Last Name:</label>
                        <input id='last-name' type='text' className='px-3 py-2 rounded-lg' value={lName} onChange={lnChange} />
                    </div>
                </div>
                <div className='flex flex-col mt-9'>
                    <label htmlFor='email' className='font-bold text-xl mb-1'>Email:</label>
                    <input id='email' type='email' className='px-3 py-2 rounded-lg' value={uEmail} onChange={eChange} />
                </div>
                <div className='flex justify-center relative top-10 gap-3'>
                    <Button disabled={disable} onClick={onClick} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Edit User</Button>
                    <Button disabled={disable} className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={modalDisplay}>Cancel</Button>
                </div>
            </form>
            : current === "USER PROFILE" ?
                <div>
                    <div className='flex justify-center p-4'>
                        <img src={uAvatar} alt='User Avatar' className="inline-block w-[140px] h-[140px] relative object-center rounded-full border p-1" />
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <p>ID: <b>{uID}</b></p>
                            <p>First Name: <b>{fName}</b></p>
                        </div>
                        <div className='flex flex-col'>
                            <p>Email: <b>{uEmail}</b></p>
                            <p>Last Name: <b>{lName}</b></p>
                        </div>
                    </div>
                    <div className='flex justify-center relative top-10 gap-3'>
                        <Button className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={modalDisplay}>Close</Button>
                    </div>
                </div>
                :
                <form>
                    <div className='flex justify-center relative bottom-5'>
                        <UserRoundX size={100} strokeWidth={1} color='#FCA311' />
                    </div>
                    <h2 className='font-medium text-xl mb-3 text-center'>Are you sure you want to delete this user?</h2>
                    <div className='flex gap-4'>
                        <img src={uAvatar} alt='user-avatar' className="rounded-full w-12 h-12 border" />
                        <div className='flex flex-col'>
                            <p>ID: <b>{uID}</b></p>
                            <p>First Name: <b>{fName}</b></p>
                        </div>
                        <div className='flex flex-col'>
                            <p>Email: <b>{uEmail}</b></p>
                            <p>Last Name: <b>{lName}</b></p>
                        </div>
                    </div>
                    <div className='flex justify-center relative top-10 gap-3'>
                        <Button disabled={disable} onClick={onClick} className='bg-[#FCA311] border-none text-[#14213D] hover:bg-[#ae7c2c]'>Delete</Button>
                        <Button disabled={disable} className='bg-[#14213D] border-none text-[#FCA311] hover:bg-[#0f1934]' onClick={modalDisplay}>Cancel</Button>
                    </div>
                </form>
    )
}

export default ModalContent