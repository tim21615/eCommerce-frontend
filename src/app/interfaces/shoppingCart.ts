export interface ShoppingCartPK {
  memberId: number;
  productId: number;
}

export interface ShoppingCart {
  memberId: number;
  productId: number;
  quantity: number;
}

export interface MemberIdRequest {
  memberId: number;
}

export interface ShoppingCartResponse {
  memberId: number;
  productId: number;
  productName: string;
  productPrice: number;
  stock: number;
  quantity: number;
  available: boolean;
  productPicture: string;
  productPictureUrl?: any;
}
