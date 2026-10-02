'use client';

import { Code, Globe, Smartphone, Cloud, Database, Cpu, Server, Layers } from 'lucide-react';

const icons = [
  { name: 'Web Development', Icon: Code },
  { name: 'Global Reach', Icon: Globe },
  { name: 'Mobile Apps', Icon: Smartphone },
  { name: 'Cloud Infrastructure', Icon: Cloud },
  { name: 'Databases', Icon: Database },
  { name: 'AI & Machine Learning', Icon: Cpu },
  { name: 'Backend Systems', Icon: Server },
  { name: 'Scalable Architecture', Icon: Layers },
];

export default function TechStack() {
  return (
    <div className="tech-strip" aria-label="Technologies we use">
      <div className="container tech-strip__inner">
        {icons.map(({ name, Icon }) => (
          <span key={name} className="tech-strip__icon" aria-label={name} title={name}>
            <Icon strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
