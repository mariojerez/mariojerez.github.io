import AvatarOrbit from '../ui/AvatarOrbit.jsx';

const SCHOLAR_URL = 'https://scholar.google.com/citations?user=tDNRp-YAAAAJ&hl=en&oi=sra';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">PhD Student · Swarm Intelligence Researcher</p>

          <h1 className="hero-name">Mario Jerez</h1>

          <p className="hero-subtitle">
            Computer Science · University of Minnesota
          </p>

          <p className="hero-bio">
            I am a PhD student researching swarm robotics, advised by{' '}
            <a href="https://nextgenai.umn.edu/team" target="_blank" rel="noopener noreferrer">
              Dr. Maria Gini
            </a>
            . Inspired by the behaviors that emerge out of local interactions in biological,
            complex systems such as ant and termite colonies, I design robotic systems where
            agents cooperate in a decentralized manner to accomplish complex tasks.
          </p>

          <div className="hero-social">
            <a href="https://github.com/mariojerez" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/mario-jerez/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
              Google Scholar
            </a>
            <a href="mailto:jerez005@umn.edu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              jerez005@umn.edu
            </a>
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-avatar-wrap">
            <AvatarOrbit />
            <img
              src="/avatar.jpg"
              alt="Mario Jerez"
              className="hero-avatar-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
