import * as React from 'react';
import ReactDOM from 'react-dom';
import {Menu, notification, Select, message} from 'antd';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import Canner from 'packages/canner/src';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import Container, {transformSchemaToMenuConfig} from 'packages/canner-container/src';
import R from 'packages/router/src';

import schema from './canner.schema';
import styled from 'styled-components';
addLocaleData([...en, ...zh]);

// eslint-disable-next-line
export const Logo = styled.img`
  background-color: #283050;
  padding: 20px;
  margin-left: -20px;
  width: 200px;
`;

const Option = Select.Option;
const menuConfig = [
  {
    pathname: '__back',
    title: <FormattedMessage id="dashboard.menu" />,
    onClick: () => {
      message.success('Back to dashboard');
    },
    icon: 'left'
  },
  ...transformSchemaToMenuConfig({...schema.pageSchema, ...schema.schema})
]
class CMSExample extends React.Component {
  router = new R({
    baseUrl: "/docs"
  });

  state = {
    locale: 'en'
  };

  componentDidMount() {
    this.unlisten = this.router.history.listen(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  changeLocale = locale => {
    this.setState({
      locale
    });
  }

  reset = () => {
    localStorage.clear();
    message.success('Reset data.', 1, () => location.reload());
  }

  render() {
    const {locale} = this.state;
    const customHeaderMenu = (
      <Menu theme="dark" mode="horizontal" selectedKeys={[]} style={{ lineHeight: '64px', display: 'inline-block' }}>
        <Menu.Item>
          <Select value={locale} onChange={this.changeLocale}>
            <Option value="zh">
              中文
            </Option>
            <Option value="en">
              English
            </Option>
          </Select>
        </Menu.Item>
        <Menu.Item onClick={this.reset}>
          <span>Reset</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <IntlProvider locale={locale} key={locale} messages={schema.dict[locale]}>
        <Container
          schema={schema}
          sidebarConfig={{
            menuConfig
          }}
          navbarConfig={{
            logo: <Logo src="https://cdn.canner.io/cms-page/d89f77c19e5d3aa366ba1498dddd64ef.svg" />,
            showSaveButton: true,
            renderMenu: () => customHeaderMenu
          }}
          router={this.router}
        >
          <Canner
            ref={this.cms}
            afterDeploy={() => {
              notification.success({
                message: 'Deployed!'
              })
            }}
            errorHandler={e => {
              // eslint-disable-next-line no-console
              console.error(e);
              notification.error({
                message: 'Error'
              });
            }}
            intl={{
              locale
            }}
          />
        </Container>
      </IntlProvider>
    );
  }
}

ReactDOM.render(
  <CMSExample />
, document.getElementById('root'));

