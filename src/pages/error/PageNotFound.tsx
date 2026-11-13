import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowLeftIcon, HomeIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export function PageNotFound() {
  const navigate = useNavigate()

  return (
    <main className="inset-0 flex h-dvh items-center justify-center">
      <Empty className="max-w-sm">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-red-500">
            404
          </EmptyMedia>
          <EmptyTitle>Not Found</EmptyTitle>
          <EmptyDescription>
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
        </EmptyContent>
        <EmptyDescription>
          Need help?
          <Button
            variant="link"
            className="text-muted-foreground"
            size="sm"
            nativeButton={false}
            render={<Link to="#">Contact support</Link>}
          />
        </EmptyDescription>
      </Empty>
    </main>
  )
}
