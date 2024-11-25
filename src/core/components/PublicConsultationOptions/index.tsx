import React, { useState } from 'react';
import { RadioGroup } from '@radix-ui/react-radio-group'; // Importar o RadioGroup do Radix UI, se necessário
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

const PublicConsultationOptions = () => {
  const [selectedOption, setSelectedOption] = useState('default');
  const [otherCategory, setOtherCategory] = useState('');

  const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherCategory(event.target.value);
  };

  const onValueChange = (value: string) => {
    setSelectedOption(value);
  } 

  return (
    <div className="flex flex-col space-y-4">
      <RadioGroup name="category" className="flex text-brand-primary flex-col gap-2" value={selectedOption} onValueChange={onValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public_health" id="r1" />
          <Label htmlFor="r1">Saúde</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="education" id="r2" />
          <Label htmlFor="r2">Educação</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="environment" id="r3" />
          <Label htmlFor="r3">Meio Ambiente</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="r4" />
          <Label htmlFor="r4">Outros</Label>
        </div>
      </RadioGroup>

      {selectedOption === 'other' && (
        <div className="mt-2">
          <Input
            name="category"
            type="text"
            placeholder="Especifique"
            value={otherCategory}
            onChange={handleOtherInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default PublicConsultationOptions;
