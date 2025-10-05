// src/pages/Progress.jsx

import React, { useState, useEffect, useCallback } from 'react';
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
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams({
    sort_by: 'badge_count',
    sort_order: 'desc',
  });

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

  const fetchData = useCallback(async () => {
    try {
      setState(prevState => ({ ...prevState, loading: true }));
      const apiUrl = getApiUrl();
      const params = new URLSearchParams(searchParams).toString();
      const response = await fetch(
        `${apiUrl}/progress${params ? `?${params}` : ''}`
      );

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setState({ data, loading: false, error: null });
      setLastUpdated(new Date());
    } catch (error) {
      setState({ data: null, loading: false, error });
      // Keep lastUpdated from the time of the error attempt
      setLastUpdated(new Date());
    }
  }, [searchParams]);

  const getTimeAgo = () => {
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffSeconds = Math.round(diffMs / 1000);

    if (diffSeconds < 60) return 'just now';
    const diffMins = Math.floor(diffSeconds / 60);
    return `${diffMins}m ago`;
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // Force a re-render every minute to update the "time ago" text
      setTick(tick => tick + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
              onClick={fetchData}
              title="Refresh"
              disabled={state.loading}
            >
              <RefreshCw
                className={`size-4 sm:size-5 lg:size-6 ${
                  state.loading ? 'animate-spin' : 'hover:animate-spin'
                }`}
              />
            </button>
            <p className="hidden sm:block">
              {state.loading ? 'Refreshing...' : 'Refresh'}
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
          state={state}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </CardContent>
    </Card>
  );
}

export default Progress;
