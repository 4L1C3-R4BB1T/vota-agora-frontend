import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

function WalletPage() {
    const [copySuccessToken, setCopySuccessToken] = useState(false);
    const [copySuccessWallet, setCopySuccessWallet] = useState(false);
  
    const handleCopy = (text: string, setCopySuccess: (value: boolean) => void) => {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Feedback for 2 seconds
    };
  
    return (
      <div className="container mx-auto p-6">
        <Card className="shadow-lg rounded-lg max-w-lg mx-auto"> {/* max-w-lg para aumentar a largura */}
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center justify-center">
              <i className="fas fa-wallet mr-2"></i> Minha Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 text-center">
              {/* Informações do Reward Token */}
              <div className="flex flex-col items-center">
                <i className="fas fa-gift text-4xl text-brand-primary mb-2"></i>
                <span className="font-semibold text-brand-primary text-xl">Reward Token</span>
                <span className="text-4xl font-bold text-gray-800">100,000,000</span>
              </div>
  
              {/* Área de cópia para Endereço do Token */}
              <div className="flex flex-col items-center relative">
                <i className="fas fa-address-card text-4xl text-brand-primary mb-2"></i>
                <span className="font-semibold text-brand-primary text-xl">Endereço do Token</span>
                <div className="flex items-center space-x-2 group">
                  <span className="text-lg text-gray-700">0x1234567890abcdef1234567890abcdef12345678</span>
                  <button
                    onClick={() => handleCopy("0x1234567890abcdef1234567890abcdef12345678", setCopySuccessToken)}
                    className="text-brand-primary hover:text-brand-primary/80 transition duration-200 group-hover:scale-110"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              </div>
  
              {/* Área de cópia para Endereço da Wallet */}
              <div className="flex flex-col items-center relative">
                <i className="fas fa-wallet text-4xl text-brand-primary mb-2"></i>
                <span className="font-semibold text-brand-primary text-xl">Endereço da Wallet</span>
                <div className="flex items-center space-x-2 group">
                  <span className="text-lg text-gray-700">0xabcdef1234567890abcdef1234567890abcdef12</span>
                  <button
                    onClick={() => handleCopy("0xabcdef1234567890abcdef1234567890abcdef12", setCopySuccessWallet)}
                    className="text-brand-primary hover:text-brand-primary/80 transition duration-200 group-hover:scale-110"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
              </div>
  
              {/* Quantidade de Ether */}
              <div className="flex flex-col items-center">
                <i className="fab fa-ethereum text-4xl text-brand-primary mb-2"></i>
                <span className="font-semibold text-brand-primary text-xl">Quantidade de Ether</span>
                <span className="text-4xl font-bold text-gray-800">2.5</span>
              </div>
  
              {/* Botões de ação */}
              <div className="flex justify-center mt-6 space-x-4">
                <Button type="button" className="bg-brand-primary text-lg text-white hover:bg-brand-primary/80 px-6 py-2 rounded-md shadow-lg transition duration-200">
                  <i className="fas fa-sync-alt mr-2"></i> Atualizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}


export default WalletPage;