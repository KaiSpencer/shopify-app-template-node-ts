import {
  LegacyCard,
  Page,
  Layout,
  VerticalStack,
  Image,
  LegacyStack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
      <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <LegacyStack
                  wrap={false}
                  spacing="extraTight"
                  distribution="trailing"
                  alignment="center"
              >
                <LegacyStack.Item fill>
                  <VerticalStack gap="5">
                    <Text as="h2" variant="headingMd">
                      {t("HomePage.heading")}
                    </Text>
                    <p>
                      <Trans
                          i18nKey="HomePage.yourAppIsReadyToExplore"
                          components={{
                            PolarisLink: (
                                <Link url="https://polaris.shopify.com/" target="_blank" />
                            ),
                            AdminApiLink: (
                                <Link
                                    url="https://shopify.dev/api/admin-graphql"
                                    target="_blank"
                                />
                            ),
                            AppBridgeLink: (
                                <Link
                                    url="https://shopify.dev/apps/tools/app-bridge"
                                    target="_blank"
                                />
                            ),
                          }}
                      />
                    </p>
                    <p>{t("HomePage.startPopulatingYourApp")}</p>
                    <p>
                      <Trans
                          i18nKey="HomePage.learnMore"
                          components={{
                            ShopifyTutorialLink: (
                                <Link
                                    url="https://shopify.dev/apps/getting-started/add-functionality"
                                    target="_blank"
                                />
                            ),
                          }}
                      />
                    </p>
                  </VerticalStack>
                </LegacyStack.Item>
                <LegacyStack.Item>
                  <div style={{ padding: "0 20px" }}>
                    <Image
                        source={trophyImage}
                        alt={t("HomePage.trophyAltText")}
                        width={120}
                    />
                  </div>
                </LegacyStack.Item>
              </LegacyStack>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            <ProductsCard />
          </Layout.Section>
        </Layout>
      </Page>
  );
}