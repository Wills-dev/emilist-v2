"use client";

import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { deleteBusinessImage } from "@/features/businesses/api/deleteBusiness";
import { businessKeys } from "@/features/businesses/queries/businessKeys";
import type { UserExpertService } from "../types/expertService";

export interface ServicePhotosProps {
  expert: UserExpertService;
  onUpdate: (expert: UserExpertService) => void;
  onSave: (expert: UserExpertService) => void;
}

export const useServicePhotos = ({ expert, onUpdate, onSave }: ServicePhotosProps) => {
  const [editing, setEditing] = useState(false);
  const [uploads, setUploads] = useState<Array<{ file: File; url: string }>>([]);
  const urls = useRef(new Set<string>());
  const deleting = useRef(false);
  const queryClient = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  useEffect(() => {
    const activeUrls = urls.current;
    return () => { activeUrls.forEach((url) => URL.revokeObjectURL(url)); activeUrls.clear(); };
  }, []);
  const mutation = useMutation({
    mutationFn: deleteBusinessImage,
    onSuccess: async (_, { imageId }) => {
      const keep = expert.businessImages.map((url, index) => ({ url, id: expert.businessImageIds?.[index] })).filter((image) => image.id !== imageId);
      onUpdate({ ...expert, businessImages: keep.map((image) => image.url), businessImageIds: keep.map((image) => image.id) });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-businesses", userId] }),
        queryClient.invalidateQueries({ queryKey: businessKeys.all }),
      ]);
      toast.success("Business photo deleted.");
    },
    onError: promiseErrorFunction,
    onSettled: () => { deleting.current = false; },
  });
  const toggleEditing = () => {
    if (deleting.current) return;
    if (editing && uploads.length) {
      onSave({ ...expert, businessImageFiles: uploads.map((upload) => upload.file) });
      setUploads([]);
    }
    setEditing(!editing);
  };
  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    if (deleting.current) return;
    const index = Number(event.currentTarget.dataset.index);
    if (index < expert.businessImages.length) {
      const imageId = expert.businessImageIds?.[index];
      if (!imageId) { toast.error("This image has no ID. Refresh your business details before trying again."); return; }
      deleting.current = true;
      mutation.mutate({ businessId: expert.id, imageId });
      return;
    }
    const uploadIndex = index - expert.businessImages.length;
    const upload = uploads[uploadIndex];
    if (!upload) return;
    URL.revokeObjectURL(upload.url);
    urls.current.delete(upload.url);
    setUploads((items) => items.filter((_, itemIndex) => itemIndex !== uploadIndex));
  };
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const additions = Array.from(event.target.files ?? []).map((file) => {
      const url = URL.createObjectURL(file);
      urls.current.add(url);
      return { file, url };
    });
    setUploads((items) => [...items, ...additions]);
    event.target.value = "";
  };
  return { editing, busy: mutation.isPending, images: [...expert.businessImages, ...uploads.map((upload) => upload.url)], toggleEditing, handleRemove, handleFiles };
};
