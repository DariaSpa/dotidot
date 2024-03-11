import { Node, Edge } from 'react-flow-renderer';
import { AdditionalSource, CampaignSetting, ChildSetting, Data, DataSourceVariable, FeedExport } from "../../model";
import { combineArrays } from './combineArrays';
import { NODE_COLOR, NODE_COLUMN_WIDTH, NODE_ROW_HEIGHT, NODE_TYPE_DEFAULT, typeColorMapping, typeColumnMapping } from '../constants';

export function processJsonData({data}: Data): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let nodeIdx = 1;
  let edgeIdx = 1;

  const { feedExports, additionalSources, campaignSettings, variables } = data;

  // Helper functions
  const addNode = (
    item: FeedExport | AdditionalSource | DataSourceVariable | CampaignSetting | ChildSetting,
    label: string,
    y: number,
    inputLinks: string[] = [],
    outputLinks: string[] = [],
    placeholderName?: string
  ) => {
    const column = typeColumnMapping[item.__typename] || 0;
    const bgColor = typeColorMapping[item.__typename] || NODE_COLOR;
  
    nodes.push({
      id: `node-${nodeIdx++}`,
      type: NODE_TYPE_DEFAULT,
      data: { label, placeholderName: placeholderName || label, inputLinks, outputLinks, isHighlighted: false },
      position: { x: column * NODE_COLUMN_WIDTH, y: y * NODE_ROW_HEIGHT },
      style: {
        background: bgColor,
        borderRadius: 5,
      },
    });
  };

  const addEdge = (sourceNode: Node, targetNode: Node, edgeId: number): Edge => {
    return {
      id: `edge-${edgeId}`,
      source: sourceNode.id,
      target: targetNode.id,
      animated: false,
      data: { isHighlighted: false },
    };
  }

  const addEdges = (links: string[], node: Node, isInput: boolean) => {
    links.forEach((link: string) => {
      const otherNode = nodes.find(n => n.data.placeholderName === link);
      if (otherNode) {
        if (isInput) {
          edges.push(addEdge(otherNode, node, edgeIdx++));
        } else {
          edges.push(addEdge(node, otherNode, edgeIdx++));
        }
      }
    });
  }

  const processCampaignSettingsSubnodes = (item: CampaignSetting, index: number) => {
    const additionalLinks: string[] = [];
    let additionalNodesIndex = 0;

    const addSettingNode = (setting: ChildSetting, label: string, links: string[] = []) => {
      addNode(setting, label, additionalNodesIndex, combineArrays(setting.getPlaceholdersWithoutConditions, setting.getConditionsPlaceholders, links));
      additionalLinks.push(label);
      additionalNodesIndex++;
    };

    if (item.adwordsSetting) {
      addSettingNode(item.adwordsSetting, 'Adwords Setting');
    }
    if (item.sklikSetting) {
      addSettingNode(item.sklikSetting, 'Sklik Setting');
    }
    if (item.bingSetting) {
      addSettingNode(item.bingSetting, 'Bing Setting');
    }
    if (item.keywordSettings) {
      item.keywordSettings.forEach((keywordSetting) => addSettingNode(keywordSetting, keywordSetting.name));
    }
    if (item.bidRules) {
      item.bidRules.forEach((bidRule) => addSettingNode(bidRule, bidRule.name));
    }
    if (item.baseAdtexts) {
      item.baseAdtexts.forEach((baseAdtext) => {
        const baseAdtextAdditionalLinks: string[] = [];
        if (baseAdtext.parentId) {
          const parentBaseAdtext = item.baseAdtexts.find((b) => b.id === baseAdtext.parentId);
          if (parentBaseAdtext) {
            baseAdtextAdditionalLinks.push(parentBaseAdtext.name);
          }
        }
        addSettingNode(baseAdtext, baseAdtext.name, baseAdtextAdditionalLinks);
      });
    }

    addNode(item, item.name, index, combineArrays(item.getPlaceholdersWithoutConditions, item.getConditionsPlaceholders), additionalLinks);
  }

  // Add nodes
  feedExports.feedExports.forEach((item: FeedExport, index: number) => addNode(item, item.name, index, combineArrays(item.getPlaceholdersWithoutConditions, item.getConditionsPlaceholders)));
  additionalSources.additionalSources.forEach((item: AdditionalSource, index: number) => addNode(item, item.name, index, combineArrays(item.mappingFields, [item.mappingField])));
  campaignSettings.campaignSettings.forEach((item: CampaignSetting, index: number) => processCampaignSettingsSubnodes(item, index));
  variables.variables.forEach((item: DataSourceVariable, index: number) => {
    const additionalSourceName = additionalSources.additionalSources.find((a) => a.id === item.additionalSource?.id)?.name;
    const additionalSourceNameList = additionalSourceName ? [additionalSourceName] : [];
    addNode(item, item.name, index, combineArrays(item.getPlaceholdersWithoutConditions, item.getConditionsPlaceholders, additionalSourceNameList), [], item.placeholderName);
  });

  // Add edges
  nodes.forEach((node) => {
    const { inputLinks, outputLinks } = node.data;
    addEdges(inputLinks, node, true);
    addEdges(outputLinks, node, false);
  });

  return {
    nodes,
    edges,
  };
}
