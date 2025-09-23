export function isMeaningfulEvent(name: string) {
  return [
    "Login_Success",
    "Record_Created",
    "Record_Finalized",
    "Review_Submitted",
    "Bookmark_Added",
    "Search_Performed",
  ].includes(name);
}

let signupAtMs: number | undefined;
let recentEventTimestampsMs: number[] = [];
let lastEventAtMs: number | undefined;
let lastReviewAtMs: number | undefined;
let lastFinalAtMs: number | undefined;

export function setSignupAt(iso: string | undefined) {
  signupAtMs = iso ? new Date(iso).getTime() : undefined;
}

function computeSegmentSimple():
  | "new"
  | "active"
  | "returning"
  | "churn-risk"
  | "dormant" {
  const now = Date.now();
  const daysSince = (ms?: number) =>
    ms == null ? Infinity : Math.floor((now - ms) / (24 * 60 * 60 * 1000));
  const withinDays = (ms: number, d: number) =>
    now - ms <= d * 24 * 60 * 60 * 1000;

  const days_since_signup = daysSince(signupAtMs);
  const days_since_last_event = daysSince(lastEventAtMs);

  const events_last_7d = recentEventTimestampsMs.filter((t) =>
    withinDays(t, 7)
  ).length;
  const events_last_14d = recentEventTimestampsMs.filter((t) =>
    withinDays(t, 14)
  ).length;
  const events_last_30d = recentEventTimestampsMs.filter((t) =>
    withinDays(t, 30)
  ).length;
  const reviews_last_7d =
    lastReviewAtMs && withinDays(lastReviewAtMs, 7) ? 1 : 0;
  const record_finals_last_7d =
    lastFinalAtMs && withinDays(lastFinalAtMs, 7) ? 1 : 0;
  if (days_since_signup <= 7) return "new";
  const active =
    (events_last_7d >= 3 && days_since_last_event <= 3) ||
    reviews_last_7d >= 1 ||
    record_finals_last_7d >= 1;
  if (active) return "active";
  const returning =
    (events_last_14d >= 2 && days_since_last_event <= 14) ||
    (events_last_30d >= 2 && days_since_last_event <= 14);
  if (returning) return "returning";
  const churnRisk =
    (days_since_signup > 7 &&
      days_since_last_event >= 15 &&
      days_since_last_event <= 30) ||
    (events_last_14d === 0 && events_last_30d <= 1);
  if (churnRisk) return "churn-risk";
  if (days_since_last_event > 30) return "dormant";
  return "returning";
}

// ---- Meaningful events helpers ----
export const MEANINGFUL_EVENT_NAMES = {
  Login_Success: "Login_Success",
  Search_Performed: "Search_Performed",
  Record_Finalized: "Record_Finalized",
  Review_Submitted: "Review_Submitted",
  Bookmark_Added: "Bookmark_Added",
  Draft_Saved: "Draft_Saved",
  Record_Edited: "Record_Edited",
} as const;

export type MeaningfulEventName =
  (typeof MEANINGFUL_EVENT_NAMES)[keyof typeof MEANINGFUL_EVENT_NAMES];

type ValidPropertyValue = string | number | boolean | string[] | number[];
type AmpProperties = Record<string, ValidPropertyValue>;
type AmplitudeLike = {
  trackEvent: (eventName: string, properties?: AmpProperties) => void;
  updateUserProperties: (properties: AmpProperties) => void;
};

export function trackMeaningfulEvent(
  amplitude: AmplitudeLike,
  name: MeaningfulEventName,
  properties?: AmpProperties
) {
  amplitude.trackEvent(name, properties);
  const nowIso = new Date().toISOString();
  const nowMs = Date.now();

  // update in-memory stats
  recentEventTimestampsMs = [...recentEventTimestampsMs, nowMs].slice(-10);
  lastEventAtMs = nowMs;
  if (name === MEANINGFUL_EVENT_NAMES.Review_Submitted) lastReviewAtMs = nowMs;
  if (name === MEANINGFUL_EVENT_NAMES.Record_Finalized) lastFinalAtMs = nowMs;

  // compute simple segment
  const segment = computeSegmentSimple();

  // update user properties
  amplitude.updateUserProperties({
    last_event_at: nowIso,
    has_meaningful_event: true,
    segment,
  });
}
