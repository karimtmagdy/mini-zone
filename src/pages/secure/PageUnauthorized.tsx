import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function PageUnauthorized() {
  return (
    <Empty className="h-dvh border border-dashed">
      <EmptyHeader>
        <EmptyMedia className="text-7xl font-bold">401</EmptyMedia>
        <EmptyTitle className="text-6xl font-bold">Unauthorized</EmptyTitle>
        <EmptyDescription className="text-sm">
          You&apos;re not authorized to access this page. Please log in to
          continue.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Go to Login
        </Button>
      </EmptyContent>
    </Empty>
  );
}
