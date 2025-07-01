import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appRoutes } from "@/utils/appRoutes";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist.
          </p>
          <Button asChild>
            <Link href={appRoutes.root}>Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
