import React from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';

import HeaderCont from '../HeaderCont';
import FooterCont from '../FooterCont';

const { Content } = Layout;

const NotFound = () => (
        <Layout>
            <HeaderCont />
            <Row>
                <Col xs={0} md={4} />
                <Col xs={32} md={16} className="content">
                    <Row>
                        <Col xs={1} md={0} />
                        <Col xs={23} md={24}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>404</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Layout style={{ padding: '24px', background: '#fff' }}>
                        <Content style={{ minHeight: 280 }}>
                            <h1>Page not found</h1>
                        </Content>
                    </Layout>
                </Col>
                <Col xs={0} md={4} />
            </Row>
            <FooterCont />
        </Layout>
)

export default NotFound;