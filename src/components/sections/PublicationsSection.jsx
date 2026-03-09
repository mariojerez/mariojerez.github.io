import { useCSV } from '../../utils/csvLoader.js';
import { formatDate } from '../../utils/dateUtils.js';

function highlightAuthor(authors, name = 'M. Jerez') {
  return authors.split(',').map((a, i, arr) => {
    const trimmed = a.trim();
    const isMe = trimmed === name;
    return (
      <span key={i}>
        {isMe ? <strong style={{ color: 'var(--pink)', fontWeight: 700 }}>{trimmed}</strong> : trimmed}
        {i < arr.length - 1 ? ', ' : ''}
      </span>
    );
  });
}

export default function PublicationsSection() {
  const { data, loading } = useCSV('publications.csv');

  const sorted = [...data].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="publications">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Publications</h2>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="pub-list">
            {sorted.map(pub => (
              <div className="pub-card" key={pub.id}>
                <div className="pub-card-top">
                  <div>
                    <p className="pub-title">{pub.title}</p>
                    <p className="pub-authors">{highlightAuthor(pub.authors)}</p>
                  </div>
                  <span className={`pub-badge ${pub.type}`}>{pub.type}</span>
                </div>
                <div className="pub-meta">
                  <span className="pub-venue">{pub.venue}</span>
                  <span className="pub-date">{formatDate(pub.date)}</span>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="pub-link">
                      PDF / DOI ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
