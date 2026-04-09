export function SiteFooter() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name";
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@example.com";
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(555) 555-5555";

  return (
    <footer className="border-t bg-background py-8" data-testid="site-footer">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
        <div className="flex gap-4">
          {companyPhone && (
            <a href={`tel:${companyPhone.replace(/\D/g, "")}`} className="hover:text-foreground">
              {companyPhone}
            </a>
          )}
          {companyEmail && (
            <a href={`mailto:${companyEmail}`} className="hover:text-foreground">
              {companyEmail}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
