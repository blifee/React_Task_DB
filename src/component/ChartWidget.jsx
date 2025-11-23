import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

export default function ChartWidget() {
  const [chartType, setChartType] = useState('bar');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  // Sample data
  const allData = [
    { month: 'Jan', sales: 4000, revenue: 2400, profit: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398, profit: 2210 },
    { month: 'Mar', sales: 2000, revenue: 9800, profit: 2290 },
    { month: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
    { month: 'May', sales: 1890, revenue: 4800, profit: 2181 },
    { month: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
    { month: 'Jul', sales: 3490, revenue: 4300, profit: 2100 },
    { month: 'Aug', sales: 3200, revenue: 3200, profit: 2400 },
    { month: 'Sep', sales: 2800, revenue: 4100, profit: 2300 },
    { month: 'Oct', sales: 3100, revenue: 3900, profit: 2600 },
    { month: 'Nov', sales: 3800, revenue: 4500, profit: 2800 },
    { month: 'Dec', sales: 4200, revenue: 5000, profit: 3000 },
  ];

  // Filter data based on date range
  const filteredData = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    
    return allData.filter((_, index) => index >= startMonth && index <= endMonth);
  }, [startDate, endDate, allData]);

  // Prepare data for pie chart
  const pieData = useMemo(() => {
    const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalProfit = filteredData.reduce((sum, item) => sum + item.profit, 0);
    
    return [
      { name: 'Sales', value: totalSales },
      { name: 'Revenue', value: totalRevenue },
      { name: 'Profit', value: totalProfit },
    ];
  }, [filteredData]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chart Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {chartType === 'bar' ? 'Bar Chart' : chartType === 'line' ? 'Line Chart' : 'Pie Chart'} - Sales Data
          </h3>
          
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'bar' && (
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="profit" fill="#f59e0b" name="Profit" />
              </BarChart>
            )}

            {chartType === 'line' && (
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} name="Profit" />
              </LineChart>
            )}

            {chartType === 'pie' && (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Data Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="font-semibold mb-3">Data Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-sm text-gray-600">Total Profit</p>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}