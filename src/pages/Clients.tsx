import { useState } from "react";
import { Plus, Search, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiskBadge } from "@/components/RiskBadge";
import { useToast } from "@/hooks/use-toast";

const mockClients = [
  { id: 1, name: "Fatima Ahmed", cnic: "42101-1234567-8", phone: "+92 300 1234567", risk: "low" as const, loans: 2 },
  { id: 2, name: "Hassan Ali", cnic: "42101-2345678-9", phone: "+92 301 2345678", risk: "medium" as const, loans: 1 },
  { id: 3, name: "Ayesha Khan", cnic: "42101-3456789-0", phone: "+92 302 3456789", risk: "low" as const, loans: 3 },
  { id: 4, name: "Usman Malik", cnic: "42101-4567890-1", phone: "+92 303 4567890", risk: "high" as const, loans: 1 },
  { id: 5, name: "Zainab Hussain", cnic: "42101-5678901-2", phone: "+92 304 5678901", risk: "low" as const, loans: 2 },
];

export default function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    address: "",
  });
  const { toast } = useToast();

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cnic.includes(searchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI risk scoring
    const risks: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    
    toast({
      title: "Client Added Successfully",
      description: `Risk Score: ${randomRisk.toUpperCase()} - AI analysis completed based on client profile.`,
    });
    
    setShowForm(false);
    setFormData({ name: "", cnic: "", phone: "", address: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">Manage client information and risk profiles</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Client Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter client name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic">CNIC Number *</Label>
                  <Input
                    id="cnic"
                    placeholder="42101-1234567-8"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Client & Calculate Risk Score
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                * AI-powered risk assessment will be automatically generated based on client information
              </p>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or CNIC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">{client.name}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>CNIC: {client.cnic}</span>
                    <span>{client.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{client.loans} Active Loans</p>
                    <RiskBadge risk={client.risk} />
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
