
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import useTimer from '@/core/hooks/useTimer';
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
  
  
function Header() {
    const { timerFormatted } = useTimer();
    const [paths, setPaths] = React.useState([] as string[]);
    const location = useLocation();

    React.useEffect(() => {
        const { pathname } = location;
        setPaths(pathname.split('/').filter(path => path?.trim() !== ''));
    }, [location]);

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
                            <DropdownMenuTrigger className="outline-none bg-brand-primary hover:opacity-80 text-primary-foreground shadow px-4 py-1.5 rounded-md hover:bg-brand-primary">
                                <i className="fa-solid fa-bars"></i>
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
            <div className="px-6 pt-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        { 
                            paths.map((path, index) => {
                                if (index % 2 != 0) {
                                    return (
                                        <React.Fragment key={index}>
                                             <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={location.pathname}>{ path }</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    )
                                }
                        
                                return (
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbLink href={location.pathname}>{ path }</BreadcrumbLink>
                                    </BreadcrumbItem>
                                )
                            })
                        }
                        {/* <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem> */}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}

export default Header;