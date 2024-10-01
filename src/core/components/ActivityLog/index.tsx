import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActivityLog = () => {
  return (
    <Card className="shadow-lg basis-[40%] rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white bg-brand-primary p-6 rounded-md flex items-center justify-center shadow-md">
          <i className="fas fa-history mr-2"></i> Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Atividade 1 */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
          <div className="flex items-center gap-4">
            <i className="fas fa-arrow-down text-green-500 text-2xl"></i>
            <div>
              <span className="text-gray-700 font-medium text-lg">50,000 GLT</span>
              <div className="text-sm text-gray-500">Consulta: Consulta Pública 1</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-600 text-sm">01/10/2024</div>
            <div className="text-gray-500 text-xs">14:30</div>
          </div>
        </div>

        {/* Atividade 2 */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
          <div className="flex items-center gap-4">
            <i className="fas fa-arrow-down text-green-500 text-2xl"></i>
            <div>
              <span className="text-gray-700 font-medium text-lg">25,000 GLT</span>
              <div className="text-sm text-gray-500">Consulta: Consulta Pública 2</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-600 text-sm">30/09/2024</div>
            <div className="text-gray-500 text-xs">09:45</div>
          </div>
        </div>

        {/* Atividade 3 */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
          <div className="flex items-center gap-4">
            <i className="fas fa-arrow-down text-green-500 text-2xl"></i>
            <div>
              <span className="text-gray-700 font-medium text-lg">100,000 GLT</span>
              <div className="text-sm text-gray-500">Consulta: Consulta Pública 3</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-600 text-sm">29/09/2024</div>
            <div className="text-gray-500 text-xs">11:00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
