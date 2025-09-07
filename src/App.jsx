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

// New recommended pages to implement
import About from "./pages/About";
import Contact from "./pages/Contact";
import Publications from "./pages/Publications";
import Collaborations from "./pages/Collaborations";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Documentation from "./pages/Documentation";
import SpeciesDatabase from "./pages/SpeciesDatabase";
import ResearchTools from "./pages/ResearchTools";
import DataExplorer from "./pages/DataExplorer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Research Routes */}
          <Route path="/publications" element={<Publications />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/projects" element={<Projects />} />

          {/* Additional Platform Features */}
          <Route path="/species-database" element={<SpeciesDatabase />} />
          <Route path="/research-tools" element={<ResearchTools />} />
          <Route path="/data-explorer" element={<DataExplorer />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Information Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Main Application Routes */}
          <Route element={<Layout />}>
            {/* Platform Routes */}
            <Route path="/dashboard" element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/api-access" element={<APIAccess />} />
            <Route path="/outreach" element={<Outreach />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
