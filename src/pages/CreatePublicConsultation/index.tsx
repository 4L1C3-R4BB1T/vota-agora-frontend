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
    .min(3, "A categoria deve ter pelo menos 3 caracteres.")
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
      Object.entries(errors).forEach(([ , message ]) => toast.info(message as string, { theme: 'dark' }));
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
        error.message.forEach(errorMessage => toast.error(errorMessage, { theme: 'dark' }));
        return
    } else if (error?.message) {
        toast.error(error.message, { theme: 'dark'});
        return;
    }

    toast.success('Consulta criada com sucesso.');
    navigate('/home/dashboard');
  }

    return (
        <div className="container  mx-auto p-6">
        <Card className="shadow-lg border border-black border-opacity-80 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white bg-brand-secondary p-4 rounded-md flex items-center">
              <i className="fas fa-plus-circle mr-2"></i> Criar Consulta Pública
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onChange={onFormChange} onSubmit={event => event.preventDefault()}>
              {/* Campo para título */}
              <div className="flex flex-col">
                <label className="font-semibold text-brand-secondary mb-2 text-lg" htmlFor="title">
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
                <label className="font-semibold text-brand-secondary mb-2 text-lg" htmlFor="description">
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
                  <label className="font-semibold text-brand-secondary mb-2 text-lg" htmlFor="imageUrl">
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
                <label className="font-semibold text-brand-secondary mb-2 text-lg" htmlFor="category">
                  <i className="fas fa-tags mr-2"></i> Categoria:
                </label>
                
                <PublicConsultationOptions/>
              </div>
  
              {/* Campo para data de início */}
              <div className="flex gap-5 mt-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-brand-secondary mb-2 relative top-0.5 text-lg" htmlFor="endDate">
                    <i className="fas fa-calendar-times mr-2"></i> Data de Encerramento:
                  </label>
                  <DatePickerForm onSelectionDate={setDate} name="endDate"/>
                </div>
              </div>
  
              {/* Botão de criar consulta */}
              <div className="flex gap-2 justify-center mt-6">
                <Button type="button" onClick={() => navigate('/home/dashboard')} className="bg-brand-secondary hover:opacity-80 py-5 text-lg mt-4 placeholder:text-lg text-white hover:bg-brand-primary/80 px-6 rounded-md shadow-lg transition duration-200">
                  <i className="fa-solid fa-arrow-left"></i> Voltar
                </Button>
                <Button onClick={onSubmit} type="submit" className="bg-green-800 hover:opacity-80 py-5 text-lg mt-4 placeholder:text-lg text-white hover:bg-brand-primary/80 px-6 rounded-md shadow-lg transition duration-200">
                  Publicar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      );
}

export default React.memo(CreatePublicConsultation);