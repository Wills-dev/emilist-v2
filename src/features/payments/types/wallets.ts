export interface PaymentWallet {
  id: string;
  currency: string;
  balance?: number;
  isDefault?: boolean;
  createdAt?: string;
}

export interface CreateWalletPayload {
  currency: string;
  isDefault: boolean;
}
