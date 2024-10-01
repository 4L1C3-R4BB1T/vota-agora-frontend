import ActivityLog from "@/core/components/ActivityLog";
import Wallet from "@/core/components/Wallet";

function WalletPage() {

  
    return (
      <div className="flex gap-5">
        <ActivityLog/>
        <Wallet/>
      </div>
    );
}


export default WalletPage;