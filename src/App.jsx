import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Visualization from "./pages/Visualization";
import AITools from "./pages/AITools";
import APIAccess from "./pages/APIAccess";
import AdminDashboard from "./pages/AdminDashboard";
import Outreach from "./pages/Outreach";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/api-access" element={<APIAccess />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
