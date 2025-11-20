import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlateStore } from '@/store/plateStore';
import { countryFormats } from '@/data/countryFormats';
import { AlertCircle } from 'lucide-react';

export const PlateInput = () => {
  const { plateNumber, country, isValid, errorMessage, setPlateNumber, setCountry } = usePlateStore();
  const currentCountry = countryFormats[country];

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
