
import { Activity, TrendingUp, AlertTriangle, Wrench, BarChart3, Calendar } from 'lucide-react';
import MetricsCard from './MetricsCard';
import ProductionChart from './ProductionChart';
// @ts-ignore: importing a JS module without a declaration file
import AssetUtilization from './AssetUtilization';
import MaintenancePredictor from './MaintenancePredictor';
import RecentReports from './RecentReports';
import { analyticsData } from '../data/dummyData';
import { NavLink } from 'react-router-dom';




export function Dashboard() {
  const latestMetrics = analyticsData.currentMetrics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Analytics & Dashboard</h1>
                <p className="text-sm taext-slate-500">Real-time insights and predictions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top metrics */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Production Efficiency"
              value={`${latestMetrics.productionEfficiency}%`}
              change={latestMetrics.efficiencyChange}
              icon={<TrendingUp className="w-6 h-6" />}
              color="blue"
            />
            <MetricsCard
              title="Asset Utilization"
              value={`${latestMetrics.assetUtilization}%`}
              change={latestMetrics.utilizationChange}
              icon={<Activity className="w-6 h-6" />}
              color="green"
            />
            <MetricsCard
              title="Total Downtime"
              value={`${latestMetrics.totalDowntime}h`}
              change={latestMetrics.downtimeChange}
              icon={<AlertTriangle className="w-6 h-6" />}
              color="orange"
              isNegativeGood
            />
            <MetricsCard
              title="Maintenance Due"
              value={latestMetrics.maintenanceDue}
              change={0}
              icon={<Wrench className="w-6 h-6" />}
              color="red"
            />
          </div>
        </section>

        {/* Chart (left) + Maintenance Predictor (right) */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left half: ProductionChart */}
            <ProductionChart data={analyticsData.productionTrends} />

            {/* Right half: MaintenancePredictor */}
            <MaintenancePredictor predictions={analyticsData.maintenancePredictions} />
          </div>
        </section>

        {/* Optional middle section (commented out) */}
        {/*
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DowntimeBreakdown data={analyticsData.downtimeBreakdown} />
            <EfficiencyComparison data={analyticsData.efficiencyComparison} />
          </div>
        </section>
        */}

        {/* Interchanged: Asset Utilization now sits with Recent Reports */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AssetUtilization data={analyticsData.assets} />
            <RecentReports reports={analyticsData.recentReports} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
``