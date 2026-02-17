"use client";
import CustomInput from "../Forms/CustomInput";
import CustomForm from "../Forms/CustomForm";
import { FieldValues } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useCreateSubscribeMutation } from "@/redux/api/subscribe";
import { toast } from "sonner";

const defaultValues = {
  email: "",
};
export default function SubscribeForm() {
  const [createSubscribe] = useCreateSubscribeMutation();
  const t = useTranslations("Subscribe");

  const handleSubmit = async (data: FieldValues) => {
    const payload = {
      ...data,
    };

    try {
      const result = await createSubscribe(payload).unwrap();

      if (result) {
        toast.success(t("Subscribed Successfully"));
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || t("Something went wrong! Try again.")
      );
    }
  };

  return (
    <div className="w-full min-w-0">
      <CustomForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="w-full"
      >
        <CustomInput
          type="email"
          name="email"
          fieldClassName="h-11"
          placeholder={t("emailPlaceholder")}
          Icon={<CiMail />}
          RightIconWidth={140}
          RightIcon={<Button size="sm" className="h-10 w-full text-[10px] px-1 sm:text-xs sm:px-2 md:text-sm md:px-3">{t("subscribeButton")}</Button>}
        ></CustomInput>
      </CustomForm>
    </div>
  );
}
