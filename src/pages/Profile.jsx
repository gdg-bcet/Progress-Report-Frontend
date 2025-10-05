import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';

const Profile = () => {
  const { discordId } = useParams();

  // Dynamic API URL that works for both local and Netlify
  const getApiUrl = () => {
    // In production (Netlify), use relative path which gets proxied
    if (import.meta.env.PROD) {
      return '/api';
    }
    // In development, use the full backend URL
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  };

  const {
    data: rawData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', discordId],
    queryFn: async () => {
      if (!discordId) throw new Error('No user id provided in route.');
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/user/${discordId}`);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      return response.json();
    },
    enabled: !!discordId,
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">{error.message}</div>
    );
  }

  if (!rawData) {
    return (
      <div className="text-center mt-10 text-red-500">No user data found.</div>
    );
  }

  // Normalize shape and provide safe defaults
  const badges = Array.isArray(rawData?.badges) ? rawData.badges : [];
  const completedCount = badges.filter(b => b && b.completed).length;
  const computedPercent = Math.round(
    (completedCount / (badges.length || 1)) * 100
  );

  const userData = {
    name: rawData?.name || rawData?.displayName || 'Unknown User',
    profile: rawData?.profile || rawData?.profileUrl || '',
    profile_color: rawData?.profile_color || '#000000',
    badges,
    completion_percentage:
      typeof rawData?.completion_percentage === 'number'
        ? rawData.completion_percentage
        : computedPercent,
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex items-center justify-between space-y-0 pb-2 pt-2">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback
                className="text-xs text-white"
                style={{ backgroundColor: userData.profile_color }}
              >
                {userData.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl border-gray-500">
                {userData.name}
              </CardTitle>
              {userData.profile && (
                <a
                  href={userData.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:size-1.5"
                >
                  View Google Cloud Profile
                </a>
              )}
            </div>
          </div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {completedCount} / {badges.length} badges
            </h3>
            <p className="text-muted-foreground text-sm">completed</p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-row justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 pb-6 border-b pt-6 border-t">
              <div className="pr-4 flex justify-center items-center">
                <AnimatedCircularProgressBar
                  value={userData.completion_percentage}
                  className="size-50"
                  gaugePrimaryColor="var(--google-blue)"
                  gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                />
              </div>
              <div className="flex flex-col pl-2">
                <div className="border-b pb-2 font-medium text-lg">
                  Completion Timeline
                </div>
                {badges.length > 0 ? (
                  <div className="mt-2">
                    {badges
                      .filter(b => b && b.completed)
                      .slice(-2)
                      .map((badge, idx) => {
                        const completedAt = badge?.timestamp
                          ? new Date(badge.timestamp).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )
                          : null;

                        return (
                          <div key={badge?.id ?? idx} className="mb-2">
                            <div>
                              {completedAt && (
                                <span className="text-xs text-slate-500 ml-2">
                                  {completedAt}
                                </span>
                              )}
                            </div>
                            <div className="bg-white text-blue-800 text-base mr-2 flex items-center gap-2">
                              <CheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                              <a
                                href={badge?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:underline text-sm break-words"
                              >
                                {badge?.name ?? 'Unnamed Badge'}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No badges completed yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.length === 0 && (
              <div className="col-span-2 text-sm text-slate-500">
                No badges yet.
              </div>
            )}

            {badges
              .sort((a, b) => (b.completed === true) - (a.completed === true))
              .map((badge, idx) => (
                <div key={badge?.id ?? idx} className="p-4 border rounded">
                  <div className="flex justify-between items-center">
                    <a
                      href={badge?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline size-0.7"
                    >
                      {badge?.name ?? 'Unnamed Badge'}
                    </a>
                    <div>
                      {badge.completed ? (
                        <CheckCircle className="text-green-500 w-5 h-5" />
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
