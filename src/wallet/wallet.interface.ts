export interface IWallet {
    iconColor: string;
    connectedWallet: string;
    contractAddress: string;
    contractSymbol: string;
    contractBaseTokenURI: string;
    contractOwnerAddress: string;
    contractPrice: string;
    isOwner: boolean;
  }

  export const defaultWallet = () => ({
    iconColor: "disabled",
    connectedWallet: "",
    contractSymbol: "",
    contractAddress: "",
    contractBaseTokenURI: "",
    contractOwnerAddress: "",
    contractPrice: "",
    isOwner: false
});

