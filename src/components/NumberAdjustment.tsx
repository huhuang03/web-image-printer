import {Button} from '@/components/ui/button.tsx';
import {Minus, Plus} from 'lucide-react';

interface NumberAdjustmentProps {
  name: string;
}

export function NumberAdjustment(props: NumberAdjustmentProps) {
  return (
    <div>
      {props.name}
      <Button><Plus /></Button>
      <Button><Minus /></Button>
    </div>
  )
}
