import React from 'react';

function Layout(props) {
	return (
		<div className="page-layout">
			{props.children}
			<style jsx global>{`
				body {
					margin: 0;
					padding: 0;
					background-color: #ff9999;
				}
			`}</style>
			<style jsx>
				{`
					div {
						height: 100vh;
						width: 100%;
						display: flex;
					}
				`}
			</style>
		</div>
	);
}

export default Layout;
