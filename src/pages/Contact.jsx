"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Users,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@marineintelligence.org",
      description: "General inquiries and support",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 (0)484-239-2525",
      description: "Monday to Friday, 9 AM - 6 PM IST",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "CMLRE, Kochi, Kerala, India",
      description: "Central Marine Living Resources & Ecology",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: Globe,
      title: "Collaborate",
      details: "partnerships@marineintelligence.org",
      description: "Research partnerships and collaborations",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (no backend logic)
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Get In Touch
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Contact Our
            </span>
            <br />
            <span className="text-white">Research Team</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Connect with our marine research experts for collaborations,
            partnerships, or technical support.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="contact-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-cyan-400 font-semibold mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-slate-400">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            ref={formRef}
            className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Send className="w-6 h-6 text-cyan-400" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      placeholder="your.email@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Organization
                  </label>
                  <Input
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    placeholder="Your institution or organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    placeholder="Tell us about your inquiry, collaboration proposal, or how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white py-3 text-lg font-semibold rounded-xl group"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Office Hours */}
            <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">Office Hours</h3>
                </div>
                <div className="space-y-2 text-slate-300">
                  <p>
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST
                  </p>
                  <p>
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM IST
                  </p>
                  <p>
                    <strong>Sunday:</strong> Closed
                  </p>
                  <p className="text-cyan-400 mt-4">
                    Response time: Usually within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Research Collaborations */}
            <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">
                    Research Partnerships
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  Interested in collaborating on marine research projects? We
                  welcome partnerships with academic institutions, research
                  organizations, and conservation groups.
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-white group"
                >
                  Partnership Guidelines
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Technical Support */}
            <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">
                    Technical Support
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  Need help with our platform, API, or data access? Our
                  technical team is here to assist you.
                </p>
                <div className="space-y-2 text-slate-300">
                  <p>
                    <strong>API Support:</strong>{" "}
                    api-support@marineintelligence.org
                  </p>
                  <p>
                    <strong>Data Access:</strong>{" "}
                    data-access@marineintelligence.org
                  </p>
                  <p>
                    <strong>Platform Issues:</strong>{" "}
                    support@marineintelligence.org
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
