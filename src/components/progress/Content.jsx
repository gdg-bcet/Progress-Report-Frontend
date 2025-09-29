import React, { useState, useCallback, useMemo } from 'react';
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Content({ state, searchParams, setSearchParams }) {
  const [searchTerm, setSearchTerm] = useState('');

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
    }, 300),
    [searchParams, setSearchParams]
  );

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSort = field => {
    const newParams = new URLSearchParams(searchParams);
    const currentSortBy = searchParams.get('sort_by');
    const currentSortOrder = searchParams.get('sort_order');

    if (currentSortBy === field) {
      newParams.set('sort_order', currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      newParams.set('sort_by', field);
      newParams.set('sort_order', 'desc');
    }

    setSearchParams(newParams);
  };

  const exportToCSV = () => {
    if (!state.data?.users) return;

    const headers = [
      'Rank',
      'Name',
      'Badge Count',
      'Profile URL',
      ...Object.keys(state.data.users[0]?.badges || {}),
    ];

    const csvContent = [
      headers.join(','),
      ...state.data.users.map(user =>
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
    return state.data?.users?.[0]?.badges
      ? Object.keys(state.data.users[0].badges)
      : [];
  }, [state.data]);

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
      {/* Search and Export Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="flex items-center gap-2"
          disabled={state.loading || !state.data?.users}
        >
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {/* Results Summary */}
      {!state.loading && !state.error && state.data && (
        <div className="text-sm text-gray-600">
          Showing {state.data.filtered_users} of {state.data.total_users}{' '}
          participants
        </div>
      )}

      {/* Progress Table */}
      <div className="overflow-x-auto rounded-lg border max-h-[50vh]">
        {state.loading ? (
          <LoadingSkeleton />
        ) : state.error ? (
          <div className="text-center p-8">
            <p className="text-red-500">Error: {state.error.message}</p>
          </div>
        ) : !state.data?.users ? (
          <div className="text-center p-8">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('rank')}
                >
                  <div className="flex items-center gap-1">
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
              {state.data.users.length === 0 ? (
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
                state.data.users.map(user => (
                  <TableRow
                    key={user['Discord ID']}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {user.Rank > 3 && (
                          <span className="text-lg font-bold text-gray-700">
                            {user.Rank}
                          </span>
                        )}
                        {user.Rank <= 3 && (
                          <span className="text-lg">
                            {user.Rank === 1
                              ? '🥇'
                              : user.Rank === 2
                              ? '🥈'
                              : '🥉'}
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
                          <a
                            href={user['Profile URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-blue-600 transition-colors"
                          >
                            {user.Name}
                          </a>
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
                              state.data.total_badges
                            )}%, #e5e7eb ${getProgressPercentage(
                              user['Badge Count'],
                              state.data.total_badges
                            )}%, #e5e7eb 100%)`,
                          }}
                        >
                          {user['Badge Count']} / {state.data.total_badges}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {getProgressPercentage(
                            user['Badge Count'],
                            state.data.total_badges
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
        )}
      </div>
    </div>
  );
}

export default Content;
