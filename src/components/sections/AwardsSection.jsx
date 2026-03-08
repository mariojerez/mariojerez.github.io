import { useCSV } from '../../utils/csvLoader.js';

export default function AwardsSection() {
  const { data, loading } = useCSV('awards.csv');

  const sorted = [...data].sort((a, b) => b.year - a.year);

  return (
    <section id="awards">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Awards</h2>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="awards-list">
            {sorted.map(award => (
              <div className="award-card" key={award.id}>
                <span className="award-year">{award.year}</span>
                <div>
                  <p className="award-title">
                    {award.url ? (
                      <a href={award.url} target="_blank" rel="noopener noreferrer">
                        {award.title}
                      </a>
                    ) : award.title}
                  </p>
                  <p className="award-desc">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
