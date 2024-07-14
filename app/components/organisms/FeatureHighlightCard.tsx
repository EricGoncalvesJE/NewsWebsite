import Heading from "../atoms/Heading";

interface FeatureHighlightCardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureHighlightCard = ({
  title,
  description,
  image,
}: FeatureHighlightCardProps) => {
  return (
    <div className="flex justify-center px-4 lg:px-16">
      <div>
        <div className="group relative">
          <div className="mx-auto mb-4 w-64 overflow-hidden rounded-full">
            <img
              className=" h-64 w-64 object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
              src={image}
              alt={title}
            />
          </div>
          <div className="bg-primary-light absolute inset-0 mx-auto h-full rounded-full mix-blend-multiply lg:w-64" />
        </div>

        <Heading level="h3" isCentred>
          {title}
        </Heading>
        <p className="text-primary-light hidden text-center leading-relaxed tracking-wide  lg:block">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlightCard;
