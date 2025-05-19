import { useState } from 'react';
import { Article, TabType } from '@/lib/types';
import { articlesData } from '@/lib/data';
import { useArticleFilters } from '@/hooks/useArticleFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUpDown, MoreHorizontal, Eye, ChevronDown } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingSkeleton } from './LoadingSkeleton';

interface ArticlesTableProps {
  isLoading?: boolean;
}

export function ArticlesTable({ isLoading = false }: ArticlesTableProps) {
  const [activeTab, setActiveTab] = useState<TabType>('generated');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Article>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Use the filter hook to filter and sort articles
  const { filteredArticles } = useArticleFilters({
    articles: articlesData,
    activeTab,
    searchQuery,
    sortColumn,
    sortDirection
  });

  // Handle sorting toggle
  const toggleSort = (column: keyof Article) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
      </div>

      <Tabs defaultValue="generated" className="w-full" onValueChange={(value) => setActiveTab(value as TabType)}>
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex">
          <TabsTrigger value="generated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Generated Articles
          </TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Published Articles
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Scheduled Articles
          </TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Archived Articles
          </TabsTrigger>
        </TabsList>

        {['generated', 'published', 'scheduled', 'archived'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="flex justify-between items-center my-4">
              <div className="w-full max-w-sm">
                <Input 
                  placeholder="Search for Title & Keywords..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="rounded-md border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="w-12">
                    <input type="checkbox" className="rounded" aria-label="Select all articles" />
                    </TableCell>
                    <TableHead className="font-medium bg-white text-white">
                      <Button variant="ghost" onClick={() => toggleSort('title')} className="flex items-center">
                        Article Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-medium bg-white text-white">
                      <Button variant="ghost" onClick={() => toggleSort('keyword')} className="flex items-center">
                        Keyword [Traffic]
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-medium text-right bg-white text-white">
                      <Button variant="ghost" onClick={() => toggleSort('wordCount')} className="flex items-center">
                        Words
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-medium text-right bg-white text-white">
                      <Button variant="ghost" onClick={() => toggleSort('createdAt')} className="flex items-center">
                        Created On
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-medium text-center bg-white text-black">Action</TableHead>
                    <TableHead className="font-medium text-center bg-white text-black">Publish</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedArticles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No articles found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          <input type="checkbox" className="rounded" aria-label="Select Article" />
                        </TableCell>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.keyword.name} [{article.keyword.traffic}]</TableCell>
                        <TableCell className="text-right">{article.wordCount}</TableCell>
                        <TableCell className="text-right">{article.createdAt}</TableCell>
                        <TableCell className="text-center">
                        <button
                            className="border border-black-500 text-white-600 font-medium rounded-md px-6 py-1.5 bg-white shadow-sm hover:bg-black-50 hover:border-black-600 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black-200 focus:ring-offset-2"
                            style={{ minWidth: 80 }}
                          >
                            View
                          </button>
                        </TableCell>
                        <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <button
                              className="border border-transparent rounded-full p-0.5 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-150"
                              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              aria-label="Publish to WordPress"
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M4.5 12c0 3.866 3.134 7 7 7 1.657 0 3.173-.57 4.382-1.527l-3.382-9.473" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M19.5 12c0-3.866-3.134-7-7-7-1.657 0-3.173.57-4.382 1.527l3.382 9.473" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 12l2.5 7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 12l-2.5 7" stroke="currentColor" strokeWidth="1.5" />
                              </svg>
                            </button>
                            <button
                              className="border border-transparent rounded-full p-0.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-150"
                              style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              aria-label="Open publish menu"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">
                  Total {filteredArticles.length} Article Titles
                </p>
                <p className="text-sm text-muted-foreground">
                  |
                </p>
                <p className="text-sm text-muted-foreground flex items-center">
                  Show
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => setPageSize(parseInt(value))}
                  >
                    <SelectTrigger className="h-8 w-16 mx-2">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  entries per page
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  {currentPage} / {totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}