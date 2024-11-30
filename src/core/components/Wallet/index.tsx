import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertBaseUnitsToTokens } from "@/core/utils/convert-base-units-to-tokens.util";
import { UserWallet } from "@/pages/Wallet";
import { useState } from "react";

interface Props {
  className?: string;
  data: UserWallet;
  reload: () => Promise<void>;
}

function Wallet({ className = '', data, reload }: Props) {
    const [copySuccessToken, setCopySuccessToken] = useState(false);
    const [copySuccessWallet, setCopySuccessWallet] = useState(false);
  
    const handleCopy = (text: string, setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); 
    };
  
    return (
      <div className={`${className}`}>
    <Card className="shadow-xl border border-brand-primary rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Cabeçalho */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-[#6746CB] to-[#4D94FF] p-6 rounded-t-lg flex items-center justify-center shadow-md">
          <i className="fas fa-wallet mr-4"></i> Minha Carteira
        </CardTitle>
      </CardHeader>

    {/* Conteúdo */}
    <CardContent>
      <div className="space-y-8 text-center">
        {/* Informações do Reward Token */}
        <div className="flex flex-col items-center">
          <i className="fas fa-gift text-4xl text-brand-primary mb-3"></i>
          <span className="font-semibold text-brand-primary text-lg">Reward Token</span>
          <span className="text-lg border border-brand-primary font-bold text-brand-primary bg-gray-50 p-4 rounded-md mt-3 shadow-inner">
            { convertBaseUnitsToTokens(data.rewardToken) } GLT
          </span>
        </div>

        {/* Endereço do Token */}
        <div className="flex flex-col items-center">
          <i className="fas fa-address-card text-4xl text-brand-primary mb-3"></i>
          <span className="font-semibold text-brand-primary text-lg">Endereço do Token</span>
          <div className="flex items-center space-x-2 group bg-gray-50 mt-2 p-4 rounded-md shadow-inner border border-brand-primary w-full max-w-xl justify-between">
            <span className="text-brand-primary text-base truncate">
              { data.rewardTokenAddress }
            </span>
            <button
              onClick={() => handleCopy(data.rewardTokenAddress, setCopySuccessToken)}
              className="text-brand-primary hover:text-brand-primary/80 transition-transform duration-200 transform group-hover:scale-105"
            >
              <i className="fas fa-copy"></i>
            </button>
            {copySuccessToken && (
              <span className="text-sm text-green-500 animate-pulse ml-2">Copiado!</span>
            )}
          </div>
        </div>

        {/* Endereço da Wallet */}
        <div className="flex flex-col items-center">
          <i className="fas fa-wallet text-4xl text-brand-primary mb-3"></i>
          <span className="font-semibold text-brand-primary text-lg">Endereço da Wallet</span>
          <div className="flex items-center space-x-2 group bg-gray-50 mt-2 p-4 rounded-md shadow-inner border border-brand-primary w-full max-w-xl justify-between">
            <span className="text-brand-primary text-base truncate">
              { data.accountAddress }
            </span>
            <button
              onClick={() => handleCopy(data.accountAddress, setCopySuccessWallet)}
              className="text-brand-primary hover:text-brand-primary/80 transition-transform duration-200 transform group-hover:scale-105"
            >
              <i className="fas fa-copy"></i>
            </button>
            {copySuccessWallet && (
              <span className="text-sm text-green-500 animate-pulse ml-2">Copiado!</span>
            )}
          </div>
        </div>

        {/* Quantidade de Ether */}
        <div className="flex flex-col items-center">
          <i className="fab fa-ethereum text-4xl text-brand-primary mb-3"></i>
          <span className="font-semibold text-brand-primary text-lg">Quantidade de Ether</span>
          <span className="text-lg border border-gray-300 font-bold text-brand-primary bg-gray-50 p-4 rounded-md shadow-inner mt-3">
            { data.ether } ETH
          </span>
        </div>

        {/* Botão de Atualizar */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={reload}
            type="button"
            className="bg-brand-primary text-white hover:bg-brand-primary/90 px-8 py-3 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
          >
            <i className="fas fa-sync-alt mr-2"></i> Atualizar
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

    );
}


export default Wallet;