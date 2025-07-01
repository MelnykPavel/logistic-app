import DashboardTemplate from "@/components/dashboard-template";

export default function DashboardPage() {
  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold ">Dashboard</span>
      </div>
      <DashboardTemplate />
    </div>
  );
}
