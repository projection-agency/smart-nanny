"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ReviewPopup } from "./ReviewPopup/ReviewPopup";
import { SelectionPopup } from "./SelectionPopup/SelectionPopup";
import { EducationPopup } from "./EducationPopup/EducationPopup";
import { RespondPopup } from "./RespondPopup/RespondPopup";

type ModalKey = "formA" | "formB" | "formC" | "formD" | "subscribe" | null;

interface ModalContextType {
  openModal: (key: ModalKey, payload?: string) => void;
  closeModal: () => void;
  currentModal: ModalKey;
  payload?: string;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({
  children,
  translation,
  locale,
  payload,
}: {
  children: ReactNode;
  translation: Record<string, unknown>;
  locale: string;
  payload?: string;
}) => {
  const [currentModal, setCurrentModal] = useState<ModalKey>(null);
  const [modalData, setModalData] = useState<string>("");
  const openModal = (key: ModalKey, payload?: string) => {
    setCurrentModal(key);
    setModalData(payload || "");
  };
  const closeModal = () => {
    setCurrentModal(null);
    setModalData("");
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, currentModal,payload }}
    >
      {children}

      {currentModal === "formA" && (
        <SelectionPopup
          onClose={closeModal}
          translation={translation}
          locale={locale}
        />
      )}
      {currentModal === "formB" && (
        <EducationPopup
          onClose={closeModal}
          translation={translation}
          locale={locale}
        />
      )}
      {currentModal === "formC" && (
        <RespondPopup
          onClose={closeModal}
          translation={translation}
          locale={locale}
        />
      )}
      {currentModal === "formD" && (
        <ReviewPopup
          onClose={closeModal}
          payload={modalData}
        />
      )}
    </ModalContext.Provider>
  );
};

export const closeIco = (
  <svg viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.829 1.72496C20.5624 1.39523 19.9455 1.45635 19.6162 1.72496L19.7497 1.61076C18.4183 2.70854 14.2441 7.56529 10.0925 12.4912C9.47813 11.4369 8.91601 10.4083 8.42053 9.44076C6.26358 5.22739 5.24694 2.11904 5.23971 2.11341C5.104 1.70807 4.67197 1.49013 4.27045 1.62283C3.86653 1.75552 3.6489 2.19222 3.7814 2.59353C3.79666 2.62812 5.47741 7.74544 9.04288 13.7394C5.79702 17.6029 2.71337 21.3169 1.1876 23.0846C0.909752 23.4062 0.944283 23.892 1.2663 24.1703C1.41245 24.2957 1.59073 24.3568 1.7698 24.3568C1.98341 24.3568 2.19702 24.2668 2.34959 24.0898C3.80469 22.3945 6.75745 18.8479 9.89009 15.121C11.8447 18.2157 14.2827 21.4536 17.2491 24.2877C17.3985 24.4292 17.5896 24.5 17.7791 24.5C17.9831 24.5 18.1838 24.4196 18.3364 24.2619C18.6271 23.9563 18.6159 23.469 18.3107 23.1778C15.3266 20.3309 12.879 17.0239 10.9324 13.8809C15.2062 8.80944 19.5474 3.73956 20.7182 2.80263C21.0442 2.53804 21.0956 2.05389 20.829 1.72496Z"
      fillOpacity="0.4"
    />
    <path
      d="M20.2295 1.00098C20.5499 0.990286 20.9511 1.08064 21.2178 1.41016L21.2939 1.51465C21.6454 2.0514 21.54 2.77901 21.0332 3.19043L21.0303 3.19336C20.7706 3.40126 20.3035 3.86714 19.6621 4.55664C19.0288 5.23746 18.2465 6.11275 17.3652 7.12012C15.6673 9.06103 13.6084 11.4824 11.5498 13.9238C13.4493 16.9495 15.8081 20.0991 18.6562 22.8164L18.7451 22.9102C19.1615 23.3975 19.1485 24.1331 18.6982 24.6064L18.6953 24.6094C18.447 24.8659 18.1164 24.9999 17.7793 25C17.4656 25 17.1502 24.8825 16.9053 24.6504L16.9033 24.6494C14.0836 21.9555 11.7409 18.9063 9.83496 15.9629C7.64757 18.5672 5.57598 21.0482 4.08203 22.8203L2.72852 24.415V24.416C2.47778 24.7068 2.12364 24.8564 1.76953 24.8564C1.4755 24.8564 1.18048 24.7559 0.94043 24.5498L0.939453 24.5488C0.407856 24.0895 0.351834 23.2878 0.80957 22.7578L2.22168 21.0977C3.83077 19.1903 6.07805 16.4917 8.43359 13.6865C4.97704 7.79969 3.32165 2.79301 3.32422 2.79492L3.31445 2.77344L3.30664 2.75C3.08822 2.08798 3.4461 1.36698 4.11426 1.14746V1.14844C4.76529 0.933588 5.4578 1.27605 5.69629 1.91016C5.69792 1.91382 5.69953 1.9164 5.7002 1.91797C5.70432 1.92765 5.70703 1.93591 5.70801 1.93848C5.7105 1.94504 5.71254 1.95137 5.71387 1.95508C5.71686 1.96348 5.72148 1.97449 5.72559 1.98633C5.73427 2.01135 5.74552 2.04634 5.76172 2.09277C5.79385 2.18489 5.84223 2.3208 5.90625 2.49707C6.03456 2.85038 6.22829 3.3663 6.48828 4.0127C7.00836 5.30569 7.79493 7.12216 8.86523 9.21289L9.24609 9.94336C9.53552 10.4893 9.84539 11.0508 10.1709 11.623C12.093 9.346 13.9992 7.11057 15.6035 5.28516C17.214 3.45283 18.5512 2.00089 19.292 1.34766L19.291 1.34473L19.4248 1.23047C19.4271 1.22859 19.4294 1.22646 19.4316 1.22461L19.4424 1.23828C19.6789 1.09115 19.9608 1.00995 20.2295 1.00098Z"
      strokeOpacity="0.4"
    />
  </svg>
);
