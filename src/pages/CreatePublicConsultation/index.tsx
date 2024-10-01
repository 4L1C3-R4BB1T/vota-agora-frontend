import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectContent } from "@radix-ui/react-select";

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
                  className="border-gray-300 focus:border-brand-primary p-3"
                />
              </div>
  

              {/* Campo para título */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="title">
                  <i className="fas fa-comment-dots mr-2"></i> Título da Consulta:
                </label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Digite o título da consulta"
                  className="border-gray-300 focus:border-brand-primary p-3"
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
                  className="border-gray-300 focus:border-brand-primary p-3 resize-none"
                  rows={4}
                />
              </div>
  
              {/* Campo para categoria */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="category">
                  <i className="fas fa-tags mr-2"></i> Categoria:
                </label>
                <Select >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha uma categoria" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="sd">Selecione uma categoria</SelectItem>
                        <SelectItem value="transporte">Transporte</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="seguranca">Segurança</SelectItem>
                        <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                    </SelectContent>
                </Select>
              </div>
  
              {/* Campo para data de início */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="startDate">
                  <i className="fas fa-calendar-alt mr-2"></i> Data de Início:
                </label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="border-gray-300 focus:border-brand-primary p-3"
                />
              </div>
  
              {/* Campo para data de fim */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-2" htmlFor="endDate">
                  <i className="fas fa-calendar-times mr-2"></i> Data de Fim:
                </label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="border-gray-300 focus:border-brand-primary p-3"
                />
              </div>
  
              {/* Botão de criar consulta */}
              <div className="flex justify-center mt-6">
                <Button type="submit" className="bg-brand-primary text-white hover:bg-brand-primary/80 px-6 py-2 rounded-md shadow-lg transition duration-200">
                  Criar Consulta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      );
}

export default CreatePublicConsultation;