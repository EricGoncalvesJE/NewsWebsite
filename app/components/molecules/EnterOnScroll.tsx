import { useParallax } from "react-scroll-parallax";

interface EnterOnScrollProps {
  children: React.ReactNode;
  right?: boolean;
}

const EnterOnScroll = ({ children, right = false }: EnterOnScrollProps) => {
  const entryMovement = useParallax<HTMLDivElement>({
    translateX: right ? ["200px", "0px"] : ["-200px", "0px"],
    opacity: [0, 1],
    rootMargin: {
      top: 0,
      right: 0,
      bottom: -700,
      left: 0,
    },
  });

  return <div ref={entryMovement.ref}>{children}</div>;
};

export default EnterOnScroll;
