import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Dog, Cat } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AddPetDialog from "@/components/AddPetDialog";

const Adoption = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock adoption data with state
  const [availablePets, setAvailablePets] = useState([
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Labrador Mix",
      age: "2 years",
      gender: "Male",
      location: "New York, NY",
      description: "Friendly and energetic, loves to play fetch and go on walks.",
      color: "hsl(6 78% 70%)",
    },
    {
      id: 2,
      name: "Mittens",
      type: "Cat",
      breed: "Tabby",
      age: "1 year",
      gender: "Female",
      location: "Los Angeles, CA",
      description: "Sweet and cuddly, perfect lap cat who loves attention.",
      color: "hsl(177 64% 60%)",
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Beagle",
      age: "3 years",
      gender: "Male",
      location: "Chicago, IL",
      description: "Gentle soul with a playful spirit, great with kids.",
      color: "hsl(270 60% 70%)",
    },
    {
      id: 4,
      name: "Whiskers",
      type: "Cat",
      breed: "Siamese",
      age: "4 years",
      gender: "Female",
      location: "Houston, TX",
      description: "Independent but loving, enjoys quiet companionship.",
      color: "hsl(6 78% 70%)",
    },
    {
      id: 5,
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      age: "5 years",
      gender: "Male",
      location: "Phoenix, AZ",
      description: "Loyal and protective, well-trained and obedient.",
      color: "hsl(177 64% 60%)",
    },
    {
      id: 6,
      name: "Luna",
      type: "Cat",
      breed: "Calico",
      age: "2 years",
      gender: "Female",
      location: "Philadelphia, PA",
      description: "Playful and curious, loves exploring and climbing.",
      color: "hsl(270 60% 70%)",
    },
  ]);

  const handleAddPet = (newPet: any) => {
    const colors = [
      "hsl(6 78% 70%)",
      "hsl(177 64% 60%)",
      "hsl(270 60% 70%)",
    ];
    
    const petWithId = {
      ...newPet,
      id: availablePets.length + 1,
      color: colors[availablePets.length % colors.length],
    };
    setAvailablePets([petWithId, ...availablePets]);
  };

  const toggleFavorite = (petId: number) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
    toast({
      title: favorites.includes(petId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(petId)
        ? "Pet removed from your favorites list."
        : "Pet added to your favorites list!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">Find Your New Best Friend</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse adorable pets looking for loving homes. Each one is ready to bring joy to your life.
              </p>
            </div>
            <AddPetDialog onAddPet={handleAddPet} isAdoption={true} />
          </div>

          {/* Pets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePets.map((pet) => (
              <Card
                key={pet.id}
                className="bg-[var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{ backgroundColor: pet.color }}
                >
                  {pet.type === "Dog" ? (
                    <Dog className="w-24 h-24 text-primary-foreground" />
                  ) : (
                    <Cat className="w-24 h-24 text-primary-foreground" />
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{pet.name}</CardTitle>
                      <CardDescription className="text-base">
                        {pet.breed} • {pet.age}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(pet.id)}
                      className={favorites.includes(pet.id) ? "text-destructive" : ""}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(pet.id) ? "fill-destructive" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{pet.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{pet.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{pet.type}</Badge>
                      <Badge variant="outline">{pet.gender}</Badge>
                    </div>
                  </div>

                  <Button variant="default" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adoption;
