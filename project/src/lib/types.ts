export interface Article {
  id: string;
  title: string;
  keyword: {
    name: string;
    traffic: number;
  };
  wordCount: number;
  createdAt: string;
  status: 'generated' | 'published' | 'scheduled' | 'archived';
}

export type TabType = 'generated' | 'published' | 'scheduled' | 'archived';

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: Array<{
    title: string;
    path: string;
  }>;
}