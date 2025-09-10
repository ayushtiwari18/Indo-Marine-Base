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
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

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
import DataVisualizationTool from "./components/Visualization/DataVisualizationTool";
import TableauDashboard from "./pages/TableauDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen bg-slate-900 pt-20">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Index />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            {/* MAIN DASHBOARD (matches architecture) */}
            <Route path="/dashboard" element={<Home />} />

            {/* DATA EXPLORER SUITE (matches architecture) */}
            <Route path="/data-explorer" element={<DataExplorer />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/species-database" element={<SpeciesDatabase />} />

            {/* VISUALIZATION & MAPPING (matches architecture) */}
            <Route path="/visualization" element={<Visualization />} />
            <Route
              path="/visualization-tool"
              element={<DataVisualizationTool />}
            />

            {/* AI RESEARCH HUB (matches architecture) */}
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/research-tools" element={<ResearchTools />} />

            {/* ANALYTICS DASHBOARD (matches architecture) */}
            <Route path="/analytics" element={<TableauDashboard />} />

            {/* COLLABORATION PLATFORM (matches architecture) */}
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />

            {/* BACKEND API ACCESS (matches architecture) */}
            <Route path="/api-access" element={<APIAccess />} />
            <Route path="/documentation" element={<Documentation />} />

            {/* Admin Routes */}
            <Route element={<Layout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Information Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/outreach" element={<Outreach />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
