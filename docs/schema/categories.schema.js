/** @jsx c */
import c from "canner-script";

const categories = () => (
  <array
    keyName="categories"
    ui="tree"
    title="${categories.title}"
    uiParams={{
      relationField: "category",
      columns: [
        {
          title: "${categories.name}",
          dataIndex: "name"
        }
      ]
    }}
  >
    <toolbar>
    </toolbar>
    <string keyName="name" title="${categories.name}" required />
    <relation
      keyName="category"
      ui="singleSelectTree"
      relation={{
        type: "toOne",
        to: "categories"
      }}
      title="${categories.parent}"
      uiParams={{
        disabled: (data, treeKey) => {
          return treeKey.indexOf("-") !== -1;
        },
        textCol: data => data.name,
        relationField: "category"
      }}
    >
      <toolbar>
      </toolbar>
    </relation>
  </array>
);

export default categories;
