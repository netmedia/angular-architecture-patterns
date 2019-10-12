import { AuthEffects } from './auth.effect';
import { ProductsEffects } from './products.effect';

export const effects: any[] = [
  AuthEffects,
  ProductsEffects
]; //ApplicationEffects

// export * from './application.effect';
export * from './auth.effect';
export * from './products.effect';

