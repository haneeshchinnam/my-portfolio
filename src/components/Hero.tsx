
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="text-black">Hi, I'm [Your Name]</h1>
        <h2>Full Stack Developer</h2>
        <p>
          I create amazing web applications using React and modern technologies.
          Let's build something great together!
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn primary">View My Work</a>
          <a href="mailto:your.email@example.com" className="btn secondary">
            Contact Me
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src="/profile-photo.jpg" alt="Profile" />
      </div>
    </section>
  )
}

export default Hero