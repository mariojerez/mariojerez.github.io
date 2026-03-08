import { useState } from 'react';
import { formatDateRange, formatYear } from '../../utils/dateUtils.js';
import Tag from './Tag.jsx';

export default function TimelineEntry({ entry }) {
  const [open, setOpen] = useState(false);
  const {
    title, subtitle, location, start_date, end_date,
    short_desc, highlights = [], tags = [], link,
  } = entry;

  const endYear   = formatYear(end_date);
  const startYear = formatYear(start_date);
  const showBoth  = endYear !== startYear;

  function toggle(e) {
    e.stopPropagation();
    setOpen(o => !o);
  }

  return (
    <div className="timeline-entry">
      <div className="tl-date">
        <span className="d-end">{endYear}</span>
        {showBoth && <span className="d-start">{startYear}</span>}
      </div>

      <div className="tl-marker">
        <div className="tl-dot" />
      </div>

      <div className="tl-content">
        <div className={`tl-card${open ? ' open' : ''}`} onClick={toggle}>
          <div className="tl-card-header">
            <div className="tl-card-info">
              <h3 className="tl-card-title">{title}</h3>
              <p className="tl-card-sub">
                {subtitle}{location ? ` · ${location}` : ''}
              </p>
              <p className="tl-card-dates">{formatDateRange(start_date, end_date)}</p>
              {short_desc && <p className="tl-card-desc">{short_desc}</p>}
            </div>
            <button className="tl-toggle" aria-label={open ? 'Collapse' : 'Expand'} onClick={toggle}>
              {open ? '−' : '+'}
            </button>
          </div>

          {open && (
            <div className="tl-details">
              {highlights.length > 0 && (
                <ul>
                  {highlights.map((h, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: h }} />
                  ))}
                </ul>
              )}
              {tags.length > 0 && (
                <div className="tl-tags">
                  {tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tl-link"
                  onClick={e => e.stopPropagation()}
                >
                  View Project →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
