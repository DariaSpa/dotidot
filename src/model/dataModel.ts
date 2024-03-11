export interface Collection {
  __typename: "Collection";
}

export interface FeedExport {
  id: number;
  icon: string;
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "FeedExport";
}

export interface AdditionalSource {
  id: number;
  icon: string;
  name: string;
  mappingField: string;
  mappingFields: string[];
  __typename: "AdditionalSource";
}

export interface AdwordsSetting {
  id: number;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "AdwordsSetting";
}

export interface KeywordSetting {
  id: number;
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "KeywordSetting";
}

export interface BaseAdtext {
  id: number;
  type: string;
  parentId: number;
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "BaseAdtext";
}

export interface BidRule {
  id: number;
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "BidRule";
}

export interface DataSourceVariable {
  id: string;
  name: string;
  placeholderName: string;
  showValueType: "text" | "number" | "date" | "array" | "image";
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  imageGen: ImageGen | null;
  additionalSource: AdditionalSource | null;
  __typename: "DataSourceVariable";
}

export interface ImageGen {
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: "ImageGen";
}

export interface CampaignSetting {
  id: number;
  icon: string;
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  adwordsSetting: ChildSetting | null;
  sklikSetting: ChildSetting | null;
  bingSetting: ChildSetting | null;
  keywordSettings: KeywordSetting[];
  baseAdtexts: BaseAdtext[];
  bidRules: BidRule[];
  __typename: "CampaignSetting";
}

export interface ChildSetting {
  id: number;
  name?: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  __typename: string;
}

export interface Data {
  data: {
    feedExports: {
      feedExports: FeedExport[];
      __typename: "Collection";
    };
    additionalSources: {
      additionalSources: AdditionalSource[];
      __typename: "Collection";
    };
    campaignSettings: {
      campaignSettings: CampaignSetting[];
      __typename: "Collection";
    };
    variables: {
      variables: DataSourceVariable[];
      __typename: "Collection";
    };
  };
}
