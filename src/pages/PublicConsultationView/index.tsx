import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function PublicConsultationViewPage() {
    return (
        <div className="container mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
              <i className="fas fa-balance-scale mr-2"></i> Redução da tarifa dos ônibus da Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="flex justify-center mb-4">
              <img 
                src="https://agersa.es.gov.br/site-agersa/wp-content/uploads/2021/06/whatsapp-image-2020-03-23-at-17.59.50-920x530-1.jpeg" 
                alt="Consulta sobre Transporte Público"
                className="w-full h-auto rounded-md"
              />
            </div>
      
            <div className="space-y-6">
              <div className="flex flex-col">
                <Textarea className="resize-none italic text-lg"  disabled defaultValue={"Nesta consulta, estamos buscando opiniões sobre a melhoria do transporte público na cidade. Sua participação é essencial para garantir que as necessidades da comunidade sejam atendidas."}/>
              </div>
              <div className="flex items-center gap-2 border-b pb-4 mb-4">
                <span className="font-semibold text-lg text-brand-primary mb-2">
                  <i className="fas fa-users mr-2"></i> Participantes:
                </span>
                <span className="relative bottom-0.5">
                  <Badge className="bg-brand-primary hover:bg-brand-primary text-lg">150</Badge>
                </span>
              </div>
              <div className="flex gap-2 border-b pb-4 mb-4">
                <span className="font-semibold text-lg text-brand-primary mb-2">
                  <i className="fas fa-calendar-alt mr-2"></i> Data de Início:
                </span>
                <span className="text-lg text-gray-700 italic">01 de Outubro de 2024</span>
              </div>
              <div className="flex gap-2 border-b pb-4 mb-4">
                <span className="font-semibold text-lg text-brand-primary mb-2">
                  <i className="fas fa-calendar-times mr-2"></i> Data de Fim:
                </span>
                <span className="text-lg text-gray-700 italic">31 de Outubro de 2024</span>
              </div>
              <div className="flex gap-2 border-b pb-4 mb-4">
                <span className="font-semibold text-lg text-brand-primary mb-2">
                  <i className="fas fa-user mr-2"></i> Responsável:
                </span>
                <span className="text-lg text-gray-700 italic">Gabriel Cardoso Girarde</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-lg text-brand-primary mb-2">
                  <i className="fas fa-lock mr-2"></i> Status:
                </span>
                <span className="relative bottom-0.5">
                  <Badge className="bg-green-600 hover:bg-green-500 text-lg">Ativo</Badge>
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button type="button" className="bg-brand-primary text-white hover:opacity-80 hover:bg-brand-primary/80 px-8 py-3 rounded-md shadow-lg transition duration-200 text-lg">
                Votar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
    );
}

export default PublicConsultationViewPage;