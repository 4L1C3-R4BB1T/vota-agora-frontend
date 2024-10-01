import HighlightPublicConsultationItem from "../HighlightPublicConsultationItem";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
function HighlightPublicConsultation() {
    return (
        <div>
            <Carousel>
                <CarouselContent>
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
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <HighlightPublicConsultationItem/>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default HighlightPublicConsultation;