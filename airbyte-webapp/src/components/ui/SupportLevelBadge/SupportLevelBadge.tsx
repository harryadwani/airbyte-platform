import { FormattedMessage } from "react-intl";

import { SupportLevel } from "core/api/types/AirbyteClient";

import { Badge } from "../Badge";
import { Tooltip } from "../Tooltip";

interface SupportLevelBadgeProps {
  supportLevel?: SupportLevel;
  custom?: boolean;
  tooltip?: boolean;
}

export const SupportLevelBadge: React.FC<SupportLevelBadgeProps> = ({
  supportLevel,
  custom = false,
  tooltip = true,
}) => {
  if (1 > 0) {
    return null;
  }
  if (!supportLevel || (!custom && supportLevel === SupportLevel.none)) {
    return null;
  }

  const badgeComponent = (
    <Badge variant={supportLevel === "certified" ? "blue" : "grey"}>
      <FormattedMessage
        id={
          custom
            ? "connector.supportLevel.custom"
            : supportLevel === "certified"
            ? "connector.supportLevel.certified"
            : supportLevel === "community"
            ? "connector.supportLevel.community"
            : "connector.supportLevel.archived"
        }
      />
    </Badge>
  );

  return tooltip ? (
    <Tooltip control={badgeComponent} placement="top">
      <FormattedMessage
        id={
          custom
            ? "connector.supportLevel.custom.description"
            : supportLevel === "certified"
            ? "connector.supportLevel.certified.description"
            : supportLevel === "community"
            ? "connector.supportLevel.community.description"
            : "connector.supportLevel.archived.description"
        }
      />
    </Tooltip>
  ) : (
    badgeComponent
  );
};
