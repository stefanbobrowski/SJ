import React from 'react';

import './About.scss';
import dennBoca from '../../assets/dennboca.png';
import logo from '../../assets/logo.png';

function About() {
	return (
		<div className="page about">
			<div className="about-container">
				<h2>Susie Jetta Make Up and Photography</h2>
				<p>
					<i>
						&#8195;&#8195;&#8195;&#8195;Susie Jetta Geisen is a Connecticut born, Delray Beach,
						Florida based lifestyle, portrait, studio, family, event, and wedding photographer who
						strives to capture people&rsquo;s most beautiful and authentic selves.
					</i>
				</p>
				<p>
					&#8195;&#8195;&#8195;&#8195;I love working with all kinds of people. I work with small
					businesses, big businesses, older generations and newer generations, photogenic people,
					families, the list goes on; but the ones I enjoy the most are the people not so familiar
					with being in front of the camera. Nothing is more rewarding than seeing someone start out
					timid and anxious, and by the end of the shoot they are guffawing and having so much fun—
					in their most natural and beautiful state.
				</p>
				<p>
					&#8195;&#8195;&#8195;&#8195;Most of my clients have never &#40;willingly&#x29; taken
					photos before and don&rsquo;t realize how photogenic they can be. I take extreme pride in
					being the first person to capture the pure potential most people don&rsquo;t know they
					have. Whether they&rsquo;re experienced or a complete novice in front of the lens, my main
					goal is to make them comfortable, show them how to pose in a way that is most flattering
					and effortless to their bodies, and most importantly share laughs and create memories
					along the way.
				</p>
				<div className="denn-boca-logo">
					<img src={dennBoca} alt="The Denn Boca" />
				</div>
				<p>
					&#8195;&#8195;&#8195;&#8195;After 15+ years of getting paid for photography, I am
					unbelievably grateful to now have a home base: The Denn Boca. Established in June 2023,
					the studio has been a pipe dream of mine since I was little. After being on the road and
					subjected to unknown factors for years, I can now identify as a true professional, having
					a space to purely create and peacefully produce the quality images, content, and events
					that my heart has longed for all this time. Located in East Boca, I have a full hair and
					make up station and 1000 square feet of space to help whatever vision you have come to
					life.
				</p>
				<div className="logo-container">
					<img src={logo} alt="Susie Jetta" />
				</div>
			</div>
		</div>
	);
}

export default About;
