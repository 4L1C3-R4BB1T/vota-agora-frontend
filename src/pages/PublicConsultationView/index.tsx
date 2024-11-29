import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicConsultation } from "@/core/components/HighlightPublicConsultation";
import useApi from "@/core/hooks/useApi";
import moment from "moment";
import React, { useState } from "react";
import { Atom } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type PublicConsultationWithParticipants = PublicConsultation & { countParticipants: number };

function PublicConsultationViewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState<PublicConsultationWithParticipants | null>(null);
  const { request, loading } = useApi('/public-consultation');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getData = React.useCallback(async () => {
    const id = params['id'];
    const result = await request<PublicConsultationWithParticipants>({
      endpoint: '/' + id,
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

    setData(() => result);
  }, [params, request]);

  React.useEffect(() => {
    if (data) return;
    if (!('id' in params)) {
      navigate('/home/dashboard');
      return;
    }
    getData();
  }, [params, navigate, request, data, getData]);

  if (loading) {
    return <div className="h-full flex items-center justify-center">
      <Atom color="#6746CB" size="medium" text="" textColor="" />
  </div>
  }

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <i className="fas fa-chart-bar text-brand-primary text-6xl mb-4"></i>
          <span className="text-lg font-medium text-brand-primary">
            Não há nenhum dado para exibir
          </span>
        </div>
    </div>
    );
  }

  const { title, description, imageUrl, countParticipants, initialDate, endDate, ownerName, status, owner, category, voted, } = data!;

  const formatDate = (date: Date) => {
    return moment(date).format('DD [de] MMMM [de] YYYY');
  }

  const getCategory = (category: string) => {
    switch(category) {
      case "public_health":
          return "Saúde Pública";
      case "education":
          return "Educação";
      case "environment":
          return "Meio Ambiente";
      default:
        return category;
    }
  }

  const accept = async () => {
    await request({
      endpoint: `/register-vote/${params.id}`,
    });

    closeModal();
    toast.success('Seu voto foi registrado.');
    await getData();
  }
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
    <Card className="shadow-lg border border-brand-primary rounded-lg">
      {/* Header */}
      <CardHeader className="bg-brand-primary p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <i className="fas fa-balance-scale"></i>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
  
      {/* Content */}
      <CardContent className="p-6 bg-white rounded-b-lg">
        {/* Imagem */}
        <div className="flex justify-center mb-6">
          <img
            src={imageUrl}
            alt="Consulta Pública"
            className="w-full max-w-md h-auto rounded-md object-cover border border-gray-200 shadow-md"
          />
        </div>
  
        {/* Informações principais */}
        <div className="space-y-6">
          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <i className="fa-solid fa-font"></i> Descrição:
            </span>
            <p className="text-gray-700 text-sm leading-relaxed border p-3 rounded-md bg-gray-50">
              {description}
            </p>
          </div>
  
          {/* Participantes */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <i className="fas fa-users"></i> Participantes:
            </span>
            <Badge className="bg-brand-primary text-white text-sm py-1 px-3">
              {countParticipants}
            </Badge>
          </div>
  
          {/* Datas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i> Data de Início:
              </span>
              <p className="text-gray-700">{formatDate(initialDate)}</p>
            </div>
            <div>
              <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
                <i className="fas fa-calendar-times"></i> Data de Fim:
              </span>
              <p className="text-gray-700">{formatDate(endDate)}</p>
            </div>
          </div>
  
          {/* Responsável */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <i className="fas fa-user"></i> Responsável:
            </span>
            <p className="text-gray-700">
              {ownerName} {owner && "(Você)"}
            </p>
          </div>
  
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <i className="fas fa-lock"></i> Status:
            </span>
            {status === "open" && (
              <Badge className="bg-green-600 text-white py-1 px-3">Ativo</Badge>
            )}
            {status === "closed" && (
              <Badge className="bg-red-600 text-white py-1 px-3">Encerrado</Badge>
            )}
          </div>
  
          {/* Categoria */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <i className="fas fa-tags"></i> Categoria:
            </span>
            <p className="text-gray-700">{getCategory(category)}</p>
          </div>
        </div>
  
        {/* Botões */}
        {(!owner && !voted && status === 'open') && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={openModal}
              className="bg-brand-primary text-white hover:bg-brand-primary/90 px-8 py-3 rounded-md shadow-lg transition duration-200 text-lg"
            >
              Votar
            </Button>
          </div>
        )}
        {(voted && status === 'open') && (
          <div className="flex justify-center mt-8">
            <Button
              disabled
              className="bg-gray-400 text-white px-8 py-3 rounded-md shadow-lg text-lg cursor-not-allowed"
            >
              Você já votou nessa consulta!
            </Button>
          </div>
        )}
        {
          status === 'closed' &&
          <div className="flex justify-center mt-8">
            <Button
              disabled
              className="bg-gray-400 text-white px-8 py-3 rounded-md shadow-lg text-lg cursor-not-allowed"
            >
              Essa consulta não aceita mais votos.
            </Button>
          </div>
        }
      </CardContent>
    </Card>
  
    {/* Modal para votação */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100">
        <div className="bg-white max-w-lg w-full p-8 rounded-lg shadow-xl transform transition-transform duration-500 ease-out scale-95 hover:scale-100">
          <button
            onClick={closeModal}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <CardTitle className="text-xl mt-4 font-semibold text-white bg-brand-primary p-5 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 ease-out hover:bg-brand-primary/90">
            <i className="fa-solid fa-check-to-slot mr-3 text-white"></i>
            Votação na Consulta Pública
          </CardTitle>
          <p className="text-gray-700 mt-6 text-center text-lg">
            Por favor, escolha uma opção:
          </p>
          <div className="flex gap-6 mt-8 justify-center">
            <Button
              onClick={accept}
              className="flex-1 bg-green-600 text-lg hover:bg-green-500 text-white py-3 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
            >
              Concordar
            </Button>
            <Button
              onClick={closeModal}
              className="flex-1 bg-red-600 text-lg hover:bg-red-500 text-white py-3 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    )}

  </div>
  
  );
}

export default PublicConsultationViewPage;
