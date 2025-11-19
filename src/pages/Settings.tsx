import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application preferences and configuration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Update your microfinance institution information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" placeholder="Your MFI Name" defaultValue="MLMS" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-email">Contact Email</Label>
            <Input id="org-email" type="email" placeholder="contact@mfi.pk" defaultValue="officer@mfi.pk" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-phone">Phone Number</Label>
            <Input id="org-phone" type="tel" placeholder="+92 XXX XXXXXXX" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan Configuration</CardTitle>
          <CardDescription>Default settings for loan applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="min-amount">Minimum Loan Amount (PKR)</Label>
            <Input id="min-amount" type="number" defaultValue="10000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-amount">Maximum Loan Amount (PKR)</Label>
            <Input id="max-amount" type="number" defaultValue="500000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Default Interest Rate (%)</Label>
            <Input id="interest-rate" type="number" step="0.1" defaultValue="18" />
          </div>
          <Button>Update Configuration</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Reminders</Label>
              <p className="text-sm text-muted-foreground">Send reminders before payment due dates</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Default Risk Alerts</Label>
              <p className="text-sm text-muted-foreground">AI-powered alerts for potential defaults</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Client Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified when new clients register</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
