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
import { PATH_SIGNIN, PATH_SIGNUP } from "@/lib/links/paths.routes";
import { HomeIcon, LogInIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PageUnauthorized() {
  const navigate = useNavigate();
  return (
    <Empty className="h-dvh">
      <EmptyHeader className="gap-1">
        <EmptyMedia className="text-7xl font-bold text-red-700">401</EmptyMedia>
        <EmptyTitle className="text-6xl font-bold">Unauthorized</EmptyTitle>
        <EmptyDescription className="text-sm">
          You need to authenticate to access this page.
        </EmptyDescription>
        <EmptyDescription className="text-muted-foreground text-xs">
          Please authenticate to continue.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ButtonGroup>
          <Button onClick={() => navigate(PATH_SIGNIN)}>
            <LogInIcon /> Sign In
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <HomeIcon /> Return Home
          </Button>
        </ButtonGroup>
        <EmptyDescription className="text-sm">
          <br />
          Don&apos;t have an account? <Link to={PATH_SIGNUP}>Sign up</Link> to
          get started.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
