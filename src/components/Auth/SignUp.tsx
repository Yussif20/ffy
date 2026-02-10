"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useSignUpMutation } from "@/redux/api/userApi";
import { Eye, EyeClosed, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../Forms/CustomForm";
import CustomInput from "../Forms/CustomInput";
import AuthContainer from "./AuthContainer";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const t = useTranslations("Auth.SignUp");
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [consentToMarketing, setConsentToMarketing] = useState(false);

  const handleSubmit = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t("errors.passwordMismatch"));
      return;
    }

    if (!agreeToTerms) {
      toast.error(t("errors.agreeTerms"));
      return;
    }

    const formData = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isAggradedToTermsAndPolicies: agreeToTerms,
    };

    const toastId = toast.loading(t("toast.loading"));
    try {
      await signUp(formData).unwrap();
      toast.success(t("toast.success"), { id: toastId });
      router.push(`/auth/check-email?email=${data.email}`);
    } catch (error: any) {
      toast.error(error?.data?.message || t("toast.error"), { id: toastId });
    }
  };

  return (
    <AuthContainer
      className="max-w-2xl"
      title={t("title")}
      subtitle={t("subtitle")}>
      <CustomForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-6">
        <div className="space-y-4">
          <CustomInput
            required
            name="fullName"
            type="text"
            label={t("fields.fullName.label")}
            placeholder={t("fields.fullName.placeholder")}
            Icon={<User size={16} />}
            disabled={isLoading}
          />

          <CustomInput
            required
            name="email"
            type="email"
            label={t("fields.email.label")}
            placeholder={t("fields.email.placeholder")}
            Icon={<Mail size={16} />}
            disabled={isLoading}
          />

          <CustomInput
            name="phoneNumber"
            type="text"
            label={t("fields.phone.label")}
            placeholder={t("fields.phone.placeholder")}
            Icon={<Phone size={16} />}
            disabled={isLoading}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              required
              name="password"
              type={showPassword ? "text" : "password"}
              label={t("fields.password.label")}
              placeholder={t("fields.password.placeholder")}
              RightIcon={
                showPassword ? <Eye size={16} /> : <EyeClosed size={16} />
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            />
            <CustomInput
              required
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label={t("fields.confirmPassword.label")}
              placeholder={t("fields.confirmPassword.placeholder")}
              RightIcon={
                showConfirmPassword ? (
                  <Eye size={16} />
                ) : (
                  <EyeClosed size={16} />
                )
              }
              onRightIconClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-foreground/80">
              {t("checkboxes.agreeTerms1")}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {t("checkboxes.terms")}
              </Link>{" "}
              {t("checkboxes.and")}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {t("checkboxes.privacy")}
              </Link>
              .
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="marketing"
              checked={consentToMarketing}
              onChange={(e) => setConsentToMarketing(e.target.checked)}
              disabled={isLoading}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="marketing" className="text-sm text-foreground/80">
              {t("checkboxes.marketing")}
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? t("submit.loading") : t("submit.default")}
        </Button>

        <div className="text-center">
          <p className="text-sm text-foreground/80">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/auth/sign-in">
              <Button
                variant="link"
                className="px-0 text-sm text-primary"
                disabled={isLoading}>
                {t("signInLink")}
              </Button>
            </Link>
          </p>
        </div>
      </CustomForm>
    </AuthContainer>
  );
}
