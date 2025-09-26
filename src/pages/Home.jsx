import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import icon from '/icon.png';

function Home() {
  return (
    <Card className="min-h-[80vh]">
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
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-1 sm:px-2 py-1">
            <button
              className="ml-auto rounded-full hover:bg-blue-500/60 transition bg-blue-500  p-2 text-white shadow-lg cursor-pointer"
              onClick={() => window.location.reload()}
              title="Refresh"
            >
              <RefreshCw className="size-4 sm:size-5 lg:size-6 hover:animate-spin" />
            </button>
            <p className="hidden sm:block ">Refresh</p>
          </div>
          <p className="text-xs text-gray-500 flex">
            <span className="hidden sm:block me-1">Updated </span> 5m ago
          </p>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default Home;
