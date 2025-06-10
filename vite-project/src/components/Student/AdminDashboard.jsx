import { useState } from "react";
import {
  Bell,
  Building,
  Users,
  FileText,
  Briefcase,
  Settings,
  Shield,
  BarChart3,
  Activity,
  MessageSquare,
  Database,
  Globe,
  History,
  Key,
  Brain,
  Bot,
  Download,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  AlertTriangle,
  TrendingUp,
  PieChart,
  FileSpreadsheet,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Building2,
  GraduationCap,
  Target,
  PlusCircle,
  Clock,
  ExternalLink,
  ClipboardList,
  MailQuestion,
  Info,
  ChevronRight,
  ClipboardCopy,
  Code,
  LineChart,
  DownloadCloud,
  UploadCloud,
  FileBadge,
  MessageSquareMore,
  GanttChart
} from "lucide-react";

// --- Inlined Shadcn UI Components for self-containment ---
// In a real project, these would be imported from your `ui` directory.

const Card = ({ className, children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ className, variant = "default", size = "default", onClick, children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Tabs = ({ defaultValue, value, onValueChange, className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const TabsList = ({ className, children }) => (
  <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, className, children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow ${className}`}
    data-state={props.value === value ? "active" : "inactive"}
    {...props}
  >
    {children}
  </button>
);

const TabsContent = ({ value, className, children }) => (
  <div
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    data-state={value === value ? "active" : "inactive"}
  >
    {children}
  </div>
);


const Separator = ({ className }) => (
  <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} />
);

const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ className, htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {children.find(child => child.type === SelectTrigger)}
      </div>
      {isOpen && (
        <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {children.find(child => child.type === SelectContent)?.props.children.map(item =>
            React.cloneElement(item, {
              onClick: () => {
                onValueChange(item.props.value);
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ className, children, ...props }) => (
  <button className={`flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`} {...props}>
    {children}
    <ChevronRight className="h-4 w-4 opacity-50" />
  </button>
);

const SelectValue = ({ children }) => <span>{children}</span>;

const SelectContent = ({ children }) => (
  <>
    {children}
  </>
);

const SelectItem = ({ value, children, className, ...props }) => (
  <div className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`} data-value={value} {...props}>
    {children}
  </div>
);

const Badge = ({ className, variant = "default", children }) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    outline: "text-foreground",
  };
  return (
    <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // State for LLM features (AI Tools)
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmError, setLlmError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");


  // Mock data - replace with actual API calls
  const stats = {
    totalStudents: 245,
    totalHRs: 38,
    totalTPOs: 12,
    totalColleges: 8,
    activeDrives: 15,
    pendingApprovals: 23,
    totalPlacements: 189,
    systemHealth: 98.5
  };

  const recentActivities = [
    { id: 1, action: "New student registration", user: "John Doe", time: "2 mins ago", type: "info" },
    { id: 2, action: "Company approved", user: "TechCorp Inc.", time: "15 mins ago", type: "success" },
    { id: 3, action: "Drive created", user: "TPO - CS Dept", time: "1 hour ago", type: "info" },
    { id: 4, action: "Failed login attempt", user: "admin@college.edu", time: "2 hours ago", type: "warning" },
    { id: 5, action: "Student profile updated", user: "Jane Smith", time: "5 hours ago", type: "info" },
    { id: 6, action: "API key revoked", user: "Super Admin", time: "1 day ago", type: "warning" }
  ];

  const pendingApprovals = [
    { id: 1, type: "Student", name: "Alice Johnson", email: "alice@student.edu", status: "pending" },
    { id: 2, type: "Company", name: "InnovateTech", email: "hr@innovate.com", status: "pending" },
    { id: 3, type: "TPO", name: "Dr. Smith", email: "smith@college.edu", status: "pending" },
    { id: 4, type: "Student", name: "Bob Williams", email: "bob@student.edu", status: "pending" }
  ];

  const [users, setUsers] = useState([
    { id: 1, name: "Harshil Patel", email: "harshil@student.edu", role: "Student", status: "Active", dept: "CSE", year: "2024" },
    { id: 2, name: "Dr. Rajesh Kumar", email: "rajesh@tpo.edu", role: "TPO", status: "Active", dept: "Overall" },
    { id: 3, name: "John Doe", email: "john@company.com", role: "HR", status: "Active", company: "TechCorp" },
    { id: 4, name: "Alice Wonderland", email: "alice@student.edu", role: "Student", status: "Pending", dept: "ECE", year: "2025" },
    { id: 5, name: "Super Admin", email: "admin@portal.com", role: "Super Admin", status: "Active" }
  ]);

  const [placementDrives, setPlacementDrives] = useState([
    { id: 1, name: "TechCorp Hiring Drive", date: "2024-08-15", status: "Upcoming", applicants: 120, visibility: "All" },
    { id: 2, name: "DataSoft Internship", date: "2024-07-20", status: "Past", applicants: 80, visibility: "CSE, IT" },
    { id: 3, name: "Global Innovate Day", date: "2024-09-01", status: "Upcoming", applicants: 0, visibility: "All Branches" }
  ]);

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, from: "Student (Alice J.)", subject: "Issue with resume upload", date: "2024-07-01", status: "Open", message: "My resume upload failed multiple times, showing an error 'file type not supported'." },
    { id: 2, from: "HR (John D.)", subject: "Incorrect job post details", date: "2024-06-28", status: "Closed", message: "The CTC for the Software Engineer role was listed incorrectly." },
  ]);

  const [faqs, setFaqs] = useState([
    { id: 1, question: "How to register as a student?", answer: "Visit the student registration page and fill out the form." },
    { id: 2, question: "How to apply for a job?", answer: "Navigate to the Job Opportunities section and click 'Apply Now'." },
  ]);

  const [systemLogs, setSystemLogs] = useState([
    { id: 1, timestamp: "2024-07-10 10:30:00", event: "User login success", details: "User 'harshil@student.edu' logged in.", type: "info" },
    { id: 2, timestamp: "2024-07-10 10:29:15", event: "API key validation failed", details: "Key 'xyz123' denied access to /api/jobs.", type: "warning" },
    { id: 3, timestamp: "2024-07-10 10:20:40", event: "Database backup completed", details: "Full database backup to S3 bucket 'portal-backup-prod'.", type: "success" },
    { id: 4, timestamp: "2024-07-10 09:00:00", event: "Automated email sent", details: "Sent 'Upcoming Drives' newsletter to 245 students.", type: "info" },
  ]);

  const [apiKeys, setApiKeys] = useState([
    { id: 1, key: "sk-********************", user: "TPO API", usage: "1200/5000", status: "Active", created: "2024-01-01" },
    { id: 2, key: "sk-####################", user: "HR Partner", usage: "300/1000", status: "Active", created: "2024-03-10" },
  ]);

  // --- LLM Integration Functions ---
  const generateLlmResponse = async (prompt, title) => {
    setLlmLoading(true);
    setLlmError(null);
    setModalTitle(title);
    setModalContent("Generating response...");
    setShowModal(true);

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = ""; // Keep this empty, Canvas will inject the key at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setModalContent(text);
      } else {
        setModalContent("Sorry, I couldn't generate a response. Please try again.");
        setLlmError("Unexpected API response structure.");
      }
    } catch (err) {
      setModalContent("An error occurred while connecting to the AI. Please try again.");
      setLlmError(err.message || "Failed to fetch from Gemini API.");
      console.error("Gemini API Error:", err);
    } finally {
      setLlmLoading(false);
    }
  };

  const handlePredictAtRiskStudents = () => {
    // This is a simplified mock prompt. In a real scenario, you'd feed actual student data.
    const studentInfo = users.filter(u => u.role === "Student").map(s => `${s.name} (Dept: ${s.dept}, Year: ${s.year})`).join('; ');
    const prompt = `Given the following students in our portal: ${studentInfo}. If we consider factors like pending approvals, engagement, and typical placement rates for their department/year, which students might be 'at-risk' for not getting placed? Provide a short, anonymized list with brief reasons. Limit to 3-5 students if possible.`;
    generateLlmResponse(prompt, "AI-Powered At-Risk Student Prediction");
  };


  // Helper for filtering users (mock implementation)
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || user.role.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive placement portal management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrives}</div>
            <p className="text-xs text-muted-foreground">5 ending this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlacements}</div>
            <p className="text-xs text-muted-foreground">77% placement rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-11 w-full">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="users" className="text-xs">Users</TabsTrigger>
          <TabsTrigger value="drives" className="text-xs">Drives</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          <TabsTrigger value="monitoring" className="text-xs">Monitoring</TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
          <TabsTrigger value="backup" className="text-xs">Backup</TabsTrigger>
          <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
          <TabsTrigger value="audit" className="text-xs">Audit</TabsTrigger>
          <TabsTrigger value="api" className="text-xs">API</TabsTrigger>
          {/* <TabsTrigger value="ai" className="text-xs">AI Tools</TabsTrigger> Removed to fit in 11 tabs, AI tool is within Analytics for now */}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.user}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.type === 'warning' ? 'destructive' : 'default'}>
                        {activity.time}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Pending Approvals ({stats.pendingApprovals})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.type} - {item.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow sm:flex-grow-0 sm:w-64"
              />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="tpo">TPOs</SelectItem>
                  <SelectItem value="hr">HRs</SelectItem>
                  <SelectItem value="super admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Students Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Students ({stats.totalStudents})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Students
                </Button>
                <Button className="w-full" variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Student
                </Button>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Registrations (15)
                </Button>
                <Button className="w-full" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Bulk Password Reset
                </Button>
              </CardContent>
            </Card>

            {/* TPO Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  TPOs ({stats.totalTPOs})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View All TPOs
                </Button>
                <Button className="w-full" variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register New TPO
                </Button>
                <Button className="w-full" variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  Assign Departments
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit TPO Details
                </Button>
              </CardContent>
            </Card>

            {/* HR/Company Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Companies ({stats.totalHRs})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Companies
                </Button>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Companies (8)
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Company Details
                </Button>
                <Button className="w-full" variant="outline">
                  <UserX className="w-4 h-4 mr-2" />
                  Ban/Suspend Users
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                All Portal Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role === "Student" && `Dept: ${user.dept}, Year: ${user.year}`}
                          {user.role === "HR" && `Company: ${user.company}`}
                          {user.role === "TPO" && `Dept: ${user.dept}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost"><Edit className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                            {user.status === "Active" ? (
                              <Button size="icon" variant="ghost"><Lock className="w-4 h-4 text-orange-500" /></Button>
                            ) : (
                              <Button size="icon" variant="ghost"><Unlock className="w-4 h-4 text-green-500" /></Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Role-Based Access Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Role-Based Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Assign or modify roles and control module access for different user types.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline"><Key className="w-4 h-4 mr-2" /> Manage Roles</Button>
                <Button variant="outline"><Lock className="w-4 h-4 mr-2" /> Define Permissions</Button>
                <Button variant="outline"><Users className="w-4 h-4 mr-2" /> Assign Roles to Users</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placement Drive Management Tab */}
        <TabsContent value="drives" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Placement Drive Management</h2>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New Drive
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                All Placement Drives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drive Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {placementDrives.map((drive) => (
                      <tr key={drive.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{drive.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drive.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Badge variant={drive.status === "Upcoming" ? "default" : "secondary"}>{drive.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drive.applicants}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drive.visibility}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost"><Eye className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost"><Edit className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports & Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Placement Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">Total Placements: <span className="font-semibold">{stats.totalPlacements}</span></p>
                <p className="text-sm text-gray-600">Overall Placement Rate: <span className="font-semibold">{stats.totalPlacements / stats.totalStudents * 100}%</span></p>
                <Separator />
                <h3 className="font-semibold text-gray-700">By Department (Mock)</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>CSE: 80 students placed</li>
                  <li>ECE: 50 students placed</li>
                  <li>IT: 40 students placed</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Generate Detailed Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 mb-3">Leverage AI to predict trends and identify key areas for improvement.</p>
                <Button
                  onClick={handlePredictAtRiskStudents}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  disabled={llmLoading}
                >
                  {llmLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <Brain className="w-4 h-4 mr-2" />
                  )}
                  Predict At-Risk Students
                </Button>
                <Button variant="outline" className="w-full">
                  <Bot className="w-4 h-4 mr-2" />
                  Chatbot Monitoring (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Application Monitoring & Logs Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Application Monitoring & Logs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  System Activity Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {systemLogs.map(log => (
                  <div key={log.id} className="p-2 rounded-lg bg-gray-50 border text-sm">
                    <p className="font-semibold text-gray-800">{log.event}</p>
                    <p className="text-xs text-gray-600">{log.details}</p>
                    <p className="text-xs text-gray-500 flex justify-between">
                      <span>{log.timestamp}</span>
                      <Badge variant={log.type === 'warning' ? 'destructive' : 'default'}>{log.type}</Badge>
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MailQuestion className="w-5 h-5" />
                  Email & SMS Delivery Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 italic">Logs for bulk communication are managed here.</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Email to 200 students (2024-07-05) - All Success</li>
                  <li>SMS to 50 HRs (2024-06-20) - 2 Failed</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Detailed Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback and Issue Tracking Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Feedback and Issue Tracking</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Student/HR/TPO Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feedbacks.map((feedback) => (
                      <tr key={feedback.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.from}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Badge variant={feedback.status === "Open" ? "destructive" : "default"}>{feedback.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />View</Button>
                            <Button size="sm" variant="outline"><MessageSquareMore className="w-4 h-4 mr-1" />Reply</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database and File Backup Tab */}
        <TabsContent value="backup" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Database and File Backup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DownloadCloud className="w-5 h-5" />
                  Manual Backup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Initiate a full backup of the portal database and files immediately.</p>
                <Button className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Trigger Full Backup
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Backup History & Restore
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">View past automated backups and restore options.</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>Backup 2024-07-09 03:00 AM (Full) - <span className="font-semibold text-green-600">Success</span></li>
                  <li>Backup 2024-07-08 03:00 AM (Full) - <span className="font-semibold text-green-600">Success</span></li>
                  <li>Backup 2024-07-07 03:00 AM (Full) - <span className="font-semibold text-green-600">Success</span></li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  View All Backups
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notices & Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notice-title">Title</Label>
                    <Input id="notice-title" placeholder="e.g., Important Update on Placements" />
                  </div>
                  <div>
                    <Label htmlFor="notice-content">Content</Label>
                    <textarea id="notice-content" placeholder="Write your announcement here..." className="w-full border rounded-md p-2 text-sm" rows="4"></textarea>
                  </div>
                  <Button className="w-full">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Post Announcement
                  </Button>
                </div>
                <h3 className="font-semibold text-gray-700 mt-6 mb-3">Existing Announcements:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto">
                  <li>Placement Drive Guidelines (2024-07-01) - <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button></li>
                  <li>Resume Workshop Reminder (2024-06-25) - <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Manage FAQ Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="faq-question">Question</Label>
                    <Input id="faq-question" placeholder="e.g., What documents are required for registration?" />
                  </div>
                  <div>
                    <Label htmlFor="faq-answer">Answer</Label>
                    <textarea id="faq-answer" placeholder="Provide the answer here..." className="w-full border rounded-md p-2 text-sm" rows="4"></textarea>
                  </div>
                  <Button className="w-full">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
                <h3 className="font-semibold text-gray-700 mb-3">Existing FAQs:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto">
                  {faqs.map(faq => (
                    <li key={faq.id}>
                      <span className="font-medium">{faq.question}</span>
                      <div className="flex gap-2 items-center mt-1">
                        <Button size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBadge className="w-5 h-5" />
                  Policy Documents & Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="document-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload New Document:</Label>
                <Input id="document-upload" type="file" className="mb-4" />
                <Button className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <h3 className="font-semibold text-gray-700 mt-6 mb-3">Existing Documents:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto">
                  <li>Placement Policy 2024.pdf - <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button></li>
                  <li>Student Handbook.pdf - <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">System Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Portal Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="portal-name">Portal Name</Label>
                  <Input id="portal-name" defaultValue="Smart Placement Portal" />
                </div>
                <div>
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input id="logo-url" defaultValue="https://yourportal.com/logo.png" />
                </div>
                <div>
                  <Label htmlFor="favicon-url">Favicon URL</Label>
                  <Input id="favicon-url" defaultValue="https://yourportal.com/favicon.ico" />
                </div>
                <Button className="w-full">Save Branding</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Feature Toggles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="student-reg">Enable Student Registration</Label>
                  <Input id="student-reg" type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                  <Input id="dark-mode" type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hr-posting">Allow HR to Post Jobs Directly</Label>
                  <Input id="hr-posting" type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
                <Button className="w-full">Save Feature Settings</Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email & SMS Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-api-key">Email Service API Key</Label>
                  <Input id="email-api-key" type="password" placeholder="********************" />
                </div>
                <div>
                  <Label htmlFor="sms-api-key">SMS Service API Key</Label>
                  <Input id="sms-api-key" type="password" placeholder="********************" />
                </div>
                <div>
                  <Label htmlFor="email-limit">Daily Email Limit</Label>
                  <Input id="email-limit" type="number" defaultValue={10000} />
                </div>
                <Button className="w-full">Save Communication Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                System Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {systemLogs.map(log => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.details.split(' ')[1].replace(/'/g, '')}</td> {/* Extract user from details */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.event}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Search className="w-4 h-4 mr-2" />
                Search & Filter Logs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GanttChart className="w-5 h-5" />
                Data Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Track previous versions of modified data entries (e.g., student profiles, job posts).</p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>Student Profile (ID: 123) - Modified by TPO on 2024-07-05 14:00 - <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><RefreshCw className="w-4 h-4" /></Button></li>
                <li>Job Post (ID: 45) - Modified by HR on 2024-07-01 10:00 - <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button> <Button size="sm" variant="ghost"><RefreshCw className="w-4 h-4" /></Button></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API & Developer Access Tab */}
        <TabsContent value="api" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">API & Developer Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  API Key Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Generate New API Key
                </Button>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key (Partial)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {apiKeys.map(apiKey => (
                        <tr key={apiKey.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apiKey.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.key.substring(0, 10)}...</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant={apiKey.status === "Active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost"><ClipboardCopy className="w-4 h-4" /></Button>
                              <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  API Usage & Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Monitor API call volume and set limits for external integrations.</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                  <li>TPO API: {apiKeys[0].usage} calls</li>
                  <li>HR Partner API: {apiKeys[1].usage} calls</li>
                </ul>
                <div>
                  <Label htmlFor="api-limit">Default Daily API Limit</Label>
                  <Input id="api-limit" type="number" defaultValue={5000} />
                </div>
                <Button className="w-full">Save API Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs> {/* Corrected closing tag for Tabs component */}

      {/* Modal for LLM Responses */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{modalTitle}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {llmLoading ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="text-lg text-gray-700">Generating...</p>
              </div>
            ) : (
              <div className="prose max-w-none text-gray-700">
                {modalContent.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
                {llmError && <p className="text-red-500 mt-4">Error: {llmError}</p>}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
