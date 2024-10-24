import { Button } from '@/components/ui/button';
import FormField from '@/core/components/FormField';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

function LoginForm() {
    const navigate = useNavigate();
    
    return (
        <div className="relative flex flex-col h-full justify-center items-center slide-in-left">
            <img src={logo} className="w-[300px] mx-auto"/>
            <div className="max-w-[50%] w-full mt-2">
            <div className="mt-4">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-2">Bem-vindo de volta,</h1>
                    <p className="mt-2 text-lg text-gray-600 opacity-90">
                    Faça login para continuar
                    </p>
                </div>
                <form className="mt-4">
                   <FormField label="CPF" placeholder="Digite seu CPF" className="p-6 text-lg"/>
                   <div className="mt-5">
                        <FormField label="Senha" type="password" placeholder="Digite sua Senha" className='p-6 text-lg'/>
                   </div>
                    <Button onClick={() => navigate("/home/dashboard")} className="w-full text-lg mt-8 p-6 bg-brand-primary hover:bg-brand-primary hover:opacity-80 mb-5">Login</Button>
                    <p className="text-lg text-center">Não possui uma conta? <Link to="register" className="text-brand-primary">Cadastre-se</Link></p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;