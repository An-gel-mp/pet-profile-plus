import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Heart, Calendar, Users, PawPrint } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const Index = () => {
  const features = [
    {
      icon: PawPrint,
      title: "Pet Profiles",
      description: "Create and manage profiles for all your furry friends with photos, details, and health records.",
    },
    {
      icon: Calendar,
      title: "Smart Reminders",
      description: "Never miss a vet appointment or vaccine date with our intelligent reminder system.",
    },
    {
      icon: Heart,
      title: "Adoption Center",
      description: "Browse and connect with adorable pets looking for their forever homes.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a community of pet lovers sharing tips, stories, and support.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
        <img
          src={heroImage}
          alt="Happy pets"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to Happy Paws
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-95">
              Your complete pet care companion. Track health, schedule reminders, and find new friends.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button variant="secondary" size="xl" asChild>
                <Link to="/adoption">Browse Adoptions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything Your Pet Needs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to keep your pets healthy, happy, and loved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--gradient-hero)] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready to Start Your Pet Care Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet owners managing their pet's health and happiness.
          </p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/profile">Create Your Profile</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
