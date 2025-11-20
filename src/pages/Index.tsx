import { CarViewer } from '@/components/CarViewer';
import { PlateInput } from '@/components/PlateInput';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { Car } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Panel - Tabs for Plate Input & Customization */}
          <div className="lg:col-span-4">
            <Tabs defaultValue="plate-details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plate-details">Plate Details</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              <TabsContent value="plate-details">
                <PlateInput />
              </TabsContent>
              <TabsContent value="appearance">
                <CustomizationPanel />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - 3D Viewer */}
          <div className="lg:col-span-8 h-full">
            <CarViewer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
