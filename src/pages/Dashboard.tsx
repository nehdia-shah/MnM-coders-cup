import { Users, FileText, DollarSign, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/RiskBadge";
import { Button } from "@/components/ui/button";

const recentClients = [
  { id: 1, name: "Fatima Ahmed", cnic: "42101-1234567-8", risk: "low" as const, date: "2025-11-19" },
  { id: 2, name: "Hassan Ali", cnic: "42101-2345678-9", risk: "medium" as const, date: "2025-11-18" },
  { id: 3, name: "Ayesha Khan", cnic: "42101-3456789-0", risk: "low" as const, date: "2025-11-17" },
  { id: 4, name: "Usman Malik", cnic: "42101-4567890-1", risk: "high" as const, date: "2025-11-16" },
];

const upcomingPayments = [
  { id: 1, client: "Fatima Ahmed", amount: "PKR 5,000", dueDate: "2025-11-25", status: "upcoming" },
  { id: 2, client: "Hassan Ali", amount: "PKR 8,000", dueDate: "2025-11-23", status: "overdue" },
  { id: 3, client: "Zainab Hussain", amount: "PKR 3,500", dueDate: "2025-11-28", status: "upcoming" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your loan portfolio.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value="1,247"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Active Loans"
          value="892"
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Total Disbursed"
          value="PKR 45.2M"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Overdue Payments"
          value="23"
          icon={AlertTriangle}
          trend={{ value: 5, isPositive: false }}
          variant="destructive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.cnic}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <RiskBadge risk={client.risk} />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {client.date}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Clients
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              Upcoming Repayments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium">{payment.client}</p>
                    <p className="text-sm text-muted-foreground">{payment.amount}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={payment.status === "overdue" ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {payment.dueDate}
                    </span>
                    {payment.status === "overdue" && (
                      <span className="text-xs font-medium text-destructive">OVERDUE</span>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Repayments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Risk Distribution</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low Risk</span>
                  <span className="text-sm font-medium text-success">645 (72%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[72%] rounded-full bg-success" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medium Risk</span>
                  <span className="text-sm font-medium text-warning">201 (22%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[22%] rounded-full bg-warning" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">High Risk</span>
                  <span className="text-sm font-medium text-destructive">46 (6%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[6%] rounded-full bg-destructive" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Loan Status</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active</span>
                  <span className="text-sm font-medium">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed</span>
                  <span className="text-sm font-medium">2,145</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">In Default</span>
                  <span className="text-sm font-medium text-destructive">23</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">On Time</span>
                  <span className="text-sm font-medium text-success">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Late (1-7 days)</span>
                  <span className="text-sm font-medium text-warning">3.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default (&gt;30 days)</span>
                  <span className="text-sm font-medium text-destructive">2.3%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
