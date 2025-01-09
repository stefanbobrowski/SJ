import React from 'react';
import './Book.scss';

function Book() {
	return (
		<div className="page book">
			<h2>Book now</h2>
			<p>
				To book please email your full name, package{'('}s{')'} you&apos;re interested in,
				dates/times, email, and phone number to{' '}
				<a href="mailto:susiejetta@gmail.com">susiejetta@gmail.com</a>
			</p>
		</div>
	);
}

export default Book;
