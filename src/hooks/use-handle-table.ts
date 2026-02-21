import * as React from "react";
import type { HandleStateReturn } from "@/contract/table.dto";

export function useHandleState(persistenceKey?: string): HandleStateReturn {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  // const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  // const [isDeleteManyOpen, setIsDeleteManyOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [viewingId, setViewingId] = React.useState<string | null>(null);

  const handleEdit = React.useCallback(
    (id: string) => {
      setEditingId(id);
      setIsEditOpen(true);
    },
    [setIsEditOpen, setEditingId],
  );

  const handleViewDone = React.useCallback(
    (id: string) => {
      setViewingId(id);
      setIsViewOpen(true);
    },
    [setIsViewOpen, setViewingId],
  );

  const handleDeleteDone = React.useCallback(
    (id: string) => {
      setIsDeleteOpen(true);
      setDeletingId(id);
    },
    [setIsDeleteOpen, setDeletingId],
  );

  const tableStateOptions = React.useMemo(
    () => ({
      initialPageSize: 5,
      persistenceKey,
      onDelete: handleDeleteDone,
      onView: handleViewDone,
      onEdit: handleEdit,
    }),
    [handleDeleteDone, handleViewDone, handleEdit, persistenceKey],
  );

  return {
    editingId,
    isEditOpen,
    deletingId,
    isDeleteOpen,
    isViewOpen,
    viewingId,
    setIsEditOpen,
    setIsDeleteOpen,
    setIsViewOpen,
    tableStateOptions,
  };
}
