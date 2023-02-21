import React from 'react';

import './About.scss';

import logo from '../../assets/logo.png';

function About() {
	return (
		<div className="page about">
			<div className="about-container">
				<h2>Susie Jetta Make Up and Photography</h2>
				<p>
					<i>
						&#8195;&#8195;Susie Jetta is a Connecticut born, Delray Beach, Florida based lifestyle,
						portrait, fitness, event, and wedding photographer who aims to capture human&apos;s most
						beautiful and authentic selves.
					</i>
				</p>
				<p>
					&#8195;&#8195;I am here to make you feel comfortable, show you how to pose in a way that
					is most flattering and effortless to you, and possibly make you ugly laugh. Most of my
					clients have never (willingly) stepped in front of a camera, and don&apos;t realize how
					photogenic they can be. I take extreme pride in being the first person to capture the pure
					potential most people don&apos;t realize they have. Give me the posed and form-perfect,
					give me the raw and relatable, and anything and all in between.
				</p>
				<div className="logo-container">
					<img src={logo} alt="Susie Jetta" />
				</div>
			</div>
		</div>
	);
}

export default About;
