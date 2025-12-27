
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import React from 'react';

type Priority = 'high' | 'medium' | 'low';

const priorityConfig = {
  high: {
    color: 'bg-red-50 border-red-200 text-red-700',
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    badge: 'bg-red-100 text-red-700',
  },
  medium: {
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    icon: <Clock className="w-5 h-5 text-orange-600" />,
    badge: 'bg-orange-100 text-orange-700',
  },
  low: {
    color: 'bg-green-50 border-green-200 text-green-700',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    badge: 'bg-green-100 text-green-700',
  },
} as const;

type PriorityConfig = typeof priorityConfig;
type PriorityKey = keyof PriorityConfig; // 'high' | 'medium' | 'low'

interface MaintenancePrediction {
  assetId: string;
  assetName: string;
  predictedDate: string;
  priority: Priority;         // ❗ match the keys
  confidence: number;
}

interface MaintenancePredictorProps {
  predictions: MaintenancePrediction[];
}

export default function MaintenancePredictor({ predictions }: MaintenancePredictorProps) {
  const getDaysUntil = (date: string) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((new Date(date).getTime() - Date.now()) / msPerDay);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Maintenance Predictions</h2>
        <p className="text-sm text-slate-500">AI-powered maintenance forecasting</p>
      </div>

      <div className="space-y-3">
        {predictions.map((prediction) => {
          // Narrow the key so TS knows it's valid:
          const key = prediction.priority as PriorityKey;
          const config = priorityConfig[key];

          const daysUntil = getDaysUntil(prediction.predictedDate);

          return (
            <div
              key={prediction.assetId}
              className={`border rounded-lg p-4 ${config.color} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{config.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{prediction.assetName}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">Due in {daysUntil} days</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${config.badge}`}>
                  {prediction.priority}
                </span>
              </div>

              <div className="flex items-start justify-between text-sm">
                <div />
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-xs text-slate-600">
                    {new Date(prediction.predictedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-slate-700 h-1.5 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {prediction.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
