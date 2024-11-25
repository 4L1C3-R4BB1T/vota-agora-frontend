import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
import { PublicConsultation } from "../HighlightPublicConsultation";

interface Props {
  data: PublicConsultation;
}

function HighlightPublicConsultationItem(props: Props) {
    const {
      id,
      category,
      description,
      imageUrl,
      initialDate,
      owner,
      ownerName,
      status,
      title
    } = props.data;
    const navigate = useNavigate();

   return (
    <Card className="flex-1  border border-brand-primary border-opacity-40 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
      
      { status === 'open' && 
        <span className="inline-block bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full mb-4">
          Aberta
       </span>
      }

    { status === 'closed' && 
        <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-4">
          Fechada
       </span>
      }
   
  
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-brand-primary">{ title }</CardTitle>
      <CardDescription className="text-sm text-brand-primary mt-1">
        { description }
      </CardDescription>
    </CardHeader>
  
    <div className="mt-4">
      <img
        src={imageUrl} // Substitua por uma URL de imagem válida
        alt="Descrição da Imagem"
        className="w-full h-40 object-cover rounded-lg"
      />
    </div>
    
    <CardContent className="mt-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-gray-400 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Dono:</strong> { ownerName  }</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Data de Início:</strong> { initialDate.toString() }</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Data de Fim:</strong> { initialDate.toString() }</span>
        </div>
      </div>
    </CardContent>
    
        <CardFooter className="flex justify-between mt-4">
        <Button onClick={() => navigate('/home/public-consultation-view')} variant="outline" className="text-brand-primary hover:bg-blue-100">
            Ver Detalhes
        </Button>
        <Button onClick={() => navigate('/home/public-consultation')} className="bg-brand-primary text-white hover:bg-brand-primary hover:opacity-80">
            Participar
        </Button>
        </CardFooter>
    </Card>
    );
  
}

export default HighlightPublicConsultationItem;