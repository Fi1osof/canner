/** @jsx builder */
import builder from 'canner-script';

const exportFields = [{
  keyName: 'name',
  title: '${customers.name}',
}, {
  keyName: 'phone',
  title: '${customers.phone}',
}, {
  keyName: 'email',
  title: '${customers.email}',
}, {
  keyName: 'consignees',
  title: '${customers.consignees}',
  render: consignees => consignees.reduce((result, consignee) => `${result}${result ? ';' : result}${consignee.name}`, '') || '無',
}];

export default () => (
  <array
    keyName="customers"
    ui="tableRoute"
    uiParams={{
      columns: [{
        title: '${customers.name}',
        key: 'name',
        dataIndex: 'name',
      }, {
        title: '${customers.phone}',
        key: 'phone',
        dataIndex: 'phone',
      }, {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
      }],
      createKeys: [],
    }}
    title="${customers.title}"
  >
    <toolbar>
      <actions>
        <export
          fields={exportFields}
          title="Customers"
        />
        <filter />
      </actions>
      <filter>
        <textFilter label="${customers.filter.name.label}" field="name" placeholder="${customers.filter.name.placeholder}" />
        <textFilter label="${customers.filter.phone.label}" field="phone" placeholder="${customers.filter.phone.placeholder}" />
      </filter>
      <pagination />
    </toolbar>
    <string keyName="name" title="${customers.name}" />
    <string keyName="email" title="Email" />
    <string keyName="phone" title="${customers.phone}" />
    <array
      keyName="consignees"
      ui="table"
      uiParams={{
        columns: [{
          title: '${customers.name}',
          key: 'name',
          dataIndex: 'name',
        }, {
          title: '${customers.phone}',
          key: 'phone',
          dataIndex: 'phone',
        }, {
          title: 'Email',
          key: 'email',
          dataIndex: 'email',
        }],
        createKeys: [],
      }}
      title="${customers.consignees}"
    >
      <string keyName="name" title="${customers.name}" />
      <string keyName="email" title="${customers.email}" />
      <string keyName="phone" title="${customers.phone}" />
      <string keyName="address" title="${customers.address}" />
    </array>
  </array>
);
