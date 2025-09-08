import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Key,
  Activity,
  Database,
  Zap,
  Shield,
  CheckCircle,
  Waves,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const APIOverview = () => {
  const [apiKey, setApiKey] = useState(
    "ov_prod_1234567890abcdef1234567890abcdef"
  );
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: <Database className="h-6 w-6 text-cyan-400" />,
      title: "Rich Marine Data",
      description:
        "Access comprehensive datasets covering oceanography, marine biology, and environmental monitoring",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "AI-Powered Analysis",
      description:
        "Leverage machine learning for species identification, pattern recognition, and predictive modeling",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: <Activity className="h-6 w-6 text-green-400" />,
      title: "Real-time Processing",
      description:
        "Stream live data and get instant analysis results with our high-performance infrastructure",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Enterprise Security",
      description:
        "Bank-grade security with OAuth 2.0, rate limiting, and comprehensive audit logging",
      gradient: "from-purple-500/20 to-violet-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <CardContent className="p-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
              <Activity className="h-3 w-3" />
              Uptime
            </div>
          </CardContent>
        </Card>
        <Card className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <CardContent className="p-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              50M+
            </div>
            <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              API Calls/Month
            </div>
          </CardContent>
        </Card>
        <Card className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <CardContent className="p-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              12TB
            </div>
            <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
              <Database className="h-3 w-3" />
              Data Available
            </div>
          </CardContent>
        </Card>
        <Card className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
          <CardContent className="p-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              150ms
            </div>
            <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              Avg Response
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* API Key Management */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Key className="h-5 w-5 text-cyan-400" />
              Your API Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-slate-200">
                Production API Key
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="api-key"
                  value={apiKey}
                  readOnly
                  className="font-mono text-sm bg-slate-700/30 border-slate-600/30 text-slate-200"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(apiKey)}
                  className="px-3 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-400">
                  Rate Limit
                </Label>
                <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <span className="text-sm text-slate-300">Requests/Hour</span>
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    5,000
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-400">
                  Access Level
                </Label>
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span className="text-sm text-slate-300">Role</span>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Professional
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
              >
                Regenerate Key
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
              >
                View Usage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Information */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              API Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg">
                <Label className="text-sm font-semibold text-slate-200">
                  Base URL
                </Label>
                <div className="mt-2 p-3 bg-slate-800/50 border border-slate-600/30 rounded font-mono text-sm text-slate-300">
                  https://api.oceanvista.gov.in/v2
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-slate-200">
                    Version
                  </Label>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                    >
                      v2.1.0
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-slate-200">
                    Format
                  </Label>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-400 border-green-500/30"
                    >
                      JSON
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-200">
                  Authentication
                </Label>
                <p className="text-sm text-slate-400 mt-1">
                  Bearer token in Authorization header
                </p>
                <code className="text-xs bg-slate-800/50 border border-slate-600/30 text-cyan-300 px-2 py-1 rounded mt-2 block">
                  Authorization: Bearer your_api_key_here
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div
                className={`mb-4 flex justify-center p-3 rounded-xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2 text-slate-100">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-slate-100 flex items-center justify-center gap-2">
            <Waves className="h-6 w-6 text-cyan-400" />
            Quick Start in 30 Seconds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold shadow-lg shadow-cyan-500/25">
                1
              </div>
              <h4 className="font-semibold mb-2 text-slate-100">
                Copy Your Key
              </h4>
              <p className="text-sm text-slate-400">
                Use the API key from the credentials section above
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold shadow-lg shadow-cyan-500/25">
                2
              </div>
              <h4 className="font-semibold mb-2 text-slate-100">
                Make First Call
              </h4>
              <p className="text-sm text-slate-400">
                Try our interactive API tester or use code examples
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold shadow-lg shadow-cyan-500/25">
                3
              </div>
              <h4 className="font-semibold mb-2 text-slate-100">
                Integrate & Build
              </h4>
              <p className="text-sm text-slate-400">
                Use our SDKs and documentation to build amazing apps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
