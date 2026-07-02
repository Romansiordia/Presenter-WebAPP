import * as LucideIcons from 'lucide-react';

export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // Convert standard kebab-case or distinct names to PascalCase (e.g., 'trending-up' -> 'TrendingUp')
  const pascalName = name
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
    
  // @ts-ignore - Indexing dynamically
  const Comp = LucideIcons[pascalName] || LucideIcons.Star;
  
  return <Comp className={className} />;
};
