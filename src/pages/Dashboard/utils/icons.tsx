import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
    case "down":
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    case "stable":
      return <Minus className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "processing":
      return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-gray-500" />;
  }
};
