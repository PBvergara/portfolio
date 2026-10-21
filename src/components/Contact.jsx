import { Download } from "lucide-react";
import { useId, useState } from "react";
import { site } from "../data/site";
import { validateContact } from "../lib/validate";
import Reveal from "./Reveal";
import SocialList from "./SocialList";

const INITIAL = { name: "", email: "", message: "" };

export default function Contact() {
  const baseId = useId();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setResult("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setResult("");
      return;
    }

    setSending(true);
    setResult("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Portfolio message from ${values.name.trim()}`,
          from_name: values.name.trim(),
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck: "",
        }),
      });
      const raw = await response.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
      const sent =
        (response.ok && data?.success === true) ||
        (response.ok && /submitted successfully/i.test(raw));
      if (!sent) {
        throw new Error(typeof data?.message === "string" ? data.message : "send failed");
      }
      setValues(INITIAL);
      setResult("Message sent. I'll reply to the email you entered.");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "";
      const extra = detail && !/failed to fetch|send failed/i.test(detail) ? ` ${detail}` : "";
      setResult(`The message could not be sent.${extra} Email ${site.email} instead.`);
    } finally {
      setSending(false);
    }
  }

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      autoComplete: "name",
      placeholder: "Your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      autoComplete: "email",
      placeholder: "you@email.com",
    },
  ];

  return (
    <section id="contact" className="section section-contact">
      <div className="container">
        <Reveal>
          <div className="contact-shell">
            <div className="contact-panel">
              <div className="contact-intro">
                <p className="section-kicker">
                  <span className="section-index">05</span>
                  <span className="section-code">COMMS</span>
                </p>
                <h2>Let&apos;s Build Something Great.</h2>
                <p className="section-lead">
                  Reach me by email or through the profiles below.
                </p>
                <a className="btn btn-primary resume-btn" href="/Paul-Bryan-B-Vergara-Resume.pdf" download="Paul-Bryan-B-Vergara-Resume.pdf">
                  Download my resume
                  <Download size={15} aria-hidden="true" />
                </a>
                <SocialList />
              </div>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {fields.map((field) => {
                    const fieldId = `${baseId}-${field.name}`;
                    const errorId = `${fieldId}-error`;
                    const error = errors[field.name];
                    return (
                      <div className="field" key={field.name}>
                        <label htmlFor={fieldId}>{field.label}</label>
                        <input
                          id={fieldId}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          value={values[field.name]}
                          aria-invalid={error ? "true" : "false"}
                          aria-describedby={error ? errorId : undefined}
                          onChange={(event) => update(field.name, event.target.value)}
                        />
                        {error ? (
                          <p id={errorId} className="field-error">
                            {error}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className="field">
                  <label htmlFor={`${baseId}-message`}>Message</label>
                  <textarea
                    id={`${baseId}-message`}
                    name="message"
                    placeholder="What would you like to build?"
                    value={values.message}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
                    onChange={(event) => update("message", event.target.value)}
                  />
                  {errors.message ? (
                    <p id={`${baseId}-message-error`} className="field-error">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? "Sending..." : "Submit Message"}
                  </button>
                  <p className="form-result" role="status" aria-live="polite">
                    {result}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
