import React, { useState, useEffect } from 'react';
import Content from '@/components/home/Content';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { RefreshCw } from 'lucide-react';
import icon from '/icon.png';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Home() {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchData = async () => {
    try {
      setState({ data: null, loading: true, error: null });
      const response = await fetch(`${API}/stats`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data);
      setState({ data, loading: false, error: null });
      setLastUpdated(new Date());
    } catch (error) {
      setState({ data: null, loading: false, error });
      setLastUpdated(new Date());
    }
  };

  const getTimeAgo = () => {
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffMins = Math.floor(diffMs / 60000);
    return `${diffMins}m ago`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to update time ago
      setLastUpdated(new Date(lastUpdated));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [lastUpdated]);

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
              Google Clouds Study Jams 2025
            </h1>
            <CardDescription>GDG BCET Program Statistics</CardDescription>
          </div>
        </div>
        <CardAction className="flex flex-col justify-center items-center gap-1">
          <div className="flex items-center gap-2 bg-neutral-50 rounded-full px-1 sm:px-2 py-1">
            <button
              className="ml-auto rounded-full hover:bg-blue-500/60 transition bg-blue-500  p-2 text-white shadow-lg cursor-pointer"
              onClick={() => fetchData()}
              title="Refresh"
            >
              <RefreshCw className="size-4 sm:size-5 lg:size-6 hover:animate-spin" />
            </button>
            <p className="hidden sm:block ">Refresh</p>
          </div>
          <p className="text-xs text-gray-500 flex">
            <span className="hidden sm:block me-1">Updated </span>{' '}
            {getTimeAgo()}
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="bg-neutral-50 m-4 p-2 min-h-96 rounded-lg">
        <Content {...state} />
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

export default Home;
