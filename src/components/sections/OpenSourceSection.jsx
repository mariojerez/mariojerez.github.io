import { useCSV, parseList } from '../../utils/csvLoader.js';

export default function OpenSourceSection() {
  const { data, loading } = useCSV('opensource.csv');

  return (
    <section id="opensource">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Open Source</h2>
          <p className="section-subtitle">Contributions to open source projects</p>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="os-list">
            {data.map(item => {
              const highlights = parseList(item.highlights);
              return (
                <div className="os-card" key={item.id}>
                  <div className="os-card-top">
                    <div className="os-card-info">
                      <div className="os-project">{item.project}</div>
                      <h3 className="os-title">{item.title}</h3>
                      <p className="os-desc">{item.description}</p>
                    </div>
                    <span className="os-year">{item.year}</span>
                  </div>
                  {highlights.length > 0 && (
                    <ul className="os-highlights">
                      {highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  )}
                  {item.url && (
                    <a
                      className="os-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
