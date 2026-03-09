import { useState } from 'react';
import { useCSV } from '../../utils/csvLoader.js';

function termSortKey(term) {
  const [season, year] = term.split(' ');
  const order = { Spring: 0, Summer: 1, Fall: 2 };
  return parseInt(year) * 10 + (order[season] ?? 0);
}

function isImageUrl(url) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(url);
}

function CourseCard({ entry, showGrades }) {
  const [open, setOpen] = useState(false);
  const hasTwoEvals = entry.student_evaluation_s1 && entry.student_evaluation;
  const hasDetails = entry.project_desc || entry.project_media || entry.student_evaluation || entry.student_evaluation_s1;

  return (
    <div
      className={`cw-card${open ? ' open' : ''}`}
      onClick={() => hasDetails && setOpen(v => !v)}
      style={!hasDetails ? { cursor: 'default' } : undefined}
    >
      <div className="cw-card-header">
        <div className="cw-info">
          <div className="cw-title">{entry.course_name}</div>
          <div className="cw-sub">
            {entry.course_number ? `${entry.course_number} · ` : ''}{entry.program}
            {entry.professor_name && (
              <span className="cw-professor">
                {' · '}
                {entry.professor_url ? (
                  <a
                    href={entry.professor_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    {entry.professor_name}
                  </a>
                ) : (
                  entry.professor_name
                )}
              </span>
            )}
          </div>
          <div className="cw-badges">
            <span className="cw-term">{entry.term}</span>
            {showGrades && entry.grade && (
              <span className="cw-grade">{entry.grade}</span>
            )}
          </div>
        </div>
        {hasDetails && (
          <button
            className="tl-toggle"
            onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            {open ? '−' : '+'}
          </button>
        )}
      </div>

      {open && hasDetails && (
        <div className="cw-details">
          {entry.project_desc && (
            <div
              className="cw-project-desc"
              dangerouslySetInnerHTML={{ __html: entry.project_desc }}
            />
          )}
          {entry.project_media && (
            <div className="cw-media">
              {isImageUrl(entry.project_media) ? (
                <img src={entry.project_media} alt="Project media" />
              ) : (
                <a href={entry.project_media} target="_blank" rel="noopener noreferrer">
                  View project media
                </a>
              )}
            </div>
          )}
          {hasTwoEvals ? (
            <div className="cw-evaluations">
              <div className="cw-eval-block">
                <div className="cw-eval-label">Semester 1 — {entry.term_s1}</div>
                <div className="cw-evaluation">{entry.student_evaluation_s1}</div>
              </div>
              <div className="cw-eval-block">
                <div className="cw-eval-label">Semester 2 — {entry.term}</div>
                <div className="cw-evaluation">{entry.student_evaluation}</div>
              </div>
            </div>
          ) : entry.student_evaluation ? (
            <div className="cw-evaluation">{entry.student_evaluation}</div>
          ) : entry.student_evaluation_s1 ? (
            <div className="cw-evaluation">{entry.student_evaluation_s1}</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function CourseworkSection() {
  const { data, loading } = useCSV('coursework.csv');
  const [showGrades, setShowGrades] = useState(false);

  const sorted = [...data].sort((a, b) => termSortKey(b.term) - termSortKey(a.term));

  const umn = sorted.filter(e => e.institution === 'University of Minnesota');
  const slc = sorted.filter(e => e.institution === 'Sarah Lawrence College');

  return (
    <section id="coursework">
      <div className="section-inner">
        <div
          className="section-header"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
        >
          <h2 className="section-title">Coursework</h2>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.88rem', padding: '7px 16px', minHeight: 'unset' }}
            onClick={() => setShowGrades(v => !v)}
            aria-pressed={showGrades}
          >
            {showGrades ? 'Hide Grades' : 'Show Grades'}
          </button>
        </div>

        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="cw-list">
            {umn.length > 0 && (
              <>
                <div className="tl-group-label">University of Minnesota</div>
                {umn.map(entry => (
                  <CourseCard key={entry.id} entry={entry} showGrades={showGrades} />
                ))}
              </>
            )}
            {slc.length > 0 && (
              <>
                <div className="tl-group-label">Sarah Lawrence College</div>
                {slc.map(entry => (
                  <CourseCard key={entry.id} entry={entry} showGrades={showGrades} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
