export type ApiErrorSource =
  | "validation"
  | "business"
  | "authentication"
  | "not_found"
  | "server"
  | "unknown";

export interface ParsedApiError {
  source: ApiErrorSource;
  message: string;
  validationErrors?: Record<string, string[]>;
  statusCode?: number;
  detail?: string;
}

export function parseApiError(error: unknown): ParsedApiError {
  
  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    const response = e["response"];

    if (response && typeof response === "object") {
      const r = response as Record<string, unknown>;
      const status = (r["status"] as number | undefined) ?? undefined;
      const data = r["data"];

      if (typeof data === "string") {
        return {
          source: statusToSource(status),
          message: data,
          statusCode: status,
        };
      }

      if (data && typeof data === "object") {
        const d = data as Record<string, unknown>;

        const validation = tryExtractModelStateErrors(d);
        if (validation) {
          return {
            source: "validation",
            message: firstValidationMessage(validation) ?? "Dados inválidos.",
            validationErrors: validation,
            statusCode: status,
          };
        }

        const msg =
          (typeof d["message"] === "string" && d["message"]) ||
          (typeof d["error"] === "string" && d["error"]) ||
          undefined;

        if (msg) {
          return {
            source: statusToSource(status),
            message: msg,
            statusCode: status,
          };
        }
      }
    }

    const msg = e["message"];
    if (typeof msg === "string" && msg.trim()) {
      return {
        source: "unknown",
        message: msg,
      };
    }
  }

  return {
    source: "unknown",
    message: "Ocorreu um erro inesperado. Tente novamente.",
  };
}

function statusToSource(status?: number): ApiErrorSource {
  if (!status) return "unknown";
  if (status === 400) return "validation";
  if (status === 401 || status === 403) return "authentication";
  if (status === 404) return "not_found";
  if (status >= 500) return "server";
  return "business";
}

function tryExtractModelStateErrors(
  data: Record<string, unknown>
): Record<string, string[]> | undefined {
 
  const errors = data["errors"];
  if (!errors || typeof errors !== "object") return undefined;

  const result: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      result[key] = value.filter((v): v is string => typeof v === "string");
    } else if (typeof value === "string") {
      result[key] = [value];
    }
  }

  return Object.keys(result).length ? result : undefined;
}

function firstValidationMessage(validation: Record<string, string[]>): string | undefined {
  for (const msgs of Object.values(validation)) {
    if (msgs.length && typeof msgs[0] === "string" && msgs[0].trim()) {
      return msgs[0];
    }
  }
  return undefined;
}

