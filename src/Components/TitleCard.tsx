import { LayoutItem } from "../Types";
import { itemSumSize } from "../Utils";

function fontSize(layoutItem: LayoutItem) {
  return Math.min((16 * itemSumSize(layoutItem, 0.25, 0.75, -0.5)), 24 * layoutItem.h);
}

export function getTitleCard(layoutItem: LayoutItem, updateItem: (id: string, field: string, value: string) => void) {
  return (
    <>
      <div className="item-content" id="title-card-content">
        {
          layoutItem.static ? (
            <h4 style={{ fontSize: fontSize(layoutItem) }}>{layoutItem.title}</h4>
          ) : (
            <input
              type="text"
              style={{ fontSize: fontSize(layoutItem) }}
              value={layoutItem.title}
              onChange={(e) => updateItem(layoutItem.i, "title", e.target.value)}
              placeholder="Title"
            />
          )
        }
      </div>
    </>
  );
}