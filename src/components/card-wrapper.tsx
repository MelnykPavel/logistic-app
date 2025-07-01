import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type cardProp = {
  title: string;
  children: ReactNode;
};

export default function CardWrapper({ title, children }: cardProp) {
  return (
    <div className="row-start-2 flex flex-col justify-center md:items-center gap-8 sm:items-start grow">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
