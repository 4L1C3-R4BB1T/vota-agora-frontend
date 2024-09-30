
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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

  
function Header() {
    return (
        <header>
            <div className="flex items-center justify-between py-3  p-20 ">
                <div className="flex gap-2 items-center">
                    <img src={logo} className="w-[200px]" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <Input className="text-base" type="search" placeholder="Pesquisar"/>
                        <Button className="bg-brand-primary hover:bg-brand-primary">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <Button className="bg-brand-primary hover:bg-brand-primary">
                                    <i className="fa-solid fa-bars"></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Perfil</DropdownMenuItem>
                                <DropdownMenuItem>Sair</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="p-0.5 bg-brand-primary"></div>
        </header>
    );
}

export default Header;