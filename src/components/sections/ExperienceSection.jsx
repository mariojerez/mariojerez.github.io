import { useCSV, parseList } from '../../utils/csvLoader.js';
import { sortByDateDesc } from '../../utils/dateUtils.js';
import TimelineEntry from '../ui/TimelineEntry.jsx';

function toEntry(row) {
  return {
    id:         row.id,
    title:      row.title,
    subtitle:   row.organization,
    location:   row.location,
    start_date: row.start_date,
    end_date:   row.end_date,
    short_desc: row.short_desc,
    highlights: parseList(row.highlights),
    tags:       [],
    link:       '',
  };
}

export default function ExperienceSection() {
  const { data: workData, loading: workLoading }     = useCSV('experience.csv');
  const { data: teachData, loading: teachLoading }   = useCSV('teaching.csv');

  const loading = workLoading || teachLoading;

  const workEntries  = sortByDateDesc(workData.map(toEntry));
  const teachEntries = sortByDateDesc(teachData.map(toEntry));

  return (
    <section id="experience">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            {[...Array(4)].map((_, i) => <div key={i} className="loading-bar" />)}
          </div>
        ) : (
          <div className="timeline">
            <p className="tl-group-label">Professional</p>
            {workEntries.map(e => <TimelineEntry key={`w-${e.id}`} entry={e} />)}

            <p className="tl-group-label">Teaching</p>
            {teachEntries.map(e => <TimelineEntry key={`t-${e.id}`} entry={e} />)}
          </div>
        )}
      </div>
    </section>
  );
}
