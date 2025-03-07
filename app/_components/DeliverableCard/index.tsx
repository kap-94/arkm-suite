import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import { ChevronDown, ChevronUp, HashIcon, Link } from "lucide-react";

import { Content } from "../../_types/models/Content";
import { ContentItemType } from "../ContentItem/types";
import { DeliverableCardProps } from "./types";

import { Language } from "../../_lib/config/i18n";
import { formatDayMonth } from "../../_utils/date-utils";
import { capitalizeAndFormat } from "../../_utils/text-utils";
import { buildLocalizedPath } from "../../_utils/path";

import { useDashboard } from "../../_context/DashboardContext";

import { ThemedTypography } from "../Typography/ThemedTypography";
import Badge from "../Badge";
import ContentItem from "../ContentItem";

import styles from "./DeliverableCard.module.scss";

const cx = classNames.bind(styles);

const formatValue = (value: string, language: Language) => {
  if (value.includes("http")) {
    return <Link size={16} className={cx("card__link-icon")} />;
  }
  const dateValue = new Date(value);
  if (
    dateValue instanceof Date &&
    !isNaN(dateValue.getTime()) &&
    value.includes("-")
  ) {
    return formatDayMonth(dateValue, language);
  }
  return capitalizeAndFormat(value);
};

function normalizeFileType(type: string): ContentItemType {
  const typeMap: Record<string, ContentItemType> = {
    document: "Document",
    pdf: "Document",
    doc: "Document",
    docx: "Document",
  };

  const normalizedType = type.toLowerCase();
  return typeMap[normalizedType] || "Other";
}

export function formatContent(content: any): Content {
  // Si es un archivo
  if (content.type === "file" || content.fileType || content.url) {
    return {
      id: content.id,
      type: "file",
      title: content.name || content.title,
      description: content.description,
      project: content.project,
      size:
        typeof content.size === "number"
          ? content.size
          : parseInt(content.size) || 0,
      fileType: normalizeFileType(content.type || content.fileType),
      url: content.url,
      createdBy: {
        id: content.uploadedBy?.id || content.createdBy?.id,
        name: content.uploadedBy?.name || content.createdBy?.name,
      },
      createdAt: content.createdAt || new Date().toISOString(),
      updatedAt: content.updatedAt || new Date().toISOString(),
      metadata: content.metadata || {},
    };
  }

  // Si es un componente
  return {
    id: content.id,
    type: "component",
    title: content.title,
    description: content.description,
    componentType: content.componentType,
    data: content.data || {},
    createdBy: {
      id: content.createdBy?.id,
      name: content.createdBy?.name,
    },
    project: content.project,
    createdAt: content.createdAt || new Date().toISOString(),
    updatedAt: content.updatedAt || new Date().toISOString(),
    metadata: content.metadata || {},
  };
}

export const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  dictionary,
  theme = { type: "light" },
  isExpanded = false,
  onToggleExpand,
  // onAddComment,
  onContentClick,
}) => {
  const { language } = useDashboard();
  const router = useRouter();

  const handleToggleDetails = useCallback(() => {
    onToggleExpand?.();
  }, [onToggleExpand]);

  const handleContentClick = useCallback(
    (contentId: string) => {
      if (onContentClick) {
        onContentClick(contentId, deliverable.id);
      } else {
        // If no external handler is provided, handle navigation internally
        const path = buildLocalizedPath(
          `/dashboard/project/${deliverable.project.slug}/content/${contentId}`,
          language
        );
        router.push(path);
      }
    },
    [deliverable.id, deliverable.project.slug, language, onContentClick, router]
  );

  return (
    <div className={cx("card", `card--theme-${theme.type}`)}>
      <div className={cx("card__content")}>
        <div className={cx("card__header")}>
          <div className={cx("card__title-wrapper")}>
            <ThemedTypography
              variant="h5"
              fontWeight={500}
              color="secondary"
              className={cx("card__title")}
            >
              {deliverable.title}
            </ThemedTypography>
          </div>
          <Badge
            size="small"
            label={deliverable.status.label}
            status={deliverable.status.value}
          />
        </div>

        {deliverable.description && (
          <ThemedTypography
            variant="p1"
            fontWeight={400}
            color="secondary"
            className={cx("card__description")}
          >
            {deliverable.description}
          </ThemedTypography>
        )}

        <div className={cx("card__meta-row")}>
          <div className={cx("card__due-date")}>
            <ThemedTypography variant="p2" fontWeight={400} color="secondary">
              {dictionary.labels.dueDate}:{" "}
              {formatDayMonth(new Date(deliverable.dueDate), language)}
            </ThemedTypography>
          </div>

          <div className={cx("card__team")}>
            <div className={cx("card__team-avatars")}>
              {deliverable.teamMembers.slice(0, 3).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className={cx("card__team-avatar")}
                  title={member.name}
                />
              ))}
            </div>
            {deliverable.teamMembers.length > 3 && (
              <ThemedTypography variant="p2" color="secondary">
                +{deliverable.teamMembers.length - 3}
              </ThemedTypography>
            )}
          </div>
        </div>

        <div className={cx("card__actions")}>
          <div className={cx("card__tags-group")}>
            {deliverable.tags?.map((tag) => (
              <div key={tag} className={cx("card__tag")}>
                <HashIcon size={14} strokeWidth={2.1} />
                <ThemedTypography
                  variant="p2"
                  fontWeight={400}
                  color="secondary"
                  className={cx("card__tag-text")}
                >
                  {tag}
                </ThemedTypography>
              </div>
            ))}
          </div>

          <button
            onClick={handleToggleDetails}
            className={cx("card__details-toggle", {
              "card__details-toggle--active": isExpanded,
            })}
          >
            <ThemedTypography variant="p2">
              {isExpanded
                ? dictionary.actions.toggleDetails.hide
                : dictionary.actions.toggleDetails.show}
            </ThemedTypography>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div
          className={cx("card__details", {
            "card__details--active": isExpanded,
          })}
        >
          <div className={cx("card__details-header")}>
            <div className={cx("card__details-title-group")}>
              <ThemedTypography variant="h5" fontWeight={500} color="secondary">
                {dictionary.labels.contents}
              </ThemedTypography>
              <div className={cx("card__files-info")}>
                <ThemedTypography variant="p2" color="secondary">
                  {`${deliverable.contents?.length || 0} ${
                    dictionary.labels.items
                  }`}
                </ThemedTypography>
              </div>
            </div>
          </div>

          {deliverable.contents && deliverable.contents.length > 0 ? (
            <div className={cx("card__details-content")}>
              {deliverable.contents.map((content) => (
                <div key={content.id} className={cx("card__content-row")}>
                  {/* <div className={cx("card__content-description")}>
                    <ThemedTypography
                      variant="p2"
                      fontWeight={300}
                      color="secondary"
                    >
                      {content.description || "No description available."}
                    </ThemedTypography>
                  </div> */}
                  <div className={cx("card__content-item")}>
                    <ContentItem
                      content={formatContent(content)}
                      theme={theme}
                      onClick={(id) => handleContentClick(id)}
                      className={cx("card__content-item-wrapper")}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ThemedTypography variant="p2" color="secondary">
              {dictionary.labels.noContent}
            </ThemedTypography>
          )}

          <div className={cx("card__details-footer")}>
            {deliverable.customFields &&
              deliverable.customFields.length > 0 && (
                <>
                  <ThemedTypography
                    variant="h5"
                    fontWeight={500}
                    color="secondary"
                  >
                    {dictionary.labels.additionalInfo}
                  </ThemedTypography>
                  <div className={cx("card__additional-info")}>
                    {deliverable.customFields.map((field) => (
                      <div key={field.label} className={cx("card__info-item")}>
                        <ThemedTypography
                          variant="p2"
                          fontWeight={500}
                          noWrap
                          className={cx("card__info-label")}
                        >
                          {field.label}:
                        </ThemedTypography>
                        <ThemedTypography
                          variant="p2"
                          fontWeight={400}
                          color="secondary"
                          className={cx("card__info-value")}
                        >
                          {formatValue(field.value, language)}
                        </ThemedTypography>
                      </div>
                    ))}
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverableCard;
