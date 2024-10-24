import { Button } from "@/components/ui/button";
import FormField from "@/core/components/FormField";
import { Link } from "react-router-dom";
import logo from '../../../../assets/logo.png';

function RegisterForm() {
    return (
        <div className="flex flex-col h-full justify-center items-center slide-in-left">
             <img src={logo} className="w-[300px] mx-auto"/>
            <div className="max-w-[50%] w-full mt-2">
                <div className="mt-4">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-2">Registre-se agora!</h1>
                    <p className="mt-2 text-lg text-gray-600 opacity-90">
                        E faça parte dessa comunidade vibrante!
                    </p>
                </div>
                <form className="mt-4">
                    <FormField label="CPF" placeholder="Digite seu CPF" className="p-6 text-lg"/>
          
                    <div className="mt-5">
                        <FormField label="Senha" type="password" placeholder="Digite a senha" className="p-6 text-lg"/>
                    </div>

                    <div className="mt-5">
                        <FormField label="Confirmar Senha" type="password" placeholder="Digite a senha novamente" className="p-6 text-lg"/>
                    </div>
                    <Button  className="w-full text-lg mt-8 p-6 bg-brand-primary hover:bg-brand-primary hover:opacity-80 mb-5">Cadastrar</Button>
                    <p className="text-lg text-center">Já possui uma conta? <Link to="/auth" className="text-brand-primary">Faça Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;