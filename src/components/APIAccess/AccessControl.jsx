import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Users,
  Key,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Crown,
  Zap,
  BarChart3,
  Settings,
  UserPlus,
  Waves,
  Lock,
  Globe,
} from "lucide-react";

export const AccessControl = () => {
  const [currentUsage, setCurrentUsage] = useState({
    requests: 2847,
    limit: 5000,
    resetTime: "2024-12-16T00:00:00Z",
  });

  const [permissions, setPermissions] = useState({
    datasets: true,
    species_search: true,
    ai_analysis: true,
    batch_processing: false,
    admin_access: false,
  });

  const accessLevels = [
    {
      name: "Public",
      icon: <Users className="h-6 w-6 text-slate-400" />,
      badge: "outline",
      color: "slate",
      price: "Free",
      requests: "100/hour",
      features: [
        "Public datasets access",
        "Basic species search",
        "Standard documentation",
        "Community support",
        "Rate limited API calls",
      ],
      limitations: [
        "No AI analysis tools",
        "Limited dataset access",
        "No batch processing",
        "Standard rate limits",
      ],
    },
    {
      name: "Researcher",
      icon: <Shield className="h-6 w-6 text-cyan-400" />,
      badge: "secondary",
      color: "cyan",
      price: "$49/month",
      requests: "5,000/hour",
      features: [
        "All public datasets",
        "Protected research data",
        "AI species identification",
        "Advanced search filters",
        "Priority support",
        "Batch processing (limited)",
        "Custom integrations",
      ],
      limitations: [
        "No admin functions",
        "Limited batch size",
        "Standard support hours",
      ],
      current: true,
    },
    {
      name: "Professional",
      icon: <Crown className="h-6 w-6 text-purple-400" />,
      badge: "default",
      color: "purple",
      price: "$199/month",
      requests: "25,000/hour",
      features: [
        "All researcher features",
        "Proprietary datasets",
        "Advanced AI models",
        "Real-time data streams",
        "24/7 priority support",
        "Unlimited batch processing",
        "Custom model training",
        "White-label options",
      ],
      limitations: ["No system administration", "Limited custom deployments"],
    },
    {
      name: "Enterprise",
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      badge: "destructive",
      color: "orange",
      price: "Custom",
      requests: "Unlimited",
      features: [
        "All professional features",
        "Custom data integrations",
        "Dedicated infrastructure",
        "SLA guarantees",
        "On-premise deployment",
        "Custom AI model development",
        "Dedicated account manager",
        "Full system administration",
      ],
      limitations: [],
    },
  ];

  const usageStats = [
    {
      label: "API Requests",
      value: currentUsage.requests,
      limit: currentUsage.limit,
      color: "cyan",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "Data Transfer",
      value: 847,
      limit: 5000,
      color: "blue",
      icon: <BarChart3 className="h-4 w-4" />,
      unit: "GB",
    },
    {
      label: "AI Analyses",
      value: 234,
      limit: 1000,
      color: "purple",
      icon: <Zap className="h-4 w-4" />,
    },
  ];

  const recentActivity = [
    {
      action: "API Key Regenerated",
      timestamp: "2024-12-15T14:30:00Z",
      status: "success",
      details: "Production key rotated successfully",
    },
    {
      action: "Rate Limit Warning",
      timestamp: "2024-12-15T12:15:00Z",
      status: "warning",
      details: "Approaching 80% of hourly limit",
    },
    {
      action: "Batch Analysis Completed",
      timestamp: "2024-12-15T10:45:00Z",
      status: "success",
      details: "Processed 150 marine images",
    },
    {
      action: "Permission Updated",
      timestamp: "2024-12-15T09:20:00Z",
      status: "info",
      details: "AI analysis access granted",
    },
  ];

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getUsagePercentage = (value, limit) => {
    return Math.min((value / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return "red";
    if (percentage >= 70) return "yellow";
    return "green";
  };

  return (
    <div className="space-y-8 text-slate-200">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">
          Access Control & Management
        </h2>
        <p className="text-slate-400">
          Manage your API access levels, usage monitoring, and security settings
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-1 shadow-xl">
          <TabsTrigger
            value="overview"
            className="flex items-center space-y-1 px-3 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="flex items-center space-y-1 px-3 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          >
            Usage & Limits
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            className="flex items-center space-y-1 px-3 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          >
            Permissions
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center space-y-1 px-3 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          >
            Security
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            {/* Access Levels */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Waves className="h-5 w-5 text-cyan-400" />
                  Access Level Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {accessLevels.map((level, index) => (
                    <Card
                      key={index}
                      className={`relative bg-slate-800/50 border-slate-700/50 transition-all duration-300 hover:scale-105 ${
                        level.current
                          ? "ring-2 ring-cyan-500 bg-cyan-500/10 border-cyan-500/30"
                          : "hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10"
                      }`}
                    >
                      {level.current && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                            Current
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="flex justify-center">
                            {level.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-100">
                              {level.name}
                            </h3>
                            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              {level.price}
                            </div>
                            <div className="text-sm text-slate-400">
                              {level.requests}
                            </div>
                          </div>

                          <div className="space-y-2 text-left">
                            <div className="text-sm font-medium text-cyan-400">
                              Features:
                            </div>
                            <ul className="text-xs space-y-1">
                              {level.features.slice(0, 4).map((feature, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-1 text-slate-300"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>

                            {level.limitations.length > 0 && (
                              <>
                                <div className="text-sm font-medium text-slate-400 mt-3">
                                  Limitations:
                                </div>
                                <ul className="text-xs space-y-1">
                                  {level.limitations
                                    .slice(0, 2)
                                    .map((limitation, i) => (
                                      <li
                                        key={i}
                                        className="flex items-center gap-1 text-slate-400"
                                      >
                                        <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                                        {limitation}
                                      </li>
                                    ))}
                                </ul>
                              </>
                            )}
                          </div>

                          {!level.current && (
                            <Button
                              className={`w-full transition-all duration-300 ${
                                level.name === "Public"
                                  ? "border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-500/25"
                              }`}
                              variant={
                                level.name === "Public" ? "outline" : "default"
                              }
                              size="sm"
                            >
                              {level.name === "Public"
                                ? "Downgrade"
                                : "Upgrade"}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/20 hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div
                        className={`h-2 w-2 rounded-full flex-shrink-0 ${
                          activity.status === "success"
                            ? "bg-green-400"
                            : activity.status === "warning"
                            ? "bg-yellow-400"
                            : activity.status === "error"
                            ? "bg-red-400"
                            : "bg-cyan-400"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-slate-200">
                          {activity.action}
                        </div>
                        <div className="text-sm text-slate-400">
                          {activity.details}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6">
            {/* Usage Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              {usageStats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl hover:shadow-cyan-500/10 hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {stat.icon}
                          <span className="font-medium text-slate-200">
                            {stat.label}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                        >
                          {stat.value.toLocaleString()}
                          {stat.unit && ` ${stat.unit}`}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">
                            Used: {stat.value.toLocaleString()}
                          </span>
                          <span className="text-slate-400">
                            Limit: {stat.limit.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={getUsagePercentage(stat.value, stat.limit)}
                          className="h-2 bg-slate-700"
                        />
                        <div className="text-xs text-slate-500">
                          {getUsagePercentage(stat.value, stat.limit).toFixed(
                            1
                          )}
                          % of limit used
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Usage */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-slate-100">
                  Detailed Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-200">
                        Rate Limit Status
                      </h4>
                      <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-slate-200">
                            Current Period
                          </span>
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">
                            Active
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Requests Made</div>
                            <div className="font-bold text-slate-200">
                              {currentUsage.requests.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400">Remaining</div>
                            <div className="font-bold text-slate-200">
                              {(
                                currentUsage.limit - currentUsage.requests
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400">Reset Time</div>
                            <div className="font-bold text-slate-200">
                              {new Date(
                                currentUsage.resetTime
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400">Usage Rate</div>
                            <div className="font-bold text-slate-200">
                              {(
                                (currentUsage.requests / currentUsage.limit) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-200">
                        Usage Patterns
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded border border-slate-600/20">
                          <span className="text-sm text-slate-300">
                            Peak Hour (14:00-15:00)
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400"
                          >
                            847 requests
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded border border-slate-600/20">
                          <span className="text-sm text-slate-300">
                            Most Used Endpoint
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400"
                          >
                            /species/search
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded border border-slate-600/20">
                          <span className="text-sm text-slate-300">
                            Avg Response Time
                          </span>
                          <Badge
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400"
                          >
                            0.24s
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded border border-slate-600/20">
                          <span className="text-sm text-slate-300">
                            Error Rate
                          </span>
                          <Badge
                            variant="outline"
                            className="border-green-500/30 text-green-400 bg-green-500/10"
                          >
                            0.12%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-slate-200">
                      Usage Alerts & Notifications
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium text-yellow-200">
                            Rate Limit Warning
                          </div>
                          <div className="text-sm text-yellow-300">
                            You've used 85% of your hourly limit
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                        >
                          Upgrade Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Settings className="h-5 w-5 text-cyan-400" />
                API Permissions & Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">
                    Endpoint Access
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(permissions).map(([key, enabled]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20 hover:bg-slate-700/50 transition-all duration-300"
                      >
                        <div>
                          <div className="font-medium capitalize text-slate-200">
                            {key.replace("_", " ")}
                          </div>
                          <div className="text-sm text-slate-400">
                            {key === "datasets" && "Access to marine datasets"}
                            {key === "species_search" &&
                              "Species identification and search"}
                            {key === "ai_analysis" &&
                              "AI-powered image analysis"}
                            {key === "batch_processing" &&
                              "Bulk data processing"}
                            {key === "admin_access" &&
                              "Administrative functions"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {enabled ? (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-slate-600 text-slate-400"
                            >
                              Disabled
                            </Badge>
                          )}
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => togglePermission(key)}
                            disabled={key === "admin_access"}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200">
                    Feature Limits
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-200">
                          Concurrent Requests
                        </span>
                        <Badge
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400"
                        >
                          10
                        </Badge>
                      </div>
                      <Progress value={60} className="h-2 bg-slate-800" />
                      <div className="text-xs text-slate-500 mt-1">
                        6 of 10 slots used
                      </div>
                    </div>

                    <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-200">
                          Storage Quota
                        </span>
                        <Badge
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400"
                        >
                          2.4 GB / 5 GB
                        </Badge>
                      </div>
                      <Progress value={48} className="h-2 bg-slate-800" />
                      <div className="text-xs text-slate-500 mt-1">
                        2.6 GB remaining
                      </div>
                    </div>

                    <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-200">
                          AI Processing
                        </span>
                        <Badge
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400"
                        >
                          234 / 1000
                        </Badge>
                      </div>
                      <Progress value={23.4} className="h-2 bg-slate-800" />
                      <div className="text-xs text-slate-500 mt-1">
                        766 analyses remaining
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h4 className="font-semibold text-cyan-200 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Permission Notes
                </h4>
                <ul className="text-sm text-cyan-300 space-y-1">
                  <li>• Some permissions may require plan upgrade to enable</li>
                  <li>• Permission changes take effect immediately</li>
                  <li>• Admin access requires additional verification</li>
                  <li>• Contact support for enterprise-level permissions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* API Keys Management */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Key className="h-5 w-5 text-cyan-400" />
                  API Keys Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-medium text-slate-200">
                          Production Key
                        </div>
                        <div className="text-sm text-slate-400 font-mono">
                          ov_prod_****abcdef
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                        Active
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      Created: Dec 1, 2024 • Last used: 2 minutes ago
                    </div>
                  </div>

                  <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-medium text-slate-200">
                          Development Key
                        </div>
                        <div className="text-sm text-slate-400 font-mono">
                          ov_dev_****xyz123
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-400"
                      >
                        Inactive
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      Created: Nov 15, 2024 • Last used: 3 days ago
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                  >
                    Generate New Key
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                  >
                    Rotate Keys
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Shield className="h-5 w-5 text-green-400" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div>
                      <div className="font-medium text-slate-200">
                        IP Whitelisting
                      </div>
                      <div className="text-sm text-slate-400">
                        Restrict API access by IP
                      </div>
                    </div>
                    <Switch
                      defaultChecked={false}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div>
                      <div className="font-medium text-slate-200">
                        Request Signing
                      </div>
                      <div className="text-sm text-slate-400">
                        Require signed requests
                      </div>
                    </div>
                    <Switch
                      defaultChecked={true}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div>
                      <div className="font-medium text-slate-200">
                        Audit Logging
                      </div>
                      <div className="text-sm text-slate-400">
                        Log all API activities
                      </div>
                    </div>
                    <Switch
                      defaultChecked={true}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <div>
                      <div className="font-medium text-slate-200">
                        Failed Login Alerts
                      </div>
                      <div className="text-sm text-slate-400">
                        Email alerts for failures
                      </div>
                    </div>
                    <Switch
                      defaultChecked={true}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  variant="default"
                >
                  Configure Security Rules
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* IP Whitelist */}
          <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                IP Address Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter IP address (e.g., 192.168.1.1)"
                    className="flex-1 bg-slate-700/30 border-slate-600/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">
                    Add IP
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <div>
                      <div className="font-mono text-slate-200">
                        203.45.67.89
                      </div>
                      <div className="text-sm text-slate-400">
                        Office Network
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                        Active
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded border border-slate-600/20">
                    <div>
                      <div className="font-mono text-slate-200">
                        45.123.78.90
                      </div>
                      <div className="text-sm text-slate-400">Home Office</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-400"
                      >
                        Inactive
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium text-yellow-200">
                    Security Notice
                  </span>
                </div>
                <div className="text-sm text-yellow-300">
                  IP whitelisting provides additional security but may restrict
                  access from dynamic IPs. Consider using signed requests for
                  better flexibility.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
