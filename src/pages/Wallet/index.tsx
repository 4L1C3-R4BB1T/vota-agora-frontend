import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"; // Importando os componentes do shadcn
import { Input } from "@/components/ui/input"; // Importando o componente Input do shadcn
import { Button } from "@/components/ui/button"; // Importando o componente Button do shadcn

function Wallet() {
  return (
    <div className="container mx-auto p-6">
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white bg-brand-primary p-4 rounded-md flex items-center">
          <i className="fas fa-wallet mr-2"></i> Minha Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="rewardToken">
              <i className="fas fa-gift mr-2"></i> Reward Token:
            </label>
            <Input
              type="text"
              name="rewardToken"
              id="rewardToken"
              defaultValue="RewardToken" // Exemplo de valor
              className="border border-gray-300 rounded-md py-6 text-base px-4 focus:border-brand-primary focus:ring focus:ring-brand-primary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="tokenAddress">
              <i className="fas fa-address-card mr-2"></i> Endereço do Token:
            </label>
            <Input
              type="text"
              name="tokenAddress"
              id="tokenAddress"
              defaultValue="0x1234567890abcdef1234567890abcdef12345678" // Exemplo de valor
              className="border border-gray-300 rounded-md py-6 text-base px-4 focus:border-brand-primary focus:ring focus:ring-brand-primary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="walletAddress">
              <i className="fas fa-wallet mr-2"></i> Endereço da Wallet:
            </label>
            <Input
              type="text"
              name="walletAddress"
              id="walletAddress"
              defaultValue="0xabcdef1234567890abcdef1234567890abcdef12" // Exemplo de valor
              className="border border-gray-300 rounded-md py-6 text-base px-4 focus:border-brand-primary focus:ring focus:ring-brand-primary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-brand-primary mb-2" htmlFor="etherAmount">
              <i className="fas fa-ethereum mr-2"></i> Quantidade de Ether:
            </label>
            <Input
              type="number"
              name="etherAmount"
              id="etherAmount"
              defaultValue={2.5}
              className="border border-gray-300 rounded-md py-6 text-base px-4 focus:border-brand-primary focus:ring focus:ring-brand-primary"
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button type="button" className="bg-brand-primary text-white hover:bg-brand-primary/80 px-6 py-2 rounded-md shadow-lg transition duration-200 mr-4">
              Atualizar
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
}

export default Wallet;