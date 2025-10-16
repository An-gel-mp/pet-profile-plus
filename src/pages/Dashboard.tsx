import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Pill, AlertCircle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Mock reminder data
  const upcomingReminders = [
    {
      id: 1,
      pet: "Max",
      type: "Vaccine",
      title: "Annual Rabies Vaccine",
      date: "2025-10-20",
      status: "upcoming",
    },
    {
      id: 2,
      pet: "Luna",
      type: "Medicine",
      title: "Flea & Tick Prevention",
      date: "2025-10-18",
      status: "urgent",
    },
    {
      id: 3,
      pet: "Max",
      type: "Appointment",
      title: "Regular Checkup",
      date: "2025-10-25",
      status: "upcoming",
    },
    {
      id: 4,
      pet: "Luna",
      type: "Medicine",
      title: "Hairball Treatment",
      date: "2025-10-17",
      status: "urgent",
    },
  ];

  const completedTasks = [
    {
      id: 1,
      pet: "Max",
      title: "Dental Cleaning",
      date: "2025-10-10",
    },
    {
      id: 2,
      pet: "Luna",
      title: "Grooming Session",
      date: "2025-10-12",
    },
  ];

  const stats = [
    { label: "Active Pets", value: "2", icon: Calendar, color: "text-primary" },
    { label: "Upcoming", value: "4", icon: AlertCircle, color: "text-secondary" },
    { label: "Completed", value: "12", icon: CheckCircle, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Track your pets' health and upcoming appointments
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-[var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardDescription>{stat.label}</CardDescription>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reminders Section */}
          <Card className="bg-[var(--gradient-card)]">
            <CardHeader>
              <CardTitle className="text-2xl">Upcoming Reminders</CardTitle>
              <CardDescription>Don't miss important dates for your pets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        reminder.status === "urgent" ? "bg-destructive/10" : "bg-primary/10"
                      }`}>
                        {reminder.type === "Medicine" ? (
                          <Pill className={`w-5 h-5 ${reminder.status === "urgent" ? "text-destructive" : "text-primary"}`} />
                        ) : (
                          <Calendar className={`w-5 h-5 ${reminder.status === "urgent" ? "text-destructive" : "text-primary"}`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{reminder.title}</h4>
                          <Badge variant={reminder.status === "urgent" ? "destructive" : "secondary"}>
                            {reminder.pet}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reminder.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Mark Done
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          <Card className="bg-[var(--gradient-card)]">
            <CardHeader>
              <CardTitle className="text-2xl">Recently Completed</CardTitle>
              <CardDescription>Tasks you've finished this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {task.pet} • {new Date(task.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
