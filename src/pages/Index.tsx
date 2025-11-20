import { CarViewer } from '@/components/CarViewer';
import { PlateInput } from '@/components/PlateInput';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { CarModelSelector } from '@/components/CarModelSelector';
import { Car } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">License Plate Preview</h1>
              <p className="text-sm text-muted-foreground">Visualize custom plates on 3D car models</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Plate Input & Model Selector */}
          <div className="lg:col-span-3 h-full overflow-auto space-y-4">
            <PlateInput />
            <CarModelSelector />
          </div>

          {/* Center Panel - 3D Viewer */}
          <div className="lg:col-span-6 h-full">
            <CarViewer />
          </div>

          {/* Right Panel - Customization */}
          <div className="lg:col-span-3 h-full overflow-auto">
            <CustomizationPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
