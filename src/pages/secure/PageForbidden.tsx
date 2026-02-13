import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PATH_SIGNIN } from "@/lib/links/paths.routes";
import { HomeIcon, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageForbidden() {
  const navigate = useNavigate();
  return (
    <Empty className="h-dvh">
      <EmptyHeader className="gap-1">
        <EmptyMedia className="text-7xl font-bold text-orange-500">
          403
        </EmptyMedia>
        <EmptyTitle className="text-6xl font-bold">Forbidden</EmptyTitle>
        <EmptyDescription className="text-sm">
          You don&apos;t have permission to access this resource.
        </EmptyDescription>
        <EmptyDescription className="text-xs">
          due to insufficient privileges or restricted content.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <ButtonGroup>
          <Button onClick={() => navigate(PATH_SIGNIN)}>
            <LogIn /> Sign In
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <HomeIcon /> Go Home
          </Button>
        </ButtonGroup>
      </EmptyContent>
      <EmptyDescription className="text-sm">
        Need help? <a href="#">Contact support</a>
      </EmptyDescription>
    </Empty>
  );
}
