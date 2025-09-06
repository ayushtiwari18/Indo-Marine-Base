import { useState } from "react";
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
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const ingestionLogs = [
    {
      id: 1,
      filename: "arabian_sea_temp_2024.csv",
      type: "Oceanography",
      size: "2.3 GB",
      uploadedBy: "Dr. Sharma",
      uploadDate: "2024-12-10",
      status: "completed",
      records: 45000,
    },
    {
      id: 2,
      filename: "fish_census_bengal.json",
      type: "Taxonomy",
      size: "890 MB",
      uploadedBy: "Research Team",
      uploadDate: "2024-12-08",
      status: "processing",
      records: 12500,
    },
    {
      id: 3,
      filename: "otolith_images_batch2.zip",
      type: "Otolith Morphology",
      size: "5.1 GB",
      uploadedBy: "AI Team",
      uploadDate: "2024-12-05",
      status: "failed",
      records: 8900,
    },
  ];

  const users = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      email: "r.sharma@cmlre.gov.in",
      role: "scientist",
      institution: "CMLRE",
      lastActive: "2024-12-15",
      apiCalls: 245,
    },
    {
      id: 2,
      name: "Dr. Priya Nair",
      email: "priya.nair@niot.res.in",
      role: "scientist",
      institution: "NIOT",
      lastActive: "2024-12-14",
      apiCalls: 189,
    },
    {
      id: 3,
      name: "Prof. Kumar Singh",
      email: "k.singh@fishery.gov.in",
      role: "policymaker",
      institution: "Fisheries Ministry",
      lastActive: "2024-12-13",
      apiCalls: 67,
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@oceanvista.gov.in",
      role: "admin",
      institution: "OceanVista",
      lastActive: "2024-12-15",
      apiCalls: 1234,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "scientist":
        return <User className="h-4 w-4 text-blue-500" />;
      case "policymaker":
        return <Settings className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            System administration and data management
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">
                  Active Datasets
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">
                  Registered Users
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-secondary" />
              <div>
                <div className="text-2xl font-bold">2.4TB</div>
                <div className="text-sm text-muted-foreground">
                  Total Data Size
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-muted-foreground">
                  System Uptime
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="datasets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="datasets">Dataset Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        {/* Dataset Management Tab */}
        <TabsContent value="datasets" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload New Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataset-name">Dataset Name</Label>
                  <Input id="dataset-name" placeholder="Enter dataset name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oceanography">
                          Oceanography
                        </SelectItem>
                        <SelectItem value="taxonomy">Taxonomy</SelectItem>
                        <SelectItem value="otolith">
                          Otolith Morphology
                        </SelectItem>
                        <SelectItem value="edna">Molecular/eDNA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                        <SelectItem value="bay-bengal">
                          Bay of Bengal
                        </SelectItem>
                        <SelectItem value="indian-ocean">
                          Indian Ocean
                        </SelectItem>
                        <SelectItem value="andaman">Andaman Islands</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Data Source</Label>
                    <Input id="source" placeholder="e.g., CMLRE Research" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Collection Year</Label>
                    <Input id="year" placeholder="e.g., 2024" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the dataset content and methodology"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                </div>

                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dataset
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Upload Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ingestionLogs.slice(0, 3).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      {getStatusIcon(log.status)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {log.filename}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {log.type} • {log.size} •{" "}
                          {log.records.toLocaleString()} records
                        </div>
                      </div>
                      <Badge
                        variant={
                          log.status === "completed"
                            ? "default"
                            : log.status === "processing"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dataset Ingestion Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingestionLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {log.filename}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.type}</Badge>
                      </TableCell>
                      <TableCell>{log.size}</TableCell>
                      <TableCell>{log.uploadedBy}</TableCell>
                      <TableCell>{log.uploadDate}</TableCell>
                      <TableCell>{log.records.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="capitalize">{log.status}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>API Usage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
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
                          >
                            {user.role}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{user.institution}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(user.apiCalls / 1000) * 100}
                            className="w-16 h-2"
                          />
                          <span className="text-sm">{user.apiCalls}/1000</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            Suspend
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">67</div>
                <div className="text-sm text-muted-foreground">Scientists</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">
                  Administrators
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      Dataset upload completed
                    </div>
                    <div className="text-xs text-muted-foreground">
                      arabian_sea_temp_2024.csv uploaded by Dr. Sharma • 2 hours
                      ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <User className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      New user registered
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dr. Priya Nair from NIOT • 5 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      API rate limit exceeded
                    </div>
                    <div className="text-xs text-muted-foreground">
                      User researcher@example.com exceeded 1000 req/hour limit •
                      1 day ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      AI analysis completed
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Otolith analysis batch processing finished • 1 day ago
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database Status</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Healthy</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Server</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Usage</span>
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="w-20 h-2" />
                    <span className="text-sm">65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ML Services</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Running</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  System Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
