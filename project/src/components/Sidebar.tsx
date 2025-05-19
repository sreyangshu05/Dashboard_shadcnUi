import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  KeySquare,
  Brain,
  BarChart,
  Link2,
  Zap,
  Settings,
  HelpCircle,
  Bell,
  MessageSquare,
  User,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarItem } from '@/lib/types';

const sidebarItems: SidebarItem[] = [
  {
    title: 'Articles',
    path: '/dashboard',
    icon: FileText,
    children: [
      { title: 'Create Article', path: '/articles/create' },
      { title: 'Generated Articles', path: '/articles/generated' },
      { title: 'Keyword Projects', path: '/articles/keyword-projects' },
      { title: 'AI Keyword to Article', path: '/articles/ai-keyword' },
      { title: 'Steal Competitor Keyword', path: '/articles/steal-competitor' },
      { title: 'Import Keyword from GSC', path: '/articles/import-keyword' },
      { title: 'Manual Keyword to Article', path: '/articles/manual-keyword' },
      { title: 'Bulk Keyword to Article', path: '/articles/bulk-keyword' },
      { title: 'Longtail Keyword to Article', path: '/articles/longtail-keyword' },
      { title: 'Article Settings', path: '/articles/settings' },
    ]
  },
  { title: 'Auto Blog', path: '/auto-blog', icon: Zap },
  { title: 'Internal Links', path: '/internal-links', icon: Link2 },
  { title: 'Free Backlinks', path: '/free-backlinks', icon: BarChart },
  { title: 'Integrations', path: '/integrations', icon: Settings },
  { title: 'Subscription', path: '/subscription', icon: KeySquare },
  { title: 'Affiliate Program', path: '/affiliate', icon: Brain },
  { title: 'Help Center', path: '/help', icon: HelpCircle },
  { title: 'Updates', path: '/updates', icon: Bell },
  { title: 'Live Chat Support', path: '/support', icon: MessageSquare },
  { title: 'Profile', path: '/profile', icon: User },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [openItem, setOpenItem] = useState<string | null>('Articles');

  const toggleItem = (title: string) => {
    setOpenItem(openItem === title ? null : title);
  };

  return (
    <div className={cn("h-screen flex flex-col border-r bg-white text-white w-64 min-w-[56px] max-w-xs overflow-x-auto", className)}>
      <div className="flex items-center h-14 px-4 py-2 border-b min-w-[40px]">
        <Link to="/" className="flex items-center text-xl font-bold text-black">
          <span className="ml-2">abun</span>
        </Link>
      </div>

      <div className="flex items-center px-4 py-2 border-b">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-2 text-sm font-medium">
          amazon.com
          <ChevronDown className="h-4 w-4 inline-block ml-1" />
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.children && item.children.some(child => 
                              location.pathname === child.path));
            const isOpen = openItem === item.title;

            return (
              <div key={item.path} className="grid gap-1">
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "flex justify-between items-center w-full h-9 px-3 text-left",
                    isActive ? "bg-white text-black font-medium" : ""
                  )}
                  onClick={() => item.children && toggleItem(item.title)}
                  asChild={!item.children}
                >
                  {!item.children ? (
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <>
                      <span className="flex items-center">
                        <item.icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen && "transform rotate-180"
                        )}
                      />
                    </>
                  )}
                </Button>
                
                {item.children && isOpen && (
                  <div className="grid gap-1 ml-4">
                    {item.children.map((child) => (
                      <Button
                        key={child.path}
                        variant="ghost"
                        className={cn(
                          "justify-start h-8 px-3 text-muted-foreground text-sm",
                          location.pathname === child.path && "bg-muted font-medium text-primary"
                        )}
                        asChild
                      >
                        <Link to={child.path}>{child.title}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}