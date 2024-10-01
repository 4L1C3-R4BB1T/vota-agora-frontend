import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import HighlightPublicConsultationItem from "../HighlightPublicConsultationItem";
  
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