import {
  Box,
  ArrowLeft
} from 'lucide-react-native';
import type { LucideProps } from 'lucide-react-native';


const iconMap = {
  Box,
  ArrowLeft
} as const;

type IconName = keyof typeof iconMap;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    if (__DEV__) {
      console.warn(`Icon "${name}" is not in the iconMap.`);
    }
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;