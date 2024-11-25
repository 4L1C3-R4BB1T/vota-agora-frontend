import { Button } from "@/components/ui/button";
import FormField from "@/core/components/FormField";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../../assets/logo.png';
import { useMask } from "@react-input/mask";
import { z } from "zod";
import React from "react";
import checkZodValidationErrors from "@/core/utils/check-zod-validation-errors.util";
import useApi from "@/core/hooks/useApi";
import { toast } from "react-toastify";
import { Atom } from "react-loading-indicators";

const createAccountFormSchema = z.object({
    fullName: z.string().min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.'}),
    document: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato 000.000.000-00.'}),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.'}),
    confirmationPassword: z.string().min(6, { message: 'A confirmação da senha deve ter pelo menos 6 caracteres.' }),
}).refine(data => data.password === data.confirmationPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmationPassword'],
});


function RegisterForm() {
    const [inputs, setInputs] = React.useState({
        fullName: '',
        document: '',
        password: '',
        confirmationPassword: '',
    });
    const cpfRef = useMask({
        mask: '___.___.___-__',
        replacement: { _: /\d/}
    });
    const { loading, request } = useApi();
    const navigate = useNavigate();

    const onFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        const propertyName = name as keyof typeof inputs;
        inputs[propertyName] = value;
        setInputs(inputs);
    }

    const register = async () => {
        const errors = checkZodValidationErrors(inputs, createAccountFormSchema);
        if (errors) {
            Object.entries(errors).forEach(([ , message ]) => toast.info(message));
            return;
        }
        const { fullName, document, password, confirmationPassword } = inputs;
        const result = await request({
            endpoint: '/users',
            method: 'POST',
            body: {
                fullName,
                document, 
                password,
                confirmationPassword,
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = result as { [key: string]: any };

        if (error?.message && Array.isArray(error.message)) {
            error.message.forEach(errorMessage => toast.error(errorMessage));
        } else if (error?.message) {
            toast.error(error.message, { theme: 'dark'})
        } else {
            toast.success('Conta criada com sucesso.');
            navigate('/auth');
        }
    }

    if (loading) {
        return <div className="h-full flex items-center justify-center">
            <Atom color="#6746CB" size="medium" text="" textColor="" />
        </div>
    }
    
    return (
        <div className="flex flex-col h-full justify-center items-center">
             <img src={logo} className="w-[300px] mx-auto"/>
            <div className="max-w-[50%] w-full mt-2">
                <div className="mt-4">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-2">Registre-se agora!</h1>
                    <p className="mt-2 text-lg text-gray-600 opacity-90">
                        E faça parte dessa comunidade vibrante!
                    </p>
                </div>
                <form className="mt-4" onChange={onFormChange} onSubmit={event => event.preventDefault()}>
                    <div className="mb-5 mt-4">
                        <FormField name="fullName" label="Nome Completo" type="text" placeholder="Digite seu nome completo" className="p-6 text-lg bg-gray-200"/>
                    </div>

                    <FormField name="document" ref={cpfRef} label="CPF" placeholder="Digite seu CPF" className="p-6 bg-gray-200 text-lg"/>
          
                    <div className="mt-5">
                        <FormField name="password" label="Senha" type="password" placeholder="Digite a senha" className="p-6 text-lg bg-gray-200"/>
                    </div>

                    <div className="mt-5">
                        <FormField name="confirmationPassword" label="Confirmar Senha" type="password" placeholder="Digite a senha novamente" className="p-6 text-lg bg-gray-200"/>
                    </div>
                    <Button onClick={register} className="w-full text-lg mt-8 p-6 bg-brand-primary hover:bg-brand-primary hover:opacity-80 mb-5">Cadastrar</Button>
                    <p className="text-lg text-center">Já possui uma conta? <Link to="/auth" className="text-brand-primary">Faça Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;