// TODO: Replace with site footer
export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-8" data-testid="site-footer">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Business Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
