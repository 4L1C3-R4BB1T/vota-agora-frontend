
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
import useApi from '@/core/hooks/useApi';
import useAuth from '@/core/hooks/useAuth';
import useTimer from '@/core/hooks/useTimer';
import { BreadcrumbOptions } from '@/main';
import { ChevronsRight } from 'lucide-react';
import React from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo_white.png';

export interface UserInfo {
  userId: number;
  fullName: string;
  imageUrl: string;
  document: string;
}
let canLoadUserInfo = true;
  
function Header() {
    const { timerFormatted } = useTimer();
    const navigate = useNavigate();
    const [, route] = useMatches();
    const { signOut } = useAuth();
    const { request } = useApi('/users');
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbOptions[]>([]);
    const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

    const loadUserInfo = React.useCallback(async () => {
      const result = await request<UserInfo>({
        endpoint: '/profile',
      });
      if (result && 'message' in result) {
        navigate('/auth');
        return;
      }
      setUserInfo(result);
      setTimeout(() => {
        canLoadUserInfo = true;
      }, 1000);
    }, [request, navigate]);

    React.useEffect(() => {
      const data = route.data as { breadcrumbs?: BreadcrumbOptions[] };
      setBreadcrumbs(data?.breadcrumbs ?? []);
    }, [route, breadcrumbs]);

    React.useEffect(() => {
      if (!canLoadUserInfo) return;
      loadUserInfo()
      canLoadUserInfo = false;
    }, [loadUserInfo, location.pathname]);

    if (!userInfo) return null;

    const { imageUrl, fullName } = userInfo;

    const getFirstCharacter = (name: string) => {
      if (!name || name.trim() === '') return '';
      return name.at(0);
    }

    return (
        <header className="bg-brand-primary shadow-md  rounded-bl-2xl rounded-br-2xl">
          <div className="container mx-auto flex items-center justify-between px-4 pt-3 pb-3">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/home/dashboard')}>
              <img src={logo} alt="Logo" className="w-[200px]  h-auto" />
            </div>
    
            {/* Barra de Pesquisa e Avatar */}
            <div className="flex items-center gap-4">
              {/* Barra de Pesquisa */}
              <div className="flex items-center gap-2">
                <Input
                  className="text-base border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  type="search"
                  placeholder="Pesquisar"
                />
                <Button className="bg-white hover:bg-white rounded-lg">
                  <i className="fa-solid fa-magnifying-glass text-brand-primary"></i>
                </Button>
              </div>
    
              {/* Avatar e Menu Dropdown */}
              <div className="relative flex items-center">
                <Avatar>
                  <AvatarImage src={imageUrl} alt="Avatar" className="object-cover" />
                  <AvatarFallback>{ getFirstCharacter(fullName) }</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-2 outline-none text-brand-primary bg-white hover:bg-white shadow px-4 py-1.5 rounded-md">
                    <i className="fa-solid fa-bars"></i>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-3 rounded-lg shadow-lg bg-brand-primary  text-white">
                    <DropdownMenuLabel className="text-white">Olá, { fullName } </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/home/profile')}>Perfil</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/home/wallet')}>Carteira</DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
    
              {/* Timer */}
              <div className="flex items-center text-white gap-2 text-lg text-brand-primary">
                <span>{timerFormatted()}</span>
                <i className="fa-solid fa-clock"></i>
              </div>
            </div>
          </div>
    
          {/* Barra de Navegação */}
          <div className="pb-4 pt-4 px-4 rounded-bl-2xl rounded-br-2xl shadow-lg border-t-[0.09rem]">
            <div className="mx-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {
                    breadcrumbs.map(({label, to}, index) => {
                      
                      return (
                        <React.Fragment key={index}>
                          { index % 2 != 0 &&  
                            <BreadcrumbSeparator>
                             <ChevronsRight className="text-white relative top-0.5" />
                            </BreadcrumbSeparator>
                          }
                          <BreadcrumbItem>
                            <BreadcrumbLink className='text-white hover:text-white hover:opacity-80 cursor-pointer text-base' onClick={() => navigate(to)}>{label}</BreadcrumbLink>
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