import React from 'react';

const About: React.FC = () => (
  <div className="about-container" data-testid="about-page">
    <h2 className="about-title">About This The Rick and Morty API</h2>
    <div className="about-content">
      <p className="about-text">
        Wubba Lubba Dub Dub! This portal-powered API explorer was created by{' '}
        <span className="highlight">Thanatus666</span> as part of the RS School React course. Dive into the multiverse
        of Rick and Morty data, from characters to locations, with a touch of interdimensional flair!
      </p>
      <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer" className="btn about-btn">
        Visit RS School React Course
      </a>
    </div>
  </div>
);

export default About;
