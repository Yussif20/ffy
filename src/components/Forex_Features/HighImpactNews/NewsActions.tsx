"use client";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInput from "@/components/Forms/CustomInput";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { News } from "@/types/newsType";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} from "@/redux/api/newsApi";
import { formatISOToCustom } from "@/utils/formatISOToCustom";
import CustomComboBoxMultiple from "@/components/Forms/CustomComboBoxMultiple";
import { countries } from "@/data";

export function EditNews({
  news,
  children,
}: {
  news: News;
  children: React.ReactNode;
}) {
  const t = useTranslations("HighImpactNews");
  const [updateNewsAction] = useUpdateNewsMutation();

  const role = useAppSelector(useCurrentUser)?.role;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (role !== "SUPER_ADMIN") return null;

  const defaultValues = {
    dateAndTime: formatISOToCustom(news.dateAndTime),
    currency: news.currency,
    title: news.title,
    titleArabic: news.titleArabic,
  };

  const handleSubmit = async (data: FieldValues) => {
    startTransition(async () => {
      const payload = {
        dateAndTime: data?.dateAndTime
          ? new Date(data?.dateAndTime).toISOString()
          : null,
        currency: data.currency,
        title: data.title,
        titleArabic: data.titleArabic,
      };
      const toastId = toast.loading("News Updating...");
      try {
        await updateNewsAction({
          newsId: news.id!,
          data: payload,
        }).unwrap();

        toast.success("News updated successfully", { id: toastId });
        setIsDialogOpen(false);
      } catch (error) {
        toast.error("Failed to update news", { id: toastId });
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("editNews")}</DialogTitle>
          <DialogDescription>{t("fillNewsDetails")}</DialogDescription>
        </DialogHeader>
        <CustomForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          className="space-y-4"
        >
          <CustomInput
            type="datetime-local"
            name="dateAndTime"
            label={t("dateAndTime")}
            required
            fieldClassName="h-11"
          />
          <CustomComboBoxMultiple
            name="currency"
            mode="single"
            label={t("currency")}
            placeholder={t("currencyPlaceholder")}
            options={countries.map((country) => ({
              value: country.currency,
              name: country.currency,
              image: country?.flag,
            }))}
            required
          />
          <CustomInput
            type="text"
            name="title"
            label={t("title")}
            placeholder={t("titlePlaceholder")}
            required
            fieldClassName="h-11"
          />
          <CustomInput
            type="text"
            name="titleArabic"
            label={t("titleArabic")}
            placeholder={t("titleArabicPlaceholder")}
            required
            fieldClassName="h-11"
          />
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline2"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? t("updating") : t("update")}
            </Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteNews({
  news,
  children,
}: {
  news: News;
  children: React.ReactNode;
}) {
  const t = useTranslations("HighImpactNews");
  const role = useAppSelector(useCurrentUser)?.role;
  const [deleteNewsAction] = useDeleteNewsMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (role !== "SUPER_ADMIN") return null;

  const handleDeleteConfirm = async () => {
    const toastId = toast.loading("Deleting...");

    startTransition(async () => {
      try {
        await deleteNewsAction(news.id!).unwrap();
        toast.success("News deleted successfully", { id: toastId });
        setIsDeleteDialogOpen(false);
      } catch (error) {
        toast.error("Failed to delete news", { id: toastId });
      }
    });
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("deleteConfirm")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? t("deleting") : t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AddNews({ children }: { children: React.ReactNode }) {
  const t = useTranslations("HighImpactNews");
  const [createNewsAction] = useCreateNewsMutation();

  const role = useAppSelector(useCurrentUser)?.role;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (role !== "SUPER_ADMIN") return null;

  const defaultValues = {
    dateAndTime: "",
    currency: "",
    title: "",
    titleArabic: "",
  };

  const handleSubmit = async (data: FieldValues) => {
    startTransition(async () => {
      const payload = {
        dateAndTime: data?.dateAndTime
          ? new Date(data?.dateAndTime).toISOString()
          : null,
        currency: data.currency,
        title: data.title,
        titleArabic: data.titleArabic,
      };
      const toastId = toast.loading("Creating news...");
      try {
        await createNewsAction(payload).unwrap();

        toast.success("News created successfully", { id: toastId });
        setIsDialogOpen(false);
      } catch (error) {
        toast.error("Failed to create news", { id: toastId });
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("addNews")}</DialogTitle>
          <DialogDescription>{t("fillNewsDetails")}</DialogDescription>
        </DialogHeader>
        <CustomForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          className="space-y-4"
        >
          <CustomInput
            type="datetime-local"
            name="dateAndTime"
            label={t("dateAndTime")}
            required
            fieldClassName="h-11"
          />
          <CustomComboBoxMultiple
            name="currency"
            mode="single"
            label={t("currency")}
            placeholder={t("currencyPlaceholder")}
            options={countries.map((country) => ({
              value: country.currency,
              name: country.currency,
              image: country?.flag,
            }))}
            required
          />
          <CustomInput
            type="text"
            name="title"
            label={t("title")}
            placeholder={t("titlePlaceholder")}
            required
            fieldClassName="h-11"
          />
          <CustomInput
            type="text"
            name="titleArabic"
            label={t("titleArabic")}
            placeholder={t("titleArabicPlaceholder")}
            required
            fieldClassName="h-11"
          />
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline2"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? t("creating") : t("create")}
            </Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
}
