import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicConsultation } from "@/core/components/HighlightPublicConsultation";
import Pagination from "@/core/components/Pagination";
import PublicConsultationItem from "@/core/components/PublicConsultationItem";
import useApi from "@/core/hooks/useApi";
import React from "react";
import { Atom } from "react-loading-indicators";
import { useSearchParams } from "react-router-dom";

function PublicConsultationPage() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [disablePagination, setDisablePagination] = React.useState(false);
    const [data, setData] = React.useState<PublicConsultation[]>([]);
    const [search, setSearch] = React.useState('');
    const [params] = useSearchParams();
    const { request, loading } = useApi('/public-consultation');

    React.useEffect(() => {
        (async () => {

            const searchFromQuery = params.get('q') ?? '';

            let data = await request<PublicConsultation[]>({
                endpoint: `?page=${currentPage}&size=3&q=${searchFromQuery}`,
            });
            data ||= [];

            const hasData = (await request<PublicConsultation[]>({
                endpoint: `?page=${currentPage + 1}&size=3&q=${searchFromQuery}`,
            }))?.length !== 0;

            setDisablePagination(!hasData);
            setData(data);
        })();
    }, [currentPage, request, params]);

    if (loading) {
        return <div className="h-full flex items-center justify-center">
          <Atom color="#6746CB" size="medium" text="" textColor="" />
      </div>
    }

    const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await request<PublicConsultation[]>({
            endpoint: `?page=${currentPage}&size=3&q=${search}`,
        });
        if (!data) return;
        setData(data);
    }
    

    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg border border-brand-primary">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
                        <i className="fas fa-comments mr-2"></i> Consultas Públicas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="mb-4" onSubmit={onSearch}>
                        <input
                        onChange={event => setSearch(event.target.value)}
                        value={search}
                        type="search"
                        placeholder="Pesquisar consultas..."
                        className="w-full px-4 py-2 border border-brand-primary border-opacity-10 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </form>
                    <div className="space-y-4">
                        {
                            data.map(item => <PublicConsultationItem data={item} key={item.id} />)
                        }
                        {/* <PublicConsultationItem/>
                        <PublicConsultationItem status="closed"/> */}
                    </div>
                    {
                        (!data || data.length === 0) && (
                            <div className="flex flex-col items-center justify-center p-6 text-gray-600">
                                <i className="fas fa-info-circle text-4xl mb-2 text-gray-400"></i>
                                <p className="text-lg font-medium">Nenhuma consulta pública encontrada.</p>
                                <p className="text-sm text-gray-500">Tente ajustar os filtros ou realizar uma nova busca.</p>
                            </div>
                        )
                    }

                    <div className="flex justify-end">
                        <Pagination currentPage={currentPage} onPageChange={page => setCurrentPage(page)} disabled={disablePagination}/>
                    </div>
            </CardContent>
        </Card>
    </div>

    );
}

export default PublicConsultationPage;