import DashboardChart from "@/core/components/DashboardChart";

function Dashboard() {
    return (
        <div>
           <div>
                <h1 className="text-2xl mb-4 font-medium text-brand-primary">Consultas Públicas</h1>
                <DashboardChart/>
           </div>
        </div>
    );
}

export default Dashboard;