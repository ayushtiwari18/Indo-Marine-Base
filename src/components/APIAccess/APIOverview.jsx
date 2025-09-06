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
      icon: <Database className="h-6 w-6 text-blue-500" />,
      title: "Rich Marine Data",
      description:
        "Access comprehensive datasets covering oceanography, marine biology, and environmental monitoring",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "AI-Powered Analysis",
      description:
        "Leverage machine learning for species identification, pattern recognition, and predictive modeling",
    },
    {
      icon: <Activity className="h-6 w-6 text-green-500" />,
      title: "Real-time Processing",
      description:
        "Stream live data and get instant analysis results with our high-performance infrastructure",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Enterprise Security",
      description:
        "Bank-grade security with OAuth 2.0, rate limiting, and comprehensive audit logging",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-slate-600">Uptime</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600">50M+</div>
            <div className="text-sm text-slate-600">API Calls/Month</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600">12TB</div>
            <div className="text-sm text-slate-600">Data Available</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-orange-600">150ms</div>
            <div className="text-sm text-slate-600">Avg Response</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* API Key Management */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-500" />
              Your API Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">Production API Key</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="api-key"
                  value={apiKey}
                  readOnly
                  className="font-mono text-sm bg-slate-50"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(apiKey)}
                  className="px-3"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">
                  Rate Limit
                </Label>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">Requests/Hour</span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    5,000
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">
                  Access Level
                </Label>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm">Role</span>
                  <Badge className="bg-green-500">Professional</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Regenerate Key
              </Button>
              <Button variant="outline" className="flex-1">
                View Usage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Information */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle>API Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <Label className="text-sm font-semibold text-slate-700">
                  Base URL
                </Label>
                <div className="mt-2 p-3 bg-white rounded border font-mono text-sm">
                  https://api.oceanvista.gov.in/v2
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-slate-700">
                    Version
                  </Label>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      v2.1.0
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-slate-700">
                    Format
                  </Label>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      JSON
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">
                  Authentication
                </Label>
                <p className="text-sm text-slate-600 mt-1">
                  Bearer token in Authorization header
                </p>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded mt-2 block">
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
            className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-slate-50"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-center">
            Quick Start in 30 Seconds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Copy Your Key</h4>
              <p className="text-sm text-slate-600">
                Use the API key from the credentials section above
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Make First Call</h4>
              <p className="text-sm text-slate-600">
                Try our interactive API tester or use code examples
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto text-lg font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Integrate & Build</h4>
              <p className="text-sm text-slate-600">
                Use our SDKs and documentation to build amazing apps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
