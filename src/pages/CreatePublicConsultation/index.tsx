import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePickerForm from "@/core/components/DatePickerForm";
import PublicConsultationOptions from "@/core/components/PublicConsultationOptions";

function CreatePublicConsultation() {
    return (
        <div className="container mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
              <i className="fas fa-plus-circle mr-2"></i> Criar Consulta Pública
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Campo para título */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="title">
                  <i className="fas fa-comment-dots mr-2"></i> Título:
                </label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Digite o título da consulta"
                  className="border-gray-300 focus:border-brand-primary p-6 text-base"
                />
              </div>
  
              {/* Campo para descrição */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="description">
                  <i className="fas fa-align-left mr-2"></i> Descrição:
                </label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Descreva a consulta"
                  className="border-gray-300 focus:border-brand-primary p-3 text-base"
                  rows={4}
                />
              </div>

                {/* Campo para URL da imagem */}
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-2" htmlFor="imageUrl">
                    <i className="fas fa-image mr-2"></i> URL da Imagem:
                  </label>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="Insira a URL da imagem"
                    className="border-gray-300 focus:border-brand-primary p-6 text-base"
                  />
              </div>
  
              {/* Campo para categoria */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="category">
                  <i className="fas fa-tags mr-2"></i> Categoria:
                </label>
                
                <PublicConsultationOptions/>
              </div>
  
              {/* Campo para data de início */}
              <div className="flex gap-5 mt-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-2 relative top-0.5" htmlFor="startDate">
                    <i className="fas fa-calendar-alt mr-2"></i> Data de Início:
                  </label>
                  <DatePickerForm/>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-2 relative top-0.5" htmlFor="endDate">
                    <i className="fas fa-calendar-times mr-2"></i> Data de Fim:
                  </label>
                  <DatePickerForm/>
                </div>
              </div>
  
  
              {/* Botão de criar consulta */}
              <div className="flex justify-center mt-6">
                <Button type="submit" className="bg-brand-primary text-lg text-white hover:bg-brand-primary/80 px-6 py-2 rounded-md shadow-lg transition duration-200">
                  Publicar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      );
}

export default CreatePublicConsultation;