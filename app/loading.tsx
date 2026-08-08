export default function Loading() {
  return (
    <div className="loading-page" role="status" aria-label="Loading Divine Collection">
      <div className="loading-header"><span /><span /><span /></div>
      <div className="loading-hero"><div><i /><i /><i /><i /></div><b /></div>
      <div className="loading-cards">{Array.from({ length: 4 }, (_, index) => <span key={index} />)}</div>
    </div>
  );
}
