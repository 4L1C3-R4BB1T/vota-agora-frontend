
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

  
function Header() {
    const { timerFormatted } = useTimer();
    const navigate = useNavigate();
    const [, route] = useMatches();
    const { signOut } = useAuth();
    const { request } = useApi('/users');
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbOptions[]>([]);
    const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
    const [search, setSearch] = React.useState('');

    const loadUserInfo = React.useCallback(async () => {
      const result = await request<UserInfo>({
        endpoint: '/profile',
      });
      if (result && 'message' in result) {
        navigate('/auth');
        return;
      }
      setUserInfo(result);
    }, [request, navigate]);

    React.useEffect(() => {
      const data = route.data as { breadcrumbs?: BreadcrumbOptions[] };
      setBreadcrumbs(data?.breadcrumbs ?? []);
    }, [route, breadcrumbs]);

    React.useEffect(() => {
      loadUserInfo()
    }, [loadUserInfo, location.pathname, location.search]);

    if (!userInfo) return null;

    const { imageUrl, fullName } = userInfo!;

    const getFirstCharacter = (name: string) => {
      if (!name || name.trim() === '') return '';
      return name.at(0);
    }

    const onSearch = () => {
      navigate(`/home/public-consultation?q=${search}`);
    };  

    return (
        <header className="bg-gradient-to-r from-[#6746CB] to-[#4D94FF] shadow-md  rounded-bl-2xl rounded-br-2xl">
          <div className="container mx-auto flex items-center justify-between px-4 pt-3 pb-3">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/home/dashboard')}>
              <img src={logo} alt="Logo" className="w-[200px]  h-auto" />
            </div>
    
            {/* Barra de Pesquisa e Avatar */}
            <div className="flex items-center gap-4">
              {/* Barra de Pesquisa */}
              <form className="flex items-center gap-2" onSubmit={event => event.preventDefault()}>
                <Input
                  onChange={event => setSearch(event.target.value)}
                  value={search}
                  className="text-base border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  type="search"
                  placeholder="Pesquisar"
                />
                <Button onClick={onSearch} className="bg-white hover:bg-white rounded-lg">
                  <i className="fa-solid fa-magnifying-glass text-brand-primary"></i>
                </Button>
              </form>
    
              {/* Avatar e Menu Dropdown */}
              <div className="relative flex items-center">
                <Avatar>
                  <AvatarImage src={imageUrl} alt="Avatar" className="object-cover" />
                  <AvatarFallback className="font-bold text-lg text-brand-primary">{ getFirstCharacter(fullName) }</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                <DropdownMenuTrigger className="ml-2 relative bottom-[0.05rem] outline-none  text-white  hover:bg-brand-primary/80  px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300">
                  <i className="fa-solid fa-bars text-xl relative top-0.5"></i>
                  <span className="text-lg font-semibold">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-3 rounded-lg shadow-xl bg-white text-brand-primary overflow-hidden max-w-[220px]">
                  {/* Título de boas-vindas */}
                  <DropdownMenuLabel className="text-center text-base font-semibold text-brand-primary py-2 px-4 bg-gradient-to-t from-[#6746CB] to-[#4D94FF] text-white">
                    Olá, {fullName.split(' ').length > 1 ? fullName.split(' ').slice(0, 2).join(' ') : fullName}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* Opções do Menu */}
                  <DropdownMenuItem
                    onClick={() => navigate('/home/profile')}
                    className="hover:bg-brand-primary/10 px-4 py-2 rounded-md transition-all duration-200"
                  >
                    <i className="fa-solid fa-user mr-3"></i>Perfil
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate('/home/wallet')}
                    className="hover:bg-brand-primary/10 px-4 py-2 rounded-md transition-all duration-200"
                  >
                    <i className="fa-solid fa-wallet mr-3"></i>Carteira
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={signOut}
                    className="hover:bg-red-500/10 px-4 py-2 rounded-md transition-all duration-200"
                  >
                    <i className="fa-solid fa-sign-out-alt mr-3"></i>Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              </div>
    
              {/* Timer */}
              <div className="flex items-center text-white gap-2 text-lg text-brand-primary">
                <span>{timerFormatted()}</span>
                <i className="fa-solid fa-clock rotating-element"></i>
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