import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Badge } from '@/components/ui/badge';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';

function Content({ data, loading, error }) {
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center ">
        <Spinner />
      </div>
    );
  } else if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
      {/* Total Participants */}
      <div className="bg-white h-40 rounded-lg shadow-sm flex flex-col gap-4 items-center justify-start pt-6 ">
        <h2 className="font-semibold">Total Participants</h2>
        <h3 className="scroll-m-20 text-4xl text-google-blue font-semibold tracking-tight">
          {data?.total_users || 0}
        </h3>
      </div>
      {/* Completion Rate */}
      <div className="bg-white h-40 rounded-lg shadow-sm flex flex-col gap-1 items-center justify-start pt-6 ">
        <h2 className="font-semibold">Completion %</h2>
        <AnimatedCircularProgressBar
          className="size-16"
          value={data?.completion_percentage || 0}
          // value={75}
          gaugePrimaryColor="var(--google-blue)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
        <p className=" text-sm">
          <span className="font-semibold">
            {data?.tier_emoji} {data?.tier}
          </span>{' '}
          <Badge variant="outline">
            {data?.completed_users}/{data?.tier_target}
          </Badge>
        </p>
      </div>
      {/* Average Progress */}
      <div className="col-span-2 sm:col-span-1 bg-white h-40 rounded-lg shadow-sm flex flex-col gap-4 items-center justify-start pt-6 ">
        <h2 className="font-semibold">Average Progress</h2>
        <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">
          {data?.average_badges || 0}
        </h3>
        <p className="text-muted-foreground text-sm">badges / person</p>
      </div>
      {/* Top Performer */}
      <div className="col-span-2 sm:col-span-1 bg-white h-40 rounded-lg shadow-sm flex flex-col gap-4 items-center justify-start pt-6 ">
        <h2 className="font-semibold">Top Performer</h2>
        <div className="flex gap-2 items-center px-4">
          <Avatar>
            <AvatarFallback
              className="text-xs text-white"
              style={{ backgroundColor: data?.top_performer?.profile_color }}
            >
              {data?.top_performer?.name
                ?.split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              to={`/profile/${data?.top_performer?.discord_id}`}
              className="font-medium hover:text-blue-600"
            >
              {data?.top_performer?.name || 'N/A'}
            </Link>
            <p className="text-sm text-muted-foreground">
              {data?.top_performer?.badge_count || 0} /{' '}
              {data?.total_badges || 0} badges
            </p>
          </div>
        </div>
      </div>
      {/* Completion Rate */}
      <div className="col-span-2 row-span-2 bg-white rounded-lg shadow-sm flex flex-col gap-4 justify-start p-6 ">
        <h2 className="font-semibold">Badge Completion Rate</h2>
        <CompletionRateChart data={data?.completion_distribution || null} />
      </div>
      {/* Badge Popularity */}
      <div className="col-span-2  bg-white rounded-lg shadow-sm flex flex-col gap-4 justify-start p-6 ">
        <h2 className="font-semibold">Badge Popularity</h2>
        <BadgePopularityChart data={data?.badge_completion_stats || null} />
      </div>
      {/* Progress Timeline */}
      <div className="col-span-2  bg-white rounded-lg shadow-sm flex flex-col gap-4 justify-start p-6 ">
        <h2 className="font-semibold">Progress Timeline</h2>
        <ProgressTimelineChart data={data?.progress_timeline || null} />
      </div>
    </div>
  );
}

export default Content;

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const CompletionRateChart = ({ data }) => {
  if (!data) return <p>No data available</p>;

  const chartData = Object.entries(data).map(([badges, count]) => ({
    badges: parseInt(badges),
    count,
  }));

  const chartConfig = {
    count: {
      label: 'Count',
      color: 'var(--google-blue)',
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] h-full w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="badges"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          tickMargin={0}
          tickPadding={0}
          axisLine={false}
          width={20}
          tickFormatter={value => (value === 0 ? '' : value)}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

const BadgePopularityChart = ({ data }) => {
  if (!data) return <p>No data available</p>;

  const chartData = Object.entries(data)
    .map(([badges, count]) => ({
      badges,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const chartConfig = {
    count: {
      label: 'Count',
      color: 'var(--google-blue)',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <CartesianGrid vertical={true} />

        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickFormatter={value => (value === 0 ? '' : value)}
          dataKey="count"
        />
        <YAxis
          dataKey="badges"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={100}
          tickFormatter={value => value.slice(0, 30)} // Allow longer names
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
};

const ProgressTimelineChart = ({ data }) => {
  if (!data) return <p>No data available</p>;

  const chartData = Object.entries(data)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartConfig = {
    count: {
      label: 'Count',
      color: 'var(--google-blue)',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => {
            const d = new Date(value);
            return d.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: '2-digit',
            });
          }}
        />
        <YAxis
          tickLine={false}
          tickMargin={0}
          tickPadding={0}
          axisLine={false}
          width={15}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={value =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              }
            />
          }
        />
        <Line
          dataKey="count"
          type="natural"
          stroke="var(--color-count)"
          strokeWidth={2}
          dot={{
            fill: 'var(--color-count)',
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
};
