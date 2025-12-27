
import { FileText, Download } from 'lucide-react';

export default function RecentReports({ reports }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Recent Reports</h2>
        <p className="text-sm text-slate-500">Generated analytics reports</p>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.reportId}
            className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Report #{report.reportId}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {new Date(report.generatedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors group-hover:bg-blue-100">
                <Download className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-3 group-hover:bg-white transition-colors">
                <p className="text-xs text-slate-600 mb-1">Production Efficiency</p>
                <p className="text-lg font-bold text-slate-900">{report.productionEfficiency}%</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 group-hover:bg-white transition-colors">
                <p className="text-xs text-slate-600 mb-1">Downtime</p>
                <p className="text-lg font-bold text-slate-900">{report.downtime}h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
