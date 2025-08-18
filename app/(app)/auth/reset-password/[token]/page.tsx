'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Shield
} from 'lucide-react';

interface ResetPasswordTokenPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPasswordTokenPage({ params }: ResetPasswordTokenPageProps) {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  
  // Résoudre les paramètres de manière asynchrone
  useEffect(() => {
    params.then(resolvedParams => {
      setToken(resolvedParams.token);
    });
  }, [params]);
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Vérifier si le token est valide (simulation)
      if (token === 'invalid-token') {
        setErrors({ general: 'Le lien de réinitialisation est invalide ou a expiré.' });
        return;
      }

      setIsSuccess(true);
      
      // Redirection après succès
      setTimeout(() => {
        router.push('/auth/signin?message=password-reset-success');
      }, 3000);
      
    } catch (err) {
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { label: 'Très faible', color: 'text-red-600' };
      case 2: return { label: 'Faible', color: 'text-orange-600' };
      case 3: return { label: 'Moyen', color: 'text-yellow-600' };
      case 4: return { label: 'Fort', color: 'text-green-600' };
      case 5: return { label: 'Très fort', color: 'text-green-700' };
      default: return { label: '', color: '' };
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Mot de passe mis à jour !
            </h2>
            <p className="text-charcoal/60 mb-6">
              Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirection en cours...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            Nouveau mot de passe
          </CardTitle>
          <p className="text-charcoal/60 mt-2">
            Choisissez un mot de passe sécurisé pour protéger votre compte.
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-charcoal font-medium">
                Nouveau mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Entrez votre nouveau mot de passe"
                  disabled={isLoading}
                  className={`border-gray-300 focus:border-magenta pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getPasswordStrength(formData.password) <= 2 ? 'bg-red-500' :
                          getPasswordStrength(formData.password) === 3 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(getPasswordStrength(formData.password) / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getPasswordStrengthLabel(getPasswordStrength(formData.password)).color}`}>
                      {getPasswordStrengthLabel(getPasswordStrength(formData.password)).label}
                    </span>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-charcoal font-medium">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirmez votre nouveau mot de passe"
                  disabled={isLoading}
                  className={`border-gray-300 focus:border-magenta pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-charcoal"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.general && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Conseils pour un mot de passe sécurisé :</p>
                  <ul className="text-xs space-y-1">
                    <li>• Au moins 8 caractères</li>
                    <li>• Mélange de majuscules et minuscules</li>
                    <li>• Au moins un chiffre</li>
                    <li>• Caractères spéciaux recommandés</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-rose text-white hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Mettre à jour le mot de passe
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/auth/signin" 
              className="text-sm text-charcoal/60 hover:text-magenta transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

