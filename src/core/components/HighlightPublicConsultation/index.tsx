import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import HighlightPublicConsultationItem from "../HighlightPublicConsultationItem";
import React from "react";
import useApi from "@/core/hooks/useApi";

let fetchData = true;

export type PublicConsultation = {
    id: number;
    title: string;
    ownerName: string;
    description: string;
    initialDate: Date;
    imageUrl: string;
    category: string;
    status: 'open' | 'closed';
    owner: boolean;
};
  
function HighlightPublicConsultation() {
    const [data, setData] = React.useState([] as PublicConsultation[]);
    const { loading, request } = useApi('/public-consultation');

    React.useEffect(() => {
        if (!fetchData) return;
        const getData = async () => {
           const result = await request<PublicConsultation[]>({});
           if (!result) return;
           setData(result);
        }
        getData();
        fetchData = false;
    }, [request]);

    if (!data.length) {
        console.log('oi')
        return <div className="text-center py-3">
            <span className="text-brand-primary text-base">Não há nenhuma consulta cadastrada</span>
        </div>
    }

    return (
        <div>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    {/* <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem> */}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default HighlightPublicConsultation;