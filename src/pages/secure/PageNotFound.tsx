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
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Empty className="h-dvh">
      <EmptyHeader className="gap-1">
        <EmptyMedia className="text-7xl font-bold text-red-700">404</EmptyMedia>
        <EmptyTitle className="text-6xl font-bold">Not Found !</EmptyTitle>
        <EmptyDescription className="text-sm">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ButtonGroup>
          <Button onClick={() => navigate("/")}>
            <HomeIcon /> Go Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftIcon /> Go Back
          </Button>
        </ButtonGroup>
        <EmptyDescription className="text-sm">
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
