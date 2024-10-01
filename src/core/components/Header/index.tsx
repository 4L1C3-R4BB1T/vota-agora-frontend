
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
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-[200px] h-auto" />
            </div>
    
            {/* Barra de Pesquisa e Avatar */}
            <div className="flex items-center gap-4">
              {/* Barra de Pesquisa */}
              <div className="flex items-center gap-2">
                <Input
                  className="text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  type="search"
                  placeholder="Pesquisar"
                />
                <Button className="bg-brand-primary hover:bg-brand-primary hover:opacity-80 rounded-lg">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </div>
    
              {/* Avatar e Menu Dropdown */}
              <div className="relative flex items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-2 outline-none bg-brand-primary hover:opacity-80 text-primary-foreground shadow px-4 py-1.5 rounded-md">
                    <i className="fa-solid fa-bars"></i>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-3 rounded-lg shadow-lg">
                    <DropdownMenuLabel className="text-brand-primary">Olá, Gabriel Cardoso</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
    
              {/* Timer */}
              <div className="flex items-center gap-2 text-brand-primary">
                <span>{timerFormatted()}</span>
                <i className="fa-solid fa-clock"></i>
              </div>
            </div>
          </div>
    
          {/* Barra de Navegação */}
          <div className="p-4 bg-brand-primary rounded-bl-2xl rounded-br-2xl shadow-lg">
            <div className="container mx-auto">
              <Breadcrumb>
                <BreadcrumbList>
                  {paths.map((path, index) => (
                    <React.Fragment key={index}>
                      {index % 2 !== 0 && <BreadcrumbSeparator className='text-white' />}
                      <BreadcrumbItem> 
                        <BreadcrumbLink className="text-white" href={location.pathname}>{path[0].toUpperCase() + path.substring(1)}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>
      );
}

export default Header;