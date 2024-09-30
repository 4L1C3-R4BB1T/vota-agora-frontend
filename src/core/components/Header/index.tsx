
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import logo from '../../../assets/logo_white.png';

function Header() {
    return (
        <header className="flex bg-brand-primary text-white items-center justify-between py-3  px-20 shadow-lg">
            <div className="flex gap-2 items-center">
                <img src={logo} className="w-[200px]" />
            </div>
            <div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            </div>
        </header>
    );
}

export default Header;