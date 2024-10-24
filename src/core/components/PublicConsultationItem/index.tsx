import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
    status?: 'open' | 'closed';
}

function PublicConsultationItem({ status = 'open' }: Props) {
    const navigate = useNavigate();
    return (
         
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
        <span className="flex justify-between">
            <h2 className="text-xl font-semibold text-brand-primary">
                Consulta sobre Transporte Público
            </h2>
            <span className="flex items-center gap-1 text-sm text-brand-primary font-semibold">
                Postada por
                <span className="text-sm font-normal">Gabriel Cardoso Girarde</span>
            </span>
        </span>
        <p className="text-gray-700">
            Descrição: Buscamos opiniões sobre a melhoria do transporte público na cidade.
        </p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                <i className="fas fa-calendar-alt mr-1"></i> Início: 01 de Outubro de 2024
                </span>
                <span className="text-sm text-gray-500">
                <i className="fas fa-calendar-times mr-1"></i> Fim: 31 de Outubro de 2024
                </span>
            
                {
                    status === 'closed' && (
                       <>
                         <span className="font-semibold text-sm text-red-600">
                            <i className="fas fa-lock mr-1"></i> Fechada
                        </span>
                            <Button className="bg-gray-400 text-white cursor-not-allowed" disabled>
                            Votar
                        </Button>
                       </>
                    )
                }
               {
                    status === 'open' && (
                       <>
                         <span className="font-semibold text-sm text-green-600">
                            <i className="fas fa-lock-open mr-1"></i> Aberta
                        </span>
                        <Button onClick={() => navigate("/home/public-consultation-view")}  className="bg-brand-primary text-white hover:bg-brand-primary/80">
                         Votar
                        </Button>
                       </>
                    ) // melhorar isso dps

               }
            </div>
    </div>

    );
}

export default PublicConsultationItem;