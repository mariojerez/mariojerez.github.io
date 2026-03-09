export default function ContactSection() {
  return (
    <section id="contact">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
        </div>
        <p className="contact-text">
          I am always open to discussing research collaborations, job opportunities,
          or anything related to swarm intelligence and multi-agent systems.
          Feel free to reach out!
        </p>
        <div className="contact-links">
          <a
            href="mailto:jerez005@umn.edu"
            className="btn btn-primary"
          >
            jerez005@umn.edu
          </a>
          <a
            href="https://www.linkedin.com/in/mario-jerez/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mariojerez"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
          <a
            href="https://scholar.google.com/citations?user=tDNRp-YAAAAJ&hl=en&oi=sra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Google Scholar
          </a>
        </div>
      </div>
    </section>
  );
}
