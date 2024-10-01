import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

function Wallet() {
    const [copySuccessToken, setCopySuccessToken] = useState(false);
    const [copySuccessWallet, setCopySuccessWallet] = useState(false);
  
    const handleCopy = (text: string, setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Feedback for 2 seconds
    };
  
    return (
      <div className="flex-1">
        <Card className="fshadow-lg rounded-lg  bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white bg-brand-primary p-6 rounded-md flex items-center justify-center shadow-md">
              <i className="fas fa-wallet mr-2"></i> Minha Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 text-center">
              
              {/* Informações do Reward Token */}
              <div className="flex flex-col items-center">
                <i className="fas fa-gift text-4xl text-brand-primary mb-4"></i>
                <span className="font-semibold text-brand-primary text-xl">Reward Token</span>
                <span className="text-4xl font-bold text-gray-800 block bg-gray-100 p-4 rounded-lg mt-3 shadow-sm">
                  100,000,000 GLT
                </span>
              </div>
  
              {/* Área de cópia para Endereço do Token */}
              <div className="flex flex-col items-center">
                <i className="fas fa-address-card text-4xl text-brand-primary mb-4"></i>
                <span className="font-semibold text-brand-primary text-xl">Endereço do Token</span>
                <div className="flex items-center space-x-2 group bg-gray-100 mt-2 p-4 rounded-lg shadow-sm w-full justify-center">
                  <span className="text-lg text-gray-700">0x1234567890abcdef1234567890abcdef12345678</span>
                  <button
                    onClick={() => handleCopy("0x1234567890abcdef1234567890abcdef12345678", setCopySuccessToken)}
                    className="text-brand-primary hover:text-brand-primary/80 transition duration-200 group-hover:scale-105"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  {copySuccessToken && <span className="text-sm text-green-500 ml-2">Copiado!</span>}
                </div>
              </div>
  
              {/* Área de cópia para Endereço da Wallet */}
              <div className="flex flex-col items-center">
                <i className="fas fa-wallet text-4xl text-brand-primary mb-4"></i>
                <span className="font-semibold text-brand-primary text-xl">Endereço da Wallet</span>
                <div className="flex items-center space-x-2 group bg-gray-100  mt-2 p-4 rounded-lg shadow-sm w-full justify-center">
                  <span className="text-lg text-gray-700">0xabcdef1234567890abcdef1234567890abcdef12</span>
                  <button
                    onClick={() => handleCopy("0xabcdef1234567890abcdef1234567890abcdef12", setCopySuccessWallet)}
                    className="text-brand-primary hover:text-brand-primary/80 transition duration-200 group-hover:scale-105"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  {copySuccessWallet && <span className="text-sm text-green-500 ml-2">Copiado!</span>}
                </div>
              </div>
  
              {/* Quantidade de Ether */}
              <div className="flex flex-col items-center">
                <i className="fab fa-ethereum text-4xl text-brand-primary mb-4"></i>
                <span className="font-semibold text-brand-primary text-xl">Quantidade de Ether</span>
                <span className="text-2xl font-bold text-gray-800 bg-gray-100 block mt-2 p-4 rounded-lg shadow-sm">
                  2.5 ETH
                </span>
              </div>
  
              {/* Botões de ação */}
              <div className="flex justify-center mt-10">
                <Button type="button" className="bg-brand-primary text-lg text-white hover:bg-brand-primary/90 px-6 py-2 rounded-md shadow-lg transition duration-200">
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