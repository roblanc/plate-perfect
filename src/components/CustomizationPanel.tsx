import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePlateStore } from '@/store/plateStore';
import { Download, Camera } from 'lucide-react';
import { toast } from 'sonner';

const carColors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0066CC' },
  { name: 'Black', value: '#1a1a1a' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Green', value: '#006400' },
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Orange', value: '#FF6600' },
];

export const CustomizationPanel = () => {
  const { carColor, setCarColor } = usePlateStore();

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      toast.error('Canvas not found');
      return;
    }

    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Failed to create screenshot');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `license-plate-preview-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast.success('Screenshot saved successfully!');
      });
    } catch (error) {
      toast.error('Failed to capture screenshot');
      console.error(error);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customization</CardTitle>
        <CardDescription>Customize your car appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Car Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {carColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setCarColor(color.value)}
                className={`
                  h-12 rounded-md border-2 transition-all
                  ${carColor === color.value ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border hover:border-primary/50'}
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              >
                {color.value === '#FFFFFF' && (
                  <span className="text-xs text-foreground opacity-50">{color.name[0]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button 
            onClick={handleScreenshot} 
            className="w-full"
            variant="default"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Screenshot
          </Button>
          
          <Button 
            onClick={handleScreenshot} 
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Image
          </Button>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-sm font-medium">Camera Controls</Label>
          <div className="mt-2 text-sm text-muted-foreground space-y-1">
            <p>• Click and drag to rotate</p>
            <p>• Scroll to zoom in/out</p>
            <p>• Right-click drag to pan</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
