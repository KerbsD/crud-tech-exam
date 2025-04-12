import styles from './PageMain.module.scss';
import React from 'react';

function PageMain(props) {
	const {children} = props;

	return (
		<main className='h-[100vh] grid place-content-center bg-[#14213D]'>
			{children}
		</main>
	);
}

export default PageMain;
