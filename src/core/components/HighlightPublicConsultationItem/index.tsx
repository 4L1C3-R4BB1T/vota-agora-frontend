import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function HighlightPublicConsultationItem() {
   return (
    <Card className="flex-1 border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
  
    <span className="inline-block bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full mb-4">
      Aberta
    </span>
  
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-brand-primary">Título da Consulta Pública</CardTitle>
      <CardDescription className="text-sm text-brand-primary mt-1">
        Descrição detalhada da consulta pública aqui. Esta é uma breve introdução que capta a atenção do leitor.
      </CardDescription>
    </CardHeader>
  
    <div className="mt-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOYV3zq0M-4q7oOcVAVYPdINmi0JXB87gnA&s" // Substitua por uma URL de imagem válida
        alt="Descrição da Imagem"
        className="w-full h-40 object-cover rounded-lg"
      />
    </div>
    
    <CardContent className="mt-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-gray-400 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Dono:</strong> Nome do Owner</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Data de Início:</strong> DD/MM/YYYY</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-brand-primary"><strong>Data de Fim:</strong> DD/MM/YYYY</span>
        </div>
      </div>
    </CardContent>
    
        <CardFooter className="flex justify-between mt-4">
        <Button variant="outline" className="text-brand-primary hover:bg-blue-100">
            Ver Detalhes
        </Button>
        <Button className="bg-brand-primary text-white hover:bg-brand-primary hover:opacity-80">
            Participar
        </Button>
        </CardFooter>
    </Card>
    );
  
}

export default HighlightPublicConsultationItem;