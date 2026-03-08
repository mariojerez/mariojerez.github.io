export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">About</h2>
        </div>
        <p className="about-bio">
          I am a PhD student in Computer Science and swarm robotics researcher at the
          University of Minnesota with a background in software development. My research
          is driven by a core question: how can many simple
          agents, each with access to only local information, efficiently and dependably collaborate to
          perform complex tasks? Inspired by the emergent strategies of
          ants, bees, and other social insects, I design algorithms that enable multi-robot
          systems to exhibit complex behaviors such as shepherding, foraging, or building.
        </p>
        <br />
        <p className="about-bio">
          Before my PhD, I worked as a developer at{' '}
          <a href="https://www.fastenterprises.com/" target="_blank" rel="noopener noreferrer">
            FAST Enterprises
          </a>{' '}
          and{' '}
          <a href="https://www.avolutionsoftware.com/" target="_blank" rel="noopener noreferrer">
            Avolution Inc.
          </a>
          , building tax software and enterprise architecture tools respectively. I hold a BA from
          Sarah Lawrence College where my concentrations were Computer Science, Mathematics, and Physics.
        </p>
      </div>
    </section>
  );
}
