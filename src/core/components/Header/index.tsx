
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
import { ChevronsRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useTimer from '@/core/hooks/useTimer';
import { BreadcrumbOptions } from '@/main';
import React from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
  
  
function Header() {
    const { timerFormatted } = useTimer();
    const navigate = useNavigate();
    const [, route] = useMatches();
    const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbOptions[]>([]);

    React.useEffect(() => {
      const data = route.data as { breadcrumbs?: BreadcrumbOptions[] };
      setBreadcrumbs(data?.breadcrumbs ?? []);
    }, [route, breadcrumbs]);

    return (
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/home/dashboard')}>
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
                    <DropdownMenuItem onClick={() => navigate('/home/profile')}>Perfil</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/home/wallet')}>Carteira</DropdownMenuItem>
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
            <div className="mx-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {
                    breadcrumbs.map(({label, to}, index) => {
                      
                      return (
                        <React.Fragment>
                          { index % 2 != 0 &&  
                            <BreadcrumbSeparator>
                             <ChevronsRight className="text-white relative top-0.5" />
                            </BreadcrumbSeparator>
                          }
                          <BreadcrumbItem key={index}>
                            <BreadcrumbLink className='text-white hover:text-white hover:opacity-80' href={to}>{label}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </React.Fragment>
                      );
                    })
                  }

                  {/* <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList> */}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>
      );
}

export default Header;