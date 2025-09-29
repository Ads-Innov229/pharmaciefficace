/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Download, Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QRCodeGeneratorProps {
  surveyId: string;
  surveyTitle: string;
  baseUrl?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  surveyId,
  surveyTitle,
  baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
}) => {
  const [size, setSize] = useState<number>(256);
  const [qrValue, setQrValue] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Initialiser la valeur du QR code après le montage du composant
  useEffect(() => {
    setQrValue(`${baseUrl}/survey/${surveyId}`);
    setIsLoading(false);
  }, [baseUrl, surveyId]);

  // Options de taille pour le QR code
  const sizeOptions = [
    { value: '128', label: '128x128' },
    { value: '256', label: '256x256' },
    { value: '384', label: '384x384' },
    { value: '512', label: '512x512' },
  ];

  // Générer une URL de QR code avec les paramètres
  const qrCodeUrl = useMemo(() => {
    if (!qrValue) return '';
    const params = new URLSearchParams({
      size: `${size}x${size}`,
      data: qrValue,
    });
    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }, [size, qrValue]);

  // Vérifier que l'image est valide
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
    setError('Impossible de charger le QR code. Veuillez réessayer.');
  };

  // Réinitialiser l'erreur d'image lors du changement d'URL
  useEffect(() => {
    setImageError(false);
  }, [qrCodeUrl]);

  // Copier le lien du sondage dans le presse-papier
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrValue)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error('Erreur lors de la copie dans le presse-papier:', err);
          // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
          const textArea = document.createElement('textarea');
          textArea.value = qrValue;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            setIsCopied(true);
          } catch (err) {
            console.error('Fallback: Erreur lors de la copie dans le presse-papier', err);
          }
          document.body.removeChild(textArea);
        });
      showToast('Lien copié dans le presse-papier', 'success');
      
      // Réinitialiser l'état après 2 secondes
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      showToast('Impossible de copier le lien', 'error');
      console.error('Failed to copy:', err);
    }
  };

  // Télécharger le QR code
  const downloadQRCode = () => {
    setIsLoading(true);
    
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${surveyTitle.toLowerCase().replace(/\s+/g, '-')}-${size}x${size}.png`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsLoading(false);
    showToast('Téléchargement du QR code démarré', 'success');
  };

  // Générer un nouveau QR code
  const refreshQRCode = () => {
    setIsLoading(true);
    // Simuler un rechargement
    setTimeout(() => {
      setIsLoading(false);
      showToast('QR code actualisé', 'success');
    }, 500);
  };

  // Mettre à jour la fonction de gestion du changement de sélection
  const handleSizeChange = (value: string) => {
    setSize(parseInt(value));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Générer un QR Code</CardTitle>
        <CardDescription>
          Personnalisez et téléchargez le QR Code pour votre sondage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="survey-url">URL du sondage</Label>
          <Input
            id="survey-url"
            value={qrValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQrValue(e.target.value)}
            placeholder="https://exemple.com/sondage"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="qr-size">Taille du QR Code</Label>
          <Select 
            value={size.toString()} 
            onValueChange={handleSizeChange}
            disabled={isLoading}
          >
            <SelectTrigger id="qr-size">
              <SelectValue placeholder="Sélectionnez une taille" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-center">
          <div 
            ref={qrCodeRef}
            className="p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-center"
            style={{ width: size + 32, height: size + 32 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : error || imageError ? (
              <div className="text-center p-4 text-red-500">
                <p>Erreur de chargement du QR Code</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => {
                    setError(null);
                    setImageError(false);
                    refreshQRCode();
                  }}
                >
                  Réessayer
                </Button>
              </div>
            ) : (
              <img 
                src={qrCodeUrl} 
                alt={`QR Code pour le sondage: ${surveyTitle}`}
                className="w-full h-auto"
                onError={handleImageError}
                onLoad={() => setError(null)}
              />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={() => void copyToClipboard()}
            disabled={isLoading}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="pt-2">
          <Button 
            className="w-full" 
            onClick={downloadQRCode}
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger le QR Code
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 border-t">
        <div className="text-sm text-gray-500">
          <p>Conseil : Utilisez une taille plus grande pour une meilleure qualité d'impression.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
