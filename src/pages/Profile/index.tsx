import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';

function Profile() {
  return (
<div className="container mx-auto p-6">
  <Card className="shadow-lg">
    <div className="flex justify-center mt-4">
      <div className="w-20 h-20 rounded-full bg-brand-primary text-white flex items-center justify-center text-4xl font-bold">
        GC
      </div>
    </div>
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-brand-primary text-center">
        Perfil do Usuário
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-brand-primary">
          Quantidade de Votos: <span className="font-bold">42</span>
        </h2>
      </div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold text-brand-primary mb-2" htmlFor="fullName">
            <i className="fas fa-user mr-2"></i> Nome Completo
          </label>
          <Input
            type="text"
            className="py-6 px-4 text-base border border-gray-300 focus:border-brand-primary focus:ring focus:ring-brand-primary rounded-md"
            name="fullName"
            id="fullName"
            defaultValue="Gabriel Cardoso"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-brand-primary mb-2" htmlFor="cpf">
            <i className="fas fa-id-card mr-2"></i> CPF:
          </label>
          <Input
            type="text"
            name="cpf"
            className="py-6 px-4 text-base border border-gray-300 focus:border-brand-primary focus:ring focus:ring-brand-primary rounded-md"
            id="cpf"
            defaultValue="123.456.789-00"
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button type="button" className="bg-brand-primary text-white hover:bg-brand-primary/80 px-6 py-2 rounded-md shadow-lg transition duration-200 mr-4">
            Editar
          </Button>
          <Button type="button" className="bg-green-500 text-white hover:bg-green-400 px-6 py-2 rounded-md shadow-lg transition duration-200">
            Salvar
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  );
};

export default Profile;
