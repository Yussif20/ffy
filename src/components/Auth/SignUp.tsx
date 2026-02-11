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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const countryCodes = [
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", country: "Albania", flag: "🇦🇱" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+1684", country: "American Samoa", flag: "🇦🇸" },
  { code: "+376", country: "Andorra", flag: "🇦🇩" },
  { code: "+244", country: "Angola", flag: "🇦🇴" },
  { code: "+1264", country: "Anguilla", flag: "🇦🇮" },
  { code: "+672", country: "Antarctica", flag: "🇦🇶" },
  { code: "+1268", country: "Antigua and Barbuda", flag: "🇦🇬" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+374", country: "Armenia", flag: "🇦🇲" },
  { code: "+297", country: "Aruba", flag: "🇦🇼" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
  { code: "+1242", country: "Bahamas", flag: "🇧🇸" },
  { code: "+973", country: "البحرين", flag: "🇧🇭" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+1246", country: "Barbados", flag: "🇧🇧" },
  { code: "+375", country: "Belarus", flag: "🇧🇾" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+501", country: "Belize", flag: "🇧🇿" },
  { code: "+229", country: "Benin", flag: "🇧🇯" },
  { code: "+1441", country: "Bermuda", flag: "🇧🇲" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴" },
  { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" },
  { code: "+673", country: "Brunei", flag: "🇧🇳" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
  { code: "+257", country: "Burundi", flag: "🇧🇮" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲" },
  { code: "+1", country: "Canada/USA", flag: "🇨🇦" },
  { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
  { code: "+1345", country: "Cayman Islands", flag: "🇰🇾" },
  { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
  { code: "+235", country: "Chad", flag: "🇹🇩" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+61", country: "Christmas Island", flag: "🇨🇽" },
  { code: "+61", country: "Cocos Islands", flag: "🇨🇨" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+269", country: "Comoros", flag: "🇰🇲" },
  { code: "+242", country: "Congo", flag: "🇨🇬" },
  { code: "+243", country: "Congo (DRC)", flag: "🇨🇩" },
  { code: "+682", country: "Cook Islands", flag: "🇨🇰" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+53", country: "Cuba", flag: "🇨🇺" },
  { code: "+599", country: "Curaçao", flag: "🇨🇼" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+253", country: "Djibouti", flag: "🇩🇯" },
  { code: "+1767", country: "Dominica", flag: "🇩🇲" },
  { code: "+1809", country: "Dominican Republic", flag: "🇩🇴" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+20", country: "مصر", flag: "🇪🇬" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+291", country: "Eritrea", flag: "🇪🇷" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+500", country: "Falkland Islands", flag: "🇫🇰" },
  { code: "+298", country: "Faroe Islands", flag: "🇫🇴" },
  { code: "+679", country: "Fiji", flag: "🇫🇯" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+594", country: "French Guiana", flag: "🇬🇫" },
  { code: "+689", country: "French Polynesia", flag: "🇵🇫" },
  { code: "+241", country: "Gabon", flag: "🇬🇦" },
  { code: "+220", country: "Gambia", flag: "🇬🇲" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+299", country: "Greenland", flag: "🇬🇱" },
  { code: "+1473", country: "Grenada", flag: "🇬🇩" },
  { code: "+590", country: "Guadeloupe", flag: "🇬🇵" },
  { code: "+1671", country: "Guam", flag: "🇬🇺" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+224", country: "Guinea", flag: "🇬🇳" },
  { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+592", country: "Guyana", flag: "🇬🇾" },
  { code: "+509", country: "Haiti", flag: "🇭🇹" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+354", country: "Iceland", flag: "🇮🇸" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "العراق", flag: "🇮🇶" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+1876", country: "Jamaica", flag: "🇯🇲" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+962", country: "الأردن", flag: "🇯🇴" },
  { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+686", country: "Kiribati", flag: "🇰🇮" },
  { code: "+383", country: "Kosovo", flag: "🇽🇰" },
  { code: "+965", country: "الكويت", flag: "🇰🇼" },
  { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+961", country: "لبنان", flag: "🇱🇧" },
  { code: "+266", country: "Lesotho", flag: "🇱🇸" },
  { code: "+231", country: "Liberia", flag: "🇱🇷" },
  { code: "+218", country: "Libya", flag: "🇱🇾" },
  { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+389", country: "North Macedonia", flag: "🇲🇰" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬" },
  { code: "+265", country: "Malawi", flag: "🇲🇼" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+356", country: "Malta", flag: "🇲🇹" },
  { code: "+692", country: "Marshall Islands", flag: "🇲🇭" },
  { code: "+596", country: "Martinique", flag: "🇲🇶" },
  { code: "+222", country: "Mauritania", flag: "🇲🇷" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺" },
  { code: "+262", country: "Mayotte", flag: "🇾🇹" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+691", country: "Micronesia", flag: "🇫🇲" },
  { code: "+373", country: "Moldova", flag: "🇲🇩" },
  { code: "+377", country: "Monaco", flag: "🇲🇨" },
  { code: "+976", country: "Mongolia", flag: "🇲🇳" },
  { code: "+382", country: "Montenegro", flag: "🇲🇪" },
  { code: "+1664", country: "Montserrat", flag: "🇲🇸" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+258", country: "Mozambique", flag: "🇲🇿" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+674", country: "Nauru", flag: "🇳🇷" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+687", country: "New Caledonia", flag: "🇳🇨" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+227", country: "Niger", flag: "🇳🇪" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+683", country: "Niue", flag: "🇳🇺" },
  { code: "+672", country: "Norfolk Island", flag: "🇳🇫" },
  { code: "+850", country: "North Korea", flag: "🇰🇵" },
  { code: "+1670", country: "Northern Mariana Islands", flag: "🇲🇵" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+968", country: "عمان", flag: "🇴🇲" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+680", country: "Palau", flag: "🇵🇼" },
  { code: "+970", country: "Palestine", flag: "🇵🇸" },
  { code: "+507", country: "Panama", flag: "🇵🇦" },
  { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+1787", country: "Puerto Rico", flag: "🇵🇷" },
  { code: "+974", country: "قطر", flag: "🇶🇦" },
  { code: "+262", country: "Réunion", flag: "🇷🇪" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+590", country: "Saint Barthélemy", flag: "🇧🇱" },
  { code: "+290", country: "Saint Helena", flag: "🇸🇭" },
  { code: "+1869", country: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { code: "+1758", country: "Saint Lucia", flag: "🇱🇨" },
  { code: "+590", country: "Saint Martin", flag: "🇲🇫" },
  { code: "+508", country: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  { code: "+1784", country: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { code: "+685", country: "Samoa", flag: "🇼🇸" },
  { code: "+378", country: "San Marino", flag: "🇸🇲" },
  { code: "+239", country: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "+966", country: "السعودية", flag: "🇸🇦" },
  { code: "+221", country: "Senegal", flag: "🇸🇳" },
  { code: "+381", country: "Serbia", flag: "🇷🇸" },
  { code: "+248", country: "Seychelles", flag: "🇸🇨" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+1721", country: "Sint Maarten", flag: "🇸🇽" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮" },
  { code: "+677", country: "Solomon Islands", flag: "🇸🇧" },
  { code: "+252", country: "Somalia", flag: "🇸🇴" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+211", country: "South Sudan", flag: "🇸🇸" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+249", country: "Sudan", flag: "🇸🇩" },
  { code: "+597", country: "Suriname", flag: "🇸🇷" },
  { code: "+47", country: "Svalbard and Jan Mayen", flag: "🇸🇯" },
  { code: "+268", country: "Eswatini", flag: "🇸🇿" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+963", country: "سوريا", flag: "🇸🇾" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+670", country: "Timor-Leste", flag: "🇹🇱" },
  { code: "+228", country: "Togo", flag: "🇹🇬" },
  { code: "+690", country: "Tokelau", flag: "🇹🇰" },
  { code: "+676", country: "Tonga", flag: "🇹🇴" },
  { code: "+1868", country: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
  { code: "+1649", country: "Turks and Caicos Islands", flag: "🇹🇨" },
  { code: "+688", country: "Tuvalu", flag: "🇹🇻" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+971", country: "الإمارات", flag: "🇦🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
  { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
  { code: "+379", country: "Vatican City", flag: "🇻🇦" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+1284", country: "British Virgin Islands", flag: "🇻🇬" },
  { code: "+1340", country: "U.S. Virgin Islands", flag: "🇻🇮" },
  { code: "+681", country: "Wallis and Futuna", flag: "🇼🇫" },
  { code: "+212", country: "Western Sahara", flag: "🇪🇭" },
  { code: "+967", country: "اليمن", flag: "🇾🇪" },
  { code: "+260", country: "Zambia", flag: "🇿🇲" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
];

export default function SignUp() {
  const t = useTranslations("Auth.SignUp");
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [consentToMarketing, setConsentToMarketing] = useState(false);
  const [countryCode, setCountryCode] = useState("+966");
  const [openCountrySelect, setOpenCountrySelect] = useState(false);

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
      phoneNumber: data.phoneNumber ? `${countryCode}${data.phoneNumber}` : "",
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
      title={t("title")}>
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
            Icon={<User size={16} />}
            disabled={isLoading}
          />

          <CustomInput
            required
            name="email"
            type="email"
            label={t("fields.email.label")}
            Icon={<Mail size={16} />}
            disabled={isLoading}
          />

          {/* Country Code Selector - Separate row on mobile */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("fields.phone.label")}</label>
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2">
              {/* Desktop: Select, Mobile: Popover with search */}
              <div className="hidden md:block">
                <Select value={countryCode} onValueChange={setCountryCode} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile: Popover with Command (searchable) */}
              <div className="md:hidden">
                <Popover open={openCountrySelect} onOpenChange={setOpenCountrySelect}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCountrySelect}
                      className="w-full justify-between"
                      disabled={isLoading}
                    >
                      <span className="flex items-center gap-2">
                        <span>{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                        <span>{countryCode}</span>
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countryCodes.map((item) => (
                            <CommandItem
                              key={item.code}
                              value={`${item.code} ${item.country}`}
                              onSelect={() => {
                                setCountryCode(item.code);
                                setOpenCountrySelect(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  countryCode === item.code ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="flex items-center gap-2">
                                <span>{item.flag}</span>
                                <span>{item.code}</span>
                                <span className="text-muted-foreground">{item.country}</span>
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Phone Number Input */}
              <CustomInput
                name="phoneNumber"
                type="tel"
                Icon={<Phone size={16} />}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              required
              name="password"
              type={showPassword ? "text" : "password"}
              label={t("fields.password.label")}
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
