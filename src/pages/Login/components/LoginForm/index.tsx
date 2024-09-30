import { Button } from '@/components/ui/button';
import FormField from '@/core/components/FormField';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

function LoginForm() {
    return (
        <div className="flex flex-col h-full justify-center items-center">
            <img src={logo} className="w-[200px] mx-auto"/>
            <div className="max-w-[50%] w-full mt-2">
                <div className="flex flex-col mt-5">
                    <h1 className="text-3xl font-medium">Bem-vindo de volta,</h1>
                    <p className="mt-2 opacity-90">Faça login para continuar</p>
                </div>
                <form className="mt-4">
                   <FormField label="CPF" placeholder="Digite seu CPF" className="p-6 text-lg"/>
                   <div className="mt-5">
                        <FormField label="Senha" type="password" placeholder="Digite sua Senha" className='p-6 text-lg'/>
                   </div>
                    <Button className="w-full text-lg mt-8 p-6 bg-brand-primary hover:bg-brand-primary hover:opacity-80 mb-5">Login</Button>
                    <p className="text-lg text-center">Não possui uma conta? <Link to="register" className="text-brand-primary">Cadastra-se</Link></p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;