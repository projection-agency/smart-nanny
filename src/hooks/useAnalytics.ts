import { useCallback } from "react";
import { event } from "@/lib/gtag";
import {
  ANALYTICS_CATEGORIES,
  FORM_ACTIONS,
  ENGAGEMENT_ACTIONS,
  NAVIGATION_ACTIONS,
} from "@/constants/analytics";

interface TrackEventParams {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback(
    ({ action, category, label, value }: TrackEventParams) => {
      event({ action, category, label, value });
    },
    []
  );

  const trackFormSubmission = useCallback(
    (formName: string, success: boolean) => {
      trackEvent({
        action: success
          ? FORM_ACTIONS.SUBMIT_SUCCESS
          : FORM_ACTIONS.SUBMIT_ERROR,
        category: ANALYTICS_CATEGORIES.FORM,
        label: formName,
      });
    },
    [trackEvent]
  );

  const trackButtonClick = useCallback(
    (buttonName: string, location: string) => {
      trackEvent({
        action: ENGAGEMENT_ACTIONS.BUTTON_CLICK,
        category: ANALYTICS_CATEGORIES.ENGAGEMENT,
        label: `${buttonName}_${location}`,
      });
    },
    [trackEvent]
  );

  const trackPageView = useCallback(
    (pageName: string) => {
      trackEvent({
        action: NAVIGATION_ACTIONS.PAGE_VIEW,
        category: ANALYTICS_CATEGORIES.NAVIGATION,
        label: pageName,
      });
    },
    [trackEvent]
  );

  const trackPhoneCall = useCallback(
    (phoneNumber: string) => {
      trackEvent({
        action: ENGAGEMENT_ACTIONS.PHONE_CALL,
        category: ANALYTICS_CATEGORIES.CONTACT,
        label: phoneNumber,
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackFormSubmission,
    trackButtonClick,
    trackPageView,
    trackPhoneCall,
  };
};
