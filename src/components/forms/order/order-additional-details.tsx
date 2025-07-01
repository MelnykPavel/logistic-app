import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ClientReadBody } from "@/types/client";
import { UserReadBody } from "@/types/user";
import { WarehouseReadBody } from "@/types/warehouse";

type OrderAdditionalDetailsProps = {
  client?: ClientReadBody | null;
  warehouse?: WarehouseReadBody | null;
  driver?: UserReadBody | null;
  manager?: UserReadBody | null;
};

type InfoSectionProps = {
  title: string;
  value: string;
};

function InfoSection({ title, value }: InfoSectionProps) {
  return (
    <div>
      <span className="font-medium">{title}:</span> {value}
    </div>
  );
}

function Section({
  title,
  value,
  items,
}: {
  title: string;
  value: string;
  items: { label: string; value?: string | null }[];
}) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <Card className="p-4 shadow-md rounded-2xl bg-white">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">
            {items
              .filter(({ value }) => Boolean(value))
              .map(({ label, value }) => (
                <InfoSection key={label} title={label} value={value!} />
              ))}
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function OrderAdditionalDetails({
  client,
  warehouse,
  driver,
  manager,
}: OrderAdditionalDetailsProps) {
  return (
    <div>
      <Accordion type="single" collapsible>
        {client && (
          <Section
            title="Client Information"
            value="client"
            items={[
              { label: "First Name", value: client.firstName },
              { label: "Last Name", value: client.lastName },
              { label: "Email", value: client.email },
              { label: "Phone", value: client.phone },
              { label: "Address", value: client.address },
              { label: "City", value: client.city },
              { label: "State", value: client.state },
              { label: "ZIP Code", value: client.zipCode },
              { label: "Country", value: client.country },
            ]}
          />
        )}
        {warehouse && (
          <Section
            title="Warehouse Information"
            value="warehouse"
            items={[
              { label: "Name", value: warehouse.name },
              { label: "Address", value: warehouse.address },
              { label: "City", value: warehouse.city },
              { label: "State", value: warehouse.state },
              { label: "ZIP Code", value: warehouse.zipCode },
              { label: "Country", value: warehouse.country },
            ]}
          />
        )}
        {driver && (
          <Section
            title="Driver Information"
            value="driver"
            items={[
              { label: "First Name", value: driver.firstName },
              { label: "Last Name", value: driver.lastName },
              { label: "Email", value: driver.email },
            ]}
          />
        )}
        {manager && (
          <Section
            title="Manager Information"
            value="manager"
            items={[
              { label: "First Name", value: manager.firstName },
              { label: "Last Name", value: manager.lastName },
              { label: "Email", value: manager.email },
            ]}
          />
        )}
      </Accordion>
    </div>
  );
}
