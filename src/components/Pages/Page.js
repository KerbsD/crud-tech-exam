import React from 'react';
import PageMain from './PageMain';
import PageNav from './PageNav';

function Page(props) {
	const {children} = props;

	return (
		<div>
			<PageNav />
			<PageMain>{children}</PageMain>
			{/* <PageFooter /> */}
		</div>
	);
}

export default Page;
