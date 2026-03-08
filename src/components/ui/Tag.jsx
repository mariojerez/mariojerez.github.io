export default function Tag({ children }) {
  if (typeof children === 'string') {
    return <span className="tag" dangerouslySetInnerHTML={{ __html: children }} />;
  }
  return <span className="tag">{children}</span>;
}
