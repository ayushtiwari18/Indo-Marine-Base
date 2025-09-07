"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Building,
  MapPin,
  Calendar,
  Award,
  FileText,
  Settings,
  Edit,
  Save,
  Camera,
  Key,
  Bell,
  Shield,
  Activity,
  BookOpen,
  Users,
} from "lucide-react";

const Profile = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Dr. Sarah",
    lastName: "Chen",
    email: "sarah.chen@marineintel.org",
    organization: "Marine Biology Institute",
    position: "Senior Marine Biologist",
    location: "California, USA",
    bio: "Marine biologist specializing in AI-driven species identification and ocean biodiversity research. Over 10 years of experience in marine ecosystem analysis and conservation.",
    expertise: [
      "Marine Biology",
      "AI/ML",
      "Species Classification",
      "Ocean Conservation",
    ],
    joinDate: "2022-03-15",
  });

  const stats = [
    { number: "23", label: "Publications", icon: FileText },
    { number: "8", label: "Active Projects", icon: Activity },
    { number: "156", label: "Citations", icon: Award },
    { number: "12", label: "Collaborations", icon: Users },
  ];

  const recentActivity = [
    {
      type: "publication",
      title: "Published 'AI-Driven Marine Species Classification'",
      date: "2024-01-15",
      status: "completed",
    },
    {
      type: "project",
      title: "Joined 'Ocean Data Integration Platform' project",
      date: "2024-01-10",
      status: "active",
    },
    {
      type: "collaboration",
      title: "Started collaboration with Woods Hole Institute",
      date: "2024-01-05",
      status: "active",
    },
    {
      type: "data",
      title: "Uploaded new dataset: 'Pacific Species Survey 2024'",
      date: "2024-01-01",
      status: "completed",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "AI-Powered Marine Species Classification",
      status: "Active",
      progress: 75,
      role: "Principal Investigator",
    },
    {
      id: 2,
      title: "Ocean Data Integration Platform",
      status: "Active",
      progress: 60,
      role: "Co-Investigator",
    },
    {
      id: 3,
      title: "Coral Reef Health Monitoring",
      status: "Completed",
      progress: 100,
      role: "Research Lead",
    },
  ];

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
    console.log("Profile updated:", profileData);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-card",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 -right-20 animate-pulse"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 -left-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              User Profile
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Profile
            </span>
            <span className="text-white"> Settings</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 mb-6">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                    SC
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-cyan-600 hover:bg-cyan-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-cyan-400 font-medium mb-2">
                  {profileData.position}
                </p>
                <p className="text-slate-400 text-sm mb-4">
                  {profileData.organization}
                </p>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  Member since{" "}
                  {new Date(profileData.joinDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white mb-4"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Activity Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-300">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-cyan-400">
                      {stat.number}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/90 border border-slate-700/50">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general">
                <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">
                      Personal Information
                    </CardTitle>
                    {isEditing && (
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          First Name
                        </label>
                        <Input
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Last Name
                        </label>
                        <Input
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <Input
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Organization
                        </label>
                        <Input
                          name="organization"
                          value={profileData.organization}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Position
                        </label>
                        <Input
                          name="position"
                          value={profileData.position}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Bio
                      </label>
                      <Textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Areas of Expertise
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.expertise.map((skill, index) => (
                          <Badge
                            key={index}
                            className="bg-cyan-600/20 text-cyan-400 border-cyan-500/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      My Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white">
                            {project.title}
                          </h3>
                          <Badge
                            className={`${
                              project.status === "Active"
                                ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                                : "bg-green-600/20 text-green-400 border-green-500/30"
                            }`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">
                          Role: {project.role}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">
                            Progress: {project.progress}%
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                          {activity.type === "publication" && (
                            <FileText className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "project" && (
                            <BookOpen className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "collaboration" && (
                            <Users className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "data" && (
                            <Activity className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">
                            {activity.title}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card className="profile-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Settings className="w-5 h-5 text-cyan-400" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full justify-start bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700/50">
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                      <Button className="w-full justify-start bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700/50">
                        <Bell className="w-4 h-4 mr-2" />
                        Notification Preferences
                      </Button>
                      <Button className="w-full justify-start bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700/50">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
