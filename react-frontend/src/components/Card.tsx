import {FC} from "react";
import {Property} from "../types";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card.tsx";

const PropertyCard: FC<Property> = ({ title, img}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={img} alt={title} />
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
