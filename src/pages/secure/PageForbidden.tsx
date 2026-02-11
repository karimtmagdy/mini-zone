import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function PageForbidden() {
  return (
    <Empty className="h-dvh">
      <EmptyHeader>
        <EmptyMedia className="text-7xl font-bold">403</EmptyMedia>
        <EmptyTitle className="text-6xl font-bold">Forbidden</EmptyTitle>
        <EmptyDescription className="text-sm">
          You don&apos;t have permission to access this page. Please log in to
          continue.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </EmptyContent>
      <EmptyDescription className="text-sm">
        Need help? <a href="#">Contact support</a>
      </EmptyDescription>
    </Empty>
  );
}
