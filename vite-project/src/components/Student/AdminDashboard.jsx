import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Bell, Building, Users, FileText, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-3xl font-bold text-indigo-700">Admin Dashboard</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">245</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Briefcase className="text-indigo-600" />
            <CardTitle>Total HRs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">38</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Building className="text-indigo-600" />
            <CardTitle>Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Register New TPO</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Register TPO</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>View All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Users</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Jobs</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Company Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Send Announcement</CardTitle>
                <Bell className="text-indigo-600" />
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Write a message to broadcast..."
                  rows={4}
                ></textarea>
                <Button className="mt-2">Send</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
