import {FC} from "react";
import {Property} from "../types";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";

const PropertyCard: FC<Property> = ({ title, img}) => {
  const randomHue = Math.floor(Math.random() * 360);
  const baseColor = `hsl(${randomHue}, 75%, 65%)`;
  const secondaryColor = `hsl(${randomHue}, 50%, 85%)`;

  const getGradient = (mainColor: string, secondaryColor: string) => {
    return `linear-gradient(320deg, ${mainColor} 3%, ${secondaryColor} 20%, rgba(238, 130, 238, 0) 45%)`;
  }

  return (
    <Card style={{ background: getGradient(baseColor, secondaryColor)}}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={img} alt={title} />
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
