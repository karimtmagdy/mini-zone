import * as React from "react";

type ModalType = "delete" | "view" | "edit" | null;

export function useEntityModal() {
  const [modal, setModal] = React.useState<{
    type: ModalType;
    id: string | null;
  }>({
    type: null,
    id: null,
  });

  const open = (type: Exclude<ModalType, null>, id: string) => {
    setModal({ type, id });
  };

  const close = () => {
    setModal({ type: null, id: null });
  };

  return {
    modal,
    open,
    close,
    isOpen: (type: Exclude<ModalType, null>) => modal.type === type,
  };
}
interface EntityModalsProps<T> {
  modal: {
    type: ModalType;
    id: string | null;
  };
  close: () => void;
  data?: T;

  DeleteComponent?: React.ComponentType<any>;
  ViewComponent?: React.ComponentType<any>;
  EditComponent?: React.ComponentType<any>;
}

export function EntityModals<T>({
  modal,
  close,
  data,
  DeleteComponent,
  ViewComponent,
  EditComponent,
}: EntityModalsProps<T>) {
  return (
    <>
      {DeleteComponent && (
        <DeleteComponent
          id={modal.id}
          open={modal.type === "delete"}
          onOpenChange={close}
        />
      )}

      {ViewComponent && (
        <ViewComponent
          id={modal.id}
          open={modal.type === "view"}
          onOpenChange={close}
          data={data}
        />
      )}

      {EditComponent && (
        <EditComponent
          id={modal.id}
          open={modal.type === "edit"}
          onOpenChange={close}
          data={data}
        />
      )}
    </>
  );
}
