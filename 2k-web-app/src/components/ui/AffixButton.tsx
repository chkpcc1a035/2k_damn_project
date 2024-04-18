"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, ActionIcon, Transition, rem } from "@mantine/core";

export function AffixButton() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              size={"xl"}
              radius={"xl"}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
