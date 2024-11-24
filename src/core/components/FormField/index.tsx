import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
}

function FormField({ label, errorMessage, ...props }: Props, ref: React.Ref<HTMLInputElement>) {
    const id = useId();
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{ label }</Label>
            <Input id={id} {...props} ref={ref}/>
            { errorMessage && <span className="text-xs text-red-600">{ errorMessage }</span>}
        </div>
    );
}

export default forwardRef(FormField);
