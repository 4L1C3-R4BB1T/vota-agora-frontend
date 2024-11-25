import { Button } from "@/components/ui/button";
import DashboardChart from "@/core/components/DashboardChart";
import HighlightPublicConsultation from "@/core/components/HighlightPublicConsultation";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();

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
           <div className="mt-5 border-brand-primary flex flex-col items-center justify-center p-8 border bg-white rounded-lg  shadow-md">
                <h1 className="text-3xl font-semibold text-brand-primary mb-2">Faça a sua parte</h1>
                <p className="text-base text-brand-primary mb-6">
                    Participe ativamente! Publique uma consulta pública e tenha a chance de ganhar prêmios incríveis.
                </p>
                <Button onClick={() => navigate("/home/create-public-consultation")} className="px-4 py-2 text-white bg-brand-primary hover:bg-brand-primary hover:opacity-80 rounded transition duration-200">
                    Publicar Consulta Pública
                </Button>
            </div>
        </div>
    );
}

export default DashboardPage;