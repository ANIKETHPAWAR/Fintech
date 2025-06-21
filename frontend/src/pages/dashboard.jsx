import { Appbar } from "../components/AppBar";
import { BalanceCard } from "../components/Balance";
import { Users } from "../components/Usercomp";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900  ">
      <Appbar />
      <div className="max-w-4xl mx-auto py-20 px-4 space-y-6 ">
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <BalanceCard />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Users />
        </div>
      </div>
    </div>
  );
};
