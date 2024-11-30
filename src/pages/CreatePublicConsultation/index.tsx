import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePickerForm from "@/core/components/DatePickerForm";
import PublicConsultationOptions from "@/core/components/PublicConsultationOptions";
import useApi from "@/core/hooks/useApi";
import checkZodValidationErrors from "@/core/utils/check-zod-validation-errors.util";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const createPublicConsultationSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres.")
    .max(3000, "O título pode ter no máximo 3000 caracteres."),
  
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres.")
    .max(5000, "A descrição pode ter no máximo 5000 caracteres."),
  
  imageUrl: z
    .string()
    .url("A URL da imagem deve ser válida."),
  
  category: z
    .string()
    .max(50, "A categoria pode ter no máximo 50 caracteres."),
  endDate: z.date().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const tomorrow = new Date(today); 
    tomorrow.setDate(today.getDate() + 1); 
    return date >= tomorrow;
  }, "A data final deve ser no mínimo amanhã."),
});
function CreatePublicConsultation() {
    const [inputs, setInputs] = React.useState({
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      endDate: new Date(),
    });
    const { request } = useApi();
    const navigate = useNavigate();

    const onFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
      const { name, value } = event.target;
      const propertyName = name as keyof typeof inputs;
      inputs[propertyName] = value;
      setInputs(inputs);
  }

  const setDate = (name: string, value: Date | undefined) => {
    if (!value) return;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const onSubmit = async () => {
    const errors = checkZodValidationErrors(inputs, createPublicConsultationSchema);
    if (errors) {
      Object.entries(errors).forEach(([ , message ]) => toast.info(message as string));
      return;
    }

    const result = await request({
      endpoint: '/public-consultation',
      method: 'POST',
      body: inputs,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = result as { [key: string]: any };

    if (error?.message && Array.isArray(error.message)) {
        error.message.forEach(errorMessage => toast.error(errorMessage));
        return
    } else if (error?.message) {
        toast.error(error.message);
        return;
    }

    toast.success('Consulta criada com sucesso.');
    navigate('/home/dashboard');
  }

    return (
      <div className="container mx-auto p-6 max-w-5xl">
      <Card className="shadow-lg border border-brand-primary border-opacity-80 bg-white rounded-lg overflow-hidden">
        {/* Cabeçalho */}
        <CardHeader className="bg-brand-primary text-white p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <i className="fas fa-plus-circle mr-3"></i>
            Criar Consulta Pública
          </CardTitle>
        </CardHeader>
    
        {/* Conteúdo */}
        <CardContent className="p-6">
          <form
            className="space-y-6"
            onChange={onFormChange}
            onSubmit={(event) => event.preventDefault()}
          >
            {/* Campo para título */}
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-brand-primary mb-2 flex items-center"
              >
                <i className="fas fa-comment-dots mr-2"></i> Título:
              </label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Digite o título da consulta"
                className="border border-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-lg p-3 text-base"
              />
            </div>
    
            {/* Campo para descrição */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-lg font-semibold text-brand-primary mb-2 flex items-center"
              >
                <i className="fas fa-align-left mr-2"></i> Descrição:
              </label>
              <Textarea
                name="description"
                id="description"
                placeholder="Descreva a consulta"
                className="border border-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-lg p-3 text-base"
                rows={4}
              />
            </div>
    
            {/* Campo para URL da imagem */}
            <div className="flex flex-col">
              <label
                htmlFor="imageUrl"
                className="text-lg font-semibold text-brand-primary mb-2 flex items-center"
              >
                <i className="fas fa-image mr-2"></i> URL da Imagem:
              </label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="Insira a URL da imagem"
                className="border border-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-lg p-3 text-base"
              />
            </div>
    
            {/* Campo para categoria */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-lg font-semibold text-brand-primary mb-2 flex items-center"
              >
                <i className="fas fa-tags mr-2"></i> Categoria:
              </label>
              <PublicConsultationOptions />
            </div>
    
            {/* Campo para data de encerramento */}
            <div className="flex flex-col mt-5">
              <label
                htmlFor="endDate"
                className="text-lg font-semibold text-brand-primary mb-2 flex items-center"
              >
                <i className="fas fa-calendar-times mr-2"></i> Data de Encerramento:
              </label>
              <DatePickerForm onSelectionDate={setDate} name="endDate" />
            </div>
    
            {/* Botões */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => navigate('/home/dashboard')}
                className="bg-gray-200 text-brand-primary hover:bg-gray-300 px-6 py-3 rounded-lg shadow transition duration-200 flex items-center"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i> Voltar
              </Button>
              <Button
                onClick={onSubmit}
                type="submit"
                className="bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-3 rounded-lg shadow-lg transition duration-200 flex items-center"
              >
                <i className="fa-solid fa-paper-plane mr-2"></i> Publicar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    
      );
}

export default React.memo(CreatePublicConsultation);