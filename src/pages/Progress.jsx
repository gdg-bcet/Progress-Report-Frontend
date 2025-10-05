import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Content from '@/components/progress/Content';

import { RefreshCw } from 'lucide-react';
import icon from '/icon.png';

function Progress() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams({
    sort_by: 'badge_count',
    sort_order: 'desc',
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    // Set default parameters in the URL if not present
    const currentParams = new URLSearchParams(searchParams);
    if (!currentParams.has('sort_by')) {
      currentParams.set('sort_by', 'badge_count');
    }
    if (!currentParams.has('sort_order')) {
      currentParams.set('sort_order', 'desc');
    }
    setSearchParams(currentParams);
  }, []);

  // Dynamic API URL that works for both local and Netlify
  const getApiUrl = () => {
    // In production (Netlify), use relative path which gets proxied
    if (import.meta.env.PROD) {
      return '/api';
    }
    // In development, use the full backend URL
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  };

  const apiUrl = getApiUrl();
  const { data, isLoading, isFetching, error, dataUpdatedAt } = useQuery({
    queryKey: ['progress', searchParams.toString()],
    queryFn: async () => {
      const params = searchParams.toString();
      const response = await fetch(
        `${apiUrl}/progress${params ? `?${params}` : ''}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    staleTime: Infinity, // Prevent refetching on mount
  });

  const loading = isLoading || isFetching;

  const lastUpdated = new Date(dataUpdatedAt || Date.now());

  const getTimeAgo = () => {
    const diffMs = currentTime - lastUpdated;
    const diffMins = Math.floor(diffMs / 60000) + 1;
    return `${diffMins}m ago`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['progress', searchParams.toString()],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src={icon}
            alt="Icon"
            className="size-10 sm:size-12 lg:size-14 rounded-md"
          />
          <div>
            <h1 className="scroll-m-20 my-1 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
              Google Cloud Study Jams 2025
            </h1>
            <CardDescription>GDG BCET Progress Leaderboard</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col justify-center items-center gap-1">
          <div className="flex items-center gap-2 bg-neutral-50 rounded-full px-1 sm:px-2 py-1">
            <button
              className="ml-auto rounded-full hover:bg-blue-500/60 transition bg-blue-500 p-2 text-white shadow-lg cursor-pointer disabled:bg-gray-400"
              onClick={handleRefresh}
              title="Refresh"
              disabled={loading}
            >
              <RefreshCw
                className={`size-4 sm:size-5 lg:size-6 ${
                  loading ? 'animate-spin' : 'hover:animate-spin'
                }`}
              />
            </button>
            <p className="hidden sm:block">
              {loading ? 'Refreshing...' : 'Refresh'}
            </p>
          </div>
          <p className="text-xs text-gray-500 flex">
            <span className="hidden sm:block me-1">Updated </span>{' '}
            {getTimeAgo()}
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-96">
        <Content
          data={data}
          loading={loading}
          error={error}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </CardContent>
    </Card>
  );
}

export default Progress;
