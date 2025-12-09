import React from 'react'

function PageLoader({ isLoading }) {
	return (
		<div className={`page-loader ${!isLoading ? 'hidden' : ''}`}>
			<div className='loader-logo'>AURELIO</div>
			<div className='loader-progress'>
				<div className='loader-progress-bar'></div>
			</div>
		</div>
	)
}

export default PageLoader
