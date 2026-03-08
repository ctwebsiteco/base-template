import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockSend } = vi.hoisted(() => {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: "test-id" } });
  return { mockSend };
});

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

vi.mock("@/sanity/lib/client", () => ({
  client: {
    withConfig: () => ({
      fetch: vi.fn().mockResolvedValue({
        fromEmail: "noreply@example.com",
        toEmails: ["owner@example.com"],
        businessNotification: {
          subject: "New inquiry from {{name}}",
          body: "<p>{{name}} ({{email}}) — {{message}}</p>",
        },
        submitterConfirmation: {
          subject: "Thanks {{name}}",
          body: "<p>Hi {{name}}, we got your message.</p>",
        },
      }),
    }),
  },
}));

import { submitContactForm } from "@/app/actions/contact";

function makeFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

const validData = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "(555) 555-1234",
  message: "I would like to learn more about your services.",
};

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_123";
    process.env.CONTACT_FROM_EMAIL = "fallback@test.com";
    process.env.CONTACT_TO_EMAILS = "fallback@test.com";
  });

  it("returns success on valid submission", async () => {
    const result = await submitContactForm(
      { success: false },
      makeFormData(validData)
    );
    expect(result.success).toBe(true);
  });

  it("sends two emails (business + confirmation)", async () => {
    await submitContactForm({ success: false }, makeFormData(validData));
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("sends business notification with correct subject", async () => {
    await submitContactForm({ success: false }, makeFormData(validData));
    const businessCall = mockSend.mock.calls[0][0];
    expect(businessCall.subject).toContain("Jane Smith");
  });

  it("sends confirmation email to submitter", async () => {
    await submitContactForm({ success: false }, makeFormData(validData));
    const confirmCall = mockSend.mock.calls[1][0];
    expect(confirmCall.to).toBe("jane@example.com");
    expect(confirmCall.subject).toContain("Jane Smith");
  });

  it("replaces placeholders in templates", async () => {
    await submitContactForm({ success: false }, makeFormData(validData));
    const businessCall = mockSend.mock.calls[0][0];
    expect(businessCall.html).toContain("Jane Smith");
    expect(businessCall.html).toContain("jane@example.com");
  });

  it("returns error on validation failure", async () => {
    const result = await submitContactForm(
      { success: false },
      makeFormData({ name: "", email: "bad", message: "hi" })
    );
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("returns error when Resend fails", async () => {
    mockSend.mockRejectedValueOnce(new Error("API error"));
    const result = await submitContactForm(
      { success: false },
      makeFormData(validData)
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain("Failed to send");
  });

  it("handles missing optional fields gracefully", async () => {
    const result = await submitContactForm(
      { success: false },
      makeFormData({
        name: "Jane",
        email: "jane@example.com",
        message: "This is a test message for the form.",
      })
    );
    expect(result.success).toBe(true);
  });
});
