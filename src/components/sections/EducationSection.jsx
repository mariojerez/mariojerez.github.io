import { useState } from 'react';
import { useCSV } from '../../utils/csvLoader.js';
import { sortByDateDesc, formatDateRange, formatYear } from '../../utils/dateUtils.js';

export default function EducationSection() {
  const { data, loading } = useCSV('education.csv');
  const [showGPA, setShowGPA] = useState(false);

  const entries = sortByDateDesc(data);

  return (
    <section id="education">
      <div className="section-inner">
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <h2 className="section-title">Education</h2>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.88rem', padding: '7px 16px', minHeight: 'unset' }}
            onClick={() => setShowGPA(v => !v)}
            aria-pressed={showGPA}
          >
            {showGPA ? 'Hide GPA' : 'Show GPA'}
          </button>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="timeline">
            {entries.map(edu => {
              const endYear   = formatYear(edu.end_date);
              const startYear = formatYear(edu.start_date);
              const showBoth  = endYear !== startYear;

              return (
                <div className="timeline-entry" key={edu.id}>
                  <div className="tl-date">
                    <span className="d-end">{endYear}</span>
                    {showBoth && <span className="d-start">{startYear}</span>}
                  </div>
                  <div className="tl-marker"><div className="tl-dot" /></div>
                  <div className="tl-content">
                    <div className="tl-card" style={{ cursor: 'default' }}>
                      <div className="tl-card-header" style={{ paddingRight: '15px' }}>
                        <div className="tl-card-info">
                          <h3 className="tl-card-title">{edu.degree}</h3>
                          <p className="tl-card-sub">
                            {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                          </p>
                          <p className="tl-card-dates">
                            {formatDateRange(edu.start_date, edu.end_date)}
                          </p>
                          {edu.gpa && showGPA && <span className="edu-gpa">GPA {edu.gpa}</span>}
                          {edu.notes && (
                            <p
                              className="tl-card-desc"
                              style={{ marginTop: 6 }}
                              dangerouslySetInnerHTML={{ __html: edu.notes }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
