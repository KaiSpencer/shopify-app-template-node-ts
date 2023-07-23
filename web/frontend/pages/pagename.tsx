import { LegacyCard, Page, Layout, VerticalStack, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function PageName() {
  const { t } = useTranslation();
  return (
      <Page>
        <TitleBar
            title={t("PageName.title")}
            primaryAction={{
              content: t("PageName.primaryAction"),
              onAction: () => console.log("Primary action"),
            }}
            secondaryActions={[
              {
                content: t("PageName.secondaryAction"),
                onAction: () => console.log("Secondary action"),
              },
            ]}
        />
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <Text variant="headingMd" as="h2">
                {t("PageName.heading")}
              </Text>
              <VerticalStack>
                <p>{t("PageName.body")}</p>
              </VerticalStack>
            </LegacyCard>
            <LegacyCard sectioned>
              <Text variant="headingMd" as="h2">
                {t("PageName.heading")}
              </Text>
              <VerticalStack>
                <p>{t("PageName.body")}</p>
              </VerticalStack>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section secondary>
            <LegacyCard sectioned>
              <Text variant="headingMd" as="h2">
                {t("PageName.heading")}
              </Text>
              <VerticalStack>
                <p>{t("PageName.body")}</p>
              </VerticalStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
  );
}