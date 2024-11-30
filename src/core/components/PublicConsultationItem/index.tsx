import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PublicConsultation } from "../HighlightPublicConsultation";
import moment from 'moment';
import 'moment/locale/pt-br'; 

interface Props {
    data: PublicConsultation;
}

const formatCustomDate = (date: Date) => {
    moment.locale('pt-br');
    return moment(date).format('DD [de] MMMM [de] YYYY');
};
  

function PublicConsultationItem({ data: { id, status, ownerName, title, description, initialDate, endDate, } }: Props) {
    const navigate = useNavigate();
    return (
         
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
        <span className="flex justify-between">
            <h2 className="text-xl font-semibold text-brand-primary">
                { title }
            </h2>
            <span className="flex items-center gap-1 text-sm text-brand-primary font-semibold">
                Postada por
                <span className="text-sm font-normal">{ ownerName }</span>
            </span>
        </span>
        <p className="text-gray-700">
            Descrição: { description }
        </p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                <i className="fas fa-calendar-alt mr-1"></i> Início: { formatCustomDate(initialDate)}
                </span>
                <span className="text-sm text-gray-500">
                <i className="fas fa-calendar-times mr-1"></i> Fim: { formatCustomDate(endDate)}
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
                        <Button onClick={() => navigate(`/home/public-consultation-view/${id}`)}  className="bg-brand-primary text-white hover:bg-brand-primary/80">
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