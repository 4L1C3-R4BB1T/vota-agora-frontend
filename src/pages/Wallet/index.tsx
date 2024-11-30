import ActivityLog from "@/core/components/ActivityLog";
import Wallet from "@/core/components/Wallet";
import useApi from "@/core/hooks/useApi";
import React from "react";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

export interface UserWallet {
  accountAddress: string;
  privateKey: string;
  rewardTokenAddress: string;
  rewardToken: string;
  ether: string;
}

function WalletPage() {
  const [showHistory, setShowHistory] = React.useState(true);
  const [wallet, setWallet] = React.useState<UserWallet | null>(null);
  const { request, loading } = useApi('/users/wallet');
  const [showImportWalletInstructions, setShowImportWalletInstructions] = React.useState(false);


  const loadData = React.useCallback(async () => {
    const data = await request<UserWallet>({});
    setWallet(data);
  }, [request]);
  
  React.useEffect(() => {
    loadData();
  }, [request, loadData]);
  
  const toggleHistory = () => setShowHistory(showHistory => !showHistory);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Chave privada copiada!');
  };



  return (

    <div>
        <div className={`${!showImportWalletInstructions ? 'hidden' : 'block'}  bg-black h-screen w-screen fixed top-0 left-0 z-50 bg-opacity-60 flex justify-center items-center`}>
          <div className="bg-white modal-enter w-96 p-6 rounded-lg shadow-lg text-center">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              onClick={() => setShowImportWalletInstructions(false)}
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <h2 className="text-2xl font-semibold text-brand-primary mb-4">Como Importar sua Carteira no MetaMask</h2>
            <p className="text-gray-700 mb-4">
              Para importar sua carteira no MetaMask, siga as instruções abaixo:
            </p>
            
            <div className="text-left text-gray-600 space-y-4 text-wrap break-words">
              <p><strong>1. Abra o MetaMask:</strong> Clique no ícone do MetaMask no seu navegador.</p>
              <p><strong>2. Selecione a opção "Importar carteira":</strong> No MetaMask, clique em "Importar carteira" para adicionar uma nova conta.</p>
              <p><strong>3. Cole a Private Key:</strong> No campo de importação, cole a <mark onClick={() => handleCopy(wallet?.privateKey ?? '')} className="cursor-pointer bg-brand-primary text-white px-2 rounded-md">{ wallet?.privateKey }</mark> fornecida. Certifique-se de copiar a chave corretamente.</p>
              <p><strong>4. Conclua a Importação:</strong> Clique em "Importar" e sua conta será adicionada ao MetaMask.</p>
            </div>

            <div className="mt-6">
              <button 
                onClick={() => setShowImportWalletInstructions(false)}
                className="bg-brand-primary text-white px-6 py-2 rounded-md hover:bg-brand-primary/90 transition-all duration-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>

      <span className="flex justify-end">
        <button onClick={() => setShowImportWalletInstructions(true)} className="flex items-center bg-gradient-to-r from-[#6746CB] to-[#4D94FF] text-white hover:from-[#5B5FC7] hover:to-[#3B7BFF] py-3 px-6 rounded-full shadow-xl transition-transform duration-300 transform hover:scale-105">
            <i className="fas fa-wallet mr-3 text-lg"></i>
            <span className="text-lg font-semibold">Importar Carteira</span>
        </button>
    </span>


      <div className="flex pt-5 flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Botão de Alternar Histórico */}
        <div
          onClick={toggleHistory}
          aria-label={!showHistory ? "Mostrar Histórico de Atividades" : "Ocultar Histórico de Atividades"}
          className="relative bg-brand-primary cursor-pointer hover:bg-brand-primary/90 me-5 p-3 rounded-full w-12 h-12 flex justify-center items-center text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <i className={`fas ${!showHistory ? "fa-eye" : "fa-eye-slash"} transform`}></i>
        </div>
      
        {/* Histórico de Atividades */}
        {showHistory && (
          <div className="flex-grow basis-[40%] transition-all duration-300 ease-in-out">
            <ActivityLog />
          </div>
        )}
      
        {/* Wallet */}
        <div className="flex-grow basis-[50%] transition-all duration-300 ease-in-out">
          {
            loading && <div className="h-full flex items-center justify-center">
              <Atom color="#6746CB" size="medium" text="" textColor="" />
            </div>
        }

        {
          (!loading && wallet) && <Wallet reload={loadData} data={wallet} className="mx-auto w-full min-w-[300px] max-w-[90vw] lg:max-w-[50vw]" />
        }
        </div>
      </div>
  </div>
  
  );
}


export default WalletPage;