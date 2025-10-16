import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dog, Cat, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddPetDialog from "@/components/AddPetDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex@happypaws.com",
    phone: "(555) 123-4567",
  });

  // Mock pet data with state
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      color: "Golden",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "2 years",
      color: "White",
    },
  ]);

  const handleAddPet = (newPet: any) => {
    const petWithId = {
      ...newPet,
      id: pets.length + 1,
    };
    setPets([...pets, petWithId]);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Profile Section */}
          <Card className="bg-[var(--gradient-card)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-3xl">My Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {userData.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">{userData.name}</h3>
                  <p className="text-muted-foreground">Pet Parent</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pets Section */}
          <Card className="bg-[var(--gradient-card)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">My Pets</CardTitle>
                <CardDescription>Manage your pet profiles</CardDescription>
              </div>
              <AddPetDialog onAddPet={handleAddPet} />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {pets.map((pet) => (
                  <Card key={pet.id} className="hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {pet.type === "Dog" ? (
                            <Dog className="w-6 h-6 text-primary" />
                          ) : (
                            <Cat className="w-6 h-6 text-secondary" />
                          )}
                        </div>
                        <div>
                          <CardTitle>{pet.name}</CardTitle>
                          <CardDescription>{pet.type} • {pet.breed}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Age</p>
                          <p className="font-medium">{pet.age}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Color</p>
                          <p className="font-medium">{pet.color}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setSelectedPet(pet)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pet Details Dialog */}
      <Dialog open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {selectedPet?.type === "Dog" ? (
                  <Dog className="w-6 h-6 text-primary" />
                ) : (
                  <Cat className="w-6 h-6 text-secondary" />
                )}
              </div>
              {selectedPet?.name}
            </DialogTitle>
            <DialogDescription>
              Complete information about your pet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Type</Label>
                <p className="font-medium mt-1">{selectedPet?.type}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Breed</Label>
                <p className="font-medium mt-1">{selectedPet?.breed}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Age</Label>
                <p className="font-medium mt-1">{selectedPet?.age}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Color</Label>
                <p className="font-medium mt-1">{selectedPet?.color}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
