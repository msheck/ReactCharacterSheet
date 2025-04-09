import { LayoutItem } from "../Types";
import { getPaddingValue, hasTitle, itemSumSize } from "../Utils";

function calculateMathFormula(layoutItem: LayoutItem): string {
  const formula = layoutItem.data?.at(0)?.at(0);
  const x = layoutItem.data?.at(0)?.at(1);

  if (formula && x !== undefined) {
    try {
      // Replace recognized math functions with their Math equivalents
      const sanitizedFormula = formula
        .replace(/[^-()\d/*+.x\s\w]/g, '') // Allow letters for function names
        .replace(/\b(floor|ceil|sqrt|abs|sin|cos|tan|log|exp|pow)\b/g, 'Math.$1') // Map functions to Math
        .replace(/x/g, x.toString()); // Replace 'x' with its value

      // Use Function constructor for safer evaluation
      const result = new Function(`return ${sanitizedFormula}`)();
      return result.toString();
    } catch (e) {
      console.error("Error evaluating formula:", e);
    }
  }
  return "0";
}

function staticMathFormula(layoutItem: LayoutItem) {
  return (
    <>
      {hasTitle(layoutItem) && <h4 id="math-formula-title">{layoutItem.title}</h4>}
    </>
  );
}

function editableMathFormula(layoutItem: LayoutItem, updateItem: (id: string, field: string, value: string) => void) {
  return (
    <>
      <div id="math-formula-header">
        <input
          type="text"
          value={layoutItem.title}
          onChange={(e) => updateItem(layoutItem.i, "title", e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={layoutItem.data?.at(0)?.at(0) || ""}
          onChange={(e) => updateItem(layoutItem.i, "data-0", e.target.value)}
          placeholder="Formula (e.g., 2*x+3)"
        />
      </div>
    </>
  );
}

export function getMathFormula(layoutItem: LayoutItem, updateItem: (id: string, field: string, value: string) => void) {
  const y = calculateMathFormula(layoutItem);

  return (
    <>
      <div className="item-content" id={hasTitle(layoutItem) || !layoutItem.static ? "math-formula-content" : "math-formula-content-notitle"}>
        {layoutItem.static
          ? staticMathFormula(layoutItem)
          : editableMathFormula(layoutItem, updateItem)}
        <div className="item-content" id="math-formula-div">
          <input id="math-formula-input"
            style={{ fontSize: 12 * itemSumSize(layoutItem, 0.5, 1, -0.5), paddingLeft: getPaddingValue(layoutItem, 2, 0.25, 15) }}
            type="number"
            value={layoutItem.data?.at(0)?.at(1) || ""}
            placeholder="x"
            onChange={(e) => updateItem(layoutItem.i, "data-1", e.target.value)}
          />
          <hr />
          <input id="math-formula-input"
            style={{ fontSize: 12 * itemSumSize(layoutItem, 0.5, 1, -0.5), paddingLeft: getPaddingValue(layoutItem, 2, 0.25, 15), fontStyle: "italic" }}
            disabled={true}
            type="text"
            value={y}
            placeholder="y"
          />
        </div>
      </div>
    </>
  );
}
