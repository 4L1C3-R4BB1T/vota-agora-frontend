import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

function FormField({ label, ...props }: Props) {
    const id = useId();
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{ label }</Label>
            <Input id={id} {...props}/>
        </div>
    );
}

export default FormField;
