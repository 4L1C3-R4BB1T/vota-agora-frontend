import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import HighlightPublicConsultationItem from "../HighlightPublicConsultationItem";
import React from "react";
import useApi from "@/core/hooks/useApi";
import moment from "moment";

let fetchData = true;

export type PublicConsultation = {
    id: number;
    title: string;
    ownerName: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    imageUrl: string;
    category: string;
    status: 'open' | 'closed';
    owner: boolean;
    createdAt: Date;
    voted: boolean;
};
  
function HighlightPublicConsultation() {
    const [data, setData] = React.useState([] as PublicConsultation[]);
    const { request } = useApi('/public-consultation');

    React.useEffect(() => {
        if (!fetchData) return;
        const getData = async () => {
           const result = await request<PublicConsultation[]>({});
           if (!result) return;
           const resultOrdered = result.sort((obj1, obj2) => {
                const compareStatus = (obj1: PublicConsultation, obj2: PublicConsultation) => {
                    if (obj1.status === 'open' && obj2.status === 'closed') {
                        return 1;
                    } else if (obj1.status === 'closed' && obj2.status === 'open') {
                        return -1;
                    } else {
                        return 0;
                    }
                }

                const compareDate = (d1: Date, d2: Date) => {
                    const momentDate = moment(d1);
                    return momentDate.isAfter(d2) ? 1 : momentDate.isBefore(d2) ? -1 : 0; 
                };
                
                const compareStatusResult = compareStatus(obj1, obj2);
                const compareDateResult = compareDate(obj1.createdAt, obj2.createdAt);

                if (compareDateResult > 0) {
                    return compareDateResult;
                }

                return -compareStatusResult;
           });

           setData(resultOrdered);
           fetchData = false;
           setTimeout(() => {
                fetchData = true;
           }, 200);
        }
        getData();
     
    }, [request]);

    if (!data.length) {
        return (
          <div className="flex flex-col items-center justify-center mb-10 py-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <i className="fas fa-folder-open text-brand-primary text-5xl mb-3"></i>
            <span className="text-brand-primary text-lg font-medium">
              Não há nenhuma consulta postada
            </span>
          </div>
        );
      }

    return (
        <div>
            <Carousel>
                <CarouselContent>
                    { data.map(publicConsultation => {
                        return (
                            <CarouselItem key={publicConsultation.id} className="basis-1/4">
                                <HighlightPublicConsultationItem data={publicConsultation}/>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default HighlightPublicConsultation;