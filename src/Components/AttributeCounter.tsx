import { LayoutItem } from "../Types";
import { hasTitle, itemSumSize } from "../Utils";

function staticAttributeCounter(layoutItem: LayoutItem) {
  return (
    (hasTitle(layoutItem)) &&
    <>
      <h4 id="attribute-counter-title">{layoutItem.title}</h4>
    </>
  );
}

function editableAttributeCounter(layoutItem: LayoutItem, updateItem: (id: string, field: string, value: string) => void) {
  return (
    <>
      <input id="attribute-counter-title"
        type="text"
        value={layoutItem.title}
        onChange={(e) => updateItem(layoutItem.i, "title", e.target.value)}
        placeholder="Title" />
    </>
  );
}

export function getAttributeCounter(layoutItem: LayoutItem, updateItem: (id: string, field: string, value: string) => void) {
  return (
    <>
      <div className="item-content" id={(hasTitle(layoutItem) || !layoutItem.static) ? "attribute-counter-content" : "attribute-counter-content-notitle"}>
        {
          layoutItem.static
            ? staticAttributeCounter(layoutItem)
            : editableAttributeCounter(layoutItem, updateItem)
        }
        <input id="attribute-counter-count"
          style={{ fontSize: 12 * itemSumSize(layoutItem), paddingLeft: 2.25 * itemSumSize(layoutItem) }}
          type="number"
          value={layoutItem.description}
          onChange={(e) => updateItem(layoutItem.i, "description", e.target.value)} />
      </div>
    </>
  );
}