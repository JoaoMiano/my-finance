import { Table } from "lucide-react";
import SectionCharts from "../SectionCharts";
import SectionOverview from "../SectionOverview";
import TableHistory from "../tables/TableHistory";



const Dashboard = () => {

  return (
    <div className="my-4 lg-my-8 mx-auto w-full container flex flex-col gap-4">
      <SectionOverview />
      <SectionCharts />
      <TableHistory />
    </div>
  );
}
export default Dashboard;