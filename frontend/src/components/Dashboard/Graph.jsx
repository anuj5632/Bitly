import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-secondary border-2 border-border-base rounded-md p-3 shadow-lg">
        <p className="text-on-surface-muted text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-primary font-heading font-bold">
          {payload[0].value} {payload[0].value === 1 ? 'IMP' : 'IMPS'}
        </p>
      </div>
    );
  }
  return null;
};

const Graph = ({ graphData, type = 'area' }) => {
  const chartData = graphData?.map((item) => ({
    date: item.clickDate,
    clicks: item.count,
  })) || [];

  if (!chartData.length) {
    const placeholderData = Array.from({ length: 14 }, (_, i) => ({
      date: `SKETCH ${i + 1}`,
      clicks: Math.floor(Math.random() * 5) + 1,
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={placeholderData}>
          <defs>
            <linearGradient id="colorClicksPlaceholder" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DFFF00" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#DFFF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
          <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} fontClassName="font-body" />
          <YAxis stroke="#666" fontSize={10} tickLine={false} fontClassName="font-body" />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#DFFF00"
            strokeOpacity={0.2}
            fillOpacity={1}
            fill="url(#colorClicksPlaceholder)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
          <XAxis
            dataKey="date"
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={{ stroke: '#444' }}
          />
          <YAxis
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={{ stroke: '#444' }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(223, 255, 0, 0.05)' }} />
          <Bar
            dataKey="clicks"
            fill="#DFFF00"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#DFFF00" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#DFFF00" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
        <XAxis
          dataKey="date"
          stroke="#666"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: '#444' }}
        />
        <YAxis
          stroke="#666"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: '#444' }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="clicks"
          stroke="#DFFF00"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorClicks)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
