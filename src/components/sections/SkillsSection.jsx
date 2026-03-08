import { useCSV, parseList } from '../../utils/csvLoader.js';
import Tag from '../ui/Tag.jsx';

export default function SkillsSection() {
  const { data, loading } = useCSV('skills.csv');

  return (
    <section id="skills">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
        </div>
        {loading ? (
          <div className="loading-placeholder">
            <div className="loading-bar" style={{ height: 36 }} />
            <div className="loading-bar" style={{ height: 36 }} />
          </div>
        ) : (
          <div className="skills-grid">
            {data.map(group => (
              <div className="skill-group" key={group.id}>
                <p className="skill-group-title">{group.category}</p>
                <div className="skill-tags">
                  {parseList(group.items).map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
