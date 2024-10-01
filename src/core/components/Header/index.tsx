
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '../../../assets/logo.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import useTimer from '@/core/hooks/useTimer';

  
function Header() {
    const { timerFormatted } = useTimer();

    return (
        <header>
            <div className="flex items-center justify-between py-3  p-20 ">
                <div className="flex gap-2 items-center">
                    <img src={logo} className="w-[200px]" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <Input className="text-base hover:border-brand-primary" type="search" placeholder="Pesquisar"/>
                        <Button className="bg-brand-primary hover:bg-brand-primary hover:opacity-80">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <Button className="bg-brand-primary hover:opacity-80 hover:bg-brand-primary">
                                    <i className="fa-solid fa-bars"></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-3">
                                <DropdownMenuLabel className="text-brand-primary">Olá, Gabriel Cardoso</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Perfil</DropdownMenuItem>
                                <DropdownMenuItem>Sair</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 text-brand-primary">
                        <span>{ timerFormatted() }</span>
                        <i className="fa-solid fa-clock"></i>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-brand-primary shadow-lg rounded-bl-2xl rounded-br-2xl"></div>
        </header>
    );
}

export default Header;