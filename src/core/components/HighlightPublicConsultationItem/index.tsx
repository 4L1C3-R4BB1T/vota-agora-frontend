import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import moment from "moment";
import { useNavigate } from "react-router-dom";
import { PublicConsultation } from "../HighlightPublicConsultation";

interface Props {
  data: PublicConsultation;
}

function HighlightPublicConsultationItem(props: Props) {
    const {
      id,
      imageUrl,
      initialDate,
      endDate,
      ownerName,
      status,
      voted,
      title,
      owner,
    } = props.data;
    const navigate = useNavigate();

    const formatDate = (date: Date): string => {
      return moment(date).format('DD/MM/YYYY [às] HH:mm');
    }

   return (
    <Card className="flex-1 border-brand-primary shadow-lg border rounded-lg p-6 bg-white hover:shadow-2xl transition-shadow duration-300">
    {/* Status */}
    <div className="flex justify-between items-center">
      {status === "open" ? (
        <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
          Aberta
        </span>
      ) : (
        <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          Fechada
        </span>
      )}
      {voted && (
        <span className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          Já votada
        </span>
      )}
    </div>

  
    {/* Header */}
    <CardHeader className="mt-4">
      <CardTitle className="text-xl font-semibold text-brand-primary leading-tight truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{title}</TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardTitle>
    </CardHeader>
  
    {/* Imagem */}
    <div className="mt-4 border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={`Imagem representativa de ${title}`}
        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
      />
    </div>
  
    {/* Conteúdo */}
    <CardContent className="mt-6">
      <div className="flex flex-col gap-3">
        {/* Dono */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">
            <strong className="text-brand-primary">Dono:</strong> {ownerName} { owner ? '(Você)' : ''}
          </span>
        </div>
  
        {/* Data de Início */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">
            <strong className="text-brand-primary">Data de Início:</strong> {formatDate(initialDate)}
          </span>
        </div>
  
        {/* Data de Fim */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">
            <strong className="text-brand-primary">Data de Fim:</strong> {formatDate(endDate)}
          </span>
        </div>
      </div>
    </CardContent>
  
    {/* Rodapé */}
    <CardFooter className="flex justify-between mt-6">
      <Button
        onClick={() => navigate(`/home/public-consultation-view/${id}`)}
        variant="outline"
        className="text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white hover:shadow-md transition-all duration-200 px-6 py-2 rounded-md"
      >
        Ver Detalhes
      </Button>
      <Button
        onClick={() => navigate("/home/public-consultation")}
        className="bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-md transition-all duration-200 px-6 py-2 rounded-md"
      >
        Participar
      </Button>
    </CardFooter>
  </Card>
  
    );
  
}

export default HighlightPublicConsultationItem;