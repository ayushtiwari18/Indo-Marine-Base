import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Database,
  Brain,
  Globe,
  Users,
  Fish,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const quickStats = [
    { label: "EEZ Size", value: "2.02M km²", icon: Waves },
    { label: "Datasets", value: "15,000+", icon: Database },
    { label: "Species Records", value: "8,500+", icon: Fish },
    { label: "Research Partners", value: "120+", icon: Users },
  ];

  const highlightCards = [
    {
      title: "Datasets",
      description:
        "Access comprehensive marine datasets including oceanography, taxonomy, and molecular data",
      icon: Database,
      link: "/datasets",
      color: "bg-primary",
    },
    {
      title: "Visualizations",
      description:
        "Interactive maps and charts for marine data analysis and exploration",
      icon: BarChart3,
      link: "/visualization",
      color: "bg-accent",
    },
    {
      title: "AI Tools",
      description:
        "Species identification, otolith analysis, and eDNA matching powered by AI",
      icon: Brain,
      link: "/ai-tools",
      color: "bg-secondary",
    },
    {
      title: "APIs",
      description:
        "Programmatic access to marine data with comprehensive documentation",
      icon: Globe,
      link: "/api-access",
      color: "bg-muted",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-accent to-primary/80 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            India's Unified Marine Data Platform
          </h1>
          <p className="mb-6 max-w-2xl text-lg opacity-90">
            Comprehensive marine data integration and visualization system for
            research, conservation, and sustainable ocean management across
            India's vast marine ecosystem.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/datasets">Explore Data</Link>
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <stat.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Highlight Cards */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlightCards.map((card, index) => (
          <Card
            key={index}
            className="group cursor-pointer transition-all hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
              >
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {card.description}
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to={card.link}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* News and Updates */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="secondary">Research</Badge>
                <div className="flex-1">
                  <h4 className="font-medium">
                    New Biodiversity Hotspots Identified
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI analysis reveals previously unknown marine
                    biodiversity zones in the Arabian Sea.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dec 15, 2024
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline">Dataset</Badge>
                <div className="flex-1">
                  <h4 className="font-medium">
                    Seasonal Oceanographic Data Release
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive temperature, salinity, and current data for
                    2024 monsoon season now available.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dec 12, 2024
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/ai-tools">
                <Brain className="mr-2 h-4 w-4" />
                Analyze Species
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/visualization">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/datasets">
                <Database className="mr-2 h-4 w-4" />
                Browse Data
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
