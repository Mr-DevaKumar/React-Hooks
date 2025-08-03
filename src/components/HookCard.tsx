// components/HookCard.tsx
// components/HookCard.tsx
import type { ReactNode } from 'react';

interface HookCardProps {
  title: string;
  description: string;
  code: string;
  demo: ReactNode;
}

const HookCard = ({ title, description, code, demo }: HookCardProps) => {
  return (
    <div className="hook-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="code-example">
        <pre>{code}</pre>
      </div>
      <div className="demo">{demo}</div>
    </div>
  );
};

export default HookCard;