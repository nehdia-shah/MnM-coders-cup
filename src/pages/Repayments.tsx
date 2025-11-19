import { useState } from "react";
import { DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockRepayments = [
  { id: 1, client: "Fatima Ahmed", amount: 5000, dueDate: "2025-11-25", status: "upcoming" as const, daysUntil: 6 },
  { id: 2, client: "Hassan Ali", amount: 8000, dueDate: "2025-11-23", status: "overdue" as const, daysOverdue: 2 },
  { id: 3, client: "Ayesha Khan", amount: 3500, dueDate: "2025-11-28", status: "upcoming" as const, daysUntil: 9 },
  { id: 4, client: "Zainab Hussain", amount: 4200, dueDate: "2025-11-20", status: "paid" as const, paidDate: "2025-11-19" },
  { id: 5, client: "Usman Malik", amount: 6500, dueDate: "2025-11-18", status: "overdue" as const, daysOverdue: 7 },
];

export default function Repayments() {
  const { toast } = useToast();

  const markAsPaid = (id: number, clientName: string) => {
    toast({
      title: "Payment Recorded",
      description: `Payment from ${clientName} marked as received`,
    });
  };

  const getStatusBadge = (status: "upcoming" | "overdue" | "paid") => {
    const variants = {
      upcoming: { icon: Clock, text: "Upcoming", className: "bg-primary/10 text-primary" },
      overdue: { icon: AlertCircle, text: "Overdue", className: "bg-destructive/10 text-destructive" },
      paid: { icon: CheckCircle, text: "Paid", className: "bg-success/10 text-success" },
    };
    const variant = variants[status];
    const Icon = variant.icon;
    return (
      <Badge className={variant.className}>
        <Icon className="mr-1 h-3 w-3" />
        {variant.text}
      </Badge>
    );
  };

  const upcomingCount = mockRepayments.filter(r => r.status === "upcoming").length;
  const overdueCount = mockRepayments.filter(r => r.status === "overdue").length;
  const paidCount = mockRepayments.filter(r => r.status === "paid").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Repayment Tracking</h1>
        <p className="text-muted-foreground">Monitor and manage loan repayments with AI-powered default alerts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingCount}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueCount}</p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold">{paidCount}</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-secondary" />
            All Repayments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRepayments.map((repayment) => (
              <div key={repayment.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{repayment.client}</p>
                    {getStatusBadge(repayment.status)}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Due: {repayment.dueDate}</span>
                    {repayment.status === "upcoming" && (
                      <span className="text-primary">In {repayment.daysUntil} days</span>
                    )}
                    {repayment.status === "overdue" && (
                      <span className="font-medium text-destructive">
                        {repayment.daysOverdue} days overdue
                        {repayment.daysOverdue >= 7 && " - AI Alert: High default risk"}
                      </span>
                    )}
                    {repayment.status === "paid" && (
                      <span className="text-success">Paid on {repayment.paidDate}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold">PKR {repayment.amount.toLocaleString()}</p>
                  {repayment.status !== "paid" && (
                    <Button 
                      size="sm" 
                      variant={repayment.status === "overdue" ? "default" : "outline"}
                      onClick={() => markAsPaid(repayment.id, repayment.client)}
                    >
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            AI Default Prediction Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            The system has identified <span className="font-bold">2 clients</span> with high risk of default based on payment history and risk profile. 
            Consider proactive follow-up to prevent defaults.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
