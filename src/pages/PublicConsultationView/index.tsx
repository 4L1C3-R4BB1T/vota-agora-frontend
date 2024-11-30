import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicConsultation } from "@/core/components/HighlightPublicConsultation";
import useApi from "@/core/hooks/useApi";
import moment from "moment";
import 'moment/locale/pt-br';
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
    <div className="container mx-auto p-6">
  <Card className="shadow-lg border border-brand-primary rounded-xl">
    {/* Header */}
    <CardHeader className="bg-gradient-to-r from-[#6746CB] to-[#4D94FF] p-6 rounded-t-xl">
      <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
        <i className="fas fa-balance-scale text-xl"></i>
        {title}
      </CardTitle>
    </CardHeader>

    {/* Content */}
    <CardContent className="p-8 bg-gray-50 rounded-b-xl">
      {/* Imagem */}
      <div className="flex justify-center mb-8">
        <img
          src={imageUrl}
          alt="Consulta Pública"
          className="w-full max-h-[25vh] h-auto rounded-lg object-cover object-top border border-gray-300 shadow-md"
        />
      </div>

      {/* Informações principais */}
      <div className="space-y-8">
        {/* Descrição */}
        <div>
          <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
            <i className="fa-solid fa-align-left"></i> Descrição
          </span>
          <p className="text-gray-700 mt-2 leading-relaxed border border-gray-50 p-4 rounded-lg bg-gray-100 shadow-inner">
            {description}
          </p>
        </div>

        {/* Participantes */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
            <i className="fas fa-users"></i> Participantes
          </span>
          <Badge className="bg-brand-primary text-white text-sm py-1 px-4 rounded-full shadow">
            {countParticipants}
          </Badge>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
              <i className="fas fa-calendar-alt"></i> Data de Início
            </span>
            <p className="text-gray-700 mt-1">{formatDate(initialDate)}</p>
          </div>
          <div>
            <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
              <i className="fas fa-calendar-times"></i> Data de Fim
            </span>
            <p className="text-gray-700 mt-1">{formatDate(endDate)}</p>
          </div>
        </div>

        {/* Responsável */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
            <i className="fas fa-user"></i> Responsável
          </span>
          <p className="text-gray-700">{ownerName} {owner && "(Você)"}</p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
            <i className="fas fa-lock"></i> Status
          </span>
          {status === "open" && (
            <Badge className="bg-green-500 text-white py-1 px-4 rounded-full shadow">
              Ativo
            </Badge>
          )}
          {status === "closed" && (
            <Badge className="bg-red-500 text-white py-1 px-4 rounded-full shadow">
              Encerrado
            </Badge>
          )}
        </div>

        {/* Categoria */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-brand-primary flex items-center gap-3">
            <i className="fas fa-tags"></i> Categoria
          </span>
          <p className="text-gray-700">{getCategory(category)}</p>
        </div>
      </div>

      {/* Botões */}
      {!owner && !voted && status === "open" && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={openModal}
            className="bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-3 rounded-lg shadow-lg transition duration-200 text-lg"
          >
            Votar
          </Button>
        </div>
      )}
      {voted && status === "open" && (
        <div className="flex justify-center mt-8">
          <Button
            disabled
            className="bg-brand-primary opacity-60 text-white px-6 py-3 rounded-lg shadow text-lg cursor-not-allowed"
          >
            Você já votou nessa consulta!
          </Button>
        </div>
      )}
      {status === "closed" && (
        <div className="flex justify-center mt-8">
          <Button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow text-lg cursor-not-allowed"
          >
            Essa consulta não aceita mais votos.
          </Button>
        </div>
      )}
    </CardContent>
  </Card>

  {/* Modal para votação */}
  {isModalOpen && (
   <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white modal-enter border border-brand-primary  max-w-lg w-full  rounded-lg shadow-2xl relative animate-fade-in">
      {/* Botão de fechar */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white hover:opacity-80 transition"
      >
        <i className="fas fa-times text-2xl"></i>
      </button>
  
      {/* Título */}
      <div className="text-2xl font-semibold bg-gradient-to-r text-white p-4 from-[#6746CB] to-[#4D94FF]  text-brand-primary mb-6 text-center flex items-center justify-center">
        <i className="fa-solid fa-check-to-slot mr-3"></i>
        Votação na Consulta Pública
      </div>
  
      {/* Mensagem */}
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        Por favor, escolha uma das opções abaixo para votar:
      </p>
  
      {/* Botões de ação */}
      <div className="flex gap-6 justify-center pb-10">
        <Button
          onClick={accept}
          className="bg-green-600 text-white hover:bg-green-500 py-5 px-8 rounded-lg shadow-lg transition duration-200 text-lg font-medium flex items-center justify-center"
        >
          <i className="fas fa-thumbs-up mr-2"></i>
          Concordar
        </Button>
        <Button
          onClick={closeModal}
          className="bg-red-600 text-white hover:bg-red-500 py-5 px-8 rounded-lg shadow-lg transition duration-200 text-lg font-medium flex items-center justify-center"
        >
          <i className="fas fa-times-circle mr-2"></i>
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
