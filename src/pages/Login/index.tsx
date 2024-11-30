import vote from '@/assets/vote.png';
import React from 'react';
import { Mosaic } from 'react-loading-indicators';
import { Outlet } from 'react-router-dom';

function LoginPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(() => false);
        }, 2000);
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center w-screen h-screen">
            <Mosaic color={["var(--primary-color)"]} />
        </div>
    }
    return (
        <div className="flex w-screen h-screen [&>section]:flex-1">
            <section className="hidden lg:flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-[#6746CB] to-[#4D94FF] p-10">
                <img className="w-56" src={vote}/>
                <p className="text-2xl text-center text-white italic">
                    O futuro não se constrói sozinho. Sua voz é a chave para a mudança. <br/> Vote e faça parte da transformação!
                </p>
            </section>
            <section className="relative  ">
                <div className="slide-in-left h-full">
                    <Outlet/>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;