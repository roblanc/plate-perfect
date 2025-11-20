import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlateStore } from '@/store/plateStore';
import { carModels } from '@/data/carModels';
import { Car } from 'lucide-react';

const groupedModels = carModels.reduce((acc, model) => {
  const brand = model.name.split(' ')[0];
  if (!acc[brand]) acc[brand] = [];
  acc[brand].push(model);
  return acc;
}, {} as Record<string, typeof carModels>);

export const CarModelSelector = () => {
  const { carModel, setCarModel } = usePlateStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Car Model
        </CardTitle>
        <CardDescription>Select your vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Model</Label>
          <Select value={carModel} onValueChange={setCarModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select a car model" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {Object.entries(groupedModels).map(([brand, models]) => (
                <SelectGroup key={brand}>
                  <SelectLabel>{brand}</SelectLabel>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
