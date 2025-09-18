export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;  // Indique si l'utilisateur est authentifié
  isLoading: boolean;        // Indique si une opération d'authentification est en cours
  login: (email: string, password: string) => Promise<void>;  // Méthode de connexion
  logout: () => void;                                       // Méthode de déconnexion
  error: string | null;                                     // Message d'erreur éventuel
}
