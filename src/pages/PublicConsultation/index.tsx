import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicConsultationItem from "@/core/components/PublicConsultationItem";

function PublicConsultationPage() {
    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
                        <i className="fas fa-comments mr-2"></i> Consultas Públicas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <PublicConsultationItem/>
                        <PublicConsultationItem status="closed"/>
                    </div>
            </CardContent>
        </Card>
    </div>

    );
}

export default PublicConsultationPage;