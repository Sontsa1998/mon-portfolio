"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("company")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{t("errors.name")}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{t("errors.email")}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input
          id="subject"
          placeholder={t("subjectPlaceholder")}
          aria-invalid={Boolean(errors.subject)}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{t("errors.subject")}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{t("errors.message")}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-hover w-full rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-white hover:opacity-90 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-1.5 size-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send className="mr-1.5 size-4" />
            {t("submit")}
          </>
        )}
      </Button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-500"
          >
            <CheckCircle2 className="size-4" />
            {t("success")}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-destructive"
          >
            <XCircle className="size-4" />
            {t("error")}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
