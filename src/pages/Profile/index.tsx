import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { UserInfo } from '@/core/components/Header';
import useApi from '@/core/hooks/useApi';
import checkZodValidationErrors from '@/core/utils/check-zod-validation-errors.util';
import React from 'react';
import { Atom } from 'react-loading-indicators';
import { toast } from 'react-toastify';
import { z } from 'zod';

const updateProfileSchema = z.object({
  imageUrl: z.string()
    .url({ message: 'A imagem não é uma URL válida.' })
    .nullable()
    .optional(),
  fullName: z.string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .max(255, { message: 'O nome pode ter no máximo 255 caracteres' }),
});

function ProfilePage() {
  const { request, loading } = useApi('/users');
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [inputs, setInputs] = React.useState<{ [key: string]: string }>({
    imageUrl: '',
    fullName: '',
    document: '',
  });

  const loadUserInfo = React.useCallback(async () => {
    const result = await request<UserInfo>({
      endpoint: '/profile',
    });
    setUserInfo(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputs = result as any;
    setInputs({
        ...inputs,
        imageUrl: inputs?.imageUrl ?? null,
    });
    console.log(result)
  }, [request]);

  React.useEffect(() => {
    if (userInfo) return;
    loadUserInfo();
  }, [userInfo, loadUserInfo])

  if (!userInfo) return null;

  const {  document, fullName, imageUrl } = userInfo;

  const updateProfile = async () => {
    if (inputs.imageUrl?.trim() === '') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputs.imageUrl = null as any;
    }

    const errors = checkZodValidationErrors(inputs, updateProfileSchema);

    if (errors) {
      Object.entries(errors).forEach(([ , message ]) => toast.info(message));
      return;
    }

    await request({
      endpoint: '/profile/update',
      method: 'PUT',
      body: {
        ...inputs,
      },
    });

    await loadUserInfo();
  };

  const onFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;
    const propertyName = name as keyof typeof inputs;
    inputs[propertyName] = value;
    setInputs(inputs);
  }

  if (loading) {
    return <div className="h-full flex items-center justify-center">
      <Atom color="#6746CB" size="medium" text="" textColor="" />
  </div>
  }

  return (
    <div className="container mx-auto p-6">
    <Card className="shadow-xl border border-brand-primary rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Avatar do Usuário */}
      <div className="flex justify-center mt-6">
        <div className="w-[120px] h-[120px] rounded-full bg-brand-primary text-white flex items-center justify-center text-5xl font-bold shadow-lg">
          { !imageUrl && fullName.at(0)?.toUpperCase() }
          { imageUrl &&
            <img src={imageUrl} className="rounded-full w-full h-full object-center object-cover"/>
          }
        </div>
      </div>
  
      {/* Cabeçalho */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-brand-primary text-center mt-4">
          Perfil do Usuário
        </CardTitle>
      </CardHeader>
  
      {/* Conteúdo */}
      <CardContent>
        <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm border">
          <p className="text-center text-gray-600 text-base">
            Aqui você pode visualizar e atualizar as informações do seu perfil.
          </p>
        </div>
  
        {/* Formulário */}
        <form className="space-y-6" onChange={onFormChange} onSubmit={event => event.preventDefault()}>
          {/* Nome Completo */}
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="fullName">
              <i className="fas fa-user mr-2"></i> Nome Completo
            </label>
            <Input
              type="text"
              className="py-3 px-4 text-base border border-gray-300 bg-gray-50 focus:border-brand-primary focus:ring focus:ring-brand-primary rounded-md shadow-sm"
              name="fullName"
              id="fullName"
              defaultValue={inputs.fullName}
            />
          </div>
  
          {/* Imagem URL */}
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="imageUrl">
              <i className="fa-solid fa-image mr-2"></i> Imagem URL
            </label>
            <Input
              type="text"
              placeholder="Insira uma Imagem"
              className="py-3 px-4 text-base border border-gray-300 bg-gray-50 focus:border-brand-primary focus:ring focus:ring-brand-primary rounded-md shadow-sm"
              name="imageUrl"
              id="imageUrl"
              defaultValue={inputs.imageUrl}
            />
          </div>
  
          {/* CPF */}
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="documento">
              <i className="fas fa-id-card mr-2"></i> CPF:
            </label>
            <Input
              disabled
              type="text"
              name="document"
              className="py-3 px-4 text-base border border-gray-300 bg-gray-50 focus:border-brand-primary focus:ring focus:ring-brand-primary rounded-md shadow-sm"
              id="document"
              value={document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
            />
          </div>
  
          {/* Botões de Ação */}
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              onClick={updateProfile}
              className="bg-green-500 text-white hover:bg-green-400 px-6 py-3 rounded-md shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Salvar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  

  );
};

export default ProfilePage;
