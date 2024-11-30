import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useApi from "@/core/hooks/useApi";
import { convertBaseUnitsToTokens } from "@/core/utils/convert-base-units-to-tokens.util";
import moment from "moment";
import React from "react";
import { Atom } from "react-loading-indicators";

interface VoteHistory {
  rewardTokenAcquired: string;
  publicConsultationName: string;
  date: Date;
  received: boolean;
}


const ActivityLog = () => {
  const { request, loading } = useApi('/public-consultation/list/vote');
  const [data, setData] = React.useState<Array<VoteHistory>>([]);

  React.useEffect(() => {
    (async () => {
      const result = await request<Array<VoteHistory>>({});
      setData(result ?? []);
    })();
  }, [request]);

  if (loading) {
    return <div className="h-full flex items-center justify-center">
      <Atom color="#6746CB" size="medium" text="" textColor="" />
  </div>
  }
  
  return (
    <Card className="shadow-lg border-brand-primary pb-5 overflow-hidden max-h-[80vh] basis-[40%] rounded-lg bg-white">
      {/* Cabeçalho */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-[#6746CB] to-[#4D94FF] p-6 rounded-t-lg flex items-center justify-center shadow-md">
          <i className="fas fa-history mr-4"></i> Atividades Recentes
        </CardTitle>
      </CardHeader>
    
      {/* Conteúdo com Scroll */}
      <CardContent className="space-y-6 p-6 max-h-[80%] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-primary scrollbar-track-gray-200">
        {/* Exemplo de Atividade */}
        {data.map(({ rewardTokenAcquired, date, publicConsultationName }, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-4 rounded-md shadow-sm relative
            ${idx % 2 === 0 ? "bg-green-100 border-brand-primary" : "bg-gray-100 border-gray-300"} 
            border`}
          >
            <div className="flex items-center gap-4">
              <i className="fas fa-arrow-up text-brand-primary text-2xl"></i>
              <div>
                <span className="text-brand-primary font-medium text-lg">{  convertBaseUnitsToTokens(rewardTokenAcquired)  } GLT</span>
                <div className="text-sm text-brand-primary">Consulta: <span className="font-medium">{ publicConsultationName }</span> </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-brand-primary text-sm font-medium">{ moment(date.toString()).format('DD/MM/YYYY [às] HH:mm:ss') }</div>
            </div>
          </div>
        ))}

        { !data.length && (
          <div className="flex items-center justify-center flex-col p-10">
            <i className="fas fa-clipboard-list text-4xl text-brand-primary mb-4"></i>
            <span className="text-lg text-brand-primary font-semibold">
              Não há nenhuma atividade ainda
            </span>
          </div>
        ) }

      </CardContent>
  </Card>
  
  );
};

export default ActivityLog;
