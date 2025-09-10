import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Upload,
  Users,
  Database,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Shield,
  Settings,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Zap,
  Globe,
  Brain,
  FlaskConical,
  Waves,
  ChevronRight,
  AlertTriangle,
  Info,
  XCircle,
  Play,
  Pause,
  Square,
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [liveMetrics, setLiveMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 34,
    networkIn: 1.2,
    networkOut: 0.8,
    activeConnections: 234,
    requestsPerSecond: 156,
    responseTime: 89,
  });

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        cpuUsage: Math.max(
          20,
          Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)
        ),
        memoryUsage: Math.max(
          30,
          Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)
        ),
        diskUsage: Math.max(
          20,
          Math.min(60, prev.diskUsage + (Math.random() - 0.5) * 2)
        ),
        networkIn: Math.max(
          0.5,
          Math.min(5, prev.networkIn + (Math.random() - 0.5) * 0.5)
        ),
        networkOut: Math.max(
          0.3,
          Math.min(3, prev.networkOut + (Math.random() - 0.5) * 0.3)
        ),
        activeConnections: Math.max(
          100,
          Math.min(
            500,
            prev.activeConnections + Math.floor((Math.random() - 0.5) * 20)
          )
        ),
        requestsPerSecond: Math.max(
          50,
          Math.min(
            300,
            prev.requestsPerSecond + Math.floor((Math.random() - 0.5) * 30)
          )
        ),
        responseTime: Math.max(
          50,
          Math.min(
            200,
            prev.responseTime + Math.floor((Math.random() - 0.5) * 20)
          )
        ),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const ingestionLogs = [
    {
      id: 1,
      filename: "arabian_sea_temp_2024.csv",
      type: "Oceanography",
      size: "2.3 GB",
      uploadedBy: "Dr. Sharma",
      uploadDate: "2024-12-10T14:30:00",
      status: "completed",
      records: 45000,
      processingTime: "12m 34s",
      quality: "95%",
      region: "Arabian Sea",
      depth: "0-200m",
    },
    {
      id: 2,
      filename: "fish_census_bengal.json",
      type: "Taxonomy",
      size: "890 MB",
      uploadedBy: "Research Team",
      uploadDate: "2024-12-08T09:15:00",
      status: "processing",
      records: 12500,
      processingTime: "8m 12s",
      quality: "87%",
      region: "Bay of Bengal",
      depth: "0-500m",
    },
    {
      id: 3,
      filename: "otolith_images_batch2.zip",
      type: "Otolith Morphology",
      size: "5.1 GB",
      uploadedBy: "AI Team",
      uploadDate: "2024-12-05T16:45:00",
      status: "failed",
      records: 8900,
      processingTime: "Failed at 3m 21s",
      quality: "N/A",
      region: "Indian Ocean",
      depth: "Various",
    },
    {
      id: 4,
      filename: "coral_health_survey_2024.xlsx",
      type: "Environmental",
      size: "156 MB",
      uploadedBy: "Dr. Patel",
      uploadDate: "2024-12-09T11:22:00",
      status: "completed",
      records: 2340,
      processingTime: "2m 45s",
      quality: "98%",
      region: "Andaman Islands",
      depth: "0-30m",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      email: "r.sharma@cmlre.gov.in",
      role: "scientist",
      institution: "CMLRE",
      lastActive: "2024-12-15T10:30:00",
      apiCalls: 245,
      status: "active",
      joinDate: "2023-03-15",
      totalDownloads: 1234,
      region: "Kerala",
    },
    {
      id: 2,
      name: "Dr. Priya Nair",
      email: "priya.nair@niot.res.in",
      role: "scientist",
      institution: "NIOT",
      lastActive: "2024-12-14T15:45:00",
      apiCalls: 189,
      status: "active",
      joinDate: "2023-07-22",
      totalDownloads: 892,
      region: "Tamil Nadu",
    },
    {
      id: 3,
      name: "Prof. Kumar Singh",
      email: "k.singh@fishery.gov.in",
      role: "policymaker",
      institution: "Fisheries Ministry",
      lastActive: "2024-12-13T09:20:00",
      apiCalls: 67,
      status: "active",
      joinDate: "2023-01-10",
      totalDownloads: 234,
      region: "New Delhi",
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@oceanvista.gov.in",
      role: "admin",
      institution: "OceanVista",
      lastActive: "2024-12-15T12:00:00",
      apiCalls: 1234,
      status: "active",
      joinDate: "2022-01-01",
      totalDownloads: 5678,
      region: "Mumbai",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High memory usage detected on ML processing server",
      timestamp: "2024-12-15T11:45:00",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      message: "Scheduled backup completed successfully",
      timestamp: "2024-12-15T06:00:00",
      severity: "low",
    },
    {
      id: 3,
      type: "error",
      message: "Failed to process otolith_images_batch2.zip",
      timestamp: "2024-12-14T16:30:00",
      severity: "high",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-400" />;
      case "scientist":
        return <User className="h-4 w-4 text-cyan-400" />;
      case "policymaker":
        return <Settings className="h-4 w-4 text-emerald-400" />;
      default:
        return <User className="h-4 w-4 text-slate-400" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "info":
        return <Info className="h-5 w-5 text-cyan-400" />;
      default:
        return <Info className="h-5 w-5 text-slate-400" />;
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const MetricCard = ({ title, value, unit, trend, icon: Icon, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="flex items-center gap-1">
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span
              className={`text-sm ${
                trend > 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {Math.abs(trend)}%
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
            {value}
            {unit}
          </div>
          <div className="text-sm text-slate-400">{title}</div>
        </div>
      </div>
    </motion.div>
  );

  const LiveMetricGauge = ({ title, value, max, unit, color }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300">{title}</span>
        <span className="text-lg font-semibold text-cyan-300">
          {value}
          {unit}
        </span>
      </div>
      <Progress
        value={(value / max) * 100}
        className={`h-2 bg-slate-700/50 ${color}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-sphere floating-sphere-1"></div>
        <div className="floating-sphere floating-sphere-2"></div>
        <div className="floating-sphere floating-sphere-3"></div>
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Marine Intelligence Hub
              </h1>
              <p className="text-slate-400 text-lg">
                Advanced ocean data management & analytics platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
            <Button className="ocean-btn-primary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Live Performance Metrics */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MetricCard
            title="Active Datasets"
            value="156"
            unit=""
            trend={5.2}
            icon={Database}
            color="text-cyan-400"
          />
          <MetricCard
            title="Research Users"
            value="89"
            unit=""
            trend={12.1}
            icon={Users}
            color="text-blue-400"
          />
          <MetricCard
            title="Data Processed"
            value="2.4"
            unit="TB"
            trend={8.7}
            icon={Activity}
            color="text-emerald-400"
          />
          <MetricCard
            title="System Uptime"
            value="99.9"
            unit="%"
            trend={0.1}
            icon={Server}
            color="text-purple-400"
          />
        </motion.div>

        {/* System Alerts */}
        <AnimatePresence>
          {systemAlerts.length > 0 && (
            <motion.div
              className="bg-slate-800/40 backdrop-blur-sm border border-red-500/30 rounded-xl p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <h3 className="font-semibold text-red-300">System Alerts</h3>
              </div>
              <div className="space-y-2">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg"
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-200">
                        {alert.message}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live System Metrics */}
        <motion.div
          className="bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
              <Activity className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-cyan-200">
              Live System Performance
            </h3>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse ml-auto"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LiveMetricGauge
              title="CPU Usage"
              value={liveMetrics.cpuUsage.toFixed(1)}
              max={100}
              unit="%"
              color="text-cyan-400"
            />
            <LiveMetricGauge
              title="Memory"
              value={liveMetrics.memoryUsage.toFixed(1)}
              max={100}
              unit="%"
              color="text-blue-400"
            />
            <LiveMetricGauge
              title="Network In"
              value={liveMetrics.networkIn.toFixed(1)}
              max={5}
              unit="MB/s"
              color="text-emerald-400"
            />
            <LiveMetricGauge
              title="Response Time"
              value={liveMetrics.responseTime}
              max={200}
              unit="ms"
              color="text-purple-400"
            />
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="datasets" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-1">
            <TabsTrigger
              value="datasets"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-600/20 data-[state=active]:text-cyan-200"
            >
              <Database className="h-4 w-4 mr-2" />
              Dataset Management
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-600/20 data-[state=active]:text-cyan-200"
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-600/20 data-[state=active]:text-cyan-200"
            >
              <Brain className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-600/20 data-[state=active]:text-cyan-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Dataset Management Tab */}
          <TabsContent value="datasets" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upload Form */}
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                    <Upload className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Upload Marine Dataset
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-cyan-200">Dataset Name</Label>
                      <Input
                        className="bg-slate-700/50 border-cyan-500/30 text-cyan-100 focus:border-cyan-400"
                        placeholder="e.g., Arabian Sea Temperature 2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cyan-200">Research Category</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-700/50 border-cyan-500/30 text-cyan-100">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-cyan-500/30">
                          <SelectItem value="oceanography">
                            🌊 Oceanography
                          </SelectItem>
                          <SelectItem value="taxonomy">
                            🐠 Marine Taxonomy
                          </SelectItem>
                          <SelectItem value="otolith">
                            🔬 Otolith Morphology
                          </SelectItem>
                          <SelectItem value="edna">
                            🧬 Molecular/eDNA
                          </SelectItem>
                          <SelectItem value="coral">
                            🪸 Coral Ecosystems
                          </SelectItem>
                          <SelectItem value="fisheries">
                            🎣 Fisheries Data
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-cyan-200">Ocean Region</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-700/50 border-cyan-500/30 text-cyan-100">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-cyan-500/30">
                          <SelectItem value="arabian-sea">
                            Arabian Sea
                          </SelectItem>
                          <SelectItem value="bay-bengal">
                            Bay of Bengal
                          </SelectItem>
                          <SelectItem value="indian-ocean">
                            Indian Ocean
                          </SelectItem>
                          <SelectItem value="andaman">
                            Andaman & Nicobar
                          </SelectItem>
                          <SelectItem value="lakshadweep">
                            Lakshadweep Sea
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cyan-200">Depth Range</Label>
                      <Input
                        className="bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                        placeholder="e.g., 0-200m"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cyan-200">Collection Year</Label>
                      <Input
                        className="bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                        placeholder="e.g., 2024"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cyan-200">
                      Research Description
                    </Label>
                    <Textarea
                      className="bg-slate-700/50 border-cyan-500/30 text-cyan-100 min-h-[100px]"
                      placeholder="Describe the dataset, methodology, and scientific objectives..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cyan-200">Dataset File</Label>
                    <Input
                      type="file"
                      className="bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>

                  {isUploading && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-cyan-300">Uploading...</span>
                        <span className="text-cyan-300">
                          {uploadProgress.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </motion.div>
                  )}

                  <Button
                    className="w-full ocean-btn-primary"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing Dataset...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload & Process Dataset
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-600/20">
                    <Activity className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Recent Processing Activity
                  </h3>
                </div>

                <div className="space-y-4">
                  {ingestionLogs.slice(0, 4).map((log, index) => (
                    <motion.div
                      key={log.id}
                      className="flex items-center gap-4 p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-cyan-500/30 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-200 truncate">
                          {log.filename}
                        </div>
                        <div className="text-sm text-slate-400 space-x-2">
                          <span>{log.type}</span>
                          <span>•</span>
                          <span>{log.size}</span>
                          <span>•</span>
                          <span>{log.records.toLocaleString()} records</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Quality: {log.quality} • Processing:{" "}
                          {log.processingTime}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant={
                            log.status === "completed"
                              ? "default"
                              : log.status === "processing"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {log.status}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {new Date(log.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Detailed Dataset Table */}
            <motion.div
              className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                      <Database className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-200">
                      Dataset Processing Logs
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search datasets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-32 bg-slate-700/50 border-cyan-500/30 text-cyan-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-cyan-500/30">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700/50">
                      <TableHead className="text-cyan-200">Dataset</TableHead>
                      <TableHead className="text-cyan-200">
                        Type & Region
                      </TableHead>
                      <TableHead className="text-cyan-200">
                        Size & Records
                      </TableHead>
                      <TableHead className="text-cyan-200">Quality</TableHead>
                      <TableHead className="text-cyan-200">
                        Uploaded By
                      </TableHead>
                      <TableHead className="text-cyan-200">Status</TableHead>
                      <TableHead className="text-cyan-200">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingestionLogs
                      .filter(
                        (log) =>
                          (filterStatus === "all" ||
                            log.status === filterStatus) &&
                          (searchTerm === "" ||
                            log.filename
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()))
                      )
                      .map((log) => (
                        <TableRow
                          key={log.id}
                          className="border-slate-700/30 hover:bg-slate-700/20"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-slate-200">
                                {log.filename}
                              </div>
                              <div className="text-sm text-slate-400">
                                Uploaded:{" "}
                                {new Date(log.uploadDate).toLocaleString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge variant="outline" className="text-xs">
                                {log.type}
                              </Badge>
                              <div className="text-sm text-slate-400">
                                {log.region}
                              </div>
                              <div className="text-xs text-slate-500">
                                Depth: {log.depth}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-slate-200">{log.size}</div>
                              <div className="text-sm text-slate-400">
                                {log.records.toLocaleString()} records
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-slate-200">
                                {log.quality}
                              </div>
                              <div className="text-xs text-slate-400">
                                {log.processingTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-slate-200">
                              {log.uploadedBy}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              <span className="capitalize text-slate-200">
                                {log.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <motion.div
              className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-600/20">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-200">
                      Research Community Management
                    </h3>
                  </div>
                  <Button className="ocean-btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700/50">
                      <TableHead className="text-cyan-200">
                        Researcher
                      </TableHead>
                      <TableHead className="text-cyan-200">
                        Role & Institution
                      </TableHead>
                      <TableHead className="text-cyan-200">Activity</TableHead>
                      <TableHead className="text-cyan-200">API Usage</TableHead>
                      <TableHead className="text-cyan-200">Region</TableHead>
                      <TableHead className="text-cyan-200">Status</TableHead>
                      <TableHead className="text-cyan-200">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-slate-700/30 hover:bg-slate-700/20"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-slate-200">
                                {user.name}
                              </div>
                              <div className="text-sm text-slate-400">
                                {user.email}
                              </div>
                              <div className="text-xs text-slate-500">
                                Joined:{" "}
                                {new Date(user.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getRoleIcon(user.role)}
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "destructive"
                                    : user.role === "scientist"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {user.role}
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-400">
                              {user.institution}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm text-slate-200">
                              Last:{" "}
                              {new Date(user.lastActive).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-400">
                              {user.totalDownloads.toLocaleString()} downloads
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={(user.apiCalls / 1000) * 100}
                              className="w-20 h-2"
                            />
                            <div className="text-xs text-slate-400">
                              {user.apiCalls}/1000 calls
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-200">{user.region}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1 animate-pulse"></div>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-xs"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2 text-xs text-red-400"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Suspend
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-slate-800 border-red-500/30">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-red-300">
                                    Suspend User
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will suspend {user.name}'s access to
                                    the platform. This action can be reversed.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-slate-700 border-slate-600">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                    Suspend
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>

            {/* User Statistics */}
            <div className="grid gap-6 md:grid-cols-4">
              <MetricCard
                title="Total Researchers"
                value="89"
                unit=""
                trend={12.1}
                icon={Users}
                color="text-blue-400"
              />
              <MetricCard
                title="Marine Scientists"
                value="67"
                unit=""
                trend={8.5}
                icon={FlaskConical}
                color="text-cyan-400"
              />
              <MetricCard
                title="Policy Makers"
                value="19"
                unit=""
                trend={15.2}
                icon={Settings}
                color="text-emerald-400"
              />
              <MetricCard
                title="Admin Users"
                value="3"
                unit=""
                trend={0}
                icon={Shield}
                color="text-red-400"
              />
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-600/20">
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    AI/ML Analytics
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-200">
                        Species Classification
                      </div>
                      <div className="text-sm text-slate-400">
                        Active ML models: 12
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-300">
                        94.5%
                      </div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-200">
                        Otolith Analysis
                      </div>
                      <div className="text-sm text-slate-400">
                        Processing: 2,340 images
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-300">
                        87.2%
                      </div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-200">
                        Environmental Prediction
                      </div>
                      <div className="text-sm text-slate-400">
                        Next 30 days forecast
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-300">
                        91.8%
                      </div>
                      <div className="text-xs text-slate-400">Confidence</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-600/20">
                    <Globe className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Global Usage
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">API Requests Today</span>
                    <span className="text-2xl font-bold text-cyan-300">
                      {liveMetrics.requestsPerSecond * 86400}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Data Downloads</span>
                    <span className="text-2xl font-bold text-blue-300">
                      1,234
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Sessions</span>
                    <span className="text-2xl font-bold text-emerald-300">
                      {liveMetrics.activeConnections}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Avg Response Time</span>
                    <span className="text-2xl font-bold text-purple-300">
                      {liveMetrics.responseTime}ms
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div
                className="lg:col-span-2 ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-600/20">
                    <Server className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    System Health Dashboard
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-cyan-400" />
                          <span className="text-slate-300">CPU Usage</span>
                        </div>
                        <span className="text-lg font-semibold text-cyan-300">
                          {liveMetrics.cpuUsage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={liveMetrics.cpuUsage} className="h-2" />
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-blue-400" />
                          <span className="text-slate-300">Memory</span>
                        </div>
                        <span className="text-lg font-semibold text-blue-300">
                          {liveMetrics.memoryUsage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={liveMetrics.memoryUsage}
                        className="h-2"
                      />
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">Network</span>
                        </div>
                        <span className="text-lg font-semibold text-emerald-300">
                          {liveMetrics.networkIn.toFixed(1)} MB/s
                        </span>
                      </div>
                      <Progress
                        value={(liveMetrics.networkIn / 5) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">Database</span>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300">
                        Healthy
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">API Gateway</span>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300">
                        Online
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">ML Services</span>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300">
                        Running
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-slate-300">Storage</span>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-300">
                        65% Full
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                    <Zap className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Quick Actions
                  </h3>
                </div>

                <div className="space-y-3">
                  <Button className="w-full ocean-btn-secondary justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button className="w-full ocean-btn-secondary justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart Services
                  </Button>
                  <Button className="w-full ocean-btn-secondary justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button className="w-full ocean-btn-secondary justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    System Config
                  </Button>
                  <Button className="w-full ocean-btn-secondary justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Audit
                  </Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
