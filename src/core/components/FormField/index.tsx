import { Input } from "@/components/ui/input";
import { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

function FormField({ label, ...props }: Props) {
    const id = useId();
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{ label }</label>
            <Input id={id} {...props}/>
        </div>
    );
}

export default FormField;
