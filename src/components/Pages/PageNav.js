import { Link } from 'react-router-dom';
import {
	Nav,
	NavItem,
} from 'reactstrap';
import { House, SquareUser } from 'lucide-react'

function PageNav() {
	return (
		<Nav vertical className='bg-[#E5E5E5] z-10 h-[100vh] absolute flex flex-col justify-between'>
			<div className='px-2 pt-2'>
				<h1 className='font-black text-xs break-words'>
					User
				</h1>
				<h1 className='font-black text-xs break-words'>
					Management
				</h1>
				<h1 className='font-black text-xs break-words mb-3'>
					System
				</h1>
				<hr className='border-4' />
			</div>
			<div className='flex flex-col gap-16'>
				<NavItem>
					<Link className='font-bold text-stone-100 mx-auto' tag={Link} to='/'>
						<House size={50} color='#929292' className='mx-auto' />
					</Link>
				</NavItem>
				<NavItem>
					<Link className='text-stone-100 mx-auto' to='/users'>
						<SquareUser size={50} color='#929292' className='mx-auto' />
					</Link>
				</NavItem>
			</div>
			<hr className='border-4 mx-2 pb-20'/>
		</Nav>
	);
}

export default PageNav;
