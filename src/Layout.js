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
						width: 100%;
						height: 100vh;
						display: flex;
						flex-direction: column;
						overflow: hidden;
					}
				`}
			</style>
		</div>
	);
}

export default Layout;
