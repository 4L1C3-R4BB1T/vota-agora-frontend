import { Outlet } from 'react-router-dom';
import vote from '../../assets/vote.png';

function LoginPage() {
    return (
        <div className="flex w-screen h-screen [&>section]:flex-1">
            <section className="hidden lg:flex flex-col items-center justify-center gap-5 bg-brand-primary p-10">
                <img className="w-56" src={vote}/>
                <p className="text-xl text-center text-white italic">
                O futuro não se constrói sozinho. Sua voz é a chave para a mudança. <br/> Vote e faça parte da transformação!
                </p>
            </section>
            <section>
                <Outlet/>
            </section>
        </div>
    );
}

export default LoginPage;