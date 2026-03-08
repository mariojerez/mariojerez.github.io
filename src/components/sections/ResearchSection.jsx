import { useCSV, parseList } from '../../utils/csvLoader.js';
import { sortByDateDesc } from '../../utils/dateUtils.js';
import TimelineEntry from '../ui/TimelineEntry.jsx';

export default function ResearchSection() {
  const { data, loading } = useCSV('research.csv');

  const entries = sortByDateDesc(
    data.map(r => ({
      id:          r.id,
      title:       r.title,
      subtitle:    'Research Project',
      location:    '',
      start_date:  r.start_date,
      end_date:    r.end_date,
      short_desc:  r.short_desc,
      highlights:  parseList(r.highlights),
      tags:        parseList(r.tools),
      link:        r.url,
    }))
  );

  return (
    <section id="research">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Research</h2>
          <p className="section-subtitle">
            Current and past research projects in swarm intelligence and multi-robot systems.
          </p>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <div className="timeline">
            {entries.map(e => <TimelineEntry key={e.id} entry={e} />)}
          </div>
        )}
      </div>
    </section>
  );
}
