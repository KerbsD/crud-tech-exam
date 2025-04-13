import { NavLink } from 'react-router-dom';
import {
	Nav,
	NavItem,
} from 'reactstrap';
import { House, SquareUser } from 'lucide-react'

function PageNav() {
	return (
		<Nav vertical className='bg-[#E5E5E5] z-10 h-[100vh] absolute flex flex-col justify-between'>
			<div className='px-2 pt-2'>
				<h1 className='font-black text-xs break-words mb-3'>
					User <br /> Management <br /> System
				</h1>
				<hr className='border-4' />
			</div>
			<div className='flex flex-col gap-16'>
				<NavItem>
					<NavLink className='mx-auto' to='/' >
							<House size={50} color='#929292' className='mx-auto' />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink className='mx-auto' to='/users'>
						<SquareUser size={50} color='#929292' className='mx-auto' />
					</NavLink>
				</NavItem>
			</div>
			<hr className='border-4 mx-2 pb-20' />
		</Nav>
	);
}

export default PageNav;
