import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Content({ data, loading, error, searchParams, setSearchParams }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Initialize filter state from URL params
  const [badgeFilter, setBadgeFilter] = useState(() => {
    const filterValue = searchParams.get('filter_badge_count');
    if (filterValue) {
      // Parse ">=4" format back to operator and value
      const match = filterValue.match(/^(>=|<=|>|<|=)(.+)$/);
      if (match) {
        const [, operator, value] = match;
        const operatorMap = {
          '=': 'eq',
          '<': 'lt',
          '<=': 'lte',
          '>': 'gt',
          '>=': 'gte',
        };
        return {
          operator: operatorMap[operator] || 'eq',
          value: value,
        };
      }
    }
    return { operator: 'eq', value: '' };
  });

  // Sync filter state when URL params change
  useEffect(() => {
    const filterValue = searchParams.get('filter_badge_count');
    if (filterValue) {
      const match = filterValue.match(/^(>=|<=|>|<|=)(.+)$/);
      if (match) {
        const [, operator, value] = match;
        const operatorMap = {
          '=': 'eq',
          '<': 'lt',
          '<=': 'lte',
          '>': 'gt',
          '>=': 'gte',
        };
        setBadgeFilter({
          operator: operatorMap[operator] || 'eq',
          value: value,
        });
      }
    } else {
      setBadgeFilter({ operator: 'eq', value: '' });
    }
  }, [searchParams]);

  // Debounced search function

  // Debounced search function
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce(term => {
      const newParams = new URLSearchParams(searchParams);
      if (term) {
        newParams.set('search', term);
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams);
    }, 500),
    [searchParams, setSearchParams]
  );

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleFilterApply = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (badgeFilter.operator && badgeFilter.value) {
        const operatorMap = {
          eq: '=',
          lt: '<',
          lte: '<=',
          gt: '>',
          gte: '>=',
        };
        const apiOperator = operatorMap[badgeFilter.operator] || '=';
        const filterValue = `${apiOperator}${badgeFilter.value}`;
        newParams.set('filter_badge_count', filterValue);
      } else {
        newParams.delete('filter_badge_count');
      }
      return newParams;
    });
    setFilterOpen(false);
  };

  const clearFilter = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('filter_badge_count');
      return newParams;
    });
    setBadgeFilter({ operator: '', value: '' });
  };

  const handleSort = field => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      const currentSortBy = prevParams.get('sort_by');
      const currentSortOrder = prevParams.get('sort_order');

      if (currentSortBy === field) {
        newParams.set(
          'sort_order',
          currentSortOrder === 'asc' ? 'desc' : 'asc'
        );
      } else {
        newParams.set('sort_by', field);
        newParams.set('sort_order', 'desc');
      }
      return newParams;
    });
  };

  const hasActiveFilter = useMemo(() => {
    return searchParams.has('filter_badge_count');
  }, [searchParams]);

  const exportToCSV = () => {
    if (!data?.users) return;

    const headers = [
      'Rank',
      'Name',
      'Badge Count',
      'Profile URL',
      ...Object.keys(data.users[0]?.badges || {}),
    ];

    const csvContent = [
      headers.join(','),
      ...data.users.map(user =>
        [
          user.Rank,
          `"${user.Name}"`,
          user['Badge Count'],
          user['Profile URL'],
          ...Object.values(user.badges).map(badge => (badge ? 'Done' : '')),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'progress-report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getSortIcon = field => {
    const currentSortBy = searchParams.get('sort_by');
    const currentSortOrder = searchParams.get('sort_order');

    if (currentSortBy !== field) return null;
    return currentSortOrder === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const getProgressPercentage = (badgeCount, totalBadges) => {
    return Math.round((badgeCount / totalBadges) * 100);
  };

  const badgeNames = useMemo(() => {
    return data?.users?.[0]?.badges ? Object.keys(data.users[0].badges) : [];
  }, [data]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Badge Count</TableHead>
          {[...Array(6)].map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-6 w-8" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-16 mx-auto" />
            </TableCell>
            {[...Array(6)].map((_, j) => (
              <TableCell key={j} className="text-center">
                <Skeleton className="h-6 w-6 rounded-full mx-auto" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1 max-w-md">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={hasActiveFilter ? 'default' : 'outline'}
                size="icon"
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {hasActiveFilter && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filter Options</h4>
                  {hasActiveFilter && (
                    <Button variant="ghost" size="sm" onClick={clearFilter}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Badge Count Filter</Label>
                  <div className="flex gap-2">
                    <Select
                      value={badgeFilter.operator}
                      onValueChange={value =>
                        setBadgeFilter(prev => ({ ...prev, operator: value }))
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="=" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eq">=</SelectItem>
                        <SelectItem value="lt">&lt;</SelectItem>
                        <SelectItem value="lte">&lt;=</SelectItem>
                        <SelectItem value="gt">&gt;</SelectItem>
                        <SelectItem value="gte">&gt;=</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      placeholder="0"
                      value={badgeFilter.value}
                      onChange={e =>
                        setBadgeFilter(prev => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      className="flex-1"
                      min="0"
                    />
                  </div>
                </div>

                <Button onClick={handleFilterApply} className="w-full">
                  Apply Filter
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Export Button */}
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="flex items-center gap-2"
          disabled={loading || !data?.users}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export to CSV</span>
        </Button>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilter && (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            Badge Count {searchParams.get('filter_badge_count')}
            <X
              className="h-3 w-3 cursor-pointer hover:text-red-500"
              onClick={clearFilter}
            />
          </Badge>
        </div>
      )}

      {/* Results Summary */}
      {!loading && !error && data && (
        <div className="text-sm text-gray-600">
          Showing {data.filtered_users} of {data.total_users} participants
        </div>
      )}

      {/* Progress Table */}
      <div className="overflow-y-auto  rounded-lg border h-[50vh] flex flex-col">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-red-500">Error: {error.message}</p>
          </div>
        ) : !data?.users ? (
          <div className="text-center p-8">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-50 z-10">
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 transition-colors text-center"
                    onClick={() => handleSort('rank')}
                  >
                    <div className="flex items-center gap-1 justify-center">
                      Rank
                      {getSortIcon('rank')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 transition-colors min-w-[200px]"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 transition-colors text-center"
                    onClick={() => handleSort('badge_count')}
                  >
                    <div className="flex items-center gap-1 justify-center">
                      Badge Count
                      {getSortIcon('badge_count')}
                    </div>
                  </TableHead>
                  {badgeNames.map(badgeName => (
                    <TableHead
                      key={badgeName}
                      className="text-center min-w-[150px] text-xs"
                    >
                      <div className="truncate" title={badgeName}>
                        {badgeName.length > 20
                          ? badgeName.slice(0, 20) + '...'
                          : badgeName}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3 + badgeNames.length}
                      className="text-center p-8"
                    >
                      <p className="text-gray-500">
                        No participants found matching your search.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.users.map(user => (
                    <TableRow
                      key={user['Discord ID']}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium text-center">
                        <div className="flex items-center justify-center gap-2">
                          {user.Rank <= 3 ? (
                            // Show only medal emoji for top 3 in default sort
                            <span className="text-2xl">
                              {user.Rank === 1
                                ? '🥇'
                                : user.Rank === 2
                                ? '🥈'
                                : '🥉'}
                            </span>
                          ) : (
                            // Show rank number for all other cases
                            <span className="text-lg font-bold text-gray-700">
                              {user.Rank}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback
                              className="text-xs text-white"
                              style={{ backgroundColor: user['Profile Color'] }}
                            >
                              {user.Name.split(' ')
                                .map(n => n[0])
                                .join('')
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link
                              to={`/profile/${user['Discord ID']}`}
                              className="font-medium hover:text-blue-600 transition-colors"
                            >
                              {user.Name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            style={{
                              background: `linear-gradient(90deg, var(--google-blue) 0%, var(--google-blue) ${getProgressPercentage(
                                user['Badge Count'],
                                data.total_badges
                              )}%, #e5e7eb ${getProgressPercentage(
                                user['Badge Count'],
                                data.total_badges
                              )}%, #e5e7eb 100%)`,
                            }}
                          >
                            {user['Badge Count']} / {data.total_badges}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {getProgressPercentage(
                              user['Badge Count'],
                              data.total_badges
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                      {badgeNames.map(badgeName => (
                        <TableCell key={badgeName} className="text-center">
                          <div className="flex justify-center">
                            {user.badges[badgeName] === 'Done' ? (
                              <div className="w-6 h-6 bg-google-green rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-400 text-xs">○</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
