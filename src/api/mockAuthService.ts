/**
 * Service d'authentification mocké pour le développement frontend
 * Ce service simule les appels API avec des délais et retourne des promesses
 * qui se résolvent avec des données factices.
 */

import * as bcrypt from 'bcryptjs';

// Interface pour les utilisateurs
interface MockUser {
  id: string;
  email: string;
  password: string; // Stocke le hash du mot de passe
  name: string;
  role: 'admin' | 'pharmacien' | 'user';
  phone: string;
  avatar: string;
  createdAt: string;
  lastLogin?: string;
  failedLoginAttempts: number;
  accountLockedUntil?: number; // Timestamp en millisecondes
}

// Constantes de sécurité
const SECURITY = {
  SALT_ROUNDS: 10,
  MAX_FAILED_ATTEMPTS: 5,
  ACCOUNT_LOCK_TIME: 15 * 60 * 1000, // 15 minutes en millisecondes
  PASSWORD_MIN_LENGTH: 8,
  TOKEN_EXPIRY: '7d', // 7 jours
};

// Messages d'erreur génériques
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Identifiants invalides',
  ACCOUNT_LOCKED: 'Compte temporairement verrouillé. Veuillez réessayer plus tard.',
  INVALID_EMAIL: 'Format d\'email invalide',
  WEAK_PASSWORD: `Le mot de passe doit contenir au moins ${SECURITY.PASSWORD_MIN_LENGTH} caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial`,
  GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer plus tard.'
};

// Hash du mot de passe 'Apollos@dsinter97' généré avec bcrypt
const HASHED_PASSWORD = '$2a$10$XFDWzneXbLvkzLY1f5J9YeGjOZGEEFJQJ.zXJ6WYz7Q4q9q1J5zXm';

// Utilisateur par défaut
const DEFAULT_USER: MockUser = {
  id: '1',
  email: 'apollosulrich@gmail.com',
  password: HASHED_PASSWORD,
  name: 'Apollos ADINSI',
  role: 'admin',
  phone: '',
  avatar: '',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  failedLoginAttempts: 0
};

// Simule une base de données en mémoire avec l'utilisateur par défaut
const mockUsers: MockUser[] = [DEFAULT_USER];

// Stocke les tokens de réinitialisation en mémoire (simule une base de données)
const passwordResetTokens = new Map<string, { email: string; expires: number }>();

console.log('✅ Utilisateur par défaut initialisé avec succès');
console.log(`📧 Email: ${DEFAULT_USER.email}`);
console.log('🔑 Mot de passe: Apollos@dsinter97');


/**
 * Valide le format d'un email
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide la force d'un mot de passe
 */
const isPasswordStrong = (password: string): boolean => {
  const passwordRegex = new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{${SECURITY.PASSWORD_MIN_LENGTH},}$`
  );
  return passwordRegex.test(password);
};

/**
 * Hache un mot de passe avec bcrypt
 */
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SECURITY.SALT_ROUNDS);
};

/**
 * Compare un mot de passe en clair avec un hash
 */
const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Vérifie si un compte est verrouillé
 */
const isAccountLocked = (user: MockUser): boolean => {
  return user.accountLockedUntil ? user.accountLockedUntil > Date.now() : false;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockAuthService = {
  /**
   * Simule une connexion utilisateur avec gestion de la sécurité
   */
  /**
   * Simule une connexion utilisateur avec gestion de la sécurité
   */
  async login(email: string, userPassword: string) {
    try {
      await delay(300); // Délai minimal
      
      // Vérifications basiques
      if (!email || !userPassword) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Création d'un utilisateur admin par défaut si la liste est vide
      if (mockUsers.length === 0) {
        console.log('Aucun utilisateur trouvé, création admin par défaut...');
        const defaultUser = {
          id: '1',
          email: 'apollosulrich@gmail.com',
          password: 'Apollos@dsinter97', // En clair pour le test
          name: 'Apollos ADINSI',
          role: 'admin' as const,
          phone: '',
          avatar: '',
          createdAt: new Date().toISOString(),
          failedLoginAttempts: 0
        };
        mockUsers.push(defaultUser);
      }
      
      // Recherche de l'utilisateur
      const normalizedEmail = email.trim().toLowerCase();
      const user = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
      
      if (!user) {
        console.error('Utilisateur non trouvé pour l\'email:', normalizedEmail);
        throw new Error('Identifiants invalides');
      }
      
      // Vérification simplifiée du mot de passe
      console.log('=== TENTATIVE DE CONNEXION ===');
      console.log('Email fourni:', email);
      console.log('Utilisateur trouvé:', user.email);
      
      // Comparaison directe pour le test
      const isPasswordValid = userPassword === user.password;
      
      if (!isPasswordValid) {
        console.error('Mot de passe incorrect');
        throw new Error('Identifiants invalides');
      }
      
      // Réinitialise le compteur d'échecs de connexion et la date de verrouillage
      user.failedLoginAttempts = 0;
      delete user.accountLockedUntil;
      user.lastLogin = new Date().toISOString();
      
      console.log(`Connexion réussie pour l'utilisateur: ${user.email}`);
    
      // Crée un token JWT correctement formaté
      const header = {
        alg: 'HS256', // Algorithme de hachage
        typ: 'JWT'
      };
      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000), // Date d'émission
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // Expire dans 7 jours
      };
      
      // Encode l'en-tête et la charge utile en base64 (compatible navigateur)
      const toBase64 = (obj: Record<string, unknown>) => {
        const str = JSON.stringify(obj);
        return typeof window !== 'undefined' 
          ? window.btoa(unescape(encodeURIComponent(str)))
          : Buffer.from(str).toString('base64');
      };
      
      const headerBase64 = toBase64(header);
      const payloadBase64 = toBase64(payload);
      const signature = 'simulated_signature';
      const token = `${headerBase64}.${payloadBase64}.${signature}`;
      
      console.log('Token généré:', token);
      
      // Stocke le token dans le localStorage pour la persistance
      localStorage.setItem('auth_token', token);
      
      // Crée l'objet utilisateur à retourner (sans le mot de passe)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      
      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error: unknown) {
      console.error('Erreur lors de la connexion:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Simule une déconnexion
   */
  async logout() {
    await delay(300);
    localStorage.removeItem('auth_token');
    return true;
  },
  
  /**
   * Vérifie si l'utilisateur est connecté
   */
  async isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.log('Aucun token trouvé dans le stockage local');
      return false;
    }
    
    try {
      // Vérifier si le token est valide en essayant de récupérer l'utilisateur
      const user = await this.getCurrentUser();
      if (!user) {
        console.log('Aucun utilisateur trouvé pour le token fourni');
        return false;
      }
      
      // Vérifier si le compte est verrouillé
      const userWithLock = user as MockUser;
      if (userWithLock.accountLockedUntil !== undefined && userWithLock.accountLockedUntil > Date.now()) {
        console.log(`Compte verrouillé jusqu'à ${new Date(userWithLock.accountLockedUntil).toISOString()}`);
        return false;
      }
      
      return true;
    } catch (error: unknown) {
      console.error('Erreur de vérification d\'authentification:', error);
      return false;
    }
  },
  
  /**
   * Récupère l'utilisateur actuellement connecté
   */
  async getCurrentUser() {
    await delay(300);
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return null;
    }
    
    try {
      // Décoder le token JWT (simulé)
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('auth_token');
        return null;
      }
      
      const payloadStr = parts[1] || ''; // Ensure we have a string
      const payload = JSON.parse(Buffer.from(payloadStr, 'base64').toString('utf-8'));
      const user = mockUsers.find(u => u.id === payload.userId);
      
      if (!user) {
        localStorage.removeItem('auth_token');
        return null;
      }
      
      // Vérifier si le token est expiré
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('auth_token');
        return null;
      }
      
      // Retourner l'utilisateur sans le mot de passe
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      localStorage.removeItem('auth_token');
      return null;
    }
  },

  /**
   * Demande une réinitialisation de mot de passe
   */
  async requestPasswordReset(email: string) {
    try {
      await delay(1000);
      
      // Validation de l'email
      if (!isValidEmail(email)) {
        console.error('Format d\'email invalide pour la réinitialisation:', email);
        throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
      }
      
      const normalizedEmail = email.trim().toLowerCase();
      const user = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
      
      // Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
      if (!user) {
        console.log('Demande de réinitialisation pour un email non enregistré:', normalizedEmail);
        return { success: true };
      }
      
      // Vérifier si le compte est verrouillé
      if (isAccountLocked(user)) {
        console.log(`Tentative de réinitialisation sur un compte verrouillé: ${user.email}`);
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
      }
      
      // Crée un token de réinitialisation (valable 1 heure)
      const resetToken = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
      const expires = Date.now() + 3600000; // 1 heure
      
      passwordResetTokens.set(resetToken, { email: normalizedEmail, expires });
      
      // En production, vous enverriez un email avec un lien contenant ce token
      console.log(`Lien de réinitialisation (simulé) : /reset-password?token=${resetToken}`);
      
      return { success: true };
    } catch (error: unknown) {
      console.error('Erreur lors de la demande de réinitialisation:', error);
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Vérifie si un token de réinitialisation est valide
   */
  async verifyResetToken(token: string, email: string) {
    await delay(800);
    
    const resetToken = passwordResetTokens.get(token);
    
    if (!resetToken || resetToken.email !== email || resetToken.expires < Date.now()) {
      throw new Error('Lien de réinitialisation invalide ou expiré');
    }
    
    return { valid: true };
  },
  
  /**
   * Réinitialise le mot de passe avec un token valide
   */
  async resetPassword(token: string, email: string, newPassword: string) {
    try {
      await delay(1000);
      
      // Vérifie d'abord si le token est valide
      const tokenValid = await this.verifyResetToken(token, email);
      if (!tokenValid.valid) {
        throw new Error('Lien de réinitialisation invalide ou expiré');
      }
      
      // Vérifie la force du nouveau mot de passe
      if (!isPasswordStrong(newPassword)) {
        throw new Error(ERROR_MESSAGES.WEAK_PASSWORD);
      }
      
      // Trouve l'utilisateur
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        // Normalement, ce cas ne devrait pas arriver car le token est valide
        throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
      }
      
      // Met à jour le mot de passe
      user.password = await hashPassword(newPassword);
      
      // Supprime le token de réinitialisation
      passwordResetTokens.delete(token);
      
      return { success: true };
    } catch (error: unknown) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Met à jour le profil de l'utilisateur connecté
   */
  async updateProfile(updates: { name?: string; email?: string; phone?: string; avatar?: string }) {
    try {
      await delay(800);
      
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
      
      const user = mockUsers.find(u => u.id === currentUser.id);
      if (!user) {
        throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
      }
      
      // Met à jour les champs fournis
      if (updates.name) user.name = updates.name;
      if (updates.phone) user.phone = updates.phone;
      if (updates.avatar) user.avatar = updates.avatar;
      
      // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé
      if (updates.email && updates.email !== user.email) {
        if (!isValidEmail(updates.email)) {
          throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
        }
        
        const emailExists = mockUsers.some(u => 
          u.email.toLowerCase() === updates.email?.toLowerCase() && u.id !== user.id
        );
        
        if (emailExists) {
          throw new Error('Cet email est déjà utilisé par un autre compte');
        }
        
        user.email = updates.email.toLowerCase();
      }
      
      // Retourne l'utilisateur mis à jour (sans le mot de passe)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
      
    } catch (error: unknown) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Change le mot de passe de l'utilisateur connecté
   */
  async changePassword(currentPassword: string, newPassword: string) {
    try {
      await delay(800);
      
      // Vérifie que le nouveau mot de passe est assez fort
      if (!isPasswordStrong(newPassword)) {
        throw new Error(ERROR_MESSAGES.WEAK_PASSWORD);
      }
      
      // Récupère l'utilisateur actuel
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
      
      // Trouve l'utilisateur dans la base de données
      const user = mockUsers.find(u => u.id === currentUser.id);
      if (!user) {
        throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
      }
      
      // Vérifie l'ancien mot de passe
      const isPasswordValid = await comparePasswords(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Le mot de passe actuel est incorrect');
      }
      
      // Met à jour le mot de passe
      user.password = await hashPassword(newPassword);
      
      return { success: true };
      
    } catch (error: unknown) {
      console.error('Erreur lors du changement de mot de passe:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Récupère la liste de tous les utilisateurs (uniquement pour les administrateurs)
   */
  async getAllUsers() {
    try {
      await delay(800);
      
      // Vérifie que l'utilisateur est connecté et est un administrateur
      const currentUser = await this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Accès non autorisé');
      }
      
      // Retourne tous les utilisateurs sans les mots de passe
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return mockUsers.map(({ password: _, ...user }) => user);
      
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Supprime un utilisateur (uniquement pour les administrateurs)
   */
  async deleteUser(userId: string) {
    try {
      await delay(800);
      
      // Vérifie que l'utilisateur est connecté et est un administrateur
      const currentUser = await this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Accès non autorisé');
      }
      
      // Empêche un administrateur de se supprimer lui-même
      if (currentUser.id === userId) {
        throw new Error('Vous ne pouvez pas supprimer votre propre compte');
      }
      
      // Trouve l'index de l'utilisateur à supprimer
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error('Utilisateur non trouvé');
      }
      
      // Supprime l'utilisateur
      mockUsers.splice(userIndex, 1);
      
      return { success: true };
      
    } catch (error: unknown) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  },
  
  /**
   * Crée un nouvel utilisateur (uniquement pour les administrateurs)
   */
  async createUser(userData: { email: string; password: string; name: string; role: 'admin' | 'pharmacien' | 'user' }) {
    try {
      await delay(1000);
      
      // Vérifie que l'utilisateur est connecté et est un administrateur
      const currentUser = await this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Accès non autorisé');
      }
      
      // Validation des données
      if (!isValidEmail(userData.email)) {
        throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
      }
      
      if (!isPasswordStrong(userData.password)) {
        throw new Error(ERROR_MESSAGES.WEAK_PASSWORD);
      }
      
      // Vérifie si l'email est déjà utilisé
      const emailExists = mockUsers.some(u => 
        u.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (emailExists) {
        throw new Error('Cet email est déjà utilisé par un autre compte');
      }
      
      // Crée le nouvel utilisateur
      const newUser: MockUser = {
        id: (mockUsers.length + 1).toString(),
        email: userData.email.toLowerCase(),
        password: await hashPassword(userData.password),
        name: userData.name,
        role: userData.role,
        phone: '',
        avatar: '',
        createdAt: new Date().toISOString(),
        failedLoginAttempts: 0
      };
      
      mockUsers.push(newUser);
      
      // Retourne l'utilisateur créé sans le mot de passe
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
      
    } catch (error: unknown) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }
  
}; // Fin de l'objet mockAuthService

export default mockAuthService;

