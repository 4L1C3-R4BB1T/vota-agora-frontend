import vote from '@/assets/vote.png';
import { Outlet } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="flex w-screen h-screen [&>section]:flex-1">
            <section className="hidden lg:flex flex-col items-center justify-center gap-5 bg-brand-primary p-10">
                <img className="w-56" src={vote}/>
                <p className="text-2xl text-center text-white italic">
                    O futuro não se constrói sozinho. Sua voz é a chave para a mudança. <br/> Vote e faça parte da transformação!
                </p>
            </section>
            <section className="relative">
                <Outlet/>
                <div className="absolute bottom-0 w-full flex flex-col items-center justify-center text-brand-primary font-semibold pb-5 ">
                    <span className="text-lg font-bold">Versão 2.0</span>
                    <span className="text-sm flex items-center">
                        Feito com 
                        <span role="img" aria-label="coração" className="text-red-500 text-lg">❤️</span>
                        por GL 
                    </span>
                </div>

            </section>
        </div>
    );
}

export default LoginPage;