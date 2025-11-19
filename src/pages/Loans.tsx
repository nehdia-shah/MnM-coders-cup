import { useState } from "react";
import { Plus, Calendar, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockLoans = [
  { id: 1, client: "Fatima Ahmed", amount: 50000, type: "Business", duration: 12, startDate: "2025-01-15", status: "active" },
  { id: 2, client: "Hassan Ali", amount: 75000, type: "Agriculture", duration: 18, startDate: "2025-02-01", status: "active" },
  { id: 3, client: "Ayesha Khan", amount: 30000, type: "Education", duration: 6, startDate: "2025-03-10", status: "active" },
];

export default function Loans() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    amount: "",
    type: "",
    duration: "",
    startDate: "",
  });
  const [schedule, setSchedule] = useState<any[]>([]);
  const { toast } = useToast();

  const generateSchedule = () => {
    if (!formData.amount || !formData.duration || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount, duration, and start date to generate schedule",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    const months = parseInt(formData.duration);
    const monthlyPayment = Math.ceil(amount / months);
    
    const newSchedule = Array.from({ length: months }, (_, i) => {
      const date = new Date(formData.startDate);
      date.setMonth(date.getMonth() + i + 1);
      return {
        month: i + 1,
        dueDate: date.toISOString().split('T')[0],
        amount: monthlyPayment,
      };
    });

    setSchedule(newSchedule);
    toast({
      title: "Schedule Generated",
      description: `${months} monthly installments of PKR ${monthlyPayment.toLocaleString()} created`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Loan Created Successfully",
      description: "AI recommendations applied for optimal loan terms",
    });
    setShowForm(false);
    setFormData({ clientName: "", amount: "", type: "", duration: "", startDate: "" });
    setSchedule([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Loan Management</h1>
          <p className="text-muted-foreground">Create and manage microfinance loans</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Loan Application
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              New Loan Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="Select or enter client name"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount (PKR) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="50000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loan Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Months) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="12"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="button" variant="outline" onClick={generateSchedule} className="gap-2">
                <Calendar className="h-4 w-4" />
                Generate Repayment Schedule
              </Button>

              {schedule.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Repayment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-64 space-y-2 overflow-y-auto">
                      {schedule.map((payment) => (
                        <div key={payment.month} className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {payment.month}
                            </div>
                            <span className="text-sm font-medium">{payment.dueDate}</span>
                          </div>
                          <span className="font-medium">PKR {payment.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button type="submit" disabled={schedule.length === 0}>
                  Create Loan
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setSchedule([]);
                }}>
                  Cancel
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                * AI will suggest optimal loan terms based on client's risk profile
              </p>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLoans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">{loan.client}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{loan.type}</span>
                    <span>{loan.duration} months</span>
                    <span>Started: {loan.startDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold">PKR {loan.amount.toLocaleString()}</p>
                    <p className="text-sm text-success">Active</p>
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
