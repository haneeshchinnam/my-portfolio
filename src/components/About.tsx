
const About = () => {
  return (
    <section id="about" className="about" data-testid="about-section">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with experience in 
              React, Node.js, and modern web technologies. I enjoy 
              creating user-friendly applications that solve real-world problems.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or sharing knowledge 
              with the developer community.
            </p>
          </div>
          <div className="about-skills">
            <h3>Core Technologies</h3>
            <ul>
              <li>React.js & Redux</li>
              <li>JavaScript (ES6+)</li>
              <li>Node.js & Express</li>
              <li>MongoDB & PostgreSQL</li>
              <li>HTML5 & CSS3</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
