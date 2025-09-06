import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIOverview } from "@/components/APIAccess/APIOverview.jsx";
import { EndpointsDocumentation } from "@/components/APIAccess/EndpointsDocumentation";
import { CodeExamples } from "@/components/APIAccess/CodeExamples";
import { AccessControl } from "@/components/APIAccess/AccessControl";
import { APITesting } from "@/components/APIAccess/APITesting";
import { SDKDownloads } from "@/components/APIAccess/SDKDownloads";

const APIAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            OceanVista API Hub
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive marine data access with enterprise-grade reliability
            and developer-first experience
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="endpoints"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Endpoints
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Code Examples
            </TabsTrigger>
            <TabsTrigger
              value="testing"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              API Testing
            </TabsTrigger>
            <TabsTrigger
              value="sdk"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              SDKs
            </TabsTrigger>
            <TabsTrigger
              value="access"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <APIOverview />
          </TabsContent>

          <TabsContent value="endpoints">
            <EndpointsDocumentation />
          </TabsContent>

          <TabsContent value="examples">
            <CodeExamples />
          </TabsContent>

          <TabsContent value="testing">
            <APITesting />
          </TabsContent>

          <TabsContent value="sdk">
            <SDKDownloads />
          </TabsContent>

          <TabsContent value="access">
            <AccessControl />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIAccess;
