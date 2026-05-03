export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="card p-3" style={style}>
      {children}
    </div>
  );
}