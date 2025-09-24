// ---- Event definitions ----
export const MEANINGFUL_EVENT_NAMES = {
  Login_Success: "Login_Success",
  Search_Performed: "Search_Performed",
  Record_Created: "Record_Created",
  Record_Edited: "Record_Edited",
  Record_Finalized: "Record_Finalized",
  Review_Submitted: "Review_Submitted",
  Bookmark_Added: "Bookmark_Added",
  Draft_Saved: "Draft_Saved",
} as const;

export const CORE_EVENT_NAMES = {
  Record_Finalized: "Record_Finalized",
  Review_Submitted: "Review_Submitted",
} as const;

export type MeaningfulEventName =
  (typeof MEANINGFUL_EVENT_NAMES)[keyof typeof MEANINGFUL_EVENT_NAMES];

export type CoreEventName =
  (typeof CORE_EVENT_NAMES)[keyof typeof CORE_EVENT_NAMES];

export function isMeaningfulEvent(name: string): name is MeaningfulEventName {
  return Object.values(MEANINGFUL_EVENT_NAMES).includes(
    name as MeaningfulEventName
  );
}

export function isCoreEvent(name: string): name is CoreEventName {
  return Object.values(CORE_EVENT_NAMES).includes(name as CoreEventName);
}

// ---- In-memory user state ----
let signupAtMs: number | undefined;
let recentEventTimestampsMs: number[] = []; // meaningful events only
let lastEventAtMs: number | undefined; // last meaningful event
let lastCoreAtMs: number | undefined; // last core event (Review/Final)
let lastReactivatedAtMs: number | undefined; // first event after 14d+ inactivity

// ---- Public setters ----
export function setSignupAt(iso: string | undefined) {
  signupAtMs = iso ? new Date(iso).getTime() : undefined;
}

// ---- Constants & helpers ----
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MAX_BUFFER = 100;

// Reactivation rules
const REACTIVATION_GAP_DAYS = 14; // 무활동 14일 이후 첫 이벤트면 '재활성화'
const REACTIVATION_RETURNING_WINDOW_DAYS = 7; // 재활성화 후 N일 동안 returning 우선

const daysSince = (ms?: number, now = Date.now()) =>
  ms == null ? Infinity : Math.floor((now - ms) / MS_IN_DAY);

const withinDays = (ms: number | undefined, d: number, now = Date.now()) =>
  ms != null && now - ms <= d * MS_IN_DAY;

// ---- Segment computation (priority order) ----
// 1) new: 가입 7일 이내
// 2) dormant: 최근 30일 의미 있는 이벤트 없음
// 3) returning (grace): 최근 14일+ 무활동 이후 첫 이벤트가 발생했고, 그 시점부터 N일 이내
// 4) active: 최근 7일 내 핵심 이벤트 >= 1
// 5) churn-risk: 최근 14일 무활동 (단, dormant 제외)
// 6) 그 외 returning (폴백)
export function computeSegmentSimple():
  | "new"
  | "active"
  | "returning"
  | "churn-risk"
  | "dormant" {
  const now = Date.now();
  const dSignup = daysSince(signupAtMs, now);
  const dLastEvt = daysSince(lastEventAtMs, now);

  // 1) new
  if (dSignup <= 7) return "new";

  // 2) dormant
  if (dLastEvt > 30) return "dormant";

  // 3) returning (grace window 우선)
  if (
    withinDays(lastReactivatedAtMs, REACTIVATION_RETURNING_WINDOW_DAYS, now)
  ) {
    return "returning";
  }

  // 4) active
  if (withinDays(lastCoreAtMs, 7, now)) return "active";

  // 5) churn-risk (dormant는 위에서 이미 분기됨)
  if (dLastEvt > 14) return "churn-risk";

  // 6) fallback returning
  return "returning";
}

// ---- Amplitude interop ----
type ValidPropertyValue = string | number | boolean | string[] | number[];
type AmpProperties = Record<string, ValidPropertyValue>;
type AmplitudeLike = {
  trackEvent: (eventName: string, properties?: AmpProperties) => void;
  updateUserProperties: (properties: AmpProperties) => void;
};

// 의미 있는 이벤트가 발생했을 때 호출
export function trackMeaningfulEvent(
  amplitude: AmplitudeLike,
  name: MeaningfulEventName,
  properties?: AmpProperties
) {
  if (!isMeaningfulEvent(name)) return;

  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();

  // 이벤트 직전의 무활동 일수 계산 (재활성화 판정에 필요)
  const gapDaysBefore = daysSince(lastEventAtMs, nowMs);

  // 1) Track
  amplitude.trackEvent(name, properties);

  // 2) Update in-memory stats
  recentEventTimestampsMs = [...recentEventTimestampsMs, nowMs].slice(
    -MAX_BUFFER
  );
  lastEventAtMs = nowMs;
  if (isCoreEvent(name)) lastCoreAtMs = nowMs;

  // 3) Reactivation stamp: 직전 무활동이 14일 이상이면 이번 이벤트를 '재활성화'로 기록
  if (gapDaysBefore >= REACTIVATION_GAP_DAYS) {
    lastReactivatedAtMs = nowMs;
  }

  // 4) Compute & push user properties
  const segment = computeSegmentSimple();
  amplitude.updateUserProperties({
    last_event_at: nowIso,
    has_meaningful_event: true,
    segment,
  });
}
