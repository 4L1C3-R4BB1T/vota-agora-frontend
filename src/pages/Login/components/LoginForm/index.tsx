import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import FormField from '@/core/components/FormField';
import useApi from '@/core/hooks/useApi';
import useAuth from '@/core/hooks/useAuth';
import checkZodValidationErrors from '@/core/utils/check-zod-validation-errors.util';
import { useMask } from '@react-input/mask';
import React from 'react';
import { Atom } from 'react-loading-indicators';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const signFormSchema = z.object({
    document: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato 000.000.000-00.'}),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.'}),
})

function LoginForm() {
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [inputs, setInputs] = React.useState({
        document: '',
        password: '',
    });
    const navigate = useNavigate();
    const { loading, request, error } = useApi();
    const { persistToken } = useAuth();
    const cpfRef = useMask({
        mask: '___.___.___-__',
        replacement: { _: /\d/}
    })

    const signIn = async () => {
        if (checkZodValidationErrors(inputs, signFormSchema, setErrors)) {
            Object.entries(errors).forEach(([ , message ]) => toast.info(message, { theme: 'dark'}));
            return;
        }
        const { document, password } = inputs;
        const result = await request<{ access_token: string }>({ 
            endpoint: '/auth', 
            method: 'POST', 
            body: { document, password, },
        });
        if (error) {
            if (error?.message && Array.isArray(error.message)) {
                error.message.forEach(errorMessage => toast.error(errorMessage, { theme: 'dark'}));
            } else if (error?.message) {
                toast.error(error.message, { theme: 'dark'})
            }
            return;
        }
        const accessToken = result?.access_token as string;
        persistToken(accessToken as string);
        toast.success('Login efetuado com sucesso.', { theme: 'dark'});
    }

    const onFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        const propertyName = name as keyof typeof inputs;
        inputs[propertyName] = value;
        setInputs(inputs);
    }

    if (loading) {
        return <div className="h-full flex items-center justify-center">
            <Atom color="#6746CB" size="medium" text="" textColor="" />
        </div>
    }
    
    
    return (
        <div className="relative flex flex-col h-full justify-center items-center">
            <img src={logo} className="w-[300px] mx-auto"/>
            <div className="max-w-[50%] w-full mt-2">
            <div className="mt-4">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-2">Bem-vindo de volta,</h1>
                    <p className="mt-2 text-lg text-gray-600 opacity-90">
                    Faça login para continuar
                    </p>
                </div>
                <form className="mt-4" onChange={onFormChange}>
                   <FormField name="document" ref={cpfRef} label="CPF" placeholder="Digite seu CPF" className="p-6 text-lg bg-white"/>

                   <div className="mt-5">
                        <FormField name="password" label="Senha" type="password" placeholder="Digite sua Senha" className='p-6 text-lg bg-white'/>
                   </div>
                    <Button type="button" onClick={signIn} className="w-full text-lg mt-8 p-6 bg-brand-primary hover:bg-brand-primary hover:opacity-80 mb-5">Login</Button>
                    <p className="text-lg text-center">Não possui uma conta? <Link to="register" className="text-brand-primary">Cadastre-se</Link></p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;