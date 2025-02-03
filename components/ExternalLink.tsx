import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = Omit<ComponentProps<typeof TouchableOpacity>, 'onPress'> & {
  href: string;
  children?: React.ReactNode;
};

export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={async () => {
        if (Platform.OS === 'web') {
          window.open(href, '_blank');
        } else {
          await openBrowserAsync(href);
        }
      }}
    >
      <ThemedText type="link">{children}</ThemedText>
    </TouchableOpacity>
  );
}
