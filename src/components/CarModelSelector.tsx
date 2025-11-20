import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usePlateStore } from '@/store/plateStore';
import { carModels } from '@/data/carModels';
import { Car, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const groupedModels = carModels.reduce((acc, model) => {
  const brand = model.name.split(' ')[0];
  if (!acc[brand]) acc[brand] = [];
  acc[brand].push(model);
  return acc;
}, {} as Record<string, typeof carModels>);

export const CarModelSelector = () => {
  const { carModel, setCarModel } = usePlateStore();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedModel = carModels.find(model => model.id === carModel);

  // Filter models based on search query
  const filteredGroupedModels = Object.entries(groupedModels).reduce((acc, [brand, models]) => {
    const filteredModels = models.filter(model =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredModels.length > 0) {
      acc[brand] = filteredModels;
    }
    return acc;
  }, {} as Record<string, typeof carModels>);

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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedModel ? selectedModel.name : "Select a car model..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search car models..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No car model found.</CommandEmpty>
                  {Object.entries(filteredGroupedModels).map(([brand, models]) => (
                    <CommandGroup key={brand} heading={brand}>
                      {models.map((model) => (
                        <CommandItem
                          key={model.id}
                          value={model.id}
                          onSelect={(currentValue) => {
                            setCarModel(currentValue);
                            setOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              carModel === model.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {model.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};
