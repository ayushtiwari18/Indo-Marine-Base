import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Waves,
  Fish,
  Leaf,
  Download,
  ExternalLink,
  Play,
  BookOpen,
  Award,
  Users,
} from "lucide-react";

const Outreach = () => {
  const conservationStories = [
    {
      id: 1,
      title: "Coral Reef Restoration Success",
      location: "Andaman Islands",
      image: "/placeholder.svg",
      excerpt:
        "How community-led conservation efforts have restored 15 hectares of coral reef ecosystems.",
      category: "Conservation",
      date: "Dec 10, 2024",
    },
    {
      id: 2,
      title: "Sustainable Fishing Practices",
      location: "Kerala Coast",
      image: "/placeholder.svg",
      excerpt:
        "Traditional fishing communities adopt modern sustainable practices while preserving cultural heritage.",
      category: "Sustainability",
      date: "Dec 8, 2024",
    },
    {
      id: 3,
      title: "Marine Protected Area Impact",
      location: "Gulf of Mannar",
      image: "/placeholder.svg",
      excerpt:
        "Scientific assessment shows 40% increase in marine biodiversity within protected zones.",
      category: "Research",
      date: "Dec 5, 2024",
    },
  ];

  const blueEconomyInitiatives = [
    {
      title: "Seaweed Cultivation Program",
      description:
        "Supporting coastal communities with sustainable seaweed farming for economic growth",
      impact: "5,000+ families benefited",
      status: "Active",
      color: "bg-blue-500",
    },
    {
      title: "Marine Aquaculture Development",
      description:
        "Promoting responsible aquaculture practices to boost marine protein production",
      impact: "200+ fish farms established",
      status: "Expanding",
      color: "bg-green-500",
    },
    {
      title: "Ocean Technology Innovation",
      description:
        "Fostering marine technology startups for sustainable ocean resource utilization",
      impact: "50+ startups supported",
      status: "Growing",
      color: "bg-purple-500",
    },
    {
      title: "Coastal Tourism Enhancement",
      description:
        "Developing eco-friendly coastal tourism while preserving marine ecosystems",
      impact: "30% tourism growth",
      status: "Ongoing",
      color: "bg-teal-500",
    },
  ];

  const educationalResources = [
    {
      type: "Infographic",
      title: "Marine Biodiversity of India",
      description: "Visual guide to India's rich marine life and ecosystems",
      format: "PDF",
      size: "2.5 MB",
      downloads: 1250,
    },
    {
      type: "Report",
      title: "State of Indian Ocean 2024",
      description:
        "Comprehensive annual report on ocean health and conservation status",
      format: "PDF",
      size: "15.8 MB",
      downloads: 890,
    },
    {
      type: "Video",
      title: "Coral Reef Conservation",
      description:
        "Documentary on coral reef protection initiatives across Indian waters",
      format: "MP4",
      size: "250 MB",
      downloads: 567,
    },
    {
      type: "Guide",
      title: "Sustainable Fishing Handbook",
      description: "Best practices guide for responsible fishing methods",
      format: "PDF",
      size: "5.2 MB",
      downloads: 2100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Awareness & Outreach</h1>
          <p className="text-muted-foreground">
            Ocean conservation stories, Blue Economy initiatives, and
            educational resources
          </p>
        </div>
      </div>

      <Tabs defaultValue="conservation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conservation" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Conservation
          </TabsTrigger>
          <TabsTrigger value="blue-economy" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Blue Economy
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </TabsTrigger>
        </TabsList>

        {/* Conservation Stories Tab */}
        <TabsContent value="conservation" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conservationStories.map((story) => (
              <Card
                key={story.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{story.category}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 text-sm">
                      <Fish className="h-3 w-3" />
                      {story.location}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {story.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{story.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{story.excerpt}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Conservation Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">25</div>
                  <div className="text-sm text-muted-foreground">
                    Marine Protected Areas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">
                    180 km²
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Coral Reefs Restored
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">45</div>
                  <div className="text-sm text-muted-foreground">
                    Species Protected
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    15,000
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Community Members Engaged
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blue Economy Tab */}
        <TabsContent value="blue-economy" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {blueEconomyInitiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">
                      {initiative.title}
                    </CardTitle>
                    <div
                      className={`w-3 h-3 rounded-full ${initiative.color}`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {initiative.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">
                        {initiative.impact}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Impact
                      </div>
                    </div>
                    <Badge
                      variant={
                        initiative.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {initiative.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blue Economy Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  India's Blue Economy initiative aims to harness the potential
                  of marine resources for economic growth while ensuring
                  environmental sustainability and social inclusion.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg text-center">
                    <Waves className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-bold">$24B</div>
                    <div className="text-sm text-muted-foreground">
                      Ocean Economy Value
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-bold">4M+</div>
                    <div className="text-sm text-muted-foreground">
                      People Employed
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                    <div className="text-lg font-bold">30%</div>
                    <div className="text-sm text-muted-foreground">
                      Growth Target 2030
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {resource.type === "Video" ? (
                        <Play className="h-5 w-5 text-red-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <Badge variant="secondary">{resource.format}</Badge>
                  </div>

                  <h4 className="font-semibold mb-2">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      {resource.size} • {resource.downloads.toLocaleString()}{" "}
                      downloads
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Educational Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">School Programs</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Fish className="h-4 w-4 text-blue-500" />
                      Marine Life Awareness Sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <Waves className="h-4 w-4 text-teal-500" />
                      Ocean Conservation Workshops
                    </li>
                    <li className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-500" />
                      Sustainable Practices Training
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Community Outreach</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      Fisher Community Programs
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-500" />
                      Adult Literacy on Conservation
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-red-500" />
                      Conservation Champions Training
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="font-medium mb-2">Coastal Communities</h4>
                  <p className="text-sm text-muted-foreground">
                    Empowering local fishing communities with sustainable
                    practices and technology.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="font-medium mb-2">Educational Institutions</h4>
                  <p className="text-sm text-muted-foreground">
                    Partnering with schools and universities for marine science
                    education.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                  <h4 className="font-medium mb-2">Research Partners</h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborating with national and international research
                    institutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-medium">
                      Rameshwaram Fisher Cooperative
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Adopted sustainable fishing methods, increasing catch
                      quality by 35% while reducing environmental impact.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-medium">Kochi Marine College</h5>
                    <p className="text-sm text-muted-foreground">
                      Integrated OceanVista data into curriculum, training 200+
                      marine science students annually.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community Network
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Volunteer for Conservation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Educational Partnerships
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Research Collaboration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Outreach;
