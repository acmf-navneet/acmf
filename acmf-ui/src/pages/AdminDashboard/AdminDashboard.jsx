import { Layout } from "./components/custom/layout";
import { Button } from "./components/custom/button";
import AppShell from "./components/AppShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentSales } from "./components/recent-sales";
import { Overview } from "./components/overview";

const Icon = ({ id, pathData }) => (
  <svg
    id={id}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-4 w-4 text-muted-foreground"
  >
    <path d={pathData} />
  </svg>
);

const cardData = [
  {
    title: "Live Projects",
    value: "45",
    subtitle: "Projects actively running",
    iconId: "live-projects-icon",
    pathData: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Total Projects",
    value: "2350",
    subtitle: "All-time projects",
    iconId: "total-projects-icon",
    pathData:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8a4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    title: "Closed Projects",
    value: "12234",
    subtitle: "Completed and closed projects",
    iconId: "closed-projects-icon",
    pathData: "M2 10h20v14H2z",
  },
  {
    title: "Active Users",
    value: "573",
    subtitle: "Currently active users",
    iconId: "active-users-icon",
    pathData: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <Layout.Body>
        <div className="ml-4 mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">ACMF Dashboard</h1>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              {["overview", "analytics", "reports", "notifications"].map(
                (tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cardData.map(({ title, value, subtitle, iconId, pathData }) => (
                <Card key={iconId}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {title}
                    </CardTitle>
                    <Icon id={iconId} pathData={pathData} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle id="overview-card-title">Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle id="recent-sales-card-title">
                    Recent Activities
                  </CardTitle>
                  <CardDescription>
                    Latest updates on the ACMF project.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
};

export default Dashboard;
