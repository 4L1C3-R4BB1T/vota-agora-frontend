import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PublicConsultationView() {
    return (
        <div className="container mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
              <i className="fas fa-balance-scale mr-2"></i> Votar em Consulta Pública
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="flex justify-center mb-4">
              <img 
                src="https://via.placeholder.com/600x200" 
                alt="Consulta sobre Transporte Público"
                className="w-full h-auto rounded-md"
              />
            </div>
      
            <div className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-brand-primary mb-2">
                  Título da Consulta: <span className="font-bold">Consulta sobre Transporte Público</span>
                </h2>
                <p className="text-base text-brand-primary">
                  Descrição: Nesta consulta, estamos buscando opiniões sobre a melhoria do transporte público na cidade. Sua participação é essencial para garantir que as necessidades da comunidade sejam atendidas.
                </p>
              </div>
              <div className="flex flex-col border-b pb-4 mb-4">
                <span className="font-semibold text-base text-brand-primary mb-2">
                  <i className="fas fa-users mr-2"></i> Participantes:
                </span>
                <span className="text-base text-gray-700">150 Participantes</span>
              </div>
              <div className="flex flex-col border-b pb-4 mb-4">
                <span className="font-semibold text-base text-brand-primary mb-2">
                  <i className="fas fa-calendar-alt mr-2"></i> Data de Início:
                </span>
                <span className="text-base text-gray-700">01 de Outubro de 2024</span>
              </div>
              <div className="flex flex-col border-b pb-4 mb-4">
                <span className="font-semibold text-base text-brand-primary mb-2">
                  <i className="fas fa-calendar-times mr-2"></i> Data de Fim:
                </span>
                <span className="text-base text-gray-700">31 de Outubro de 2024</span>
              </div>
              <div className="flex flex-col border-b pb-4 mb-4">
                <span className="font-semibold text-base text-brand-primary mb-2">
                  <i className="fas fa-user mr-2"></i> Dono da Consulta:
                </span>
                <span className="text-base text-gray-700">Gabriel Cardoso</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base text-brand-primary mb-2">
                  <i className="fas fa-lock mr-2"></i> Status:
                </span>
                <span className="text-base text-gray-700">Aberta</span>
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

export default PublicConsultationView;