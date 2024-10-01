import DashboardChart from "@/core/components/DashboardChart";
import HighlightPublicConsultation from "@/core/components/HighlightPublicConsultation";

function Dashboard() {
    return (
        <div>
           <div>
                <h1 className="text-2xl mb-4 font-medium text-brand-primary">Consultas Públicas</h1>
                <DashboardChart/>
           </div>
           <div className="mt-5">
                <h1 className="text-2xl mb-4 font-medium text-brand-primary">Em Destaque</h1>
                <HighlightPublicConsultation/>
           </div>
        </div>
    );
}

export default Dashboard;