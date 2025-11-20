import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePlateStore } from '@/store/plateStore';
import { Download, Camera, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hexInput, setHexInput] = useState(carColor);

  const handleColorChange = (color: string) => {
    setCarColor(color);
    setHexInput(color);
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setCarColor(value);
    }
  };

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
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Customization
        </CardTitle>
        <CardDescription>Customize your car appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Quick Colors</Label>
          <div className="grid grid-cols-4 gap-2">
            {carColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
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

        <div className="space-y-3">
          <Label>Custom Color</Label>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <div
              className="w-6 h-6 rounded border-2 border-border mr-2"
              style={{ backgroundColor: carColor }}
            />
            {showColorPicker ? 'Hide' : 'Show'} Color Picker
          </Button>
          
          {showColorPicker && (
            <div className="space-y-3 p-4 border rounded-lg bg-card">
              <HexColorPicker color={carColor} onChange={handleColorChange} className="w-full" />
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Hex Code</Label>
                  <Input
                    value={hexInput}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    placeholder="#FF0000"
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
          )}
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
