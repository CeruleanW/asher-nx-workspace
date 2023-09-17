//@ts-nocheck
import { Text } from '@nextui-org/react';

export function Title() {
  return (
    <>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $purple500 -20%, $pink500 100%'
        }}
        weight="bold"
        className={`text-center p-5 pb-0 w-full lg:mt-5`}
      >
        Projects
      </Text>
    </>
  )
}
