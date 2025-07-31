// Категорії подій
export const ANALYTICS_CATEGORIES = {
  FORM: "form",
  ENGAGEMENT: "engagement",
  NAVIGATION: "navigation",
  CONTACT: "contact",
} as const;

// Дії форм
export const FORM_ACTIONS = {
  SUBMIT_SUCCESS: "form_submit_success",
  SUBMIT_ERROR: "form_submit_error",
} as const;

// Дії взаємодії
export const ENGAGEMENT_ACTIONS = {
  BUTTON_CLICK: "button_click",
  PHONE_CALL: "phone_call",
} as const;

// Дії навігації
export const NAVIGATION_ACTIONS = {
  PAGE_VIEW: "page_view",
} as const;

// Назви форм
export const FORM_NAMES = {
  EDUCATION_POPUP: "education_popup",
  VACATION_FORM: "vacation_form",
  RESPOND_POPUP: "respond_popup",
  SELECTION_POPUP: "selection_popup",
} as const;

// Назви кнопок
export const BUTTON_NAMES = {
  ORDER_CALL: "order_call",
  MOBILE_MENU: "mobile_menu",
  APPLY_VACANCY: "apply_vacancy",
  CONTACT_US: "contact_us",
} as const;

// Локації
export const LOCATIONS = {
  HEADER: "header",
  FOOTER: "footer",
  HERO: "hero",
  VACANCY_CARD: "vacancy_card",
  BLOG_CARD: "blog_card",
} as const;
