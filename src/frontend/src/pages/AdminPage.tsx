import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Ban,
  Crown,
  Flag,
  LayoutDashboard,
  MessageSquare,
  ShieldAlert,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useActor } from "../hooks/useActor";

const STATS = [
  {
    label: "Total Users",
    value: "1,247",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Premium Members",
    value: "89",
    icon: Crown,
    color: "text-maroon",
    bg: "bg-red-50",
  },
  {
    label: "Elite Members",
    value: "34",
    icon: TrendingUp,
    color: "text-gold",
    bg: "bg-amber-50",
  },
  {
    label: "Total Messages",
    value: "5,820",
    icon: MessageSquare,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Total Profiles",
    value: "1,103",
    icon: UserCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Active Today",
    value: "342",
    icon: LayoutDashboard,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const MOCK_USERS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "user",
    membership: "Premium",
    joined: "Jan 2025",
    status: "active",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "user",
    membership: "Free",
    joined: "Feb 2025",
    status: "active",
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "user",
    membership: "Elite",
    joined: "Dec 2024",
    status: "active",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "user",
    membership: "Free",
    joined: "Mar 2025",
    status: "banned",
  },
  {
    id: 5,
    name: "Deepika Nair",
    role: "user",
    membership: "Premium",
    joined: "Nov 2024",
    status: "active",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    role: "admin",
    membership: "Elite",
    joined: "Oct 2024",
    status: "active",
  },
  {
    id: 7,
    name: "Sunita Reddy",
    role: "user",
    membership: "Free",
    joined: "Mar 2025",
    status: "active",
  },
  {
    id: 8,
    name: "Karthik Iyer",
    role: "user",
    membership: "Premium",
    joined: "Jan 2025",
    status: "active",
  },
];

const MOCK_PROFILES = [
  {
    name: "Neha Gupta",
    age: 27,
    city: "Mumbai",
    profession: "Doctor",
    status: "pending",
  },
  {
    name: "Sanjay Kumar",
    age: 30,
    city: "Delhi",
    profession: "Engineer",
    status: "approved",
  },
  {
    name: "Kavitha Rao",
    age: 26,
    city: "Bangalore",
    profession: "Software",
    status: "approved",
  },
  {
    name: "Rohan Joshi",
    age: 32,
    city: "Pune",
    profession: "Business",
    status: "flagged",
  },
  {
    name: "Meena Pillai",
    age: 25,
    city: "Chennai",
    profession: "Teacher",
    status: "pending",
  },
  {
    name: "Aditya Bansal",
    age: 29,
    city: "Hyderabad",
    profession: "Government",
    status: "approved",
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    from: "Priya Sharma",
    to: "Rahul Verma",
    preview: "Hi, I found your profile very interesting!",
    time: "2h ago",
    flagged: false,
  },
  {
    id: 2,
    from: "Vikram Singh",
    to: "Ananya Patel",
    preview: "Contact me on WhatsApp +91-9999999999",
    time: "3h ago",
    flagged: true,
  },
  {
    id: 3,
    from: "Deepika Nair",
    to: "Arjun Mehta",
    preview: "Would love to know more about your family background.",
    time: "5h ago",
    flagged: false,
  },
  {
    id: 4,
    from: "Karthik Iyer",
    to: "Neha Gupta",
    preview: "Namaste! Are you from South India?",
    time: "1d ago",
    flagged: false,
  },
  {
    id: 5,
    from: "Sunita Reddy",
    to: "Sanjay Kumar",
    preview: "My parents would like to speak with you.",
    time: "1d ago",
    flagged: false,
  },
];

export default function AdminPage() {
  const { actor, isFetching } = useActor();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading || isFetching) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div
          className="w-8 h-8 border-4 border-maroon/30 border-t-maroon rounded-full animate-spin"
          data-ocid="admin.loading_state"
        />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
          data-ocid="admin.error_state"
        >
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-3xl text-maroon mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-6">
            You do not have permission to view this page.
          </p>
          <Link to="/">
            <Button className="bg-maroon text-white hover:bg-maroon-deep rounded-full px-8">
              Go to Home
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" data-ocid="admin.page">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex md:w-56 bg-maroon text-white flex-col py-6 px-3 gap-1 shrink-0">
          <div className="px-3 mb-6">
            <h2 className="font-display text-xl text-gold">Admin Panel</h2>
            <p className="text-white/60 text-xs mt-1">Bandhan Management</p>
          </div>
          {["dashboard", "users", "profiles", "messages"].map((tab) => (
            <a
              key={tab}
              href={`#${tab}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-maroon-light transition-colors text-sm font-medium capitalize"
              data-ocid="admin.tab"
            >
              {tab === "dashboard" && <LayoutDashboard className="w-4 h-4" />}
              {tab === "users" && <Users className="w-4 h-4" />}
              {tab === "profiles" && <UserCheck className="w-4 h-4" />}
              {tab === "messages" && <MessageSquare className="w-4 h-4" />}
              {tab}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl text-maroon mb-6">
              Admin Dashboard
            </h1>

            <Tabs defaultValue="dashboard">
              {/* Mobile tab bar */}
              <TabsList className="flex md:hidden w-full mb-6 bg-secondary">
                <TabsTrigger
                  value="dashboard"
                  className="flex-1 text-xs"
                  data-ocid="admin.tab"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="flex-1 text-xs"
                  data-ocid="admin.tab"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="profiles"
                  className="flex-1 text-xs"
                  data-ocid="admin.tab"
                >
                  Profiles
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="flex-1 text-xs"
                  data-ocid="admin.tab"
                >
                  Messages
                </TabsTrigger>
              </TabsList>

              {/* Hidden desktop triggers (sidebar handles navigation) */}
              <TabsList className="hidden">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="profiles">Profiles</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              {/* Dashboard */}
              <TabsContent value="dashboard" id="dashboard">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Card className="border border-border shadow-card">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}
                              >
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  {stat.label}
                                </p>
                                <p className="font-display text-2xl font-bold text-foreground">
                                  {stat.value}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Users */}
              <TabsContent value="users" id="users">
                <Card className="border border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="font-display text-maroon">
                      All Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table data-ocid="admin.table">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Membership</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {MOCK_USERS.map((user, i) => (
                            <TableRow
                              key={user.id}
                              data-ocid={`admin.row.${i + 1}`}
                            >
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.role === "admin"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    user.role === "admin"
                                      ? "bg-maroon text-white"
                                      : ""
                                  }
                                >
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`text-sm font-medium ${
                                    user.membership === "Elite"
                                      ? "text-gold"
                                      : user.membership === "Premium"
                                        ? "text-maroon"
                                        : "text-muted-foreground"
                                  }`}
                                >
                                  {user.membership}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {user.joined}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.status === "active"
                                      ? "outline"
                                      : "destructive"
                                  }
                                  className={
                                    user.status === "active"
                                      ? "border-green-500 text-green-600"
                                      : ""
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 text-xs border-maroon text-maroon"
                                    data-ocid="admin.edit_button"
                                  >
                                    <Crown className="w-3 h-3 mr-1" /> Promote
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 text-xs border-destructive text-destructive"
                                    data-ocid="admin.delete_button"
                                  >
                                    <Ban className="w-3 h-3 mr-1" /> Ban
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profiles */}
              <TabsContent value="profiles" id="profiles">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-ocid="admin.list"
                >
                  {MOCK_PROFILES.map((profile, i) => (
                    <Card
                      key={profile.name}
                      className="border border-border shadow-card"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-foreground">
                              {profile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {profile.age} • {profile.city} •{" "}
                              {profile.profession}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs ${
                              profile.status === "approved"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : profile.status === "flagged"
                                  ? "bg-red-100 text-red-700 border-red-300"
                                  : "bg-amber-100 text-amber-700 border-amber-300"
                            }`}
                            variant="outline"
                          >
                            {profile.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-7 text-xs border-green-500 text-green-600"
                            data-ocid="admin.primary_button"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-7 text-xs border-amber-500 text-amber-600"
                            data-ocid="admin.secondary_button"
                          >
                            <Flag className="w-3 h-3 mr-1" /> Flag
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-7 text-xs border-destructive text-destructive"
                            data-ocid="admin.delete_button"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Messages */}
              <TabsContent value="messages" id="messages">
                <Card className="border border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="font-display text-maroon">
                      Recent Message Threads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3" data-ocid="admin.list">
                      {MOCK_MESSAGES.map((msg, i) => (
                        <div
                          key={msg.id}
                          className={`flex items-start justify-between p-4 rounded-xl border ${
                            msg.flagged
                              ? "border-red-200 bg-red-50"
                              : "border-border bg-secondary"
                          }`}
                          data-ocid={`admin.item.${i + 1}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">
                                {msg.from}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                →
                              </span>
                              <span className="font-semibold text-sm">
                                {msg.to}
                              </span>
                              {msg.flagged && (
                                <Badge
                                  className="bg-red-100 text-red-700 border-red-300 text-xs"
                                  variant="outline"
                                >
                                  Flagged
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {msg.preview}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs border-amber-500 text-amber-600"
                              data-ocid="admin.secondary_button"
                            >
                              <Flag className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs border-destructive text-destructive"
                              data-ocid="admin.delete_button"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
