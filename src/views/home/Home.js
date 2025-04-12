import React from 'react';
import { Container, Card } from 'reactstrap';

function Index() {
	return (
		<Container className='w-[1510px] h-[850px] relative'>
			<h1 className='text-[40px] text-[#FCA311] absolute -top-16 font-extrabold'>Home</h1>
			<Card className='bg-[#14213D] w-full h-full rounded-xl border-2 border-[#FCA311] flex flex-row justify-between'>
				<div className='flex flex-col gap-[19px] ml-32 my-auto'>
					<h1 className='text-[48px] text-stone-100 font-semibold'>Michael Kirby Rivera</h1>
					<div className='border-2 border-[#FCA311] z-0 w-[400px]'></div>
					<div className='flex flex-col'>
						<a className='font-medium text-[24px] text-stone-100 mb-[34px]' href='mailto:email@address.com'>michaelkirbyrivera492@gmail.com</a>
						<a className='font-medium text-[24px] text-[#FCA311]' href='tel:+635552368'>(+63) 123-1234-1234</a>
					</div>
				</div>
				<div className='my-auto mr-32'>
					<div className='w-[450px] h-[450px] bg-[#FCA311] grid place-content-center rounded-full'>
						<div className='w-[420px] h-[420px] bg-stone-100 grid place-content-center rounded-full'>
							<img className='w-[389px] h-[389px]' src='https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Portfolio/52767_23917.png' alt='avatar' />
						</div>
					</div>
				</div>
			</Card>
		</Container>
	);
}

export default Index;
