import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { formatShortRu } from "./date";

export const UnreadMessages = () => {
  const { t } = useTranslation();

  const [count] = useState(() => Math.floor(Math.random() * 10) + 1);

  return (
    <div>
      {t("unreadMessages", {
        count,
        date: formatShortRu(new Date()),
      })}
    </div>
  );
};
