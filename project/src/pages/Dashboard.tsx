import { useState, useEffect } from 'react';
import { ArticlesTable } from '@/components/ArticlesTable';

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <ArticlesTable isLoading={isLoading} />
    </div>
  );
}