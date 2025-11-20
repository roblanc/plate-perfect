import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usePlateStore } from '@/store/plateStore';
import { countryFormats } from '@/data/countryFormats';
import { carModels } from '@/data/carModels';
import { AlertCircle, Car, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const groupedModels = carModels.reduce((acc, model) => {
  const brand = model.name.split(' ')[0];
  if (!acc[brand]) acc[brand] = [];
  acc[brand].push(model);
  return acc;
}, {} as Record<string, typeof carModels>);

export const PlateInput = () => {
  const { plateNumber, country, isValid, errorMessage, setPlateNumber, setCountry, carModel, setCarModel } = usePlateStore();
  const currentCountry = countryFormats[country];

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>License Plate Details</CardTitle>
        <CardDescription>Enter your custom plate number and select country</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(countryFormats).map((format) => (
                <SelectItem key={format.code} value={format.code}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentCountry && (
            <p className="text-sm text-muted-foreground">{currentCountry.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="plateNumber">Plate Number</Label>
          <Input
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
            placeholder={currentCountry?.format || "Enter plate number"}
            maxLength={currentCountry?.maxLength || 10}
            className={!isValid ? "border-destructive" : ""}
          />
          {currentCountry && (
            <p className="text-xs text-muted-foreground">
              Format: {currentCountry.format} (max {currentCountry.maxLength} chars)
            </p>
          )}
        </div>

        {!isValid && errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Car Model Selector Section */}
        <div className="pt-4 border-t space-y-2">
          <Label className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Car Model
          </Label>
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

        {currentCountry && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium">Examples:</Label>
            <div className="mt-2 space-y-1">
              {currentCountry.examples.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setPlateNumber(example)}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors font-mono"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
