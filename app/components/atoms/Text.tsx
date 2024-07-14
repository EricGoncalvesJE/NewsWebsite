interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return (
    <p className="text-primary-light pb-4 text-lg leading-relaxed tracking-wide lg:pb-8 lg:text-xl lg:leading-loose">
      {children}
    </p>
  );
};

export default Text;
